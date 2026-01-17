import { z } from "zod";

export const GetConsumptionSummaryQuerySchema = z.object({
  roomId: z.string().optional(),
  type: z.enum(["ELECTRICITY", "WATER", "INTERNET", "OTHER"]).optional(),
  months: z.number().default(6),
});

export type GetConsumptionSummaryQuery = z.infer<typeof GetConsumptionSummaryQuerySchema>;