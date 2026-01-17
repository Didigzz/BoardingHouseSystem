import { Entity } from "../../../../shared/kernel/domain/entity";

export interface UtilityReadingProps {
  id: string;
  roomId: string;
  type: string;
  previousReading: number;
  currentReading: number;
  ratePerUnit: number;
  readingDate: Date;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UtilityReading extends Entity<UtilityReadingProps> {
  get roomId(): string {
    return this.props.roomId;
  }

  get type(): string {
    return this.props.type;
  }

  get previousReading(): number {
    return this.props.previousReading;
  }

  get currentReading(): number {
    return this.props.currentReading;
  }

  get consumption(): number {
    return this.currentReading - this.previousReading;
  }

  get cost(): number {
    return this.consumption * this.props.ratePerUnit;
  }

  get ratePerUnit(): number {
    return this.props.ratePerUnit;
  }

  get readingDate(): Date {
    return this.props.readingDate;
  }

  get billingPeriodStart(): Date {
    return this.props.billingPeriodStart;
  }

  get billingPeriodEnd(): Date {
    return this.props.billingPeriodEnd;
  }

  private constructor(props: UtilityReadingProps) {
    super(props);
  }

  static create(props: Omit<UtilityReadingProps, "id" | "createdAt" | "updatedAt">): UtilityReading {
    return new UtilityReading({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPrisma(data: any): UtilityReading {
    return new UtilityReading({
      id: data.id,
      roomId: data.roomId,
      type: data.type,
      previousReading: Number(data.previousReading),
      currentReading: Number(data.currentReading),
      ratePerUnit: Number(data.ratePerUnit),
      readingDate: data.readingDate,
      billingPeriodStart: data.billingPeriodStart,
      billingPeriodEnd: data.billingPeriodEnd,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  toPrisma() {
    return {
      id: this.props.id,
      roomId: this.props.roomId,
      type: this.props.type,
      previousReading: this.props.previousReading,
      currentReading: this.props.currentReading,
      ratePerUnit: this.props.ratePerUnit,
      readingDate: this.props.readingDate,
      billingPeriodStart: this.props.billingPeriodStart,
      billingPeriodEnd: this.props.billingPeriodEnd,
    };
  }
}