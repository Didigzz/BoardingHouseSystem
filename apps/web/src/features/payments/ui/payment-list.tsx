"use client";

import { api } from "@/lib/orpc-client";
import { PaymentCard } from "@bhms/shared";
import { Skeleton } from "@bhms/ui/skeleton";

export function PaymentList() {
  const { data: payments, isLoading } = orpc.payment.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No payments found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

