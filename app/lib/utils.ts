import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: API_URL, // Already includes /api/v1 in .env.local
});

// Helper function to get token from localStorage (client-side only)
function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('accessToken');
}

// Export functions for external use
export function getToken(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(name);
  
  return token;
}

export function setToken(name: string, key: string) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(name, key);
}

// Add request interceptor to attach token
baseAPI.interceptors.request.use(
  function (config) {
    const token = getTokenFromStorage();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
baseAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      // Clear invalid token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);