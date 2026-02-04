"use client";

import { signOut } from "next-auth/react";
import { Button } from "@bhms/ui";
import { Building2, Clock, LogOut, Mail } from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="h-10 w-10 text-amber-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Account Pending Approval
          </h1>
          <p className="text-muted-foreground">
            Thank you for registering as a landlord. Your account is currently
            being reviewed by our admin team.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Building2 className="h-5 w-5" />
            <span className="font-medium">What happens next?</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-3 text-left">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                1
              </span>
              <span>
                Our admin team will review your registration within 24-48 hours
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                2
              </span>
              <span>
                You&apos;ll receive an email notification once your account is approved
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                3
              </span>
              <span>
                After approval, you can start listing your properties
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="outline" className="w-full" asChild>
            <a href="mailto:support@bhms.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <a href="mailto:support@bhms.com" className="underline hover:text-foreground">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
