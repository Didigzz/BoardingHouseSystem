import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userRole: "LANDLORD" | "BOARDER" | null;
  setAuthenticated: (value: boolean) => void;
  setUserRole: (role: "LANDLORD" | "BOARDER" | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setUserRole: (role) => set({ userRole: role }),
      reset: () => set({ isAuthenticated: false, userRole: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
