"use client";

import React, { use } from "react";
import Link from "next/link";
import { useCourseStore } from "@/app/store/useCourseStore";

export default function ExamsPage({ params }: { params: Promise<{ id: string; sectionId: string; lessonId: string }> }) {
  const { id: courseId, sectionId, lessonId } = use(params);
  const { courses } = useCourseStore();
  const currentCourse = courses.find((c) => c.id.toString() === courseId);
  const courseTitle = currentCourse?.title || "Frontend dasturlash";

  const isBackend = courseTitle.toLowerCase().includes("backend");
  let sectionName = "CSS asoslari";
  if (sectionId === "1") {
    sectionName = isBackend ? "Node JS" : "Veb dasturlashga kirish";
  } else if (sectionId === "2") {
    sectionName = isBackend ? "SQL asoslari" : "CSS asoslari";
  }

  const baseUrl = `/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lessonId}`;

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full bg-transparent">
      {/* Box Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Darslar</h1>
        <div className="flex items-center text-[13px] font-medium gap-2">
          <Link href="/dashboard/courses/allCourses" className="text-gray-500 hover:text-gray-700 transition-colors">Kurslar</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <Link href={`/dashboard/courses/allCourses/${courseId}`} className="text-gray-500 hover:text-gray-700 transition-colors">{courseTitle}</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <Link href={`/dashboard/courses/allCourses/${courseId}/sections`} className="text-gray-500 hover:text-gray-700 transition-colors">Bo&apos;limlar</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons`} className="text-gray-500 hover:text-gray-700 transition-colors">Darslar</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-gray-900">{sectionName}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 gap-1">
          <Link
            href={`${baseUrl}/materials`}
            className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors text-gray-600 hover:bg-gray-50`}
          >
            Materiallar
          </Link>
          <Link
            href={`${baseUrl}/tasks`}
            className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors text-gray-600 hover:bg-gray-50`}
          >
            Vazifalar
          </Link>
          <Link
            href={`${baseUrl}/exams`}
            className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors bg-blue-600 text-white`}
          >
            Imtihonlar
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white border border-gray-200 rounded-xl p-8 text-gray-500">
        Imtihonlar qismi tez kunda ishga tushadi
      </div>
    </div>
  );
}
