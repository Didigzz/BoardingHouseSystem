import { auth } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function BoarderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Optional: Check if user is a boarder
  // if (session.user.role !== "BOARDER") {
  //   redirect("/landlord");
  // }

  return <>{children}</>;
}

