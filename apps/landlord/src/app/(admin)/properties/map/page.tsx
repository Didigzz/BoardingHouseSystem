"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  List,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Building2,
  Users,
  DollarSign,
  ExternalLink,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@bhms/ui";
import { Input } from "@bhms/ui";
import { Badge } from "@bhms/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bhms/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bhms/ui";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rooms: {
    total: number;
    occupied: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  status: "active" | "inactive" | "maintenance";
  image?: string;
}

// Mock data with coordinates (Metro Manila area)
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunrise Residences",
    address: "123 Rizal Street, Brgy. San Antonio",
    city: "Makati City",
    coordinates: { lat: 14.5547, lng: 121.0244 },
    rooms: { total: 20, occupied: 17 },
    priceRange: { min: 4500, max: 6000 },
    status: "active",
  },
  {
    id: "2",
    name: "Green Valley BH",
    address: "45 Mabini Avenue, Brgy. Poblacion",
    city: "Quezon City",
    coordinates: { lat: 14.6488, lng: 121.0509 },
    rooms: { total: 12, occupied: 11 },
    priceRange: { min: 5000, max: 7000 },
    status: "active",
  },
  {
    id: "3",
    name: "Metro Living Spaces",
    address: "78 Commonwealth Ave",
    city: "Quezon City",
    coordinates: { lat: 14.6761, lng: 121.0562 },
    rooms: { total: 15, occupied: 12 },
    priceRange: { min: 5500, max: 8000 },
    status: "active",
  },
  {
    id: "4",
    name: "University Heights",
    address: "21 P. Noval Street",
    city: "Manila",
    coordinates: { lat: 14.6091, lng: 120.9882 },
    rooms: { total: 25, occupied: 20 },
    priceRange: { min: 4000, max: 5500 },
    status: "active",
  },
  {
    id: "5",
    name: "Taft Residences",
    address: "567 Taft Avenue",
    city: "Manila",
    coordinates: { lat: 14.5636, lng: 120.9946 },
    rooms: { total: 18, occupied: 0 },
    priceRange: { min: 4500, max: 6500 },
    status: "maintenance",
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
  maintenance: { label: "Maintenance", color: "bg-yellow-100 text-yellow-800" },
};

function PropertyCard({ property, isSelected, onClick }: { property: Property; isSelected: boolean; onClick: () => void }) {
  const occupancyRate = Math.round((property.rooms.occupied / property.rooms.total) * 100);
  const status = statusConfig[property.status];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{property.name}</h4>
              <Badge className={cn("text-xs", status.color)}>
                {status.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {property.address}
            </p>
            <p className="text-xs text-muted-foreground">
              {property.city}
            </p>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 text-muted-foreground" />
            <span>{property.rooms.total} rooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span>{occupancyRate}%</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span>₱{property.priceRange.min.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link href={`/properties/${property.id}`}>
              <Eye className="mr-1 h-3 w-3" />
              View
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link href={`/properties/${property.id}/edit`}>
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Interactive Map Component using OpenStreetMap embed
function InteractiveMap({ 
  properties, 
  selectedProperty, 
  onSelectProperty 
}: { 
  properties: Property[]; 
  selectedProperty: string | null; 
  onSelectProperty: (id: string) => void;
}) {
  const defaultCenter = { lat: 14.5995, lng: 120.9842 }; // Metro Manila
  
  const selectedPropertyData = selectedProperty 
    ? properties.find(p => p.id === selectedProperty)
    : null;

  const center = selectedPropertyData?.coordinates ?? defaultCenter;
  
  // Generate OpenStreetMap embed URL with markers
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.05},${center.lat - 0.03},${center.lng + 0.05},${center.lat + 0.03}&layer=mapnik&marker=${center.lat},${center.lng}`;
  
  return (
    <div className="relative h-full w-full">
      {/* Map iframe */}
      <iframe
        src={mapUrl}
        className="h-full w-full border-0"
        loading="lazy"
        title="Property Map"
      />
      
      {/* Property markers overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full w-full">
          {properties.map((property) => {
            // Calculate approximate position
            const xOffset = ((property.coordinates.lng - center.lng) / 0.1) * 50;
            const yOffset = ((center.lat - property.coordinates.lat) / 0.06) * 50;
            
            return (
              <button
                key={property.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto",
                  "flex flex-col items-center transition-transform hover:scale-110",
                  selectedProperty === property.id && "z-10"
                )}
                style={{
                  left: `calc(50% + ${xOffset}%)`,
                  top: `calc(50% + ${yOffset}%)`,
                }}
                onClick={() => onSelectProperty(property.id)}
              >
                <div className={cn(
                  "rounded-full p-2 shadow-lg",
                  selectedProperty === property.id 
                    ? "bg-primary text-primary-foreground scale-125" 
                    : "bg-white text-primary border-2 border-primary"
                )}>
                  <MapPin className="h-4 w-4" />
                </div>
                {selectedProperty === property.id && (
                  <div className="mt-1 bg-white rounded px-2 py-1 shadow-lg text-xs font-medium whitespace-nowrap">
                    {property.name}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected property info */}
      {selectedPropertyData && (
        <div className="absolute bottom-4 left-4 max-w-xs">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{selectedPropertyData.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{selectedPropertyData.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={cn("text-xs", statusConfig[selectedPropertyData.status].color)}>
                      {statusConfig[selectedPropertyData.status].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedPropertyData.rooms.occupied}/{selectedPropertyData.rooms.total} occupied
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                      <Link href={`/properties/${selectedPropertyData.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                      <a 
                        href={`https://www.google.com/maps?q=${selectedPropertyData.coordinates.lat},${selectedPropertyData.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function MapViewPage() {
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || property.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Map</h1>
          <p className="text-muted-foreground">
            View all your properties on an interactive map
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/properties">
              <List className="mr-2 h-4 w-4" />
              List View
            </Link>
          </Button>
          <Button asChild>
            <Link href="/properties/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Property List */}
        <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          <p className="text-sm text-muted-foreground">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
          </p>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={selectedProperty === property.id}
              onClick={() => setSelectedProperty(property.id)}
            />
          ))}
          {filteredProperties.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No properties found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardContent className="p-0 h-[calc(100vh-300px)] min-h-[400px]">
            <InteractiveMap
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onSelectProperty={setSelectedProperty}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
