import { DashboardStats } from "../entities/dashboard-stats.entity";

export class AnalyticsService {
  calculateOccupancyRate(totalRooms: number, occupiedRooms: number): number {
    return totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  }

  aggregateStats(data: {
    totalRooms: number;
    availableRooms: number;
    occupiedRooms: number;
    totalBoarders: number;
    activeBoarders: number;
    pendingPayments: { _count: number; _sum: { amount?: number } };
    paidPaymentsThisMonth: { _count: number; _sum: { amount?: number } };
  }): DashboardStats {
    const occupancyRate = this.calculateOccupancyRate(
      data.totalRooms,
      data.occupiedRooms
    );

    return DashboardStats.create({
      rooms: {
        total: data.totalRooms,
        available: data.availableRooms,
        occupied: data.occupiedRooms,
      },
      boarders: {
        total: data.totalBoarders,
        active: data.activeBoarders,
      },
      payments: {
        pendingCount: data.pendingPayments._count,
        pendingAmount: data.pendingPayments._sum.amount?.toNumber() ?? 0,
        paidThisMonth: data.paidPaymentsThisMonth._sum.amount?.toNumber() ?? 0,
      },
      occupancyRate,
    });
  }

  mergeActivities(payments: any[], boarders: any[]): any[] {
    const activities = [
      ...payments.map((p: any) => ({
        id: p.id,
        type: "payment" as const,
        title: `Payment ${p.status.toLowerCase()}`,
        description: `${p.boarder.firstName} ${p.boarder.lastName} - ₱${p.amount.toNumber().toLocaleString()}`,
        date: p.createdAt,
      })),
      ...boarders.map((b: any) => ({
        id: b.id,
        type: "boarder" as const,
        title: "New boarder",
        description: `${b.firstName} ${b.lastName} moved in`,
        date: b.createdAt,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    return activities.slice(0, 10);
  }
}