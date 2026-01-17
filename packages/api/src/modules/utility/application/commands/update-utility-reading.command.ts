import { z } from "zod";

export const UpdateUtilityReadingCommandSchema = z.object({
  id: z.string(),
  roomId: z.string().optional(),
  type: z.enum(["ELECTRICITY", "WATER", "INTERNET", "OTHER"]).optional(),
  previousReading: z.number().min(0).optional(),
  currentReading: z.number().min(0).optional(),
  ratePerUnit: z.number().positive().optional(),
  readingDate: z.date().optional(),
  billingPeriodStart: z.date().optional(),
  billingPeriodEnd: z.date().optional(),
});

export type UpdateUtilityReadingCommand = z.infer<typeof UpdateUtilityReadingCommandSchema>;