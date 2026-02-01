import { ValueObject } from '../../../../shared/kernel/domain/value-object';

/**
 * Payment Type Value Object
 */
export class PaymentType extends ValueObject<'RENT' | 'UTILITY' | 'DEPOSIT' | 'OTHER'> {
  private static readonly RENT = 'RENT' as const;
  private static readonly UTILITY = 'UTILITY' as const;
  private static readonly DEPOSIT = 'DEPOSIT' as const;
  private static readonly OTHER = 'OTHER' as const;

  private constructor(value: 'RENT' | 'UTILITY' | 'DEPOSIT' | 'OTHER') {
    super(value);
  }

  static get Rent(): PaymentType {
    return new PaymentType(this.RENT);
  }

  static get Utility(): PaymentType {
    return new PaymentType(this.UTILITY);
  }

  static get Deposit(): PaymentType {
    return new PaymentType(this.DEPOSIT);
  }

  static get Other(): PaymentType {
    return new PaymentType(this.OTHER);
  }

  static fromString(value: string): PaymentType {
    switch (value) {
      case this.RENT:
        return this.Rent;
      case this.UTILITY:
        return this.Utility;
      case this.DEPOSIT:
        return this.Deposit;
      case this.OTHER:
        return this.Other;
      default:
        throw new Error(`Invalid payment type: ${value}`);
    }
  }

  isRent(): boolean {
    return this.value === this.RENT;
  }

  isUtility(): boolean {
    return this.value === this.UTILITY;
  }

  isDeposit(): boolean {
    return this.value === this.DEPOSIT;
  }

  isOther(): boolean {
    return this.value === this.OTHER;
  }

  toString(): string {
    return this.value;
  }
}