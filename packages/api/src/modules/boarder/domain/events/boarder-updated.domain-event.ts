import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface BoarderUpdatedEventData {
  boarderId: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: Date;
}

export class BoarderUpdatedDomainEvent extends DomainEvent<BoarderUpdatedEventData> {
  constructor(data: BoarderUpdatedEventData) {
    super("BoarderUpdated", data);
  }

  static create(data: BoarderUpdatedEventData): BoarderUpdatedDomainEvent {
    return new BoarderUpdatedDomainEvent(data);
  }
}