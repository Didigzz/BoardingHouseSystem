"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { api } from "@/trpc/react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Progress } from "@/shared/ui/progress";
import { DoorOpen, Users } from "lucide-react";

export function OccupancyOverview() {
  const { data: roomStats, isLoading: roomsLoading } = api.room.getStats.useQuery();
  const { data: boarderStats, isLoading: boardersLoading } = api.boarder.getStats.useQuery();

  if (roomsLoading || boardersLoading) {
    return <Skeleton className="h-48" />;
  }

  const occupancyRate = roomStats
    ? Math.round((roomStats.occupied / roomStats.total) * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DoorOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Room Occupancy</span>
            </div>
            <span className="text-sm font-medium">{occupancyRate}%</span>
          </div>
          <Progress value={occupancyRate} />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{roomStats?.occupied ?? 0} occupied</span>
            <span>{roomStats?.available ?? 0} available</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{boarderStats?.active ?? 0}</p>
            <p className="text-xs text-muted-foreground">Active Boarders</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <DoorOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{roomStats?.total ?? 0}</p>
            <p className="text-xs text-muted-foreground">Total Rooms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
