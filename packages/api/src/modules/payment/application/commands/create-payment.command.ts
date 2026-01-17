import { z } from 'zod';

export const CreatePaymentCommandSchema = z.object({
  boarderId: z.string().min(1, "Boarder is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(['RENT', 'UTILITY', 'DEPOSIT', 'OTHER']).default("RENT"),
  dueDate: z.date(),
  description: z.string().optional(),
});

export type CreatePaymentCommand = z.infer<typeof CreatePaymentCommandSchema>;