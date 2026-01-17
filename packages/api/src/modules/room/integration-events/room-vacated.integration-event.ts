export interface RoomVacatedIntegrationEventData {
  roomId: string;
  roomNumber: string;
  boarderId: string;
  boarderName: string;
  vacatedAt: Date;
}

export class RoomVacatedIntegrationEvent {
  readonly type = "RoomVacated";
  readonly data: RoomVacatedIntegrationEventData;

  constructor(data: RoomVacatedIntegrationEventData) {
    this.data = data;
  }

  static create(data: RoomVacatedIntegrationEventData): RoomVacatedIntegrationEvent {
    return new RoomVacatedIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}