import { create } from "zustand";

interface BoarderFilters {
  status: "ALL" | "ACTIVE" | "INACTIVE";
  search: string;
  roomId: string | null;
}

interface BoarderStore {
  filters: BoarderFilters;
  selectedBoarderId: string | null;
  setFilters: (filters: Partial<BoarderFilters>) => void;
  setSelectedBoarderId: (id: string | null) => void;
  resetFilters: () => void;
}

const defaultFilters: BoarderFilters = {
  status: "ALL",
  search: "",
  roomId: null,
};

export const useBoarderStore = create<BoarderStore>((set) => ({
  filters: defaultFilters,
  selectedBoarderId: null,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSelectedBoarderId: (id) => set({ selectedBoarderId: id }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
