import axios from "axios";
import { baseAPI } from "@/app/lib/utils";

export interface Payment {
  id: number;
  userId: number;
  courseId: number;
  amount: number | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  user?: { id: number; fullName: string; phone: string; file?: string | null };
  course?: {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    categories?: { id: number; name: string };
  };
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

export async function getPayments(): Promise<Payment[]> {
  const { data } = await baseAPI.get("/payments");
  return unwrapList<Payment>(data);
}

export async function createPayment(userId: number, courseId: number) {
  try {
    const { data } = await baseAPI.post("/payments", { userId, courseId });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("BACKEND ERROR:", err.response?.status, err.response?.data);
    }
    throw err;
  }
}

export async function updatePayment(
  id: number,
  payload: { userId?: number; courseId?: number; status?: boolean },
) {
  try {
    const { data } = await baseAPI.patch(`/payments/${id}`, payload);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("BACKEND ERROR:", err.response?.status, err.response?.data);
    }
    throw err;
  }
}

export async function deletePayment(id: number) {
  const { data } = await baseAPI.delete(`/payments/${id}`);
  return data;
}
