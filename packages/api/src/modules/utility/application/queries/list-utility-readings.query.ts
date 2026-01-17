import { z } from "zod";

export const ListUtilityReadingsQuerySchema = z.object({
  type: z.enum(["ELECTRICITY", "WATER", "INTERNET", "OTHER"]).optional(),
  roomId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
}).optional();

export type ListUtilityReadingsQuery = z.infer<typeof ListUtilityReadingsQuerySchema>;