"use client";

import { Clock, Users, BarChart } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface CourseHeroProps {
  title: string;
  description: string;
  duration: string;
  studentsCount: number;
  level: string;
}

export function CourseHero({
  title,
  description,
  duration,
  studentsCount,
  level,
}: CourseHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#1D4ED6] dark:bg-[#1E3A8A] text-white py-12 px-4 md:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-4 p-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="text-lg opacity-90 max-w-3xl">{description}</p>

        <div className="flex flex-wrap gap-6 pt-4 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{studentsCount} {t("courseDetail.viewsLabel")}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            <span>{t("courseDetail.levelLabel")} {level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
