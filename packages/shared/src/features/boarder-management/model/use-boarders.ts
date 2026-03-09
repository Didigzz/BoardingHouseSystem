// Placeholder for tRPC hooks - to be implemented when API is connected
// import { api } from "@/trpc/react";
// import { useBoarderStore } from "./boarder-store";

// export function useBoarders() {
//   const { filters } = useBoarderStore();
//   return api.boarder.getAll.useQuery({
//     isActive: filters.status === "ALL" ? undefined : filters.status === "ACTIVE",
//     search: filters.search || undefined,
//     roomId: filters.roomId ?? undefined,
//   });
// }

// export function useBoarder(id: string) {
//   return api.boarder.getById.useQuery({ id });
// }

// export function useBoarderStats() {
//   return api.boarder.getStats.useQuery();
// }

// Mock implementation for development
export function useBoarders() {
  return { data: [], isLoading: false, isError: false, error: null };
}

export function useBoarder(_id: string) {
  return { data: null, isLoading: false, isError: false, error: null };
}

export function useBoarderStats() {
  return { data: { total: 0, active: 0, inactive: 0 }, isLoading: false, isError: false, error: null };
}
