import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations/order";

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "cleopatradelights@gmail.com";

function parseEventDate(value: string | undefined): Date | null {
  if (!value?.trim()) return null;
  const d = new Date(value.trim());
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Honeypot — bots fill the hidden field; do not persist or email
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message =
        first.name?.[0] ?? first.email?.[0] ?? first.orderType?.[0] ?? first.notes?.[0] ?? "Please fill in all required fields.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, phone, orderType, eventDate, occasion, notes, howHeard } = parsed.data;
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
        // Still return success — DB is source of truth
      }
    } else {
      console.warn("RESEND_API_KEY not set; order saved but no email sent.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
