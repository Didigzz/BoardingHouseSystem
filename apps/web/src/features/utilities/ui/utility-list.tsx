"use client";

import { api } from "@/trpc/react";
import { UtilityCard } from "@/entities/utility";
import { Skeleton } from "@/shared/ui/skeleton";

export function UtilityList() {
  const { data: readings, isLoading } = api.utility.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  if (!readings?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No utility readings found. Add your first reading to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {readings.map((reading) => (
        <UtilityCard key={reading.id} reading={reading} />
      ))}
    </div>
  );
}
