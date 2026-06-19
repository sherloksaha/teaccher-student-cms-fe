import axios from 'axios';
import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const AUTH_COOKIE_NAME = 'jwt_token_teacher_student_sun';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

function isBrowser() {
  return typeof window !== 'undefined';
}

function normalizeBearerToken(token) {
  if (!token || typeof token !== 'string') {
    return '';
  }

  return token.replace(/^Bearer\s+/i, '').trim();
}

export function getAuthToken() {
  if (!isBrowser()) {
    return '';
  }

  return Cookies.get(AUTH_COOKIE_NAME) || '';
}

export function setAuthToken(token, options = {}) {
  if (!isBrowser()) {
    return;
  }

  const normalizedToken = normalizeBearerToken(token);

  if (!normalizedToken) {
    return;
  }

  Cookies.set(AUTH_COOKIE_NAME, normalizedToken, {
    sameSite: 'lax',
    secure: window.location.protocol === 'https:',
    ...options,
  });
}

export function clearAuthToken() {
  if (!isBrowser()) {
    return;
  }

  Cookies.remove(AUTH_COOKIE_NAME);
}

function findJwtToken(response) {
  const data = response?.data || {};
  const headers = response?.headers || {};

  return (
    data.token ||
    data.jwt ||
    data.accessToken ||
    data.authToken ||
    data.data?.token ||
    data.data?.jwt ||
    data.data?.accessToken ||
    headers.authorization ||
    headers.Authorization ||
    headers['x-auth-token'] ||
    ''
  );
}

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${normalizeBearerToken(token)}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const token = findJwtToken(response);

    if (token) {
      setAuthToken(token);
    }

    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      'Request failed.';

    return Promise.reject({
      ...error,
      message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
  }
);

function buildConfig(config = {}) {
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
    },
  };
}

async function request(config) {
  const response = await apiClient.request(buildConfig(config));
  return response.data;
}

export const api = {
  request,

  get(url, config = {}) {
    return request({ ...config, method: 'GET', url });
  },

  post(url, data, config = {}) {
    return request({ ...config, method: 'POST', url, data });
  },

  put(url, data, config = {}) {
    return request({ ...config, method: 'PUT', url, data });
  },

  patch(url, data, config = {}) {
    return request({ ...config, method: 'PATCH', url, data });
  },

  delete(url, config = {}) {
    return request({ ...config, method: 'DELETE', url });
  },

  postForm(url, formData, config = {}) {
    return request({
      ...config,
      method: 'POST',
      url,
      data: formData,
      headers: {
        ...(config.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  putForm(url, formData, config = {}) {
    return request({
      ...config,
      method: 'PUT',
      url,
      data: formData,
      headers: {
        ...(config.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  setHeader(name, value) {
    apiClient.defaults.headers.common[name] = value;
  },

  removeHeader(name) {
    delete apiClient.defaults.headers.common[name];
  },

  getToken: getAuthToken,
  setToken: setAuthToken,
  clearToken: clearAuthToken,
};

export default apiClient;
