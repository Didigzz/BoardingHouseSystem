import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface RoomDeletedEventData {
  roomId: string;
  roomNumber: string;
  deletedAt: Date;
}

export class RoomDeletedDomainEvent extends DomainEvent<RoomDeletedEventData> {
  constructor(data: RoomDeletedEventData) {
    super("RoomDeleted", data);
  }

  static create(data: RoomDeletedEventData): RoomDeletedDomainEvent {
    return new RoomDeletedDomainEvent(data);
  }
}