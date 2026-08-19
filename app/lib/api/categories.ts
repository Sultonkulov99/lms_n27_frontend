import { baseAPI } from "@/app/lib/utils";

export interface Category {
  id: number;
  name: string;
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

export async function getCategories(): Promise<Category[]> {
  const { data } = await baseAPI.get("/categories");
  return unwrapList<Category>(data);
}
