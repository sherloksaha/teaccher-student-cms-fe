import { buildCoordinateFallback, mapNominatimLocation } from './locationData';
import geocoderClient from '../../lib/geocoderClient';

const GEOCODER_BASE_URL =
  import.meta.env.VITE_LOCATION_GEOCODER_BASE_URL || 'https://nominatim.openstreetmap.org';

const FALLBACK_LOCATIONS = [
  {
    place_id: 'fallback-saket',
    lat: 28.5245,
    lon: 77.2066,
    display_name: 'Saket, New Delhi, Delhi, India',
    address: {
      suburb: 'Saket',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
    },
  },
  {
    place_id: 'fallback-gurgaon',
    lat: 28.4595,
    lon: 77.0266,
    display_name: 'DLF Phase 4, Gurugram, Haryana, India',
    address: {
      suburb: 'DLF Phase 4',
      city: 'Gurugram',
      state: 'Haryana',
      country: 'India',
    },
  },
  {
    place_id: 'fallback-koramangala',
    lat: 12.9352,
    lon: 77.6245,
    display_name: 'Koramangala, Bengaluru, Karnataka, India',
    address: {
      suburb: 'Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
    },
  },
  {
    place_id: 'fallback-bandra',
    lat: 19.0596,
    lon: 72.8295,
    display_name: 'Bandra West, Mumbai, Maharashtra, India',
    address: {
      suburb: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
  },
];

function getLanguage() {
  return typeof navigator !== 'undefined' ? navigator.language || 'en' : 'en';
}

async function requestGeocoder(path, params, signal) {
  const opts = {
    params,
    signal,
    headers: {
      'Accept-Language': getLanguage(),
    },
  };

  const res = await geocoderClient.get(path, opts);
  return res.data;
}

export function getFallbackLocations(query = '') {
  const normalizedQuery = query.trim().toLowerCase();

  return FALLBACK_LOCATIONS
    .filter((item) => {
      if (!normalizedQuery) {
        return true;
      }

      return item.display_name.toLowerCase().includes(normalizedQuery);
    })
    .map((item) => mapNominatimLocation(item, 'fallback'))
    .filter(Boolean);
}

export async function searchLocations(query, signal) {
  if (!query.trim()) {
    return [];
  }

  try {
    const results = await requestGeocoder('/search', {
      format: 'jsonv2',
      addressdetails: 1,
      limit: 6,
      q: query.trim(),
    }, signal);

    const normalizedResults = results.map((item) => mapNominatimLocation(item, 'search')).filter(Boolean);

    return normalizedResults.length > 0 ? normalizedResults : getFallbackLocations(query);
  } catch (error) {
    const fallbackLocations = getFallbackLocations(query);

    if (fallbackLocations.length > 0) {
      return fallbackLocations;
    }

    throw error;
  }
}

export async function reverseGeocodeLocation(coords, signal) {
  try {
    const result = await requestGeocoder('/reverse', {
      format: 'jsonv2',
      addressdetails: 1,
      zoom: 18,
      lat: coords.lat,
      lon: coords.lng,
    }, signal);

    return mapNominatimLocation(result, 'geolocation') || buildCoordinateFallback(coords, 'manual');
  } catch {
    return buildCoordinateFallback(coords, 'manual');
  }
}
