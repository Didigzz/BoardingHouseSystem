import { ValueObject } from '../../../../shared/kernel/domain/value-object';

/**
 * Payment Status Value Object
 */
export class PaymentStatus extends ValueObject<'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'> {
  private static readonly PENDING = 'PENDING' as const;
  private static readonly PAID = 'PAID' as const;
  private static readonly OVERDUE = 'OVERDUE' as const;
  private static readonly CANCELLED = 'CANCELLED' as const;

  private constructor(value: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED') {
    super(value);
  }

  static get Pending(): PaymentStatus {
    return new PaymentStatus(this.PENDING);
  }

  static get Paid(): PaymentStatus {
    return new PaymentStatus(this.PAID);
  }

  static get Overdue(): PaymentStatus {
    return new PaymentStatus(this.OVERDUE);
  }

  static get Cancelled(): PaymentStatus {
    return new PaymentStatus(this.CANCELLED);
  }

  static fromString(value: string): PaymentStatus {
    switch (value) {
      case this.PENDING:
        return this.Pending;
      case this.PAID:
        return this.Paid;
      case this.OVERDUE:
        return this.Overdue;
      case this.CANCELLED:
        return this.Cancelled;
      default:
        throw new Error(`Invalid payment status: ${value}`);
    }
  }

  isPending(): boolean {
    return this.value === this.PENDING;
  }

  isPaid(): boolean {
    return this.value === this.PAID;
  }

  isOverdue(): boolean {
    return this.value === this.OVERDUE;
  }

  isCancelled(): boolean {
    return this.value === this.CANCELLED;
  }

  toString(): string {
    return this.value;
  }
}