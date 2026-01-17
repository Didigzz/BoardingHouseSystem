import { GetDashboardStatsQuery } from "../queries/get-dashboard-stats.query";
import { AnalyticsService } from "../../domain/services/analytics.service";

export class GetDashboardStatsHandler {
  constructor(private readonly db: any, private readonly service: AnalyticsService) {}

  async handle(_query: GetDashboardStatsQuery) {
    const [
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalBoarders,
      activeBoarders,
      pendingPayments,
      paidPaymentsThisMonth,
    ] = await Promise.all([
      this.db.room.count(),
      this.db.room.count({ where: { status: "AVAILABLE" } }),
      this.db.room.count({ where: { status: "OCCUPIED" } }),
      this.db.boarder.count(),
      this.db.boarder.count({ where: { isActive: true } }),
      this.db.payment.aggregate({
        where: { status: "PENDING" },
        _sum: { amount: true },
        _count: true,
      }),
      this.db.payment.aggregate({
        where: {
          status: "PAID",
          paidDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

    return this.service.aggregateStats({
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalBoarders,
      activeBoarders,
      pendingPayments,
      paidPaymentsThisMonth,
    });
  }
}