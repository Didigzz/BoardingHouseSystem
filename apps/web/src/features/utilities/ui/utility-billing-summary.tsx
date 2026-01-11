"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/utils";
import { Zap, Droplets, Wifi } from "lucide-react";

export function UtilityBillingSummary() {
  const { data: readings, isLoading } = api.utility.getAll.useQuery();

  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  const summary = {
    ELECTRICITY: { icon: Zap, total: 0, color: "text-yellow-500" },
    WATER: { icon: Droplets, total: 0, color: "text-blue-500" },
    INTERNET: { icon: Wifi, total: 0, color: "text-purple-500" },
  };

  readings?.forEach((reading) => {
    const consumption = Number(reading.currentReading) - Number(reading.previousReading);
    const cost = consumption * Number(reading.ratePerUnit);
    if (reading.type in summary) {
      summary[reading.type as keyof typeof summary].total += cost;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(summary).map(([type, data]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <data.icon className={`h-5 w-5 ${data.color}`} />
                <span>{type}</span>
              </div>
              <span className="font-semibold">{formatCurrency(data.total)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
