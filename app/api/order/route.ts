import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "cleopatradelights@gmail.com";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    // Honeypot check — bots fill the hidden field, humans don't
    if (body.website) {
      return NextResponse.json({ success: true }); // silently ignore
    }

    const { name, email, phone, orderType, eventDate, occasion, notes, howHeard } = body;

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !orderType?.trim() || !notes?.trim()) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

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
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
