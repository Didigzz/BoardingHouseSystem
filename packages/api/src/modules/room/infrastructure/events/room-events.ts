import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export class RoomCreatedEvent extends DomainEvent<{ roomId: string }> {
  constructor(public readonly roomId: string) {
    super("RoomCreatedEvent", { roomId });
  }
}

export class RoomUpdatedEvent extends DomainEvent<{
  roomId: string;
  changes: string[];
}> {
  constructor(
    public readonly roomId: string,
    public readonly changes: string[]
  ) {
    super("RoomUpdatedEvent", { roomId, changes });
  }
}

export class RoomDeletedEvent extends DomainEvent<{ roomId: string }> {
  constructor(public readonly roomId: string) {
    super("RoomDeletedEvent", { roomId });
  }
}

export class RoomStatusChangedEvent extends DomainEvent<{
  roomId: string;
  oldStatus: string;
  newStatus: string;
}> {
  constructor(
    public readonly roomId: string,
    public readonly oldStatus: string,
    public readonly newStatus: string
  ) {
    super("RoomStatusChangedEvent", { roomId, oldStatus, newStatus });
  }
}
