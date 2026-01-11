import type { Room as PrismaRoom, RoomStatus } from "@prisma/client";

export type Room = PrismaRoom & {
  boarders?: { id: string; firstName: string; lastName: string }[];
  _count?: { boarders: number };
};

export type RoomWithDetails = Room & {
  utilityReadings?: {
    id: string;
    type: string;
    currentReading: number;
    readingDate: Date;
  }[];
};

export { RoomStatus };

export interface RoomFilters {
  status?: RoomStatus;
  search?: string;
  floor?: number;
}
