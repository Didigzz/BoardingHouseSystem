"use client";

import { Input } from "@bhms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bhms/ui/select";
import { Search } from "lucide-react";

interface RoomFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function RoomFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: RoomFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="AVAILABLE">Available</SelectItem>
          <SelectItem value="OCCUPIED">Occupied</SelectItem>
          <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

