"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type CourseCardProps = {
  image: StaticImageData;
  tag?: string; // Agar rasmning o'zida teg bo'lsa, buni ishlatmaymiz
  instructor: string;
  instructorAvatar: StaticImageData;
  title: string;
  progress: number;
};

export default function CourseCard({
  image,
  instructor,
  instructorAvatar,
  title,
  progress,
}: CourseCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-[300px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm font-sans">
      {/* Asosiy rasm qismi (Teg rasmning o'zida bo'lgani uchun ortiqcha span olib tashlandi) */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Kontent qismi */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Image
              src={instructorAvatar}
              alt={instructor}
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
            <span className="text-xs font-medium text-[#1a1a1a]">
              {instructor}
            </span>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Sevimlilarga qo’shish"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isLiked ? "#ef4444" : "none"}
              stroke={isLiked ? "#ef4444" : "currentColor"}
              strokeWidth="1.8"
            >
              <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
            </svg>
          </button>
        </div>

        {/* Kurs nomi */}
        <h3 className="text-base font-bold text-black mb-3">{title}</h3>

        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span>Ko&apos;rildi:</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-[#3b82f6] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tugma */}
        <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] transition-colors text-white text-xs font-semibold py-2.5 rounded-xl">
          Ko&apos;rishni boshlash
        </button>
      </div>
    </div>
  );
}
