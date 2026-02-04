export interface BoardingHouse {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  images: string[];
  amenities: string[];
  priceMin: number;
  priceMax: number;
  totalRooms: number;
  availableRooms: number;
  rating?: number;
  reviewCount?: number;
  landlordId: string;
  landlord?: {
    id: string;
    name: string;
    image?: string;
    phone?: string;
    email?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  floor: number;
  capacity: number;
  monthlyRate: number;
  amenities: string[];
  images: string[];
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  boardingHouseId: string;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
}
