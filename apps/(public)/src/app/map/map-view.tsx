"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { Button } from "@bhms/ui";
import { BoardingHouse } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
const defaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background: hsl(221.2 83.2% 53.3%); width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const selectedIcon = L.divIcon({
  className: "custom-marker selected",
  html: `<div style="background: hsl(221.2 83.2% 53.3%); width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 12px rgba(0,0,0,0.4);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface MapViewProps {
  listings: BoardingHouse[];
  selectedListing: BoardingHouse | null;
  onSelectListing: (listing: BoardingHouse | null) => void;
}

function MapController({
  selectedListing,
}: {
  selectedListing: BoardingHouse | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedListing) {
      map.flyTo([selectedListing.latitude, selectedListing.longitude], 15, {
        duration: 1,
      });
    }
  }, [selectedListing, map]);

  return null;
}

export default function MapView({
  listings,
  selectedListing,
  onSelectListing,
}: MapViewProps) {
  // Default center: Metro Manila
  const defaultCenter: [number, number] = [14.5995, 120.9842];
  const defaultZoom = 12;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedListing={selectedListing} />

      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
          icon={selectedListing?.id === listing.id ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => onSelectListing(listing),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold">{listing.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {listing.address}
              </p>
              <p className="font-semibold text-primary mt-2">
                {formatCurrency(listing.priceMin)} -{" "}
                {formatCurrency(listing.priceMax)}/mo
              </p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {listing.availableRooms} available
                </span>
                {listing.rating && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    ⭐ {listing.rating.toFixed(1)}
                  </span>
                )}
              </div>
              <Link href={`/listings/${listing.id}`}>
                <Button size="sm" className="w-full mt-3">
                  View Details
                </Button>
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
