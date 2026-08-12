"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; // Path to'g'riligiga ishonch hosil qiling

interface VideoModalProps {
  onClose: () => void;
}

function VideoModal({ onClose }: VideoModalProps) {
  const { t } = useLanguage();
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
          aria-label={t("finalCta.close")}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover cursor-pointer"
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          >
            <source src="/video_2026-08-10_11-15-10.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label={t("finalCta.playVideo")}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                <Play size={22} className="ml-1 fill-gray-900 text-gray-900" />
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-3 bg-neutral-900">
          <button
            onClick={togglePlay}
            aria-label={playing ? t("finalCta.pause") : t("finalCta.play")}
            className="flex h-7 w-7 shrink-0 items-center justify-center text-white cursor-pointer"
          >
            {playing ? (
              <Pause size={16} className="fill-white" />
            ) : (
              <Play size={16} className="ml-0.5 fill-white" />
            )}
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinalCTA({ isDarkMode }: { isDarkMode?: boolean }) {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={`py-16 text-center border-t transition-colors duration-300 ${isDarkMode
          ? "bg-[#151B26] border-[#222A3A]"
          : "bg-white border-slate-100"
        }`}
    >
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* ── KOiDA Brand Logo ────────────────────────────────────────────── */}
        <div className="flex items-center justify-center font-black text-3xl tracking-tight select-none">
          <span className="text-[#0F172A] font-sans">KO</span>
          <span style={{ color: "#FF3B30", fontFamily: "Georgia, serif", fontStyle: "italic", margin: "0 1px" }}>i</span>
          <span className="text-[#0F172A] font-sans">DA</span>
        </div>

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <h2
          className={`font-bold text-[32px] leading-[120%] m-0 ${isDarkMode ? "text-white" : "text-[#0F172A]"
            }`}
        >
          {t("finalCta.title")}
        </h2>

        {/* ── Subtitle ───────────────────────────────────────────────────── */}
        <p
          className={`font-medium text-[16px] leading-[140%] m-0 ${isDarkMode ? "text-[#8A99AD]" : "text-[#636C79]"
            }`}
        >
          {t("finalCta.subtitle")}
        </p>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {/* Intro video button */}
          <button
            onClick={() => setShowVideo(true)}
            type="button"
            className={`inline-flex items-center justify-center gap-2 w-[214px] h-[48px] rounded-[8px] border font-medium text-[15px] leading-none no-underline cursor-pointer transition-colors box-border ${isDarkMode
                ? "border-[#222A3A] bg-[#1B2230] text-slate-200 hover:bg-[#222A3A]"
                : "border-slate-200 bg-white text-[#1C232C] hover:bg-slate-50"
              }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon
                points="10 8 16 12 10 16 10 8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>{t("finalCta.introVideo")}</span>
          </button>

          {/* Contact button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-[214px] h-[48px] rounded-[8px] bg-[#3B81F4] hover:bg-blue-600 text-white font-medium text-[15px] leading-none no-underline cursor-pointer transition-colors box-border"
          >
            {t("finalCta.contact")}
          </Link>
        </div>
      </div>

      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
    </div>
  );
}
