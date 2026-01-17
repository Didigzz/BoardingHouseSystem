import { z } from "zod";

export const GetDashboardStatsQuerySchema = z.object({});

export type GetDashboardStatsQuery = z.infer<typeof GetDashboardStatsQuerySchema>;