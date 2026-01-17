import { DomainEvent } from '../../../../shared/kernel/events/domain-event';

export class BoarderCreatedEvent extends DomainEvent {
  constructor(public readonly boarderId: string) {
    super();
  }
}

export class BoarderUpdatedEvent extends DomainEvent {
  constructor(
    public readonly boarderId: string,
    public readonly changes: string[]
  ) {
    super();
  }
}

export class BoarderDeletedEvent extends DomainEvent {
  constructor(public readonly boarderId: string) {
    super();
  }
}

export class BoarderDeactivatedEvent extends DomainEvent {
  constructor(
    public readonly boarderId: string,
    public readonly moveOutDate: Date
  ) {
    super();
  }
}

export class BoarderReactivatedEvent extends DomainEvent {
  constructor(public readonly boarderId: string) {
    super();
  }
}

export class RoomAssignedEvent extends DomainEvent {
  constructor(
    public readonly boarderId: string,
    public readonly roomId: string
  ) {
    super();
  }
}

export class RoomRemovedEvent extends DomainEvent {
  constructor(public readonly boarderId: string) {
    super();
  }
}

export class AccessCodeRegeneratedEvent extends DomainEvent {
  constructor(
    public readonly boarderId: string,
    public readonly newAccessCode: string
  ) {
    super();
  }
}