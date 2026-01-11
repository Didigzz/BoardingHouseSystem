import { api } from "@/trpc/react";

export function useDashboardStats() {
  return api.dashboard.getStats.useQuery();
}

export function useRecentActivity() {
  return api.dashboard.getRecentActivity.useQuery();
}

export function useUpcomingPayments() {
  return api.dashboard.getUpcomingPayments.useQuery();
}
