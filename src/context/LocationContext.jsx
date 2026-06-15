'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { dedupeLocations, normalizeStoredLocation } from '../utils/locationData';

const LocationContext = createContext(null);

const CURRENT_LOCATION_KEY = 'offcampus-selected-location';
const RECENT_LOCATIONS_KEY = 'offcampus-recent-locations';

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedLocation = normalizeStoredLocation(readStorage(CURRENT_LOCATION_KEY, null));
    const storedRecentLocations = readStorage(RECENT_LOCATIONS_KEY, [])
      .map((item) => normalizeStoredLocation(item))
      .filter(Boolean);

    setSelectedLocation(storedLocation);
    setRecentLocations(storedRecentLocations);
    setIsReady(true);
  }, []);

  const confirmLocation = (location) => {
    const normalizedLocation = normalizeStoredLocation(location);

    if (!normalizedLocation) {
      return;
    }

    const nextRecentLocations = dedupeLocations([normalizedLocation, ...recentLocations]).slice(0, 5);

    setSelectedLocation(normalizedLocation);
    setRecentLocations(nextRecentLocations);
    writeStorage(CURRENT_LOCATION_KEY, normalizedLocation);
    writeStorage(RECENT_LOCATIONS_KEY, nextRecentLocations);
  };

  const value = {
    selectedLocation,
    recentLocations,
    confirmLocation,
    isReady,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationStore() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocationStore must be used within a LocationProvider.');
  }

  return context;
}
