export interface RoomConfig {
  maxCapacity: number;
  minMonthlyRate: number;
  defaultFloor: number;
  allowedStatuses: readonly string[];
}

export const roomConfig: RoomConfig = {
  maxCapacity: 10,
  minMonthlyRate: 1000,
  defaultFloor: 1,
  allowedStatuses: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'] as const,
};

export function validateRoomConfig(config: RoomConfig): void {
  if (config.maxCapacity <= 0) {
    throw new Error('Max capacity must be positive');
  }
  if (config.minMonthlyRate <= 0) {
    throw new Error('Min monthly rate must be positive');
  }
  if (config.defaultFloor <= 0) {
    throw new Error('Default floor must be positive');
  }
}