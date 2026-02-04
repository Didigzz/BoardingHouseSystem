"use client";

import { signOut } from "next-auth/react";
import { Button } from "@bhms/ui";
import { ShieldX, LogOut, Mail } from "lucide-react";

export default function AccountSuspendedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldX className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-red-900">
            Account Suspended
          </h1>
          <p className="text-muted-foreground">
            Your account has been suspended. This may be due to a violation of
            our terms of service or other policy concerns.
          </p>
        </div>

        <div className="bg-card border border-red-200 rounded-lg p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            If you believe this is a mistake or would like to appeal this
            decision, please contact our support team with your account details.
          </p>
          <Button className="w-full" asChild>
            <a href="mailto:support@bhms.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>

        <p className="text-xs text-muted-foreground">
          Need help? Email us at{" "}
          <a href="mailto:support@bhms.com" className="underline hover:text-foreground">
            support@bhms.com
          </a>
        </p>
      </div>
    </div>
  );
}
