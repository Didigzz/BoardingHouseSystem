export interface PaymentConfig {
  maxOverdueDays: number;
  minPaymentAmount: number;
  allowedTypes: readonly string[];
  allowedStatuses: readonly string[];
}

export const paymentConfig: PaymentConfig = {
  maxOverdueDays: 30,
  minPaymentAmount: 100,
  allowedTypes: ['RENT', 'UTILITY', 'DEPOSIT', 'OTHER'] as const,
  allowedStatuses: ['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'] as const,
};

export function generateReceiptNumber(): string {
  return `RCP-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;
}