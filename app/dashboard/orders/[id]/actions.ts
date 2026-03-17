"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { orderUpdateSchema } from "@/lib/validations/order-update";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

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

  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateOrderTotal(orderId: string, total: number | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = orderUpdateSchema.partial().safeParse({ total });
  if (!parsed.success) return { error: "Invalid total" };

  await prisma.order.update({
    where: { id: orderId },
    data: { total: parsed.data.total ?? null },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateOrderInternalNotes(orderId: string, internalNotes: string | null) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const parsed = orderUpdateSchema.partial().safeParse({ internalNotes });
  if (!parsed.success) return { error: "Internal notes are too long" };

  await prisma.order.update({
    where: { id: orderId },
    data: { internalNotes: parsed.data.internalNotes ?? null },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return { success: true };
}
