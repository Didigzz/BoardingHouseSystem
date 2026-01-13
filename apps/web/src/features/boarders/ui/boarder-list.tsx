"use client";

import { api } from "./lib/trpc-react";
import { BoarderCard } from "@bhms/shared/entities/boarder";
import { Skeleton } from "@bhms/ui/skeleton";
import { useRouter } from "next/navigation";

export function BoarderList() {
  const router = useRouter();
  const { data: boarders, isLoading } = api.boarder.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (!boarders?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No boarders found. Add your first boarder to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {boarders.map((boarder) => (
        <BoarderCard
          key={boarder.id}
          boarder={boarder}
          onClick={() => router.push(`/landlord/boarders/${boarder.id}`)}
        />
      ))}
    </div>
  );
}

