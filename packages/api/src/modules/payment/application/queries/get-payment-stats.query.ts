export interface GetPaymentStatsQuery {
  // No parameters needed
}

export type PaymentStats = {
  pending: { count: number; amount: number };
  paid: { count: number; amount: number };
  overdue: { count: number; amount: number };
};