import { Entity } from "../../../../shared/kernel/domain/entity";

export interface DashboardStatsProps {
  rooms: {
    total: number;
    available: number;
    occupied: number;
  };
  boarders: {
    total: number;
    active: number;
  };
  payments: {
    pendingCount: number;
    pendingAmount: number;
    paidThisMonth: number;
  };
  occupancyRate: number;
}

export class DashboardStats extends Entity<DashboardStatsProps> {
  get rooms() {
    return this.props.rooms;
  }

  get boarders() {
    return this.props.boarders;
  }

  get payments() {
    return this.props.payments;
  }

  get occupancyRate() {
    return this.props.occupancyRate;
  }

  private constructor(props: DashboardStatsProps) {
    // DashboardStats doesn't have a real id, use a derived one
    super(`stats-${props.occupancyRate}`, props);
  }

  static create(props: DashboardStatsProps): DashboardStats {
    return new DashboardStats(props);
  }
}
