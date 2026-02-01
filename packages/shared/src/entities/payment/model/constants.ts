// Payment entity constants

export const PAYMENT_STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  OVERDUE: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-800",
} as const;

export const DEFAULT_GRACE_PERIOD_DAYS = 3;
