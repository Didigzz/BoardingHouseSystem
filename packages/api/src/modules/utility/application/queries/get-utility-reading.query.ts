import { z } from "zod";

export const GetUtilityReadingQuerySchema = z.object({
  id: z.string(),
});

export type GetUtilityReadingQuery = z.infer<typeof GetUtilityReadingQuerySchema>;