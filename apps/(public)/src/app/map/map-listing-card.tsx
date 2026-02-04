import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";
import { BoardingHouse } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface MapListingCardProps {
  listing: BoardingHouse;
  isSelected: boolean;
  onClick: () => void;
}

export function MapListingCard({
  listing,
  isSelected,
  onClick,
}: MapListingCardProps) {
  return (
    <div
      className={`p-4 cursor-pointer transition-colors ${
        isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50"
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold line-clamp-1">{listing.name}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
        <MapPin className="h-3 w-3" />
        <span className="line-clamp-1">
          {listing.address}, {listing.city}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="font-semibold text-primary">
          {formatCurrency(listing.priceMin)}
          {listing.priceMax > listing.priceMin && (
            <span className="text-muted-foreground font-normal">
              {" "}
              - {formatCurrency(listing.priceMax)}
            </span>
          )}
          <span className="text-muted-foreground font-normal text-sm">/mo</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
        {listing.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{listing.rating.toFixed(1)}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{listing.availableRooms} available</span>
        </div>
      </div>

      <Link
        href={`/listings/${listing.id}`}
        className="mt-2 block text-sm text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        View details →
      </Link>
    </div>
  );
}
