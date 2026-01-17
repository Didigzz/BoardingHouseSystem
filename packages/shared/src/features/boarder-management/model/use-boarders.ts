// This file uses web-specific imports and should only be used in web context
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

// Placeholder exports to prevent type errors
export const useBoarders = () => null;
export const useBoarder = () => null;
export const useBoarderStats = () => null;
