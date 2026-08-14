"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, LockOpen } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const MODULES_MOCK = [
  {
    id: "m1",
    title: "Introduction",
    lessons: [
      {
        id: "l1",
        title: "What You'll Get From Taking This Course",
        duration: "9m 34s",
        isFree: true,
      },
      {
        id: "l2",
        title: "An Overview of Web Development and React",
        duration: "9m 34s",
        isFree: false,
      },
      {
        id: "l3",
        title: "Course Repo and Software Installations",
        duration: "9m 34s",
        isFree: false,
      },
    ],
  },
  {
    id: "m2",
    title: "Understanding React Native Fundamentals",
    lessons: [],
  },
  {
    id: "m3",
    title: "Adding Stack and Bottom Tab Navigator",
    lessons: [],
  },
  {
    id: "m4",
    title: "Overview of React Hooks",
    lessons: [],
  },
  {
    id: "m5",
    title: "Project",
    lessons: [],
  },
  {
    id: "m6",
    title: "Conclusion",
    lessons: [],
  },
];

export function AccordionList({ courseId }: { courseId: string }) {
  const { t } = useLanguage();
  const [openModuleId, setOpenModuleId] = useState<string | null>("m1");

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {MODULES_MOCK.map((module) => {
        const isOpen = openModuleId === module.id;

        return (
          <div
            key={module.id}
            className="border-b border-gray-100 dark:border-[#1E293B] overflow-hidden"
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors text-left cursor-pointer"
            >
              <span className="font-semibold text-gray-800 dark:text-white text-sm">
                {module.title}
              </span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {isOpen && (
              <div className="divide-y divide-gray-50 dark:divide-[#1E293B] bg-white dark:bg-[#0F172A]">
                {module.lessons.length > 0 ? (
                  module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 text-sm text-black dark:text-slate-200 hover:bg-gray-50/50 dark:hover:bg-[#1E293B]/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.isFree ? (
                          <div className="w-8 h-8 bg-[#F7F7F8] dark:bg-[#1E293B] rounded-full flex items-center justify-center shrink-0">
                            <LockOpen size={16} className="text-black dark:text-green-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-[#F7F7F8] dark:bg-[#1E293B] rounded-full flex items-center justify-center shrink-0">
                            <Lock size={16} className="text-black dark:text-gray-400" />
                          </div>
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-xs text-black dark:text-gray-400">
                        {lesson.duration}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-xs text-black dark:text-gray-400 italic">
                    {t("courseDetail.noLessons")}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
