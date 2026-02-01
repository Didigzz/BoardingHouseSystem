// User entity types

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  landlordId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  LANDLORD = "LANDLORD",
  BOARDER = "BOARDER",
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
}
