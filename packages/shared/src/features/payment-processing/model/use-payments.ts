// Placeholder for tRPC hooks - to be implemented when API is connected
// import { api } from "@/trpc/react";
// import { usePaymentStore } from "./payment-store";

// export function usePayments() {
//   const { filters } = usePaymentStore();
//   return api.payment.getAll.useQuery({
//     status: filters.status === "ALL" ? undefined : filters.status,
//     type: filters.type === "ALL" ? undefined : filters.type,
//     boarderId: filters.boarderId ?? undefined,
//   });
// }

// export function usePaymentStats() {
//   return api.payment.getStats.useQuery();
// }

// export function useMonthlyRevenue(year?: number) {
//   return api.payment.getMonthlyRevenue.useQuery({ year });
// }

// Mock implementation for development
export function usePayments() {
  return { data: [], isLoading: false, isError: false, error: null };
}

export function usePaymentStats() {
  return {
    data: {
      pending: { count: 0, amount: 0 },
      paid: { count: 0, amount: 0 },
      overdue: { count: 0, amount: 0 },
    },
    isLoading: false,
    isError: false,
    error: null,
  };
}

export function useMonthlyRevenue(_year?: number) {
  return { data: [], isLoading: false, isError: false, error: null };
}
