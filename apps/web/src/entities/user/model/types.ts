import type { User as PrismaUser, UserRole } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type { UserRole };

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}
