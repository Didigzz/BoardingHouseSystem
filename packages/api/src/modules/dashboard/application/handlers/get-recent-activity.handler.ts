import { GetRecentActivityQuery } from "../queries/get-recent-activity.query";
import { AnalyticsService } from "../../domain/services/analytics.service";

export class GetRecentActivityHandler {
  constructor(private readonly db: any, private readonly service: AnalyticsService) {}

  async handle(_query: GetRecentActivityQuery) {
    const [recentPayments, recentBoarders] = await Promise.all([
      this.db.payment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          boarder: { select: { firstName: true, lastName: true } },
        },
      }),
      this.db.boarder.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          moveInDate: true,
          createdAt: true,
        },
      }),
    ]);

    return this.service.mergeActivities(recentPayments, recentBoarders);
  }
}