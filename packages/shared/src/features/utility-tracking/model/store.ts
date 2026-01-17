// Utility tracking store
import { create } from "zustand";

interface UtilityTrackingStore {
  selectedUtilityId: string | null;
  setSelectedUtilityId: (id: string | null) => void;
}

export const useUtilityTrackingStore = create<UtilityTrackingStore>((set) => ({
  selectedUtilityId: null,
  setSelectedUtilityId: (id) => set({ selectedUtilityId: id }),
}));
