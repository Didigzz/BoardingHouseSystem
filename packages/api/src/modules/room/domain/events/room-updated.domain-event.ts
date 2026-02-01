import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface RoomUpdatedEventData {
  roomId: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  monthlyRate: number;
  status: string;
  updatedAt: Date;
}

export class RoomUpdatedDomainEvent extends DomainEvent<RoomUpdatedEventData> {
  constructor(data: RoomUpdatedEventData) {
    super("RoomUpdated", data);
  }

  static create(data: RoomUpdatedEventData): RoomUpdatedDomainEvent {
    return new RoomUpdatedDomainEvent(data);
  }
}