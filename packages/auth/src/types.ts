import { DefaultSession } from "next-auth";

export type UserRole = "LANDLORD" | "BOARDER" | "ADMIN";
export type UserStatus = "PENDING" | "APPROVED" | "SUSPENDED";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: UserStatus;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    status: UserStatus;
  }
}
