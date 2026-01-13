// Boarder entity types

export interface Boarder {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomId?: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBoarderInput {
  name: string;
  email: string;
  phone: string;
  roomId?: string;
}

export interface UpdateBoarderInput {
  name?: string;
  email?: string;
  phone?: string;
  roomId?: string;
  status?: "ACTIVE" | "INACTIVE" | "PENDING";
}
