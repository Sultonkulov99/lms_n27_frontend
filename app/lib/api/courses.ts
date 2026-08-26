import { baseAPI } from "@/app/lib/utils";
import { Status } from "./status";

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    fullName: string;
}

export interface Course {
    id: number;
    teacherId: number | null;
    banner: string;
    introVideo?: string | null;
    name: string;
    description: string;
    level: string;
    price: number | string;
    categoryId: number;
    created_at: string;
    updated_at: string;
    categories?: Category;
    user?: User | null;
    sections?: unknown[];
    status?: Status;
    studentsCount?: number;
    assistant?: string;
}

function unwrapList<T>(payload: unknown): T[] {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === "object") {
        const object = payload as Record<string, unknown>;
        if (Array.isArray(object.data)) return object.data as T[];
        if (Array.isArray(object.result)) return object.result as T[];
    }
    return [];
}

const coursesCache = new Map<Status, Course[]>();
const coursesPromise = new Map<Status, Promise<Course[]>>();

export async function getCourses(
    isActive: Status = "ACTIVE",
): Promise<Course[]> {
    if (coursesCache.has(isActive)) return coursesCache.get(isActive)!;
    if (coursesPromise.has(isActive)) return coursesPromise.get(isActive)!;

    const request = baseAPI
        .get("/courses", { params: { page: 1, limit: 100, isActive } })
        .then((response) => {
            const courses = unwrapList<Course>(response.data);
            coursesCache.set(isActive, courses);
            return courses;
        })
        .catch((error) => {
            coursesPromise.delete(isActive);
            throw error;
        });

    coursesPromise.set(isActive, request);
    return request;
}

export function clearCoursesCache() {
    coursesCache.clear();
    coursesPromise.clear();
}

export async function getCourseById(id: number | string): Promise<Course> {
    const { data } = await baseAPI.get(`/courses/${id}`);
    return data.data || data;
}

export async function createCourse(
    courseData: FormData | Record<string, unknown>,
): Promise<Course> {
    const { data } = await baseAPI.post("/courses", courseData);
    clearCoursesCache();
    return data.data || data;
}

export async function updateCourse(
    id: number | string,
    courseData: FormData | Record<string, unknown>,
): Promise<Course> {
    const { data } = await baseAPI.patch(`/courses/${id}`, courseData);
    clearCoursesCache();
    return data.data || data;
}

export async function archiveCourse(id: number) {
    const { data } = await baseAPI.patch(`/courses/${id}/archive`);
    clearCoursesCache();
    return data;
}

export async function restoreCourse(id: number) {
    const { data } = await baseAPI.patch(`/courses/${id}/restore`);
    clearCoursesCache();
    return data;
}

export async function deleteCourse(id: number | string): Promise<void> {
    await baseAPI.delete(`/courses/${id}`);
    clearCoursesCache();
}
