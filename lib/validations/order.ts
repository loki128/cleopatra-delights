import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Name is required").transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((s) => s.trim().toLowerCase()),
  phone: z.string().optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  orderType: z.string().min(1, "Please select an order type").transform((s) => s.trim()),
  eventDate: z.string().optional(),
  occasion: z.string().optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  notes: z.string().min(1, "Please describe what you'd like").transform((s) => s.trim()),
  howHeard: z.string().optional().transform((s) => (s?.trim() ? s.trim() : undefined)),
  website: z.string().optional(), // honeypot
});

export type OrderFormData = z.infer<typeof orderSchema>;
