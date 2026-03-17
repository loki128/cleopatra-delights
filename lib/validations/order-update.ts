import { z } from "zod";
import { OrderStatus } from "@prisma/client";

const orderStatusEnum = z.nativeEnum(OrderStatus);

export const orderUpdateSchema = z.object({
  status: orderStatusEnum.optional(),
  total: z.number().min(0).max(1_000_000).nullable().optional(),
  internalNotes: z.string().max(10_000, "Internal notes are too long").nullable().optional(),
});

export type OrderUpdateData = z.infer<typeof orderUpdateSchema>;
