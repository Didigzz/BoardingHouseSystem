"use client";

import { useParams, useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Skeleton } from "@bhms/ui/skeleton";
import { Badge } from "@bhms/ui/badge";
import { ArrowLeft, Edit, Trash2, Users, DoorOpen, Banknote } from "lucide-react";
import { useState } from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function RoomDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  interface MockRoom {
    id: string;
    roomNumber: string;
    floor: number;
    status: "AVAILABLE" | "OCCUPIED";
    monthlyRate: number;
    capacity: number;
    description?: string;
    amenities?: string[];
    boarders?: Array<{id: string, firstName: string, lastName: string, email: string}>;
    utilityReadings?: Array<{id: string, type: string, currentReading: number, previousReading: number, readingDate: Date}>;
  }

  // TODO: Replace with actual oRPC query once types are fixed
  const room: MockRoom = {
    id: "1",
    roomNumber: "101",
    floor: 1,
    status: "OCCUPIED",
    monthlyRate: 4000,
    capacity: 2,
    description: "Standard room with basic amenities",
    amenities: ["WiFi", "Air Conditioning", "Furnished"],
    boarders: [
      { id: "1", firstName: "Juan", lastName: "Dela Cruz", email: "juan@example.com" }
    ],
    utilityReadings: [
      { id: "1", type: "Electricity", currentReading: 1200, previousReading: 1100, readingDate: new Date() }
    ]
  }; // Mock data
  const isLoading = false;

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
          <Badge variant={room.status === "AVAILABLE" ? "default" : "secondary"}>
            {room.status}
          </Badge>
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
              {room.amenities.map((amenity: string) => (
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
                <div
                  key={boarder.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => router.push(`/landlord/boarders/${boarder.id}`)}
                >
                  <p className="font-semibold">{boarder.firstName} {boarder.lastName}</p>
                  <p className="text-sm text-muted-foreground">{boarder.email}</p>
                </div>
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
    </div>
  );
}