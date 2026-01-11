import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-primary">BHMS</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-md">
            Boarding House Management System - Efficiently manage rooms, boarders, and payments
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const userRole = (session.user as { role?: string })?.role;

  if (userRole === "BOARDER") {
    redirect("/boarder");
  }

  redirect("/landlord");
}
