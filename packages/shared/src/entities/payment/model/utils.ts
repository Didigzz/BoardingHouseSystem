import type { Payment, PaymentWithBoarder, PaymentStatus } from './types';

/**
 * Check if a payment is overdue
 */
export function isPaymentOverdue(payment: Payment): boolean {
  if (payment.status === 'PAID' || payment.status === 'CANCELLED') {
    return false;
  }
  return new Date() > payment.dueDate;
}

/**
 * Get the display status of a payment with overdue consideration
 */
export function getPaymentDisplayStatus(payment: Payment): PaymentStatus | 'OVERDUE' {
  if (payment.status === 'PENDING' && isPaymentOverdue(payment)) {
    return 'OVERDUE';
  }
  return payment.status;
}

/**
 * Generate a receipt number
 */
export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `RCP-${year}-${timestamp}`;
}

/**
 * Calculate the total amount from a list of payments
 */
export function calculateTotalAmount(payments: Payment[]): number {
  return payments.reduce((total, payment) => {
    return total + (typeof payment.amount === 'number' ? payment.amount : payment.amount.toNumber());
  }, 0);
}

/**
 * Get payments due within a specific number of days
 */
export function getPaymentsDueWithin(payments: Payment[], days: number): Payment[] {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  
  return payments.filter(payment => 
    payment.status === 'PENDING' && 
    payment.dueDate <= targetDate
  );
}

/**
 * Group payments by month
 */
export function groupPaymentsByMonth(payments: Payment[]): Record<string, Payment[]> {
  return payments.reduce((groups, payment) => {
    const monthKey = payment.dueDate.toISOString().slice(0, 7); // YYYY-MM format
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(payment);
    return groups;
  }, {} as Record<string, Payment[]>);
}

/**
 * Filter payments based on criteria
 */
export function filterPayments(
  payments: PaymentWithBoarder[],
  filters: {
    status?: PaymentStatus;
    boarderId?: string;
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }
): PaymentWithBoarder[] {
  return payments.filter((payment) => {
    // Status filter
    if (filters.status && payment.status !== filters.status) {
      return false;
    }

    // Boarder filter
    if (filters.boarderId && payment.boarderId !== filters.boarderId) {
      return false;
    }

    // Date range filter
    if (filters.startDate && payment.dueDate < filters.startDate) {
      return false;
    }
    if (filters.endDate && payment.dueDate > filters.endDate) {
      return false;
    }

    // Search filter (boarder name)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const boarderName = `${payment.boarder.firstName} ${payment.boarder.lastName}`.toLowerCase();
      if (!boarderName.includes(searchLower)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort payments by due date
 */
export function sortPaymentsByDueDate(payments: Payment[], ascending = false): Payment[] {
  return [...payments].sort((a, b) => {
    const comparison = a.dueDate.getTime() - b.dueDate.getTime();
    return ascending ? comparison : -comparison;
  });
}