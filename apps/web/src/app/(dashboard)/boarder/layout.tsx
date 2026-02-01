import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function BoarderLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "BOARDER" && session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
