"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bhms/ui";

export function StatsCards(): JSX.Element {
  const stats = [
    { title: "Total Rooms", value: "24", description: "4 vacant" },
    { title: "Active Boarders", value: "20", description: "+2 this month" },
    { title: "Monthly Revenue", value: "₱48,000", description: "+12% from last month" },
    { title: "Pending Payments", value: "3", description: "Due this week" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function RecentActivity(): JSX.Element {
  const activities = [
    { id: 1, action: "New boarder registered", name: "Juan Dela Cruz", time: "2 hours ago" },
    { id: 2, action: "Payment received", name: "Maria Santos", time: "5 hours ago" },
    { id: 3, action: "Room 101 maintenance completed", name: "", time: "1 day ago" },
    { id: 4, action: "Utility bill added", name: "Electric - January", time: "2 days ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.action}</p>
                {activity.name && (
                  <p className="text-sm text-muted-foreground">{activity.name}</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function UpcomingPayments(): JSX.Element {
  const payments = [
    { id: 1, boarder: "Juan Dela Cruz", room: "101", amount: "₱3,500", dueDate: "Jan 20" },
    { id: 2, boarder: "Maria Santos", room: "102", amount: "₱4,000", dueDate: "Jan 22" },
    { id: 3, boarder: "Pedro Garcia", room: "103", amount: "₱3,800", dueDate: "Jan 25" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{payment.boarder}</p>
                <p className="text-sm text-muted-foreground">Room {payment.room}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{payment.amount}</p>
                <p className="text-sm text-muted-foreground">Due {payment.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
