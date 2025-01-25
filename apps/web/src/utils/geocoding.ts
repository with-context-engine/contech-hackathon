interface GeocodingCache {
  [address: string]: {
    lat: number;
    lng: number;
    timestamp: number;
  };
}

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const geocodingCache: GeocodingCache = {};

export async function geocodeAddress(address: string) {
  // Check cache first
  const cached = geocodingCache[address];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { lat: cached.lat, lng: cached.lng };
  }

  const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_API}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    if (!data.features?.length) {
      throw new Error('Address not found');
    }

    const [lng, lat] = data.features[0].center;

    // Cache the result
    geocodingCache[address] = {
      lat,
      lng,
      timestamp: Date.now(),
    };

    return { lat, lng };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}
