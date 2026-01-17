import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface BoarderDeletedEventData {
  boarderId: string;
  firstName: string;
  lastName: string;
  deletedAt: Date;
}

export class BoarderDeletedDomainEvent extends DomainEvent<BoarderDeletedEventData> {
  constructor(data: BoarderDeletedEventData) {
    super("BoarderDeleted", data);
  }

  static create(data: BoarderDeletedEventData): BoarderDeletedDomainEvent {
    return new BoarderDeletedDomainEvent(data);
  }
}