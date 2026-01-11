import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireRole(role: "LANDLORD" | "BOARDER") {
  const session = await requireAuth();
  if (session.user.role !== role) {
    redirect("/unauthorized");
  }
  return session;
}

export function isLandlord(session: { user: { role: string } } | null) {
  return session?.user?.role === "LANDLORD";
}

export function isBoarder(session: { user: { role: string } } | null) {
  return session?.user?.role === "BOARDER";
}
