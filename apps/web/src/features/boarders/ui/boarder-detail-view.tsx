"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui/card";
import { Button } from "@bhms/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bhms/ui/tabs";
import { ArrowLeft, Mail, Phone, Calendar, DoorOpen, CreditCard, User } from "lucide-react";
import { BoarderStatusBadge } from "@bhms/shared/entities/boarder";
import { PaymentStatusBadge } from "@bhms/shared/entities/payment";
import { formatCurrency, formatDate } from "@bhms/shared";
import { EditBoarderDialog } from "./edit-boarder-dialog";
import type { Boarder, Room, Payment } from "@bhms/database";

interface BoarderWithRelations extends Boarder {
  room: Room | null;
  payments: Payment[];
}

interface BoarderDetailViewProps {
  boarder: BoarderWithRelations;
}

export function BoarderDetailView({ boarder }: BoarderDetailViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {boarder.firstName} {boarder.lastName}
            </h1>
            <p className="text-muted-foreground">{boarder.email}</p>
          </div>
          <BoarderStatusBadge isActive={boarder.isActive} />
        </div>
        <EditBoarderDialog boarder={boarder} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Room</CardTitle>
            <DoorOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {boarder.room ? `Room ${boarder.room.roomNumber}` : "Unassigned"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Phone</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {boarder.phone || "Not provided"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Move-in Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {formatDate(boarder.moveInDate)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {boarder.room ? formatCurrency(Number(boarder.room.monthlyRate)) : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{boarder.email}</span>
            </div>
            {boarder.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{boarder.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {boarder.emergencyContact ? (
              <>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{boarder.emergencyContact}</span>
                </div>
                {boarder.emergencyPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{boarder.emergencyPhone}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">No emergency contact provided</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment History ({boarder.payments.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="payments" className="mt-4">
          {boarder.payments.length > 0 ? (
            <div className="space-y-2">
              {boarder.payments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">{payment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDate(payment.dueDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(Number(payment.amount))}</p>
                        {payment.paidDate && (
                          <p className="text-sm text-muted-foreground">
                            Paid: {formatDate(payment.paidDate)}
                          </p>
                        )}
                      </div>
                      <PaymentStatusBadge status={payment.status} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No payment records</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

