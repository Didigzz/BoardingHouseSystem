import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../ui/components/primitives/card";
import { MapPin, Users, Wifi, Car, Utensils, Bath, Star } from "lucide-react";
import { Badge } from "../../ui/components/primitives/badge";
import { formatCurrency } from "../../lib/formatters";

export interface BoardingHouse {
  id: string;
  name: string;
  address: string;
  priceMin: number;
  priceMax: number;
  totalRooms: number;
  availableRooms: number;
  amenities: string[];
  rating?: number;
  images: string[];
}

interface ListingCardProps {
  listing: BoardingHouse;
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-3.5 w-3.5" />,
  parking: <Car className="h-3.5 w-3.5" />,
  kitchen: <Utensils className="h-3.5 w-3.5" />,
  bathroom: <Bath className="h-3.5 w-3.5" />,
};

export function ListingCard({ listing }: ListingCardProps) {
  const displayAmenities = listing.amenities.slice(0, 3);
  const remainingCount = listing.amenities.length - 3;

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.images[0] || "/placeholder-house.jpg"}
            alt={listing.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {listing.availableRooms > 0 ? (
            <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
              {listing.availableRooms} room
              {listing.availableRooms > 1 ? "s" : ""} available
            </Badge>
          ) : (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Fully Occupied
            </Badge>
          )}
          {listing.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {listing.rating.toFixed(1)}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Title & Location */}
          <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
            {listing.name}
          </h3>
          <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{listing.address}</span>
          </div>

          {/* Price */}
          <div className="mt-3">
            <span className="text-primary text-2xl font-bold">
              {formatCurrency(listing.priceMin)}
            </span>
            {listing.priceMax > listing.priceMin && (
              <span className="text-muted-foreground text-lg">
                {" "}
                - {formatCurrency(listing.priceMax)}
              </span>
            )}
            <span className="text-muted-foreground text-sm"> / month</span>
          </div>

          {/* Amenities */}
          <div className="mt-3 flex flex-wrap gap-2">
            {displayAmenities.map((amenity) => (
              <div
                key={amenity}
                className="bg-muted flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
              >
                {amenityIcons[amenity.toLowerCase()] || null}
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="bg-muted text-muted-foreground flex items-center rounded-full px-2.5 py-1 text-xs">
                +{remainingCount} more
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t px-4 py-3">
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Users className="h-4 w-4" />
            <span>{listing.totalRooms} total rooms</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
