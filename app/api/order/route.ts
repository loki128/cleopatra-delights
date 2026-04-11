import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations/order";
import { rateLimit } from "@/lib/rate-limit";
import { detectSpam } from "@/lib/spam-check";
import { securityLog } from "@/lib/security-log";

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "cleopatradelights@gmail.com";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const MIN_FORM_TIME_MS = 4000; // humans take at least 4 seconds to fill a form

function parseEventDate(value: string | undefined): Date | null {
  if (!value?.trim()) return null;
  const d = new Date(value.trim());
  return Number.isNaN(d.getTime()) ? null : d;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) {
    // SECURITY: warn when Turnstile is not configured in production --
    // this means the anti-bot layer is completely disabled.
    if (process.env.NODE_ENV === "production") {
      securityLog("TURNSTILE_MISSING_PRODUCTION", {
        warning: "TURNSTILE_SECRET_KEY is not set in production. Anti-bot verification is disabled.",
      });
    }
    return true; // skip if not configured
  }
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET,
        response: token,
      }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    console.error("Turnstile verification failed");
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Layer 1: Rate limiting — 5 per IP per hour (legit customers unaffected)
    const { allowed, remaining } = rateLimit(ip, 5, 3_600_000);
    if (!allowed) {
      securityLog("RATE_LIMIT_HIT", { ip });
      return NextResponse.json(
        { error: "Too many requests from your network. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": "3600", "X-RateLimit-Remaining": "0" },
        }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Layer 2: Honeypot — bots fill hidden fields
    if (body.website || body.company) {
      // Silently accept so bots think it worked
      return NextResponse.json({ success: true });
    }

    // Layer 3: Timing check — reject if form was submitted too fast
    const loadedAt = Number(body._loadedAt);
    if (loadedAt && Date.now() - loadedAt < MIN_FORM_TIME_MS) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Layer 4: Turnstile verification (if configured)
    if (TURNSTILE_SECRET) {
      const token = body._turnstileToken;
      if (!token || !(await verifyTurnstile(token))) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Standard Zod validation
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message =
        first.name?.[0] ?? first.email?.[0] ?? first.orderType?.[0] ?? first.notes?.[0] ?? "Please fill in all required fields.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, phone, orderType, eventDate, occasion, notes, howHeard } = parsed.data;

    // Layer 5: Content-based spam detection
    const spamReason = detectSpam({ name, email, notes, phone });
    if (spamReason) {
      console.warn(`Spam blocked [${ip}]: ${spamReason}`);
      return NextResponse.json({ success: true }); // silent reject
    }

    const eventDateObj = parseEventDate(eventDate);

    // Database as source of truth: create order + customer + timeline in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const now = new Date();
      const customer = await tx.customer.upsert({
        where: { email },
        create: {
          name,
          email,
          phone: phone ?? null,
          firstOrderAt: now,
          orderCount: 1,
          totalSpent: 0,
        },
        update: {
          orderCount: { increment: 1 },
        },
      });

      const newOrder = await tx.order.create({
        data: {
          customerId: customer.id,
          customerName: name,
          customerEmail: email,
          customerPhone: phone ?? null,
          orderType,
          occasion: occasion ?? null,
          eventDate: eventDateObj,
          notes,
          howHeard: howHeard ?? null,
          status: "NEW",
          total: null,
          internalNotes: null,
        },
      });

      await tx.orderTimelineEntry.create({
        data: {
          orderId: newOrder.id,
          type: "CREATED",
          payload: {},
        },
      });

      return newOrder;
    });

    // Email as notification layer only
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailBody = `
NEW CUSTOM ORDER INQUIRY
========================

Name:        ${name}
Email:       ${email}
Phone:       ${phone || "Not provided"}
Order Type:  ${orderType}
Occasion:    ${occasion || "Not specified"}
Event Date:  ${eventDate || "Not specified"}
How Heard:   ${howHeard || "Not specified"}

NOTES / FLAVOR REQUEST:
${notes}

========================
Sent from cleopatraDelights.com
      `.trim();

      const { error } = await resend.emails.send({
        from: "Cleopatra Delights Orders <orders@resend.dev>",
        to: TO_EMAIL,
        replyTo: email,
        subject: `New ${orderType} Inquiry from ${name}`,
        text: emailBody,
      });

      if (error) {
        console.error("Resend error (order already saved):", error);
      }
    } else {
      console.warn("RESEND_API_KEY not set; order saved but no email sent.");
    }

    return NextResponse.json(
      { success: true },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
