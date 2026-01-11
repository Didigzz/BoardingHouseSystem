"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoomList, AddRoomDialog } from "@/features/rooms";
import { api } from "@/trpc/react";
import type { RoomStatus } from "@prisma/client";
import type { Room } from "@/entities/room";

export default function RoomsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RoomStatus | "ALL">("ALL");

  const { data: rooms, isLoading } = api.room.getAll.useQuery({
    search: search || undefined,
    status: status === "ALL" ? undefined : status,
  });

  const handleRoomClick = (room: Room) => {
    router.push(`/landlord/rooms/${room.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">
            Manage your boarding house rooms
          </p>
        </div>
        <AddRoomDialog />
      </div>

      <RoomList />
    </div>
  );
}
