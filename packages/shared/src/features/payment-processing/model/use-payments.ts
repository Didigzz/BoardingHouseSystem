// This file uses web-specific imports and should only be used in web context
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

// Placeholder exports to prevent type errors
export const usePayments = () => null;
export const usePaymentStats = () => null;
export const useMonthlyRevenue = () => null;
