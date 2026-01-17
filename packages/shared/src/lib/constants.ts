/**
 * Shared constants across the application
 */

// Payment related constants
export const PAYMENT_STATUSES = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
} as const;

export const PAYMENT_TYPES = {
  RENT: 'RENT',
  UTILITY: 'UTILITY',
  DEPOSIT: 'DEPOSIT',
  OTHER: 'OTHER',
} as const;

// Room related constants
export const ROOM_STATUSES = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE: 'MAINTENANCE',
} as const;

// User roles
export const USER_ROLES = {
  LANDLORD: 'LANDLORD',
  BOARDER: 'BOARDER',
} as const;

// Utility types
export const UTILITY_TYPES = {
  ELECTRICITY: 'ELECTRICITY',
  WATER: 'WATER',
  INTERNET: 'INTERNET',
  OTHER: 'OTHER',
} as const;

// Default values
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
} as const;

export const DEFAULT_LATE_FEE_RATE = 0.05; // 5%
export const DEFAULT_PAYMENT_DUE_DAYS = 30;

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
} as const;

// Currency settings
export const CURRENCY = {
  CODE: 'PHP',
  SYMBOL: '₱',
  LOCALE: 'en-PH',
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_ROOM_CAPACITY: 10,
  MIN_ROOM_RATE: 1000,
  MAX_ROOM_RATE: 100000,
} as const;

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
} as const;

// Status colors (for UI consistency)
export const STATUS_COLORS = {
  PENDING: 'yellow',
  PAID: 'green',
  OVERDUE: 'red',
  CANCELLED: 'gray',
  AVAILABLE: 'green',
  OCCUPIED: 'blue',
  MAINTENANCE: 'orange',
  ACTIVE: 'green',
  INACTIVE: 'gray',
} as const;

// Common error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_LIMITS.MIN_PASSWORD_LENGTH} characters`,
  AMOUNT_POSITIVE: 'Amount must be positive',
  DATE_FUTURE: 'Date must be in the future',
  FILE_TOO_LARGE: `File size must be less than ${FILE_LIMITS.MAX_SIZE / 1024 / 1024}MB`,
  INVALID_FILE_TYPE: 'Invalid file type',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
} as const;