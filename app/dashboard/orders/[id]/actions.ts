"use server";

import { revalidatePath } from "next/cache";
import { auth, isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { securityLog } from "@/lib/security-log";
import { orderUpdateSchema } from "@/lib/validations/order-update";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  // SECURITY: verify the user's email is in the admin allowlist, not just
  // that they have a valid session. Prevents privilege escalation if a
  // non-admin somehow obtains a session token.
  if (!isAdminEmail(session.user.email)) {
    securityLog("ADMIN_ACTION_DENIED", {
      action: "updateOrderStatus",
      email: session.user.email,
      orderId,
    });
    return { error: "Forbidden" };
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { error: "Order not found" };

  const previousStatus = order.status;
  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    await tx.orderTimelineEntry.create({
      data: {
        orderId,
        type: "STATUS_CHANGE",
        payload: { fromStatus: previousStatus, toStatus: newStatus },
      },
    });
    if (newStatus === "DELIVERED" && order.total != null && order.total > 0) {
      await tx.customer.update({
        where: { id: order.customerId },
        data: { totalSpent: { increment: order.total } },
      });
    }
  });

  securityLog("ADMIN_ACTION", {
    action: "updateOrderStatus",
    email: session.user.email,
    orderId,
    fromStatus: previousStatus,
    toStatus: newStatus,
  });

  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateOrderTotal(orderId: string, total: number | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  if (!isAdminEmail(session.user.email)) {
    securityLog("ADMIN_ACTION_DENIED", {
      action: "updateOrderTotal",
      email: session.user.email,
      orderId,
    });
    return { error: "Forbidden" };
  }

  const parsed = orderUpdateSchema.partial().safeParse({ total });
  if (!parsed.success) return { error: "Invalid total" };

  await prisma.order.update({
    where: { id: orderId },
    data: { total: parsed.data.total ?? null },
  });

  securityLog("ADMIN_ACTION", {
    action: "updateOrderTotal",
    email: session.user.email,
    orderId,
    total,
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateOrderInternalNotes(orderId: string, internalNotes: string | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  if (!isAdminEmail(session.user.email)) {
    securityLog("ADMIN_ACTION_DENIED", {
      action: "updateOrderInternalNotes",
      email: session.user.email,
      orderId,
    });
    return { error: "Forbidden" };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { internalNotes: internalNotes ?? null },
  });

  securityLog("ADMIN_ACTION", {
    action: "updateOrderInternalNotes",
    email: session.user.email,
    orderId,
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return { success: true };
}
