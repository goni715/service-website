/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { Map, Search } from "lucide-react";
import "leaflet/dist/leaflet.css";

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

export type LatLngTuple = [number, number];

interface InteractiveMapProps {
  onLocationSelect: (
    location: LatLngTuple,
    address?: string,
    postalCode?: string
  ) => void;
}

const cleanAddress = (fullAddress: string): string => {
  if (!fullAddress) return "";

  const parts = fullAddress.split(",").map((part) => part.trim());

  const filteredParts = parts.filter(
    (part) => part.toLowerCase() !== "rajshahi division"
  );

  const shortParts = filteredParts.slice(0, 3);

  return shortParts.join(", ");
};

const InteractiveMap = ({ onLocationSelect }: InteractiveMapProps) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const location: LatLngTuple = [lat, lng];
      const data = await reverseGeocode(lat, lng);
      const shortAddress = cleanAddress(data?.address || "");
      onLocationSelect(location, shortAddress, data?.postalCode);
    },
  });

  return null;
};

const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    const address = data?.display_name || "";
    const postalCode = data?.address?.postcode || "";
    return { address, postalCode };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return { address: "", postalCode: "" };
  }
};

interface LocationMapProps {
  onLocationSelect: (
    location: LatLngTuple,
    address?: string,
    postalCode?: string
  ) => void;
  selectedLocation: LatLngTuple | null;
}

const LocationMap = ({
  onLocationSelect,
  selectedLocation,
}: LocationMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const defaultCenter: LatLngTuple = [37.7749, -122.4194];
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.setView(selectedLocation, 13);
    }
  }, [selectedLocation]);

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md border border-gray-200">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Map size={32} className="mx-auto text-blue-500 animate-pulse" />
            <p className="mt-2 text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}

      <div
        className={`h-full transition-opacity duration-500 ${
          mapLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <MapContainer
          center={selectedLocation || defaultCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          // @ts-ignore
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <InteractiveMap onLocationSelect={onLocationSelect} />
          {selectedLocation && (
            <Marker position={selectedLocation} icon={markerIcon} />
          )}
        </MapContainer>
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 py-2 px-3 rounded-md text-xs text-gray-600 shadow-sm">
        Click on the map or search above to select a location
      </div>
    </div>
  );
};

export default LocationMap;
