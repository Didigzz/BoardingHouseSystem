import type { UtilityReading as PrismaUtilityReading, UtilityType } from "@prisma/client";

export type UtilityReading = PrismaUtilityReading & {
  room?: { id: string; roomNumber: string };
};

export type UtilityConsumption = {
  id: string;
  room: string;
  type: UtilityType;
  consumption: number;
  cost: number;
  date: Date;
};

export { UtilityType };

export interface UtilityFilters {
  roomId?: string;
  type?: UtilityType;
}
