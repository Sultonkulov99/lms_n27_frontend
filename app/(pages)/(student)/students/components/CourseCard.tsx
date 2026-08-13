"use client";

import Image from "next/image";
import { useState } from "react";
import avatar from "@/app/assets/bekzodsafarov.jpg"

type CourseCardProps = {
  image: string;
  tag: string;
  instructor: string;
  instructorAvatar: string;
  title: string;
  progress: number;
};

export default function CourseCard({
  image,
  tag,
  instructor,
  instructorAvatar,
  title,
  progress,
}: CourseCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#e5e7eb]">
      <div className="relative h-[180px] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              alt={instructor}
              className="rounded-full object-cover h-[25px] w-[25px]"
            />
            <span className="text-xs font-medium text-[#1a1a1a]">{instructor}</span>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Sevimlilarga qo'shish"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isLiked ? "#ef4444" : "none"}
              stroke={isLiked ? "#ef4444" : "#9ca3af"}
              strokeWidth="1.8"
              className="transition-all duration-200"
            >
              <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
            </svg>
          </button>
        </div>

        <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">{title}</h3>

        <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1">
          <span>Ko&apos;rildi:</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#e5e7eb] rounded-full mb-4">
          <div
            className="h-1.5 bg-[#3b82f6] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button className="w-full bg-[#3b82f6] hover:bg-[#2f6fe0] transition-colors text-white text-sm font-medium py-2 rounded-lg">
          Ko&apos;rishni boshlash
        </button>
      </div>
    </div>
  );
}