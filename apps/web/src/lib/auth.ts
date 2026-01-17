import NextAuth from "next-auth";
import { authConfig } from "@bhms/auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
