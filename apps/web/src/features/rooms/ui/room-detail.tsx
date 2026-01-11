"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Users } from "lucide-react";
import { api } from "@/trpc/react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { formatCurrency } from "@/shared/lib/utils";
import { RoomStatusBadge } from "@/entities/room";
import { EditRoomDialog } from "./edit-room-dialog";
import { DeleteRoomDialog } from "./delete-room-dialog";

interface RoomDetailProps {
  roomId: string;
}

export function RoomDetail({ roomId }: RoomDetailProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: room, isLoading } = api.room.getById.useQuery({ id: roomId });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground">Room not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/landlord/rooms">
              <ArrowLeft className="h-4 w-4" />
            </Link>
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Rate</span>
              <span className="font-bold text-lg">
                {formatCurrency(Number(room.monthlyRate))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity</span>
              <span>{room.capacity} person(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Floor</span>
              <span>{room.floor}</span>
            </div>
            {room.description && (
              <div>
                <span className="text-muted-foreground">Description</span>
                <p className="mt-1">{room.description}</p>
              </div>
            )}
            {room.amenities.length > 0 && (
              <div>
                <span className="text-muted-foreground">Amenities</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Boarders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {room.boarders && room.boarders.length > 0 ? (
              <div className="space-y-3">
                {room.boarders.map((boarder) => (
                  <div
                    key={boarder.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {boarder.firstName} {boarder.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {boarder.email}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/landlord/boarders/${boarder.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No boarders assigned</p>
            )}
          </CardContent>
        </Card>
      </div>

      <EditRoomDialog room={room} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteRoomDialog room={room} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
