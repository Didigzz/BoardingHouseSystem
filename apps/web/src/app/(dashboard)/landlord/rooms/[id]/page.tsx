"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Badge } from "@/shared/ui/badge";
import { RoomStatusBadge } from "@/entities/room";
import { BoarderCard } from "@/entities/boarder";
import { ArrowLeft, Edit, Trash2, Users, DoorOpen, Banknote } from "lucide-react";
import { formatCurrency, formatDate } from "@/shared/lib/utils";
import { useState } from "react";
import { EditRoomDialog, DeleteRoomDialog } from "@/features/rooms";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: room, isLoading } = api.room.getById.useQuery({ id: roomId });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Room not found</p>
        <Button variant="link" onClick={() => router.push("/landlord/rooms")}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/landlord/rooms")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Room {room.roomNumber}</h1>
            <p className="text-muted-foreground">Floor {room.floor}</p>
          </div>
          <RoomStatusBadge status={room.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rate</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(Number(room.monthlyRate))}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {room.boarders?.length ?? 0} / {room.capacity}
            </div>
            <p className="text-xs text-muted-foreground">Current occupants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Floor</CardTitle>
            <DoorOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{room.floor}</div>
          </CardContent>
        </Card>
      </div>

      {room.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{room.description}</p>
          </CardContent>
        </Card>
      )}

      {room.amenities && room.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Boarders</CardTitle>
        </CardHeader>
        <CardContent>
          {room.boarders && room.boarders.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {room.boarders.map((boarder) => (
                <BoarderCard
                  key={boarder.id}
                  boarder={boarder}
                  onClick={() => router.push(`/landlord/boarders/${boarder.id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No boarders assigned to this room</p>
          )}
        </CardContent>
      </Card>

      {room.utilityReadings && room.utilityReadings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Utility Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {room.utilityReadings.map((reading) => (
                <div key={reading.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <span className="font-medium">{reading.type}</span>
                    <span className="text-muted-foreground ml-2">
                      {Number(reading.currentReading) - Number(reading.previousReading)} units
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(reading.readingDate)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <EditRoomDialog room={room} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteRoomDialog room={room} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
