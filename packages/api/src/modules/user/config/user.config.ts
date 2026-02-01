export interface UserConfig {
  minPasswordLength: number;
  maxPasswordLength: number;
  allowedRoles: readonly string[];
  sessionTimeoutMinutes: number;
}

export const userConfig: UserConfig = {
  minPasswordLength: 6,
  maxPasswordLength: 128,
  allowedRoles: ['LANDLORD', 'BOARDER'] as const,
  sessionTimeoutMinutes: 60 * 24 * 7, // 7 days
};

export function validatePassword(password: string): void {
  if (password.length < userConfig.minPasswordLength) {
    throw new Error(`Password must be at least ${userConfig.minPasswordLength} characters`);
  }
  if (password.length > userConfig.maxPasswordLength) {
    throw new Error(`Password must not exceed ${userConfig.maxPasswordLength} characters`);
  }
}