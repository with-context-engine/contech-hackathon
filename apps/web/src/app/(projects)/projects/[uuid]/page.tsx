'use client';

import { Graph } from '@/components/knowledge-graph/Graph';
import { LocationMap } from '@/components/map/Map';
import tcoData from '@/data/tco-data.json';
import { TCOData, type TCOLocation } from '@/types/tco';
import { geocodeAddress } from '@/utils/geocoding';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';

interface RawLocation {
  address: string;
  tcoCount: number;
}

export default function ProjectPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<TCOLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      const rawLocations = (tcoData as unknown as { locations: RawLocation[] })
        .locations;
      const geocodedLocations = await Promise.all(
        rawLocations.map(async (loc) => {
          const coords = await geocodeAddress(loc.address);
          return {
            address: loc.address,
            tcoCount: loc.tcoCount,
            lat: coords?.lat || 0,
            lng: coords?.lng || 0,
          };
        }),
      );
      setLocations(geocodedLocations);
      setIsLoading(false);
    }

    loadLocations();
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-center">
        <div className="text-lg">Loading locations...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full">
      <div className="h-full w-full rounded-xl border bg-background/50 backdrop-blur-sm">
        {selectedLocation ? (
          <ReactFlowProvider>
            <div className="relative h-full">
              <button
                type="button"
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 left-4 z-10 px-4 py-2 bg-background/80 rounded-md hover:bg-background/90 transition-colors"
              >
                ← Back to Map
              </button>
              <Graph />
            </div>
          </ReactFlowProvider>
        ) : (
          <LocationMap
            locations={locations}
            onLocationSelect={(address) => setSelectedLocation(address)}
          />
        )}
      </div>
    </div>
  );
}

async function addNewLocation(address: string) {
  const coordinates = await geocodeAddress(address);
  if (coordinates) {
    const newLocation: TCOLocation = {
      address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      tcoCount: 1, // or whatever initial count
    };
    // Add to your locations array/state
  }
}
