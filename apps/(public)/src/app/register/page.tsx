import { Suspense } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Home className="text-primary-foreground h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">BoardingHouse</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">
            Join BoardingHouse to find your perfect accommodation
          </p>
        </div>

        <Suspense
          fallback={<div className="bg-muted h-96 animate-pulse rounded-xl" />}
        >
          <RegisterForm />
        </Suspense>

        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
