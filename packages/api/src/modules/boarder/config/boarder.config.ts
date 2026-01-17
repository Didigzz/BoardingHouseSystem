export interface BoarderConfig {
  maxInactiveDays: number;
  accessCodeLength: number;
  allowedRoles: readonly string[];
}

export const boarderConfig: BoarderConfig = {
  maxInactiveDays: 90,
  accessCodeLength: 6,
  allowedRoles: ['LANDLORD', 'BOARDER'] as const,
};

export function generateAccessCode(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}${Date.now().toString(36)}`.toUpperCase();
}