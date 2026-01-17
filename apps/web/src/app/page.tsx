import Link from "next/link";
import { Button } from "@bhms/ui";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

const HomePage = async function HomePage(): Promise<React.ReactElement> {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Auth error:", error);
    session = null;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-primary">BHMS</span>
          </h1>
          <p className="max-w-md text-center text-xl text-muted-foreground">
            Boarding House Management System - Efficiently manage rooms,
            boarders, and payments
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
};

export default HomePage;
