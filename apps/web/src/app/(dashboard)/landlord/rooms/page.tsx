"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Skeleton } from "@bhms/ui/skeleton";
import { Badge } from "@bhms/ui/badge";
import { Plus, DoorOpen, Users } from "lucide-react";

export default function RoomsPage(): JSX.Element {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "ALL">("ALL");

  // TODO: Replace with actual oRPC query once types are fixed
  const rooms: Array<{
    id: string;
    roomNumber: string;
    status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
    monthlyRate: number;
    capacity: number;
    floor: number;
    _count?: { boarders: number };
  }> = []; // Mock data
  const isLoading = false;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const handleRoomClick = (roomId: string) => {
    router.push(`/landlord/rooms/${roomId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">
            Manage your boarding house rooms
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <Card
                key={room.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleRoomClick(room.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <DoorOpen className="h-5 w-5" />
                      Room {room.roomNumber}
                    </CardTitle>
                    <Badge variant={room.status === "AVAILABLE" ? "default" : "secondary"}>
                      {room.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Rate</span>
                      <span className="font-semibold">{formatCurrency(Number(room.monthlyRate))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {room._count?.boarders ?? 0} / {room.capacity}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Floor</span>
                      <span>{room.floor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No rooms found</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}