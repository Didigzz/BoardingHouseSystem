import type { 
  Room as PrismaRoom, 
  Boarder as PrismaBoarder, 
  Payment as PrismaPayment,
  UtilityReading as PrismaUtilityReading,
  RoomStatus,
  PaymentStatus,
  PaymentType,
  UtilityType,
} from "@prisma/client";

export type { RoomStatus, PaymentStatus, PaymentType, UtilityType };

export type Room = PrismaRoom & {
  boarders?: Boarder[];
  _count?: { boarders: number };
};

export type Boarder = PrismaBoarder & {
  room?: Room | null;
  payments?: Payment[];
};

export type Payment = PrismaPayment & {
  boarder?: Boarder;
};

export type UtilityReading = PrismaUtilityReading & {
  room?: Room;
};

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalBoarders: number;
  activeBoarders: number;
  pendingPayments: number;
  monthlyRevenue: number;
}

export type { SessionUser } from "@/entities/user/model/types";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type { AppRouter } from "@/server/api/root";
