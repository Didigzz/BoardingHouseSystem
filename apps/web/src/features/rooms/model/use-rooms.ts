import { api } from "@/trpc/react";
import { useRoomStore } from "./room-store";

export function useRooms() {
  const { filters } = useRoomStore();

  const query = api.room.getAll.useQuery({
    status: filters.status === "ALL" ? undefined : filters.status,
    search: filters.search || undefined,
  });

  return query;
}

export function useRoom(id: string) {
  return api.room.getById.useQuery({ id });
}

export function useRoomStats() {
  return api.room.getStats.useQuery();
}
