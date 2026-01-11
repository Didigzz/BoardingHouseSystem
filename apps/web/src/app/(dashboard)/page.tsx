import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string })?.role;

  if (userRole === "BOARDER") {
    redirect("/boarder");
  }

  redirect("/landlord");
}
