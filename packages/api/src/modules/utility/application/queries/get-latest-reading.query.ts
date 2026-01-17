import { z } from "zod";

export const GetLatestReadingQuerySchema = z.object({
  roomId: z.string(),
  type: z.enum(["ELECTRICITY", "WATER", "INTERNET", "OTHER"]),
});

export type GetLatestReadingQuery = z.infer<typeof GetLatestReadingQuerySchema>;