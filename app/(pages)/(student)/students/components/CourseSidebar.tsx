"use client";

import { useState } from "react";

type LessonStatus = "completed" | "current" | "upcoming";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;
};

type ModuleItem = {
  id: string;
  title: string;
  duration: string;
  lessons?: Lesson[];
};

const modules: ModuleItem[] = [
  {
    id: "kirish",
    title: "Kirish",
    duration: "30 daqiqa",
    lessons: [
      {
        id: "l1",
        title: "IT Live akademiyasi haqida",
        duration: "10 daqiqa",
        status: "completed",
      },
      {
        id: "l2",
        title: "Frontend dasturlash nima?",
        duration: "10 daqiqa",
        status: "completed",
      },
      {
        id: "l3",
        title: "Nimadan boshlash kerak?",
        duration: "10 daqiqa",
        status: "current",
      },
    ],
  },
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `react-framework-${i + 1}`,
    title: "React framework",
    duration: "2 soat 20 daqiqa",
  })),
];

function StatusIcon({ status }: { status: LessonStatus }) {
  if (status === "completed") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" className="shrink-0">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  if (status === "current") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="shrink-0">
        <path d="M23 4v6h-6" />
        <path d="M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.36-3.36L23 10M1 14l5.14 4.36A9 9 0 0020.49 15" />
      </svg>
    );
  }

  return null;
}

export default function CourseSidebar({
  courseTitle = "Frontend dasturlash",
  activeLessonId = "l3",
  onLessonChange,
}: {
  courseTitle?: string;
  activeLessonId?: string;
  onLessonChange?: (lessonId: string) => void;
}) {
  const [openModuleId, setOpenModuleId] = useState<string>("kirish");

  const handleLessonClick = (lessonId: string) => {
    if (onLessonChange) {
      onLessonChange(lessonId);
    }
  };

  return (
    <aside className="w-[280px] shrink-0 bg-white rounded-xl border border-gray-200 p-4 h-fit max-h-[calc(100vh-200px)] overflow-y-auto">
      <h2 className="text-base font-bold text-[#1a1a1a] mb-1 px-2">{courseTitle}</h2>
      <p className="text-sm text-[#64748B] mb-4 px-2">30 daqiqa</p>

      <div className="flex flex-col gap-1">
        {modules.map((mod) => {
          const isOpen = openModuleId === mod.id;

          return (
            <div key={mod.id} className="rounded-lg">
              <button
                onClick={() => setOpenModuleId(isOpen ? "" : mod.id)}
                className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {mod.lessons && (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      mod.id === "kirish" ? "bg-[#4F7FFF]" : "bg-gray-200"
                    }`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1a1a1a] truncate">{mod.title}</p>
                    <p className="text-xs text-[#94A3B8]">{mod.duration}</p>
                  </div>
                </div>
                {mod.lessons && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </button>

              {isOpen && mod.lessons && (
                <div className="flex flex-col gap-0.5 ml-4 mt-1 mb-2">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;

                    return (
                      <button
                        key={lesson.id}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => handleLessonClick(lesson.id)}
                        className={`w-full flex items-center justify-between gap-2 pl-3 pr-3 py-2.5 rounded-lg text-left transition-all ${
                          isActive 
                            ? "bg-blue-50 border-l-2 border-[#4F7FFF]" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isActive ? "bg-[#4F7FFF]" : "bg-gray-300"
                          }`} />
                          <div className="min-w-0">
                            <p
                              className={`text-xs truncate ${
                                isActive ? "text-[#4F7FFF] font-semibold" : "text-[#1a1a1a] font-medium"
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-xs text-[#94A3B8]">{lesson.duration}</p>
                          </div>
                        </div>
                        <StatusIcon status={lesson.status} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
