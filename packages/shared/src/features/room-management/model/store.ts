// Room management store
import { create } from "zustand";

interface RoomManagementStore {
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
}

export const useRoomManagementStore = create<RoomManagementStore>((set) => ({
  selectedRoomId: null,
  setSelectedRoomId: (id) => set({ selectedRoomId: id }),
}));
