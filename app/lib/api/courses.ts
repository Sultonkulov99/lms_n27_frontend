import { baseAPI } from "@/app/lib/utils";
 
export interface Course {
  id: number;
  banner: string;
  introVideo?: string | null;
  name: string;
  description: string;
  level: string;
  price: number;
  categoryId: number;
  created_at: string;
  updated_at: string;
}
 
function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.result)) return obj.result as T[];
  }
  return [];
}
 
export async function getCourses(): Promise<Course[]> {
  const { data } = await baseAPI.get("/courses");
  return unwrapList<Course>(data);
}
 