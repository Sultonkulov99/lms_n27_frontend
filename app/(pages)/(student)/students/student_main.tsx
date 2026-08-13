"use client";

import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import CourseCard from "./components/CourseCard";
import oybeksafarov from "../../../assets/oybeksafarov.png";

export default function StudentMain() {
  const [likedCourses, setLikedCourses] = useState<Set<string>>(new Set());

  const handleLike = (courseId: string) => {
    setLikedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex h-screen bg-[#0b0f19]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[#eef1f4] p-6">
          <h1 className="text-lg font-semibold text-[#1a1a1a] mb-4">
            Mening kurslarim
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CourseCard
              id="ui-ux-dizayn"
              title="UI/UX Dizayn"
              instructor="Oybek Safarov"
              instructorAvatar={oybeksafarov.src}
              thumbnail="/bolakay.png"
              progress={40}
              category="UI/UX Dizayn"
              isLiked={likedCourses.has("ui-ux-dizayn")}
              onLike={() => handleLike("ui-ux-dizayn")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
