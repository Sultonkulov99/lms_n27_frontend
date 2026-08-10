"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Star, Play, Pause, X } from "lucide-react";

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

const courses = [
  {
    id: 1,
    tag: "UI/UX Dizayn",
    tagColor: "bg-emerald-500",
    cover: "bg-gradient-to-br from-indigo-600 to-violet-700",
    title: "UI/UX Dizayn",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
  {
    id: 2,
    tag: "Frontend",
    tagColor: "bg-orange-500",
    coverImg:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    title: "Frontend dasturlash",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
  {
    id: 3,
    tag: "Backend",
    tagColor: "bg-indigo-500",
    coverImg:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    title: "Backend dasturlash",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
  {
    id: 4,
    tag: "Mobil",
    tagColor: "bg-blue-500",
    coverImg:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&q=80",
    title: "Mobil dasturlash",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
  {
    id: 5,
    tag: "SMM",
    tagColor: "bg-purple-500",
    coverImg:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
    title: "SMM Dizayn",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
  {
    id: 6,
    tag: "Grafik dizayn",
    tagColor: "bg-pink-500",
    coverImg:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    title: "Grafik Dizayn",
    desc: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
    rating: 4.5,
    price: "250 000",
  },
];

interface StarsProps {
  rating: number;
}

function Stars({ rating }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < full || (i === full && half)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
      <span className="ml-1 text-xs text-gray-400">({rating})</span>
    </div>
  );
}

interface Course {
  id: number;
  tag: string;
  tagColor: string;
  cover?: string;
  coverImg?: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
            onClick={() => setLiked((v) => !v)}
            aria-label="Saqlash"
            className="text-gray-300 hover:text-rose-400 transition-colors"
          >
            <Heart size={18} className={liked ? "fill-rose-400 text-rose-400" : ""} />
          </button>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-3">
          {course.desc}
        </p>

        <Stars rating={course.rating} />

        <div className="border-t border-gray-100 mt-3 pt-3">
          <p className="text-xs text-gray-400 mb-0.5">Kurs narxi:</p>
          <p className="text-sm font-bold text-gray-900">{course.price} UZS</p>
        </div>
      </div>
    </div>
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
  const [active, setActive] = useState("Barcha kurslar");
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Kurslar</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Barcha kurslarni ko'rish
          </button>
        </div>
      </div>

      <div className="bg-white border-t border-gray-100 py-16 mt-6">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-1 mb-6">
            <span className="text-2xl font-bold text-gray-900">iT</span>
            <span className="text-2xl font-bold text-blue-600">live</span>
            <span className="text-blue-600 text-sm align-top">'</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Biz bilan muvaffaqiyatga erishing
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Eng kuchlilar biz bilan qoladi!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Play size={16} />
              Intro video
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bog'lanish
            </button>
          </div>
        </div>
      </div>

      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
    </div>
  );
}