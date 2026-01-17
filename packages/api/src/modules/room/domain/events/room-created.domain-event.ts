import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface RoomCreatedEventData {
  roomId: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  monthlyRate: number;
  createdAt: Date;
}

export class RoomCreatedDomainEvent extends DomainEvent<RoomCreatedEventData> {
  constructor(data: RoomCreatedEventData) {
    super("RoomCreated", data);
  }

  static create(data: RoomCreatedEventData): RoomCreatedDomainEvent {
    return new RoomCreatedDomainEvent(data);
  }
}