import { z } from "zod";

export const createPaymentSchema = z.object({
  boarderId: z.string().min(1, "Boarder is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["RENT", "UTILITY", "DEPOSIT", "OTHER"]).default("RENT"),
  dueDate: z.date(),
  description: z.string().optional(),
});

export const updatePaymentSchema = createPaymentSchema
  .partial()
  .extend({
    id: z.string(),
    status: z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
    paidDate: z.date().optional(),
  });

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
