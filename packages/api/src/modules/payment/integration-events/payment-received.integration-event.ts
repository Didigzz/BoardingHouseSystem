export interface PaymentReceivedIntegrationEventData {
  paymentId: string;
  boarderId: string;
  boarderName: string;
  amount: number;
  type: string;
  receivedAt: Date;
}

export class PaymentReceivedIntegrationEvent {
  readonly type = "PaymentReceived";
  readonly data: PaymentReceivedIntegrationEventData;

  constructor(data: PaymentReceivedIntegrationEventData) {
    this.data = data;
  }

  static create(data: PaymentReceivedIntegrationEventData): PaymentReceivedIntegrationEvent {
    return new PaymentReceivedIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}