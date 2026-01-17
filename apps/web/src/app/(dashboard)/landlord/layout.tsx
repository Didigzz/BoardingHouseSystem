import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user?.role !== "LANDLORD" && session.user?.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
