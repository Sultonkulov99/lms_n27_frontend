import { baseAPI } from "@/app/lib/utils";

export interface Mentor {
  id: number;
  fullName: string;
  // include other fields as needed
}

export async function getMentorById(id: number | string): Promise<Mentor> {
  const { data } = await baseAPI.get(`/mentors/${id}`);
  return data.data || data;
}

export async function getMentors(): Promise<Mentor[]> {
  const { data } = await baseAPI.get("/mentors");
  return data.data || data;
}
