"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useProfileStore } from "@/store/useProfileStore";
import { getToken } from "@/app/lib/utils";
import CourseSidebar from "../components/CourseSidebar";
import LessonPlayer, { Question, Material, Task, Exam } from "../components/LessonPlayer";

// Darslar ro'yxati (MOCK)
const lessons = [
  { id: "l1", title: "IT Live akademiyasi haqida", duration: "10 daqiqa" },
  { id: "l2", title: "Frontend dasturlash nima?", duration: "10 daqiqa" },
  { id: "l3", title: "Nimadan boshlash kerak?", duration: "10 daqiqa" },
  { id: "l4", title: "HTML asoslari", duration: "15 daqiqa" },
  { id: "l5", title: "CSS bilan ishlash", duration: "20 daqiqa" },
];

// Sample materials
const materials: Material[] = [
  { id: "m1", name: "Materiallar.pdf", type: "pdf" },
  { id: "m2", name: "Materiallar.pdf", type: "pdf" },
  { id: "m3", name: "Materiallar.pdf", type: "pdf" },
  { id: "m4", name: "Materiallar.pdf", type: "pdf" },
];

// Sample tasks
const tasks: Task[] = [
  {
    id: "t1",
    title: "CSS'da shriftlar va me'ros bo'lib o'tadigan xususiyatlar",
    description: "Ushbu vazifani bajarish orqali CSS bilan ishlash ko'nikmalaringizni rivojlantirasiz",
    fileName: "vazifa.pdf",
    uploadInstructions: "Yuklash va fayl yuklanmagan",
  },
];

// Sample exam
const exams: Exam[] = [
  {
    id: "e1",
    title: "CSS Imtihoni",
    level: "O'rta",
    difficulty: "Cheksiz",
    totalQuestions: 5,
    currentQuestion: 2,
    questions: [
      {
        id: "eq1",
        question: "Quyidagilardan qaysi biri formatish tegi emas?",
        options: ["A) span", "B) Strong", "C) Mark", "D) i"],
      },
      {
        id: "eq2",
        question: "HTML da nechta heading darajasi mavjud?",
        options: ["A) 5", "B) 6", "C) 7", "D) 8"],
      },
    ],
    result: "-",
    explanation: "-",
    nextSteps: "-",
  },
];

export default function LessonMain({ courseId }: { courseId?: string }) {
  const searchParams = useSearchParams();
  const initialLessonId = searchParams.get("lessonId") || "l3";
  
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { profile } = useProfileStore();

  useEffect(() => {
    // Check if lessonId is provided in URL
    const queryLessonId = searchParams.get("lessonId");
    if (queryLessonId) {
      setActiveLessonId(queryLessonId);
    }
  }, [searchParams]);

  useEffect(() => {
    // Setup Socket
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const token = getToken("accessToken");

    const newSocket = io(`${socketUrl}/qa`, {
      transports: ["websocket"],
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("QA Socket connected");
      if (courseId && activeLessonId) {
        newSocket.emit("join_lesson", {
          courseId: Number(courseId),
          lessonId: Number(activeLessonId.replace(/\D/g, "") || 0) // Mocking lessonId conversion for now
        });
      }
    });

    newSocket.on("new_question", (newComment: any) => {
      const q: Question = {
        id: newComment.id.toString(),
        name: newComment.user?.fullName || "Student",
        text: newComment.text,
        date: new Date(newComment.created_at).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        avatarColor: "bg-blue-600",
        nameColor: "text-[#1a1a1a]",
        replies: []
      };
      setQuestions(prev => [q, ...prev]);
    });

    newSocket.on("new_reply", (newReply: any) => {
      setQuestions(prev => prev.map(q => {
        if (q.id === newReply.parentId?.toString()) {
          return {
            ...q,
            replies: [
              ...(q.replies || []),
              {
                id: newReply.id.toString(),
                name: newReply.user?.fullName || "Foydalanuvchi",
                role: newReply.user?.role === "MENTOR" || newReply.user?.role === "ADMIN" ? "mentor" : undefined,
                text: newReply.text,
                date: new Date(newReply.created_at).toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                avatarColor: newReply.user?.role === "MENTOR" ? "bg-[#1E293B]" : "bg-gray-500",
                nameColor: newReply.user?.role === "MENTOR" ? "text-blue-600" : "text-[#1a1a1a]",
              }
            ]
          };
        }
        return q;
      }));
    });

    setSocket(newSocket);

    return () => {
      if (courseId && activeLessonId) {
        newSocket.emit("leave_lesson", {
          courseId: Number(courseId),
          lessonId: Number(activeLessonId.replace(/\D/g, "") || 0)
        });
      }
      newSocket.disconnect();
    };
  }, [courseId, activeLessonId]);

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex < lessons.length - 1) {
      setActiveLessonId(lessons[currentIndex + 1].id);
    }
  };

  const handleQuestionSubmit = async (text: string) => {
    if (socket && courseId) {
      socket.emit("send_question", {
        courseId: Number(courseId),
        lessonId: Number(activeLessonId.replace(/\D/g, "") || 0),
        text,
        userId: profile?.id || 1, // Fallback to 1 if no profile
      });
    }
  };

  const handleReplySubmit = async (parentId: string, text: string) => {
    if (socket && courseId) {
      socket.emit("send_reply", {
        courseId: Number(courseId),
        lessonId: Number(activeLessonId.replace(/\D/g, "") || 0),
        parentId: Number(parentId),
        text,
        userId: profile?.id || 1, // Fallback to 1 if no profile
      });
    }
  };

  const currentLesson = lessons.find((l) => l.id === activeLessonId);
  const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);

  return (
    <div className="flex gap-5 items-start h-full max-w-[1600px] mx-auto">
      <CourseSidebar 
        courseTitle="Frontend dasturlash (Mock)" 
        activeLessonId={activeLessonId}
        onLessonChange={setActiveLessonId}
      />
      <div className="flex-1 overflow-y-auto h-full relative">
        <LessonPlayer
          lessonId={activeLessonId.replace(/\D/g, "") || "0"}
          title={currentLesson?.title || "Nimadan boshlash kerak?"}
          totalQuestions={questions.length}
          totalAnswers={questions.reduce((acc, q) => acc + (q.replies?.length || 0), 0)}
          questions={questions}
          materials={materials}
          tasks={tasks}
          exams={exams}
          onNextLesson={handleNextLesson}
          hasNextLesson={currentIndex >= 0 && currentIndex < lessons.length - 1}
          videoUrl={"/video_2026-08-10_11-15-10.mp4"}
          onSubmitQuestion={handleQuestionSubmit}
          onSubmitReply={handleReplySubmit}
        />
      </div>
    </div>
  );
}
