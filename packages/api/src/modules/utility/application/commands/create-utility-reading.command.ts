import { z } from "zod";

export const CreateUtilityReadingCommandSchema = z.object({
  roomId: z.string().min(1, "Room is required"),
  type: z.enum(["ELECTRICITY", "WATER", "INTERNET", "OTHER"]),
  previousReading: z.number().min(0, "Previous reading must be positive"),
  currentReading: z.number().min(0, "Current reading must be positive"),
  ratePerUnit: z.number().positive("Rate must be positive"),
  readingDate: z.date(),
  billingPeriodStart: z.date(),
  billingPeriodEnd: z.date(),
});

export type CreateUtilityReadingCommand = z.infer<typeof CreateUtilityReadingCommandSchema>;