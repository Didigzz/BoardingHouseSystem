"use client";

import { orpc } from "@/lib/orpc-client";
import { RoomCard } from "@bhms/shared/entities/room";
import { Skeleton } from "@bhms/ui/skeleton";
import { useRouter } from "next/navigation";

export function RoomList() {
  const router = useRouter();
  const { data: rooms, isLoading } = orpc.room.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  if (!rooms?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No rooms found. Add your first room to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

