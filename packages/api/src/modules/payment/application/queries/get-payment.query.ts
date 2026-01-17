import { z } from 'zod';

export const GetPaymentQuerySchema = z.object({
  id: z.string(),
});

export type GetPaymentQuery = z.infer<typeof GetPaymentQuerySchema>;