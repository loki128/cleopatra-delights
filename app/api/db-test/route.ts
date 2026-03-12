import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
  }

  // Mask the password in the URL for safe logging
  const safeUrl = url.replace(/:[^@]+@/, ":***@");

  try {
    const { prisma } = await import("@/lib/prisma");
    const count = await prisma.customer.count();
    return NextResponse.json({ ok: true, customerCount: count, url: safeUrl });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg, url: safeUrl }, { status: 500 });
  }
}
