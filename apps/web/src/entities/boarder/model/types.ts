import type { Boarder as PrismaBoarder } from "@prisma/client";

export type Boarder = PrismaBoarder & {
  room?: { id: string; roomNumber: string; monthlyRate: number } | null;
  _count?: { payments: number };
};

export type BoarderWithDetails = Boarder & {
  payments?: {
    id: string;
    amount: number;
    status: string;
    dueDate: Date;
  }[];
};

export interface Boarder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  moveInDate: Date;
  moveOutDate: Date | null;
  isActive: boolean;
  accessCode: string | null;
  roomId: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoarderWithRoom extends Boarder {
  room: {
    id: string;
    roomNumber: string;
    monthlyRate: number | string;
  } | null;
}

export interface BoarderFilters {
  isActive?: boolean;
  roomId?: string;
  search?: string;
}
