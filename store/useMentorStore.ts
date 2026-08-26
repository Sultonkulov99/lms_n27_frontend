import { create } from "zustand";
import { baseAPI } from "@/app/lib/utils";

export interface Course {
    id: number;
    teacherId?: number | null;
    banner: string;
    name: string;
    level: string;
    price: string;
    category: string;
    status: string;
    payments?: Array<{ status: boolean }>;
}

interface MentorState {
    courses: Course[];
    isLoading: boolean;
    fetchCourses: () => Promise<void>;
    fetchProfile: () => Promise<void>;
    addCourse: (course: Course) => void;
    fullName: string;
    profileImage: string | null;
    updateProfile: (name: string, image: string | null) => void;
}

export const useMentorStore = create<MentorState>((set) => ({
    courses: [],
    isLoading: false,
    fetchCourses: async () => {
        set({ isLoading: true });
        try {
            const response = await baseAPI.get("/courses/my-courses");
            set({
                courses: Array.isArray(response.data)
                    ? response.data.map((course) => ({
                          id: course.id,
                          teacherId: course.teacherId,
                          banner: course.banner,
                          name: course.name,
                          level: course.level,
                          price: course.price?.toString() ?? "0",
                          category: course.categories?.name ?? "Boshqa",
                          status: course.status,
                          payments: course.payments ?? [],
                      }))
                    : [],
            });
        } catch (error) {
            console.error("Mentor kurslarini yuklashda xatolik:", error);
            set({ courses: [] });
        } finally {
            set({ isLoading: false });
        }
    },
    addCourse: (course) =>
        set((state) => ({ courses: [course, ...state.courses] })),

    fullName: "",
    profileImage: null,
    fetchProfile: async () => {
        try {
            const response = await baseAPI.get("/profile");
            const profile = response.data?.data;
            if (profile) {
                set({
                    fullName: profile.fullName ?? "",
                    profileImage: profile.file ?? null,
                });
            }
        } catch {
            set({ fullName: "", profileImage: null });
        }
    },
    updateProfile: (name, image) =>
        set({ fullName: name, profileImage: image }),
}));
