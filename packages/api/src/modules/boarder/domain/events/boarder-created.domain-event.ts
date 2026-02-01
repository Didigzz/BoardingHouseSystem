import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface BoarderCreatedEventData {
  boarderId: string;
  firstName: string;
  lastName: string;
  email: string;
  accessCode: string;
  moveInDate: Date;
  createdAt: Date;
}

export class BoarderCreatedDomainEvent extends DomainEvent<BoarderCreatedEventData> {
  constructor(data: BoarderCreatedEventData) {
    super("BoarderCreated", data);
  }

  static create(data: BoarderCreatedEventData): BoarderCreatedDomainEvent {
    return new BoarderCreatedDomainEvent(data);
  }
}