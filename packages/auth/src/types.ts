import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

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

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    status: UserStatus;
  }
}
