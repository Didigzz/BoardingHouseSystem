"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ArrowLeft, Edit, Trash2, Users, Zap } from "lucide-react";
import { RoomStatusBadge } from "@/entities/room";
import { BoarderCard } from "@/entities/boarder";
import { formatCurrency } from "@/shared/lib/utils";
import { EditRoomDialog } from "./edit-room-dialog";
import { DeleteRoomDialog } from "./delete-room-dialog";
import type { Room, Boarder, UtilityReading } from "@prisma/client";

interface RoomWithRelations extends Room {
  boarders: Boarder[];
  utilityReadings: UtilityReading[];
}

interface RoomDetailViewProps {
  room: RoomWithRelations;
}

export function RoomDetailView({ room }: RoomDetailViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Room {room.roomNumber}</h1>
            <p className="text-muted-foreground">Floor {room.floor}</p>
          </div>
          <RoomStatusBadge status={room.status} />
        </div>
        <div className="flex gap-2">
          <EditRoomDialog room={room} />
          <DeleteRoomDialog roomId={room.id} roomNumber={room.roomNumber} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(room.monthlyRate)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {room.boarders.length} / {room.capacity}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {room.amenities.length > 0 ? (
                room.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">{amenity}</Badge>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">None</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {room.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{room.description}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="boarders">
        <TabsList>
          <TabsTrigger value="boarders">
            <Users className="mr-2 h-4 w-4" />
            Boarders ({room.boarders.length})
          </TabsTrigger>
          <TabsTrigger value="utilities">
            <Zap className="mr-2 h-4 w-4" />
            Utilities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="boarders" className="mt-4">
          {room.boarders.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {room.boarders.map((boarder) => (
                <BoarderCard
                  key={boarder.id}
                  boarder={{ ...boarder, room: { id: room.id, roomNumber: room.roomNumber, monthlyRate: room.monthlyRate } }}
                  onClick={() => router.push(`/landlord/boarders/${boarder.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No boarders assigned to this room</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="utilities" className="mt-4">
          {room.utilityReadings.length > 0 ? (
            <div className="space-y-2">
              {room.utilityReadings.map((reading) => (
                <Card key={reading.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">{reading.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reading.readingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {Number(reading.currentReading) - Number(reading.previousReading)} units
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency((Number(reading.currentReading) - Number(reading.previousReading)) * Number(reading.ratePerUnit))}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No utility readings recorded</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
