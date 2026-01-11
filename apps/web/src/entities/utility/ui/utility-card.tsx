import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Zap, Droplets, Wifi, MoreHorizontal } from "lucide-react";
import type { UtilityReading, UtilityType } from "../model/types";
import { formatCurrency, formatDate } from "@/shared/lib/utils";

interface UtilityCardProps {
  reading: UtilityReading;
  onClick?: () => void;
}

const utilityIcons: Record<UtilityType, React.ReactNode> = {
  ELECTRICITY: <Zap className="h-4 w-4" />,
  WATER: <Droplets className="h-4 w-4" />,
  INTERNET: <Wifi className="h-4 w-4" />,
  OTHER: <MoreHorizontal className="h-4 w-4" />,
};

const utilityColors: Record<UtilityType, string> = {
  ELECTRICITY: "bg-yellow-500",
  WATER: "bg-blue-500",
  INTERNET: "bg-purple-500",
  OTHER: "bg-gray-500",
};

export function UtilityCard({ reading, onClick }: UtilityCardProps) {
  const consumption = Number(reading.currentReading) - Number(reading.previousReading);
  const cost = consumption * Number(reading.ratePerUnit);

  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {reading.room?.roomNumber ? `Room ${reading.room.roomNumber}` : "Unknown Room"}
        </CardTitle>
        <Badge className={utilityColors[reading.type]}>
          <span className="flex items-center gap-1">
            {utilityIcons[reading.type]}
            {reading.type}
          </span>
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Previous:</span>
            <span className="ml-1 font-medium">{Number(reading.previousReading).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Current:</span>
            <span className="ml-1 font-medium">{Number(reading.currentReading).toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Consumption: {consumption.toFixed(2)} units
          </span>
          <span className="font-semibold">{formatCurrency(cost)}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Reading Date: {formatDate(reading.readingDate)}
        </div>
      </CardContent>
    </Card>
  );
}
