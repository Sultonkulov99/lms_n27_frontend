import { baseAPI } from "@/app/lib/utils";

export interface Student {
  id: number;
  fullName: string;
  phone: string;
  file?: string | null;
  role: string;
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

export async function getStudents(): Promise<Student[]> {
  const { data } = await baseAPI.get("/students");
  return unwrapList<Student>(data);
}

export async function getStudentCourseDetails(courseId: number | string): Promise<any> {
  const { data } = await baseAPI.get(`/students/my-courses/${courseId}`);
  return data;
}

export async function postCourseComment(courseId: number, text: string, parentId?: number): Promise<any> {
  const { data } = await baseAPI.post('/course-comments', { courseId, text, parentId });
  return data;
}
