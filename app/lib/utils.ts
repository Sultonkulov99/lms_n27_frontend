import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const baseAPI = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- TOKEN MANAGEMENT ---

export function getToken(name: string = "accessToken"): string | null {
  if (typeof window === "undefined") return null;

  // 1. Try LocalStorage
  const localToken = localStorage.getItem(name);
  if (localToken) return localToken;

  // 2. Fallback to Cookie
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setToken(name: string = "accessToken", value: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(name, value);
  // 1 yillik muddat va xavfsiz SameSite sozlamasi
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function removeToken(name: string = "accessToken") {
  if (typeof window === "undefined") return;

  localStorage.removeItem(name);
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// --- AXIOS INTERCEPTORS ---

// Request Interceptor: Avtomatik Bearer Token biriktirish
baseAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: 401 Unauthorized holatida tozalash va login sahifasiga yo'naltirish
baseAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeToken("accessToken");

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login")
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

// --- SIMPLE IN-MEMORY CACHING ---

let categoriesCache: any = null;
let categoriesPromise: Promise<any> | null = null;

export const fetchCategoriesCached = async () => {
  if (categoriesCache) return categoriesCache;
  if (categoriesPromise) return categoriesPromise;

  categoriesPromise = baseAPI
    .get("categories")
    .then((res) => {
      categoriesCache = res.data;
      return res.data;
    })
    .catch((err) => {
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

  coursesPromise = baseAPI
    .get("courses")
    .then((res) => {
      coursesCache = res.data;
      return res.data;
    })
    .catch((err) => {
      coursesPromise = null;
      throw err;
    });

  return coursesPromise;
};

// Yangi kurs yoki kategoriya qo'shilganda keshni tozalash funksiyasi
export const clearAppCache = () => {
  categoriesCache = null;
  categoriesPromise = null;
  coursesCache = null;
  coursesPromise = null;
};
