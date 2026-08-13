"use client";

import { useState } from "react";
import Topbar from "../components/Topbar";
import CourseSidebar from "../components/CourseSidebar";
import LessonPlayer, { Question, Material, Task, Exam } from "../components/LessonPlayer";
import ismatxurshidov from "../../../../assets/ismatxurshidov.png";

// Darslar ro'yxati
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
    title: "CSS'da shriftlar va maros bo'lib o'tadigan xususiyatlar",
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

export default function LessonMain() {
  const [activeLessonId, setActiveLessonId] = useState("l3");

  const questions: Question[] = [
    {
      id: "q1",
      name: "Xurshid Istamov",
      avatar: ismatxurshidov,
      text: "Assalomu aleykum. Jonli efir yaxshi bo'yapti. Faqat ovoz yaxshi eshitilmayapti!",
      likes: 125,
    },
    {
      id: "q2",
      name: "Sardor Rahimov",
      avatar: ismatxurshidov,
      text: "Zo'r tushuntirasiz! Keyingi darsni kutib qolamiz. Rahmat sizga!",
      likes: 89,
    },
    {
      id: "q3",
      name: "Dilshod Karimov",
      avatar: ismatxurshidov,
      text: "Bu mavzuni batafsil tushuntirib bera olasizmi? Juda qiziqarli mavzu ekan",
      likes: 45,
    },
  ];

  const currentLesson = lessons.find((l) => l.id === activeLessonId);
  const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);

  const handleNextLesson = () => {
    if (currentIndex < lessons.length - 1) {
      setActiveLessonId(lessons[currentIndex + 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
          <div className="flex gap-5 items-start max-w-[1600px] mx-auto">
            <CourseSidebar 
              courseTitle="Frontend dasturlash" 
              activeLessonId={activeLessonId}
              onLessonChange={setActiveLessonId}
            />
            <LessonPlayer
              title={currentLesson?.title || "Nimadan boshlash kerak?"}
              totalQuestions={questions.length}
              totalAnswers={12}
              questions={questions}
              materials={materials}
              tasks={tasks}
              exams={exams}
              onNextLesson={handleNextLesson}
              videoUrl="/video_2026-08-10_11-15-10.mp4"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
