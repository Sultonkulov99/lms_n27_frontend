"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Play, Pause, X } from "lucide-react";
import Link from "next/link";
import { PrecisionStars } from "@/app/components/course-details/precision-stars";
import { coursesData } from "@/app/data/courses";

const filters = [
  "Barcha kurslar",
  "Dizayn",
  "Frontend",
  "Backend",
  "Mobil",
  "Full Stack",
  "Sun'iy intellekt",
  "Boshqalar",
];

export interface Course {
  id: number;
  tag: string;
  tagColor: string;
  cover?: string;
  coverImg?: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  duration?: string;
  studentsCount?: number;
  level?: string;
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const [liked, setLiked] = useState(false);
  return (
    <Link
      href={`/courses/${course.id}`}
      className="block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
    >
      <div className={`relative h-40 ${course.cover || ""}`}>
        {course.coverImg && (
          <img
            src={course.coverImg}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
        <span
          className={`absolute top-3 left-3 ${course.tagColor} text-white text-xs font-medium px-3 py-1 rounded-full`}
        >
          {course.tag}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-[10px] font-bold">
              O
            </div>
            <span className="text-sm text-gray-700">Oybek Safarov</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            aria-label="Saqlash"
            className="text-gray-300 hover:text-rose-400 transition-colors"
          >
            <Heart
              size={18}
              className={liked ? "fill-rose-400 text-rose-400" : ""}
            />
          </button>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-3">
          {course.desc}
        </p>

        <PrecisionStars rating={course.rating} stars={5} courseId={course.id} />

        <div className="border-t border-gray-100 mt-3 pt-3">
          <p className="text-xs text-gray-400 mb-0.5">Kurs narxi:</p>
          <p className="text-sm font-bold text-gray-900">{course.price} UZS</p>
        </div>
      </div>
    </Link>
  );
}

interface VideoModalProps {
  onClose: () => void;
}

function VideoModal({ onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            poster="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80"
          >
            <source src="/video_2026-08-10_11-15-10.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Video ijro etish"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                <Play size={22} className="ml-1 fill-gray-900 text-gray-900" />
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={togglePlay}
            aria-label={playing ? "To'xtatish" : "Ijro etish"}
            className="flex h-7 w-7 shrink-0 items-center justify-center text-white"
          >
            {playing ? (
              <Pause size={16} className="fill-white" />
            ) : (
              <Play size={16} className="ml-0.5 fill-white" />
            )}
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KurslarPage() {
  const [activeFilter, setActiveFilter] = useState("Barcha kurslar");
  const [showModal, setShowModal] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    if (activeFilter === "Barcha kurslar") return true;
    if (activeFilter === "Dizayn") {
      return course.tag.toLowerCase().includes("dizayn");
    }
    return course.tag.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Bizning...
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            O'zingizga mos yo'nalishni tanlang va o'rganishni boshlang
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 self-start sm:self-auto shadow-sm"
        >
          <Play size={14} className="fill-current" />
          <span>Tanishtiruv videosi</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === filter
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="min-h-112.5 flex items-center justify-center w-full">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 w-full self-start">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl w-full max-w-xl mx-auto">
            <p className="text-sm text-gray-400">
              Bu yo'nalishda hozircha kurslar mavjud emas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
