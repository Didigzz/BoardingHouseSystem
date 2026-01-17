import { z } from "zod";

export const GetProfileQuerySchema = z.object({
  userId: z.string(),
});

export type GetProfileQuery = z.infer<typeof GetProfileQuerySchema>;