import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request: attach token from cookie if present
apiClient.interceptors.request.use((config) => {
  try {
    const token = Cookies.get('jwt_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }

  return config;
});

// Response: if server sends token, persist to cookie
apiClient.interceptors.response.use(
  (res) => {
    try {
      const token = res?.data?.token || res?.headers?.authorization;
      if (token) {
        // if header value is 'Bearer <token>' normalize
        const normalized = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        Cookies.set('jwt_token', normalized, { sameSite: 'lax' });
      }
    } catch (e) {}

    return res;
  },
  (err) => Promise.reject(err)
);

export default apiClient;
