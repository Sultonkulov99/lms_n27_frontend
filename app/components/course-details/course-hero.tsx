"use client";

import { useState } from "react";
import { Clock, Users, BarChart, Play, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface CourseHeroProps {
  title: string;
  description: string;
  duration: string;
  studentsCount: number;
  level: string;
  category?: string;
  updatedAt?: string;
  introVideo?: string;
}

export function CourseHero({
  title,
  description,
  duration,
  studentsCount,
  level,
  category,
  updatedAt,
  introVideo,
}: CourseHeroProps) {
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* <div className="bg-[#1D4ED6] dark:bg-[#1E3A8A] text-white pt-16 pb-24 px-4 md:px-8 transition-colors duration-200"> */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white pt-16 pb-24 px-4 md:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              {category && (
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {category}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-lg opacity-90 leading-relaxed max-w-2xl">{description}</p>

            <div className="flex flex-wrap gap-6 pt-2 text-sm opacity-90">
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
              {updatedAt && (
                <div className="flex items-center gap-2">
                  <span>{t("courseDetail.updatedAt") || "Oxirgi yangilanish:"} {new Date(updatedAt).toLocaleDateString("ru-RU")}</span>
                </div>
              )}
            </div>

            {introVideo && (
              <div className="pt-6">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-4 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all cursor-pointer backdrop-blur-md group w-full max-w-md"
                >
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={20} className="ml-1 fill-current" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg text-white">Kirish videosi (Intro)</div>
                    <div className="text-sm text-blue-100 opacity-90 mt-0.5">Kurs haqida qisqacha ma&apos;lumotni ko&apos;rish</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isVideoOpen && introVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full">
              <video
                src={introVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
