import Link from "next/link";
import { Button } from "@bhms/ui/button";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <ShieldX className="h-12 w-12 text-destructive" />
      <h2 className="text-2xl font-bold">Unauthorized Access</h2>
      <p className="text-muted-foreground text-center max-w-md">
        You do not have permission to access this page.
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}

