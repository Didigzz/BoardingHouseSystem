import { api } from "@/trpc/react";
import type { UtilityType } from "@prisma/client";

export function useUtilities(filters?: {
  type?: UtilityType;
  roomId?: string;
}) {
  return api.utility.getAll.useQuery({
    type: filters?.type,
    roomId: filters?.roomId,
  });
}

export function useUtilityConsumption(params?: {
  roomId?: string;
  type?: UtilityType;
  months?: number;
}) {
  return api.utility.getConsumptionSummary.useQuery({
    roomId: params?.roomId,
    type: params?.type,
    months: params?.months ?? 6,
  });
}

export function useLatestReading(roomId: string, type: UtilityType) {
  return api.utility.getLatestByRoom.useQuery({ roomId, type });
}
