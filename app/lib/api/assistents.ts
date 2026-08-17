import axios from "axios";
import { api } from "../api";

export interface Assistent {
  id: number;
  file?: string;
  fullName: string;
  phone: string;
  created_at: string;
  course: string
  status: "Faol" | "Nofaol";
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

export async function getAssistents(): Promise<Assistent[]> {
  const { data } = await api.get("/course-assistant");
  return unwrapList<Assistent>(data);
}

export async function createAssistent(formData: FormData) {
  console.log("createAssistent FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(" ", key, "=", value);
  }

  try {
    const { data } = await api.post("/course-assistant", formData);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("BACKEND ERROR:", err.response?.status, err.response?.data);
    }
    throw err;
  }
}

export async function updateAssistent(id: number, formData: FormData) {
  console.log("updateAssistent FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(" ", key, "=", value);
  }

  try {
    const { data } = await api.patch(`/course-assistant/${id}`, formData);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("BACKEND ERROR:", err.response?.status, err.response?.data);
    }
    throw err;
  }
}

export async function deleteAssistent(id: number) {
  const { data } = await api.delete(`/course-assistant/${id}`);
  return data;
}
