import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: API_URL + '/api/v1', // Already includes /api/v1 in .env.local
});

export function getToken(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(name)
  
  return token;
}

export function setToken(name: string, key: string) {
  if (typeof window === 'undefined') return null;
  
  localStorage.setItem(name, key);
  document.cookie = `${name}=${key}; path=/; max-age=31536000`;
}

export function removeToken(name: string) {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(name);
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

let categoriesCache: any = null;
let categoriesPromise: Promise<any> | null = null;

export const fetchCategoriesCached = async () => {
  if (categoriesCache) return categoriesCache;
  if (categoriesPromise) return categoriesPromise;
  
  categoriesPromise = baseAPI.get("categories").then(res => {
    categoriesCache = res;
    return res;
  }).catch(err => {
    categoriesPromise = null;
    throw err;
  });
  
  return categoriesPromise;
};

let coursesCache: any = null;
let coursesPromise: Promise<any> | null = null;

export const fetchCoursesCached = async () => {
  if (coursesCache) return coursesCache;
  if (coursesPromise) return coursesPromise;
  
  coursesPromise = baseAPI.get("courses").then(res => {
    coursesCache = res;
    return res;
  }).catch(err => {
    coursesPromise = null;
    throw err;
  });
  
  return coursesPromise;
};

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
