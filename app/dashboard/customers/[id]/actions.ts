"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateCustomerNotes(customerId: string, notes: string | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  await prisma.customer.update({
    where: { id: customerId },
    data: { notes: notes ?? null },
  });

  revalidatePath(`/dashboard/customers/${customerId}`);
  return { success: true };
}
