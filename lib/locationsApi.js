import { api } from './apiClient';

function unwrapList(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.towns)) {
    return response.towns;
  }

  if (Array.isArray(response?.areas)) {
    return response.areas;
  }

  return [];
}

function normalizeLocationItem(item) {
  const id = item.id || item._id || item.cityId || item.areaId || item.value || item.name || item.title || '';
  const name = item.name || item.title || item.city || item.town || item.area || item.label || String(id);

  return {
    ...item,
    id: String(id),
    name,
  };
}

export async function fetchTowns() {
  const response = await api.get('/locations/cities');

  return unwrapList(response).map(normalizeLocationItem);
}

export async function fetchAreas(cityId) {
  if (!cityId) {
    return [];
  }

  const response = await api.get('/locations/areas', {
    params: {
      cityId,
    },
  });

  return unwrapList(response).map(normalizeLocationItem);
}
