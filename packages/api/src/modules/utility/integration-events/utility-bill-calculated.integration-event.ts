export interface UtilityBillCalculatedIntegrationEventData {
  readingId: string;
  roomId: string;
  roomNumber: string;
  type: string;
  amount: number;
  calculatedAt: Date;
}

export class UtilityBillCalculatedIntegrationEvent {
  readonly type = "UtilityBillCalculated";
  readonly data: UtilityBillCalculatedIntegrationEventData;

  constructor(data: UtilityBillCalculatedIntegrationEventData) {
    this.data = data;
  }

  static create(data: UtilityBillCalculatedIntegrationEventData): UtilityBillCalculatedIntegrationEvent {
    return new UtilityBillCalculatedIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}