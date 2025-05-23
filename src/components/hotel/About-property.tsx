"use client";
import { useEffect, useState } from "react";
import { ShoppingBag, Train, Utensils, Waves } from "lucide-react";
import dynamic from "next/dynamic";

// Define types
interface Location {
  name: string;
  position: [number, number];
  type: string;
  color: string;
}

interface NearbyPlace {
  name: string;
  distance: string;
}

interface NearbyPlaces {
  restaurants: NearbyPlace[];
  shops: NearbyPlace[];
  beaches: NearbyPlace[];
  transport: NearbyPlace[];
}

// Define locations array
const locations: Location[] = [
  {
    name: "Hôtel Saint Eugène",
    position: [36.7786, 3.0578],
    type: "hotel",
    color: "bg-pink-500",
  },
  {
    name: "CHU Lamine Debaghine",
    position: [36.7689, 3.0589],
    type: "hospital",
    color: "bg-red-500",
  },
  {
    name: "M11",
    position: [36.7586, 3.0478],
    type: "transport",
    color: "bg-orange-500",
  },
  {
    name: "Bab El Oued",
    position: [36.7886, 3.0378],
    type: "area",
    color: "bg-gray-700",
  },
  {
    name: "MALAKOFF",
    position: [36.7486, 3.0278],
    type: "commercial",
    color: "bg-blue-500",
  },
];

const nearbyPlaces: NearbyPlaces = {
  restaurants: [
    { name: "Blue Cafe", distance: "1.4 km" },
    { name: "Garden Restaurant", distance: "2.1 km" },
    { name: "Seaside Bistro", distance: "3.2 km" },
  ],
  shops: [
    { name: "Central Mall", distance: "1.4 km" },
    { name: "City Plaza", distance: "2.8 km" },
    { name: "Shopping Center", distance: "3.5 km" },
  ],
  beaches: [
    { name: "Les Dunes Beach", distance: "1.4 km" },
    { name: "Sunset Beach", distance: "2.9 km" },
    { name: "Crystal Bay", distance: "4.1 km" },
  ],
  transport: [
    { name: "Train - Riverside Central Station", distance: "1.4 km" },
    { name: "Metro - Cityline Metro Hub", distance: "2.3 km" },
    { name: "Bus Terminal - Main Station", distance: "1.8 km" },
  ],
};

// Map Component - Dynamically imported to avoid SSR issues
const MapComponent = dynamic(
  () => {
    return import("react-leaflet").then((mod) => {
      const { MapContainer, TileLayer, Marker, Popup } = mod;

      // Fix Leaflet icons in Next.js
      if (typeof window !== "undefined") {
        const L = require("leaflet");
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png")
            .default,
          iconUrl: require("leaflet/dist/images/marker-icon.png").default,
          shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
        });
      }

      const Map = () => (
        <MapContainer
          center={[36.7786, 3.0578] as [number, number]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.position as [number, number]}
            >
              <Popup>
                <div className="font-semibold">{location.name}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );

      return Map;
    });
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

export default function AboutProperty() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - About & Explore */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              About this property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Executive Suite at El Aurassi Hotel in Algiers offers a
              luxurious and spacious experience tailored for both business and
              leisure travelers. With its modern design and panoramic views of
              the Mediterranean Sea, the suite combines comfort, elegance, and
              functionality.
            </p>
          </div>

          {/* Explore the Area */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Explore the Area
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Restaurants & Cafes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-5 h-5 text-foreground" />
                  <h3 className="font-semibold text-gray-900">
                    Restaurants & cafes
                  </h3>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.restaurants.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="text-gray-700">{place.name}</span>
                      <span className="text-gray-500 font-medium">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shops & Markets */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                  <h3 className="font-semibold text-gray-900">
                    Shops & Markets
                  </h3>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.shops.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="text-gray-700">{place.name}</span>
                      <span className="text-gray-500 font-medium">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beaches */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Waves className="w-5 h-5 text-foreground" />
                  <h3 className="font-semibold text-gray-900">Beaches</h3>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.beaches.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="text-gray-700">{place.name}</span>
                      <span className="text-gray-500 font-medium">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Public Transport */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Train className="w-5 h-5 text-foreground" />
                  <h3 className="font-semibold text-gray-900">
                    Public transport
                  </h3>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.transport.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span className="text-gray-700">{place.name}</span>
                      <span className="text-gray-500 font-medium">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-sm border h-full w-full">
            <div className="relative  w-full max-h-[580px] rounded-lg overflow-hidden">
              {isMounted && <MapComponent />}

              {/* Explore the Area Button */}
              <div className="absolute bottom-4 left-4 z-[1000]">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg">
                  Explore the Area
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
