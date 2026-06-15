import axios from 'axios';

const GEOCODER_BASE = process.env.NEXT_PUBLIC_LOCATION_GEOCODER_BASE_URL || 'https://nominatim.openstreetmap.org';

export const geocoderClient = axios.create({
  baseURL: GEOCODER_BASE,
  headers: {
    Accept: 'application/json',
  },
});

export default geocoderClient;
