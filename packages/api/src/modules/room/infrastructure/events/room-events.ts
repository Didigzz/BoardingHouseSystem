import { DomainEvent } from '../../../../shared/kernel/events/domain-event';

export class RoomCreatedEvent extends DomainEvent {
  constructor(public readonly roomId: string) {
    super();
  }
}

export class RoomUpdatedEvent extends DomainEvent {
  constructor(
    public readonly roomId: string,
    public readonly changes: string[]
  ) {
    super();
  }
}

export class RoomDeletedEvent extends DomainEvent {
  constructor(public readonly roomId: string) {
    super();
  }
}

export class RoomStatusChangedEvent extends DomainEvent {
  constructor(
    public readonly roomId: string,
    public readonly oldStatus: string,
    public readonly newStatus: string
  ) {
    super();
  }
}