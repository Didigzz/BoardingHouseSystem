"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default function BoarderPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Payments</h1>
        <p className="text-muted-foreground">
          View your payment history and upcoming dues
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your payment records will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
