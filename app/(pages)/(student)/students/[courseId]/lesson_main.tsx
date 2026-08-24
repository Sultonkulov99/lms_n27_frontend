"use client";

import { useState } from "react";
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
  const [activeLessonId, setActiveLessonId] = useState("l3");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      name: "Alisher",
      text: "Assalomu alaykum yaxshimisiz? css bu nima",
      date: "12.08.2026 15:39",
      avatarColor: "bg-blue-600",
      nameColor: "text-[#1a1a1a]",
      replies: [
        {
          id: "r1",
          name: "Oydin",
          role: "mentor",
          text: "cascading style shits",
          date: "12.08.2026 15:45",
          avatarColor: "bg-[#1E293B]",
          nameColor: "text-blue-600",
        }
      ]
    }
  ]);

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex < lessons.length - 1) {
      setActiveLessonId(lessons[currentIndex + 1].id);
    }
  };

  const handleQuestionSubmit = async (text: string) => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      name: "Siz (Mock)",
      text,
      date: new Date().toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      avatarColor: "bg-blue-600",
      nameColor: "text-[#1a1a1a]",
      replies: []
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleReplySubmit = async (parentId: string, text: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === parentId) {
        return {
          ...q,
          replies: [
            ...(q.replies || []),
            {
              id: `r${Date.now()}`,
              name: "Siz (Mock)",
              text,
              date: new Date().toLocaleString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
              avatarColor: "bg-blue-600",
              nameColor: "text-[#1a1a1a]",
            }
          ]
        };
      }
      return q;
    }));
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
