import { z } from 'zod';

export const UpdatePaymentCommandSchema = z.object({
  id: z.string(),
  boarderId: z.string().min(1).optional(),
  amount: z.coerce.number().positive().optional(),
  type: z.enum(['RENT', 'UTILITY', 'DEPOSIT', 'OTHER']).optional(),
  dueDate: z.date().optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  paidDate: z.date().optional(),
});

export type UpdatePaymentCommand = z.infer<typeof UpdatePaymentCommandSchema>;