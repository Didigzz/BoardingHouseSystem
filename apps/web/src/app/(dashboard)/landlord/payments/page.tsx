"use client";

import { PaymentList, AddPaymentDialog } from "./features/payments";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track and manage payments</p>
        </div>
        <AddPaymentDialog />
      </div>

      <PaymentList />
    </div>
  );
}

