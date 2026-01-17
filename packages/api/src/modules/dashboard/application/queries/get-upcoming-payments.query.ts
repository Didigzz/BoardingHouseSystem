import { z } from "zod";

export const GetUpcomingPaymentsQuerySchema = z.object({});

export type GetUpcomingPaymentsQuery = z.infer<typeof GetUpcomingPaymentsQuerySchema>;