import { z } from "zod";
import { OrderStatus } from "@prisma/client";

const orderStatusEnum = z.nativeEnum(OrderStatus);

export const orderUpdateSchema = z.object({
  status: orderStatusEnum.optional(),
  total: z.number().min(0).nullable().optional(),
  internalNotes: z.string().nullable().optional(),
});

export type OrderUpdateData = z.infer<typeof orderUpdateSchema>;
