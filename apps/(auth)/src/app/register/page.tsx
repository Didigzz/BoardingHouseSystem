import { RegisterForm } from "@/components/register-form";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Building2 className="h-8 w-8" />
          <span className="text-2xl font-bold">BHMS</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground">
            Join BHMS today
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Create an account to start managing your boarding house or find the
            perfect place to stay.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground/60" />
              <p className="text-primary-foreground/80">
                Landlords: List and manage your properties
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground/60" />
              <p className="text-primary-foreground/80">
                Boarders: Browse and book accommodations
              </p>
            </div>
          </div>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          © 2024 Boarding House Management System. All rights reserved.
        </p>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">BHMS</span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Create account</h2>
            <p className="text-muted-foreground">
              Fill in your details to get started
            </p>
          </div>

          <RegisterForm />

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
