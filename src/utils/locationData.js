const FALLBACK_LABEL = 'Pinned location';

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function getPrimaryAddressToken(address = {}, displayName = '') {
  return (
    address.neighbourhood ||
    address.suburb ||
    address.city_district ||
    address.hamlet ||
    address.village ||
    address.town ||
    address.city ||
    address.county ||
    displayName.split(',')[0]?.trim() ||
    FALLBACK_LABEL
  );
}

export function formatCoordinates({ lat, lng }) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return '';
  }

  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export function formatLocationTitle(location) {
  if (!location) {
    return '';
  }

  return location.label || location.locality || location.city || FALLBACK_LABEL;
}

export function formatLocationSubtitle(location) {
  if (!location) {
    return '';
  }

  if (location.addressLine && location.addressLine !== location.label) {
    return location.addressLine;
  }

  return [location.locality, location.city, location.state, location.country]
    .filter(Boolean)
    .join(', ');
}

export function buildCoordinateFallback(coords, source = 'manual') {
  const lat = toNumber(coords?.lat);
  const lng = toNumber(coords?.lng);

  if (lat === null || lng === null) {
    return null;
  }

  return {
    id: `${source}-${lat}-${lng}`,
    lat,
    lng,
    label: FALLBACK_LABEL,
    addressLine: `Coordinates ${formatCoordinates({ lat, lng })}`,
    locality: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    source,
    updatedAt: new Date().toISOString(),
  };
}

export function mapNominatimLocation(result, source = 'search') {
  const lat = toNumber(result?.lat);
  const lng = toNumber(result?.lon ?? result?.lng);

  if (lat === null || lng === null) {
    return null;
  }

  const address = result.address || {};
  const label = getPrimaryAddressToken(address, result.display_name || '');
  const addressLine =
    result.display_name ||
    [address.road, address.suburb, address.city || address.town, address.state, address.country]
      .filter(Boolean)
      .join(', ');

  return {
    id: String(result.place_id || `${source}-${lat}-${lng}`),
    lat,
    lng,
    label,
    addressLine: addressLine || `Coordinates ${formatCoordinates({ lat, lng })}`,
    locality:
      address.suburb ||
      address.neighbourhood ||
      address.city_district ||
      address.hamlet ||
      address.village ||
      '',
    city: address.city || address.town || address.county || '',
    state: address.state || '',
    country: address.country || '',
    postcode: address.postcode || '',
    source,
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeStoredLocation(location, fallbackLabel = '') {
  if (!location) {
    return null;
  }

  if (location.lat === undefined || location.lng === undefined) {
    return null;
  }

  const lat = toNumber(location.lat);
  const lng = toNumber(location.lng);

  if (lat === null || lng === null) {
    return null;
  }

  const normalizedLocation = {
    id: String(location.id || location.placeId || `stored-${lat}-${lng}`),
    lat,
    lng,
    label:
      location.label ||
      location.locationLabel ||
      location.locality ||
      location.city ||
      fallbackLabel ||
      FALLBACK_LABEL,
    addressLine:
      location.addressLine ||
      location.display_name ||
      location.locationLabel ||
      fallbackLabel ||
      `Coordinates ${formatCoordinates({ lat, lng })}`,
    locality: location.locality || '',
    city: location.city || '',
    state: location.state || '',
    country: location.country || '',
    postcode: location.postcode || '',
    source: location.source || 'stored',
    updatedAt: location.updatedAt || new Date().toISOString(),
  };

  return normalizedLocation;
}

export function dedupeLocations(locations) {
  const seenIds = new Set();

  return locations.filter((location) => {
    if (!location) {
      return false;
    }

    const dedupeKey = location.id || `${location.lat}-${location.lng}`;

    if (seenIds.has(dedupeKey)) {
      return false;
    }

    seenIds.add(dedupeKey);
    return true;
  });
}
