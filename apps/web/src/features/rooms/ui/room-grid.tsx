"use client";

import { orpc } from "@/lib/orpc-client";
import { RoomCard } from "@bhms/shared";
import { Skeleton } from "@bhms/ui/skeleton";
import { useRouter } from "next/navigation";
import type { RoomStatus } from "@bhms/database";

interface RoomGridProps {
  status?: RoomStatus;
  search?: string;
}

export function RoomGrid({ status, search }: RoomGridProps) {
  const router = useRouter();
  const { data: rooms, isLoading } = orpc.room.getAll.useQuery({
    status,
    search,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  if (!rooms?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No rooms found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onClick={() => router.push(`/landlord/rooms/${room.id}`)}
        />
      ))}
    </div>
  );
}

