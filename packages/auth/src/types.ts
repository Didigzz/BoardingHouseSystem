import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
