"use server";

import { revalidatePath } from "next/cache";
import { auth, isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { securityLog } from "@/lib/security-log";

export async function updateCustomerNotes(customerId: string, notes: string | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  // SECURITY: verify admin role, not just session existence
  if (!isAdminEmail(session.user.email)) {
    securityLog("ADMIN_ACTION_DENIED", {
      action: "updateCustomerNotes",
      email: session.user.email,
      customerId,
    });
    return { error: "Forbidden" };
  }

  await prisma.customer.update({
    where: { id: customerId },
    data: { notes: notes ?? null },
  });

  securityLog("ADMIN_ACTION", {
    action: "updateCustomerNotes",
    email: session.user.email,
    customerId,
  });

  revalidatePath(`/dashboard/customers/${customerId}`);
  return { success: true };
}
