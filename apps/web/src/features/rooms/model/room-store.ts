import { create } from "zustand";
import type { RoomStatus } from "@prisma/client";

interface RoomFilters {
  status: RoomStatus | "ALL";
  search: string;
}

interface RoomStore {
  filters: RoomFilters;
  selectedRoomId: string | null;
  setFilters: (filters: Partial<RoomFilters>) => void;
  setSelectedRoomId: (id: string | null) => void;
  resetFilters: () => void;
}

const defaultFilters: RoomFilters = {
  status: "ALL",
  search: "",
};

export const useRoomStore = create<RoomStore>((set) => ({
  filters: defaultFilters,
  selectedRoomId: null,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSelectedRoomId: (id) => set({ selectedRoomId: id }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
