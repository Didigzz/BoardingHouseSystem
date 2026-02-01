import type { Payment as PrismaPayment, PaymentStatus, PaymentType, Boarder } from "@bhms/database";

export type Payment = PrismaPayment;

export type PaymentWithBoarder = Payment & {
  boarder: {
    id: string;
    firstName: string;
    lastName: string;
    room?: { roomNumber: string } | null;
  };
};

export { PaymentStatus, PaymentType };

export interface PaymentFilters {
  status?: PaymentStatus;
  type?: PaymentType;
  boarderId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface PaymentStats {
  pending: {
    count: number;
    amount: number;
  };
  paid: {
    count: number;
    amount: number;
  };
  overdue: {
    count: number;
    amount: number;
  };
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}