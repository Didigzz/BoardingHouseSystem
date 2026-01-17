import { z } from 'zod';

export const ListPaymentsQuerySchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  type: z.enum(['RENT', 'UTILITY', 'DEPOSIT', 'OTHER']).optional(),
  boarderId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
}).optional();

export type ListPaymentsQuery = z.infer<typeof ListPaymentsQuerySchema>;