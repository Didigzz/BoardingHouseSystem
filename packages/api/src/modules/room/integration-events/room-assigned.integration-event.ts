export interface RoomAssignedIntegrationEventData {
  roomId: string;
  roomNumber: string;
  boarderId: string;
  boarderName: string;
  assignedAt: Date;
}

export class RoomAssignedIntegrationEvent {
  readonly type = "RoomAssigned";
  readonly data: RoomAssignedIntegrationEventData;

  constructor(data: RoomAssignedIntegrationEventData) {
    this.data = data;
  }

  static create(data: RoomAssignedIntegrationEventData): RoomAssignedIntegrationEvent {
    return new RoomAssignedIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}