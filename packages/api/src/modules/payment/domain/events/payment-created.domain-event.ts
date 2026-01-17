import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface PaymentCreatedEventData {
  paymentId: string;
  boarderId: string;
  amount: number;
  type: string;
  dueDate: Date;
  createdAt: Date;
}

export class PaymentCreatedDomainEvent extends DomainEvent<PaymentCreatedEventData> {
  constructor(data: PaymentCreatedEventData) {
    super("PaymentCreated", data);
  }

  static create(data: PaymentCreatedEventData): PaymentCreatedDomainEvent {
    return new PaymentCreatedDomainEvent(data);
  }
}