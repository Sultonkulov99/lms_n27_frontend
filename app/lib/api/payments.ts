import axios from "axios";
import { baseAPI } from "../utils";

export interface Payment {
  id: Number;
  userId: Number;
  courseId: Number;
  amount: Number;
  status: Boolean;
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

export async function createPayment(courseId: number, userId: number) {
  try {
    const { data } = await baseAPI.post("/payments", { courseId, userId });
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
  payload: { courseId?: number; userId?: number },
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
