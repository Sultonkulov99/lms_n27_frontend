"use client";

import React, { use } from "react";
import Link from "next/link";
import { useCourseStore } from "@/app/store/useCourseStore";

export default function MaterialsPage({ params }: { params: Promise<{ id: string; sectionId: string; lessonId: string }> }) {
  const { id: courseId, sectionId, lessonId } = use(params);
  const { courses } = useCourseStore();
  const currentCourse = courses.find((c) => c.id.toString() === courseId);
  const courseTitle = currentCourse?.title || "Frontend dasturlash";

  return (
    <div className="flex-1 p-6 flex flex-col h-full bg-transparent">
      {/* Box Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Materiallar</h1>
          <div className="flex items-center text-[13px] font-medium gap-2">
            <Link href="/dashboard/courses/allCourses" className="text-gray-500 hover:text-gray-700 transition-colors">Kurslar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}`} className="text-gray-500 hover:text-gray-700 transition-colors">{courseTitle}</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}/sections`} className="text-gray-500 hover:text-gray-700 transition-colors">Bo&apos;limlar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons`} className="text-gray-500 hover:text-gray-700 transition-colors">Darslar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-gray-900">Materiallar</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-100">
        <h2 className="text-xl font-medium text-gray-700 mb-2">Materiallar sahifasi (Dars ID: {lessonId})</h2>
        <p className="text-gray-500">Bu yerda ushbu darsga tegishli materiallar ro&apos;yxati shakllantiriladi.</p>
      </div>
    </div>
  );
}
