import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface PaymentPaidEventData {
  paymentId: string;
  boarderId: string;
  amount: number;
  paidDate: Date;
  receiptNumber: string;
}

export class PaymentPaidDomainEvent extends DomainEvent<PaymentPaidEventData> {
  constructor(data: PaymentPaidEventData) {
    super("PaymentPaid", data);
  }

  static create(data: PaymentPaidEventData): PaymentPaidDomainEvent {
    return new PaymentPaidDomainEvent(data);
  }
}