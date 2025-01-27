'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { TCOLocation } from '@/types/tco';

interface MapProps {
  locations: TCOLocation[];
  onLocationSelect: (address: string) => void;
}

export function LocationMap({ locations, onLocationSelect }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with a cleaner dark style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark style
      center: [-74.006, 40.7128],
      zoom: 12,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });

    const currentMap = map.current;
    if (!currentMap) return;

    // Add custom styling when map loads
    currentMap.on('load', () => {
      // Simplify the map by reducing label visibility
      currentMap.setLayoutProperty('road-label', 'visibility', 'none');
      currentMap.setLayoutProperty('poi-label', 'visibility', 'none');

      // Add a subtle building extrusion layer with darker colors
      currentMap.addLayer({
        id: 'building-extrusions',
        type: 'fill-extrusion',
        source: 'composite',
        'source-layer': 'building',
        paint: {
          'fill-extrusion-color': '#1a1a1a',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      });

      // Darker water effect
      currentMap.setPaintProperty('water', 'fill-color', '#141424');

      // Reduce road visibility
      currentMap.setPaintProperty('road-primary', 'line-opacity', 0.3);
      currentMap.setPaintProperty('road-secondary', 'line-opacity', 0.2);
      currentMap.setPaintProperty('road-street', 'line-opacity', 0.1);
    });

    // Enhanced marker styling with new colors
    for (const { address, lat, lng, tcoCount } of locations) {
      const el = document.createElement('div');
      el.className =
        'cursor-pointer transition-all duration-200 hover:scale-110';

      // Create marker container with pulse effect using new colors
      const markerHtml = `
        <div class="relative">
          <div class="absolute -inset-2 animate-ping rounded-full bg-orange-500 opacity-20"></div>
          <div class="relative h-4 w-4 rounded-full shadow-lg" style="
            background: linear-gradient(45deg, #ff6b00, #ff9500);
            opacity: ${(tcoCount / Math.max(...locations.map((l) => l.tcoCount))) * 0.8 + 0.2};
          "></div>
        </div>
      `;

      el.innerHTML = markerHtml;

      // Enhanced popup styling
      const popup = new mapboxgl.Popup({
        offset: 25,
        className: 'custom-popup',
      }).setHTML(`
        <div class="p-3 min-w-[200px] bg-gray-900 text-gray-100">
          <h3 class="font-semibold text-sm mb-2">${address}</h3>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-orange-900/50 text-orange-200">
              ${tcoCount} COs
            </span>
          </div>
        </div>
      `);

      // Add marker
      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(currentMap);

      el.addEventListener('click', () => {
        onLocationSelect(address);
      });
    }

    return () => currentMap?.remove();
  }, [locations, onLocationSelect]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainer}
        className="h-full w-full rounded-xl overflow-hidden"
      />
      <div className="absolute bottom-4 right-4 bg-gray-900/95 border border-gray-700 px-6 py-4 rounded-xl shadow-xl text-sm">
        <p className="font-semibold text-gray-100 mb-3">CO Intensity Legend</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full shadow-sm"
              style={{ background: 'rgba(255, 107, 0, 0.3)' }}
            />
            <span className="text-sm text-gray-300">Low (1-3 COs)</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full shadow-sm"
              style={{ background: 'rgba(255, 107, 0, 0.6)' }}
            />
            <span className="text-sm text-gray-300">Medium (4-6 COs)</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full shadow-sm"
              style={{ background: 'rgba(255, 107, 0, 1)' }}
            />
            <span className="text-sm text-gray-300">High (7+ COs)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
