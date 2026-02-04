import { BoardingHouse } from "./types";

// Mock data for development - will be replaced with API calls
export const mockBoardingHouses: BoardingHouse[] = [
  {
    id: "1",
    name: "Sunrise Boarding House",
    description:
      "A cozy boarding house located near the university. Features modern amenities and a friendly community atmosphere. Perfect for students and young professionals looking for affordable accommodation.",
    address: "123 University Ave, Sampaloc",
    city: "Manila",
    province: "Metro Manila",
    latitude: 14.6042,
    longitude: 120.9822,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    amenities: ["WiFi", "Kitchen", "Laundry", "Security", "Parking"],
    priceMin: 3500,
    priceMax: 5500,
    totalRooms: 12,
    availableRooms: 4,
    rating: 4.5,
    reviewCount: 28,
    landlordId: "landlord-1",
    landlord: {
      id: "landlord-1",
      name: "Maria Santos",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      phone: "+63 912 345 6789",
      email: "maria@example.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    name: "Green Valley Residence",
    description:
      "Modern boarding house with air-conditioned rooms and 24/7 security. Located in a quiet residential area with easy access to public transportation.",
    address: "456 Bonifacio St, Diliman",
    city: "Quezon City",
    province: "Metro Manila",
    latitude: 14.6507,
    longitude: 121.0495,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b25ba?w=800",
    ],
    amenities: ["WiFi", "Air Conditioning", "Security", "Furnished", "Bathroom"],
    priceMin: 4500,
    priceMax: 7000,
    totalRooms: 8,
    availableRooms: 2,
    rating: 4.8,
    reviewCount: 42,
    landlordId: "landlord-2",
    landlord: {
      id: "landlord-2",
      name: "Juan Dela Cruz",
      phone: "+63 923 456 7890",
    },
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "3",
    name: "Budget Friendly Dorms",
    description:
      "Affordable shared rooms for students. Basic amenities included with a community kitchen and study area.",
    address: "789 Taft Avenue, Malate",
    city: "Manila",
    province: "Metro Manila",
    latitude: 14.5648,
    longitude: 120.9932,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    ],
    amenities: ["WiFi", "Kitchen", "Study Area"],
    priceMin: 2000,
    priceMax: 3500,
    totalRooms: 20,
    availableRooms: 8,
    rating: 4.0,
    reviewCount: 15,
    landlordId: "landlord-3",
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-10-20"),
  },
  {
    id: "4",
    name: "Executive Suites BH",
    description:
      "Premium boarding house for professionals. Each room comes with private bathroom, mini-fridge, and work desk. Building has a gym and rooftop lounge.",
    address: "321 Ayala Ave, Makati",
    city: "Makati",
    province: "Metro Manila",
    latitude: 14.5547,
    longitude: 121.0244,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
    ],
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Bathroom",
      "Furnished",
      "Gym",
      "Security",
      "Parking",
    ],
    priceMin: 8000,
    priceMax: 15000,
    totalRooms: 15,
    availableRooms: 3,
    rating: 4.9,
    reviewCount: 56,
    landlordId: "landlord-4",
    landlord: {
      id: "landlord-4",
      name: "Roberto Tan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      phone: "+63 917 890 1234",
      email: "roberto@executive-suites.com",
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "5",
    name: "Student Haven",
    description:
      "Designed specifically for university students with study rooms, fast WiFi, and proximity to major universities in the area.",
    address: "567 España Blvd, Sampaloc",
    city: "Manila",
    province: "Metro Manila",
    latitude: 14.6091,
    longitude: 120.9893,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    ],
    amenities: ["WiFi", "Study Area", "Kitchen", "Laundry", "Security"],
    priceMin: 3000,
    priceMax: 4500,
    totalRooms: 25,
    availableRooms: 6,
    rating: 4.3,
    reviewCount: 89,
    landlordId: "landlord-5",
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-11-30"),
  },
  {
    id: "6",
    name: "Coastal View Boarding",
    description:
      "Beautiful boarding house with ocean views. Perfect for those who want a peaceful environment away from the city hustle.",
    address: "890 Beach Road, Pasay",
    city: "Pasay",
    province: "Metro Manila",
    latitude: 14.5378,
    longitude: 120.9874,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    amenities: ["WiFi", "Air Conditioning", "Furnished", "Security", "Kitchen"],
    priceMin: 5000,
    priceMax: 8000,
    totalRooms: 10,
    availableRooms: 0,
    rating: 4.6,
    reviewCount: 34,
    landlordId: "landlord-6",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-12-05"),
  },
];

export function getListings(filters?: {
  query?: string;
  location?: string;
  priceMin?: string;
  priceMax?: string;
  amenities?: string[];
}): BoardingHouse[] {
  let results = [...mockBoardingHouses];

  if (filters?.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(
      (bh) =>
        bh.name.toLowerCase().includes(query) ||
        bh.description.toLowerCase().includes(query) ||
        bh.address.toLowerCase().includes(query)
    );
  }

  if (filters?.location) {
    const location = filters.location.toLowerCase();
    results = results.filter(
      (bh) =>
        bh.city.toLowerCase().includes(location) ||
        bh.province.toLowerCase().includes(location) ||
        bh.address.toLowerCase().includes(location)
    );
  }

  if (filters?.priceMin) {
    const min = parseInt(filters.priceMin);
    results = results.filter((bh) => bh.priceMax >= min);
  }

  if (filters?.priceMax) {
    const max = parseInt(filters.priceMax);
    results = results.filter((bh) => bh.priceMin <= max);
  }

  if (filters?.amenities && filters.amenities.length > 0) {
    results = results.filter((bh) =>
      filters.amenities!.every((amenity) =>
        bh.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase())
      )
    );
  }

  return results;
}

export function getListingById(id: string): BoardingHouse | undefined {
  return mockBoardingHouses.find((bh) => bh.id === id);
}

export function getFeaturedListings(): BoardingHouse[] {
  return mockBoardingHouses
    .filter((bh) => bh.rating && bh.rating >= 4.5)
    .slice(0, 4);
}

export function getRecentListings(): BoardingHouse[] {
  return [...mockBoardingHouses]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);
}
