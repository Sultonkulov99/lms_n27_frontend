import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: API_URL, // Already includes /api/v1 in .env.local
});

export function getToken(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(name)
  
  return token;
}

export function setToken(name: string, key: string) {
  if (typeof window === 'undefined') return null;
  
  localStorage.setItem(name, key);
}

// baseAPI.interceptors.request.use(
//   function (config) {
//     const token = getToken("accessToken");
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// baseAPI.interceptors.response.use(
//   // function (response) {
//   //   return response;
//   // },
//   function (error: any) {
//     // Handle 401 unauthorized errors
//     if (error.response?.status === 401) {
//       // Redirect to login if needed
//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );
