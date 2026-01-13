import type { Room as PrismaRoom, RoomStatus, Boarder, UtilityReading } from "@bhms/database";

export type Room = PrismaRoom;

export type RoomWithBoarders = Room & {
  boarders: { id: string; firstName: string; lastName: string }[];
  _count: { boarders: number };
};

export type RoomWithDetails = Room & {
  boarders: Boarder[];
  utilityReadings: UtilityReading[];
};

export { RoomStatus };

export interface RoomFilters {
  status?: RoomStatus;
  search?: string;
  floor?: number;
}

export interface RoomStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
}