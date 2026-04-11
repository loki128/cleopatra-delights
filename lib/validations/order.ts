import { z } from "zod";
import { ORDER_TYPES } from "@/lib/constants";

// SECURITY: all string fields have explicit max lengths to prevent oversized
// payloads from reaching the database or consuming excessive memory during
// validation. orderType is constrained to the known-good enum values.
export const orderSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer")
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .max(200, "Email must be 200 characters or fewer")
    .email("Please enter a valid email address")
    .transform((s) => s.trim().toLowerCase()),
  phone: z
    .string()
    .max(30, "Phone must be 30 characters or fewer")
    .optional()
    .transform((s) => (s?.trim() ? s.trim() : undefined)),
  orderType: z.enum(ORDER_TYPES, {
    message: "Please select a valid order type",
  }),
  eventDate: z
    .string()
    .max(20, "Event date must be 20 characters or fewer")
    .optional(),
  occasion: z
    .string()
    .max(200, "Occasion must be 200 characters or fewer")
    .optional()
    .transform((s) => (s?.trim() ? s.trim() : undefined)),
  notes: z
    .string()
    .min(1, "Please describe what you'd like")
    .max(5000, "Notes must be 5,000 characters or fewer")
    .transform((s) => s.trim()),
  howHeard: z
    .string()
    .max(100, "How heard must be 100 characters or fewer")
    .optional()
    .transform((s) => (s?.trim() ? s.trim() : undefined)),
  website: z.string().optional(), // honeypot
  company: z.string().optional(), // honeypot 2
});

export type OrderFormData = z.infer<typeof orderSchema>;
