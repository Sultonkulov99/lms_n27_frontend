import axios from "axios";
import { baseAPI } from "@/app/lib/utils";

export interface ExamScore {
  id: number;
  userId: number;
  lessonId: number;
  courseId: number;
  sectionId: number;
  correct: number;
  incorrect: number;
  passed: boolean;
  created_at: string;
  user?: { id: number; fullName: string; phone?: string; file?: string | null };
  course?: { id: number; name: string };
  section?: { id: number; name: string };
  lesson?: { id: number; name: string };
}

export const SCORES_ENDPOINT = "/exam-results";

function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.result)) return obj.result as T[];
  }
  return [];
}

function toNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function pick(...values: unknown[]): any {
  return values.find((v) => v !== null && v !== undefined);
}

function normalize(raw: Record<string, any>): ExamScore {
  const lesson = pick(raw.lessons, raw.lesson);
  const section = pick(raw.section, raw.sections, lesson?.section, lesson?.sections);
  const course = pick(raw.course, raw.courses, section?.course, section?.courses);

  const correct = toNumber(pick(raw.correctAnswer, raw.correct, raw.correctCount));
  const incorrect = toNumber(pick(raw.wrongAnswer, raw.incorrect, raw.wrongAnswers));
  const total = correct + incorrect;
  const passedFlag = pick(raw.isPassed, raw.passed);

  return {
    id: toNumber(raw.id),
    userId: toNumber(pick(raw.userId, raw.user?.id)),
    lessonId: toNumber(pick(raw.lessonId, lesson?.id)),
    courseId: toNumber(pick(raw.courseId, course?.id)),
    sectionId: toNumber(pick(raw.sectionId, section?.id)),
    correct,
    incorrect,
    passed:
      typeof passedFlag === "boolean"
        ? passedFlag
        : total > 0 && Math.round((correct / total) * 100) >= 60,
    created_at: pick(raw.created_at, raw.createdAt) ?? "",
    user: raw.user,
    course,
    section,
    lesson,
  };
}

export function isScoresEndpointMissing(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 404;
}

export async function getScores(params?: {
  courseId?: number;
  sectionId?: number;
}): Promise<ExamScore[]> {
  try {
    const { data } = await baseAPI.get(SCORES_ENDPOINT, { params });
    return unwrapList<Record<string, any>>(data).map(normalize);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("BACKEND ERROR:", err.response?.status, err.response?.data);
    }
    throw err;
  }
}
