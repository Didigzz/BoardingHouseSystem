import { z } from 'zod';

export const MarkPaymentPaidCommandSchema = z.object({
  id: z.string(),
  paidDate: z.date().optional().default(new Date()),
});

export type MarkPaymentPaidCommand = z.infer<typeof MarkPaymentPaidCommandSchema>;