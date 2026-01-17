import { z } from 'zod';

export const GetMonthlyRevenueQuerySchema = z.object({
  year: z.number().optional(),
});

export type GetMonthlyRevenueQuery = z.infer<typeof GetMonthlyRevenueQuerySchema>;

export type MonthlyRevenue = {
  month: string;
  revenue: number;
}[];