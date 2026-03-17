import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name is too long").transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .max(320, "Email is too long")
    .email("Please enter a valid email address")
    .transform((s) => s.trim().toLowerCase()),
  phone: z.string().max(30, "Phone number is too long").optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  orderType: z.string().min(1, "Please select an order type").max(100, "Order type is too long").transform((s) => s.trim()),
  eventDate: z.string().max(50).optional(),
  occasion: z.string().max(300, "Occasion is too long").optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  notes: z.string().min(1, "Please describe what you'd like").max(5000, "Notes are too long (max 5000 characters)").transform((s) => s.trim()),
  howHeard: z.string().max(100).optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  website: z.string().optional(), // honeypot
});

export type OrderFormData = z.infer<typeof orderSchema>;
