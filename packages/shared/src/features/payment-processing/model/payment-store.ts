import { create } from "zustand";

type PaymentStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";
type PaymentType = "RENT" | "UTILITY" | "DEPOSIT" | "OTHER";

interface PaymentFilters {
  status: PaymentStatus | "ALL";
  type: PaymentType | "ALL";
  boarderId: string | null;
}

interface PaymentStore {
  filters: PaymentFilters;
  setFilters: (filters: Partial<PaymentFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: PaymentFilters = {
  status: "ALL",
  type: "ALL",
  boarderId: null,
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
