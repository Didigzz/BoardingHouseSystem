import { LoginForm } from "@/components/auth/login-form";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="bg-primary hidden flex-col justify-between p-12 lg:flex lg:w-1/2">
        <div className="text-primary-foreground flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          <span className="text-2xl font-bold">Haven Space</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-primary-foreground text-4xl font-bold">
            Welcome back
          </h1>
          <p className="text-primary-foreground/80 max-w-md text-lg">
            Sign in to manage your boarding house, view bookings, and connect
            with tenants all in one place.
          </p>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          © 2024 Haven Space. All rights reserved.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <Building2 className="text-primary h-8 w-8" />
            <span className="text-primary text-2xl font-bold">Haven Space</span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <LoginForm />

          <div className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
