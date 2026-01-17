import { z } from "zod";

export const GetRecentActivityQuerySchema = z.object({});

export type GetRecentActivityQuery = z.infer<typeof GetRecentActivityQuerySchema>;