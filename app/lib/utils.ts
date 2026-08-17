import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: API_URL, // Already includes /api/v1 in .env.local
});

function getTokenFromCookies(): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}

baseAPI.interceptors.request.use(
  function (config) {
    const token = getTokenFromCookies();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login if needed
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);
