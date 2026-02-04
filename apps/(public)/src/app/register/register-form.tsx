"use client";

import { useSearchParams } from "next/navigation";
import { Button, Input, Label } from "@bhms/ui";
import { User, Mail, Lock, Building2 } from "lucide-react";
import { useState } from "react";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "boarder";
  const [role, setRole] = useState<"boarder" | "landlord">(
    defaultRole as "boarder" | "landlord"
  );

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      {/* Role Selection */}
      <div className="mb-6">
        <Label>I want to</Label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`rounded-lg border p-4 text-center transition-colors ${
              role === "boarder"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
            onClick={() => setRole("boarder")}
          >
            <User className="mx-auto h-6 w-6 mb-2" />
            <div className="font-medium">Find a Room</div>
            <div className="text-xs text-muted-foreground">
              I'm looking for accommodation
            </div>
          </button>
          <button
            type="button"
            className={`rounded-lg border p-4 text-center transition-colors ${
              role === "landlord"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
            onClick={() => setRole("landlord")}
          >
            <Building2 className="mx-auto h-6 w-6 mb-2" />
            <div className="font-medium">List Property</div>
            <div className="text-xs text-muted-foreground">
              I own a boarding house
            </div>
          </button>
        </div>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <Button type="submit" className="w-full">
          {role === "landlord" ? "Submit Application" : "Create Account"}
        </Button>
      </form>

      {role === "landlord" && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Landlord accounts require approval before you can list properties.
          You'll receive an email once your application is reviewed.
        </p>
      )}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button">
          Google
        </Button>
        <Button variant="outline" type="button">
          Facebook
        </Button>
      </div>
    </div>
  );
}
