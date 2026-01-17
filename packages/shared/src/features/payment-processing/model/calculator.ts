/**
 * Payment calculation utilities
 */

export interface PaymentCalculation {
  baseAmount: number;
  utilities: number;
  additionalFees: number;
  discounts: number;
  total: number;
}

/**
 * Calculate total payment amount
 */
export function calculateTotalPayment(
  roomRate: number,
  utilities: number = 0,
  additionalFees: number = 0,
  discounts: number = 0
): PaymentCalculation {
  const baseAmount = roomRate;
  const total = baseAmount + utilities + additionalFees - discounts;

  return {
    baseAmount,
    utilities,
    additionalFees,
    discounts,
    total: Math.max(0, total), // Ensure total is never negative
  };
}

/**
 * Calculate utility bill based on consumption
 */
export function calculateUtilityBill(
  previousReading: number,
  currentReading: number,
  ratePerUnit: number
): number {
  const consumption = Math.max(0, currentReading - previousReading);
  return consumption * ratePerUnit;
}

/**
 * Calculate late payment fee
 */
export function calculateLateFee(
  originalAmount: number,
  daysOverdue: number,
  lateFeeRate: number = 0.05 // 5% default
): number {
  if (daysOverdue <= 0) return 0;
  
  // Simple flat rate for now, could be made more sophisticated
  return originalAmount * lateFeeRate;
}

/**
 * Calculate payment due date
 */
export function calculateDueDate(
  baseDate: Date = new Date(),
  daysFromBase: number = 30
): Date {
  const dueDate = new Date(baseDate);
  dueDate.setDate(dueDate.getDate() + daysFromBase);
  return dueDate;
}

/**
 * Calculate days overdue
 */
export function calculateDaysOverdue(dueDate: Date): number {
  const today = new Date();
  const diffTime = today.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Apply discount to payment amount
 */
export function applyDiscount(
  amount: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number
): number {
  if (discountType === 'percentage') {
    const discountAmount = (amount * discountValue) / 100;
    return Math.max(0, amount - discountAmount);
  } else {
    return Math.max(0, amount - discountValue);
  }
}

/**
 * Calculate monthly recurring payment
 */
export function calculateMonthlyPayment(
  roomRate: number,
  utilityEstimate: number = 0,
  additionalFees: number = 0
): number {
  return roomRate + utilityEstimate + additionalFees;
}