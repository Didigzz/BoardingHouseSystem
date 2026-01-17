import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface DashboardStatsCalculatedEventData {
  occupancyRate: number;
  totalBoarders: number;
  totalRooms: number;
  calculatedAt: Date;
}

export class DashboardStatsCalculatedDomainEvent extends DomainEvent<DashboardStatsCalculatedEventData> {
  constructor(data: DashboardStatsCalculatedEventData) {
    super("DashboardStatsCalculated", data);
  }

  static create(data: DashboardStatsCalculatedEventData): DashboardStatsCalculatedDomainEvent {
    return new DashboardStatsCalculatedDomainEvent(data);
  }
}