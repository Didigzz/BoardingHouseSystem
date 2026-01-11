"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/utils";
import { CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function PaymentSummaryCard() {
  const { data: stats, isLoading } = api.payment.getStats.useQuery();

  if (isLoading) {
    return <Skeleton className="h-32" />;
  }

  if (!stats) return null;

  const items = [
    {
      label: "Pending",
      value: formatCurrency(stats.pending.amount),
      count: stats.pending.count,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Paid",
      value: formatCurrency(stats.paid.amount),
      count: stats.paid.count,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Overdue",
      value: formatCurrency(stats.overdue.amount),
      count: stats.overdue.count,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">
                {item.count} {item.label}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
