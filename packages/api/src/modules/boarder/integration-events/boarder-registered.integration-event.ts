export interface BoarderRegisteredIntegrationEventData {
  boarderId: string;
  firstName: string;
  lastName: string;
  email: string;
  accessCode: string;
  registeredAt: Date;
}

export class BoarderRegisteredIntegrationEvent {
  readonly type = "BoarderRegistered";
  readonly data: BoarderRegisteredIntegrationEventData;

  constructor(data: BoarderRegisteredIntegrationEventData) {
    this.data = data;
  }

  static create(data: BoarderRegisteredIntegrationEventData): BoarderRegisteredIntegrationEvent {
    return new BoarderRegisteredIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}