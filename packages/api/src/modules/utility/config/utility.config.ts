export interface UtilityConfig {
  allowedTypes: readonly string[];
  minReadingValue: number;
  maxReadingValue: number;
  defaultRatePerUnit: number;
}

export const utilityConfig: UtilityConfig = {
  allowedTypes: ['ELECTRICITY', 'WATER', 'INTERNET', 'OTHER'] as const,
  minReadingValue: 0,
  maxReadingValue: 999999,
  defaultRatePerUnit: 10,
};

export function validateReading(previous: number, current: number): void {
  if (current < previous) {
    throw new Error('Current reading cannot be less than previous reading');
  }
}