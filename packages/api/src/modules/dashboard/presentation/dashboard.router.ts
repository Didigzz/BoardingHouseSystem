import { AnalyticsService } from "../../domain/services/analytics.service";
import { GetDashboardStatsHandler } from "../../application/handlers/get-dashboard-stats.handler";
import { GetRecentActivityHandler } from "../../application/handlers/get-recent-activity.handler";
import { GetUpcomingPaymentsHandler } from "../../application/handlers/get-upcoming-payments.handler";

type ProtectedProcedure = any;

export const createDashboardRouter = (protectedProcedure: ProtectedProcedure) => {
  const analyticsService = new AnalyticsService();

  return {
    getStats: protectedProcedure.handler(async ({ context }: { context: any }) => {
      const handler = new GetDashboardStatsHandler(context.db, analyticsService);
      return handler.handle({});
    }),

    getRecentActivity: protectedProcedure.handler(async ({ context }: { context: any }) => {
      const handler = new GetRecentActivityHandler(context.db, analyticsService);
      return handler.handle({});
    }),

    getUpcomingPayments: protectedProcedure.handler(async ({ context }: { context: any }) => {
      const handler = new GetUpcomingPaymentsHandler(context.db);
      return handler.handle({});
    }),
  };
};