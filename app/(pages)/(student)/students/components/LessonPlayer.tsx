"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

type TabId = "qa" | "materials" | "tasks" | "exams";

export type Question = {
  id: string;
  name: string;
  avatar: StaticImageData;
  text: string;
  likes: number;
};

export type Material = {
  id: string;
  name: string;
  type: "pdf" | "video" | "doc";
};

export type Task = {
  id: string;
  title: string;
  description: string;
  fileName?: string;
  uploadInstructions?: string;
};

export type ExamQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
};

export type Exam = {
  id: string;
  title: string;
  level: string;
  difficulty: string;
  totalQuestions: number;
  currentQuestion: number;
  questions: ExamQuestion[];
  result?: string;
  explanation?: string;
  nextSteps?: string;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "qa", label: "Q&A" },
  { id: "materials", label: "Materiallar" },
  { id: "tasks", label: "Vazifalar" },
  { id: "exams", label: "Imtihonlar" },
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function LessonPlayer({
  title,
  thumbnail,
  totalQuestions,
  totalAnswers,
  questions = [],
  materials = [],
  tasks = [],
  exams = [],
  onNextLesson,
  videoUrl,
}: {
  title: string;
  thumbnail?: StaticImageData;
  totalQuestions?: number;
  totalAnswers?: number;
  questions?: Question[];
  materials?: Material[];
  tasks?: Task[];
  exams?: Exam[];
  onNextLesson?: () => void;
  videoUrl?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("qa");
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [likedQuestions, setLikedQuestions] = useState<Set<string>>(new Set<string>());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExamResult, setShowExamResult] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const questionsCount = totalQuestions ?? questions.length;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onNextLesson) {
        onNextLesson();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [onNextLesson]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen(false);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeed(false);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleLikeQuestion = (questionId: string) => {
    setLikedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 min-w-0">
      {/* Sarlavha */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-base font-bold text-[#1a1a1a]">{title}</h2>
        <button 
          onClick={onNextLesson}
          className="shrink-0 bg-[#4F7FFF] hover:bg-[#3D6EEE] transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Keyingi dars
        </button>
      </div>

      {/* Video qismi */}
      <div 
        ref={videoContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#000] mb-6 group"
      >
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />
        ) : (
          <>
            {thumbnail ? (
              <Image src={thumbnail} alt={title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
            )}
          </>
        )}

        {/* Play button overlay */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pauza" : "Ijro etish"}
          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a" className="ml-0.5">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>
        </button>

        {/* Video boshqaruv paneli */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress bar */}
          <div className="px-4 pt-6 pb-2">
            <div className="relative">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
                }}
              />
            </div>
          </div>

          {/* Boshqaruv tugmalari */}
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={isPlaying ? "Pauza" : "Ijro etish"}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Volume */}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              >
                {isMuted || volume === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                )}
              </button>

              {/* Vaqt */}
              <span className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeed(!showSpeed)}
                  className="text-white text-sm font-semibold hover:text-gray-200 transition-colors px-2 py-1"
                  aria-label="Tezlikni tanlash"
                >
                  {playbackSpeed}x
                </button>
                {showSpeed && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg overflow-hidden min-w-[80px] backdrop-blur-sm">
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`w-full text-center px-3 py-2 text-sm text-white hover:bg-white/20 transition-colors ${
                          playbackSpeed === speed ? "bg-white/10" : ""
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality selector */}
              <div className="relative">
                <button
                  onClick={() => setShowQuality(!showQuality)}
                  className="text-white text-sm font-semibold hover:text-gray-200 transition-colors px-2 py-1 flex items-center gap-1"
                  aria-label="Sifatni tanlash"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
                  </svg>
                  {quality}
                </button>
                {showQuality && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg overflow-hidden min-w-[120px] backdrop-blur-sm">
                    {[
                      { value: "auto", label: "Avtomatik" },
                      { value: "1080p", label: "1080p" },
                      { value: "720p", label: "720p" },
                      { value: "480p", label: "480p" },
                      { value: "360p", label: "360p" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setQuality(option.value);
                          setShowQuality(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors ${
                          quality === option.value ? "bg-white/10" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-200 transition-colors ml-1"
                aria-label="To'liq ekran"
              >
                {isFullscreen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Baholash */}
      <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <p className="text-sm font-medium text-[#1a1a1a]">Darsni baholashni istaysizmi?</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              onClick={() => setRating(star)} 
              aria-label={`${star} yulduz`}
              className="transition-transform hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={star <= rating ? "#FFC107" : "none"}
                stroke={star <= rating ? "#FFC107" : "#E0E0E0"}
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Tablar */}
      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-[#4F7FFF] text-white shadow-sm"
                : "text-[#64748B] hover:text-[#1a1a1a] hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Q&A Tab */}
      {activeTab === "qa" && (
        <div>
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-base font-bold text-[#1a1a1a] mb-1">Savol va javoblar</h3>
              <p className="text-sm text-[#64748B]">
                Savollar: {questionsCount} ta • Javoblar: {totalAnswers ?? 9} ta
              </p>
            </div>
            <button className="shrink-0 bg-[#4F7FFF] hover:bg-[#3D6EEE] transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg">
              Savol so&apos;rash
            </button>
          </div>

          <h4 className="text-sm font-semibold text-[#1a1a1a] mb-4">Barcha savollar</h4>

          <div className="flex flex-col gap-5">
            {questions.map((q) => {
              const isLiked = likedQuestions.has(q.id);
              const displayLikes = isLiked ? q.likes + 1 : q.likes;
              
              return (
                <div key={q.id} className="flex gap-3">
                  <Image
                    src={q.avatar}
                    alt={q.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#4F7FFF] mb-1">{q.name}</p>
                    <p className="text-sm text-[#1a1a1a] leading-relaxed mb-3">{q.text}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {/* Like */}
                      <button 
                        onClick={() => handleLikeQuestion(q.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          isLiked ? "text-[#4F7FFF]" : "text-[#64748B] hover:text-[#1a1a1a]"
                        }`}
                        aria-label="Like"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={isLiked ? "currentColor" : "none"}
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 22V11M2 13v6c0 1.1.9 2 2 2h1M16.5 3c-.9 0-1.6.4-2.1 1L7 11h8l1.4 8.1c.1.5.3.9.7 1.2.4.3.8.4 1.3.4 1.4 0 2.6-1.2 2.6-2.6V8c0-1.4-1.2-2.6-2.6-2.6h-2z" />
                        </svg>
                        <span className="font-medium">{displayLikes}</span>
                      </button>
                      
                      {/* Dislike */}
                      <button 
                        className="flex items-center gap-1.5 text-[#64748B] hover:text-[#1a1a1a] transition-colors"
                        aria-label="Dislike"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="rotate-180"
                        >
                          <path d="M7 22V11M2 13v6c0 1.1.9 2 2 2h1M16.5 3c-.9 0-1.6.4-2.1 1L7 11h8l1.4 8.1c.1.5.3.9.7 1.2.4.3.8.4 1.3.4 1.4 0 2.6-1.2 2.6-2.6V8c0-1.4-1.2-2.6-2.6-2.6h-2z" />
                        </svg>
                      </button>
                      
                      <button className="text-[#64748B] hover:text-[#4F7FFF] transition-colors font-medium">
                        Javob berish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === "materials" && (
        <div>
          <h3 className="text-base font-bold text-[#1a1a1a] mb-4">Materiallar</h3>
          <div className="flex flex-col gap-3">
            {materials.map((material) => (
              <div 
                key={material.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444">
                      <path d="M7 18h10V6H7v12zm2-10h6v8H9V8z"/>
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{material.name}</span>
                </div>
                <button 
                  className="text-[#64748B] hover:text-[#1a1a1a] transition-colors"
                  aria-label="Yuklab olish"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-6">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#DC2626] mb-1">
                Siz modulning darslarini tugallamadingiz
              </p>
              <p className="text-sm text-[#991B1B]">
                Iltimos, to'liq yakunlang va imkon savolariga topshiring
              </p>
            </div>
          </div>

          {tasks.map((task) => (
            <div key={task.id} className="mb-6">
              <h3 className="text-base font-bold text-[#1a1a1a] mb-4">{task.title}</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Darajasi: <span className="text-[#1a1a1a] font-medium">O'rta</span></p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Bajarilish vaqti: <span className="text-[#1a1a1a] font-medium">Cheksiz</span></p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">O'zlashtirgan ball: <span className="text-[#1a1a1a] font-medium">5</span></p>
                </div>
              </div>
              <button className="bg-[#4F7FFF] hover:bg-[#3D6EEE] transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg">
                Testni boshlash
              </button>
              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold text-[#1a1a1a]">Natijangiz:</p>
                <p className="text-sm text-[#64748B]">-</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mt-4">Sarflangan vaqt</p>
                <p className="text-sm text-[#64748B]">-</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mt-4">O'zlashtirilgan ball</p>
                <p className="text-sm text-[#64748B]">-</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === "exams" && (
        <div>
          {exams.length > 0 && !showExamResult ? (
            <div>
              <div className="mb-4">
                <p className="text-sm font-medium text-[#64748B] mb-1">Foylil yuboring</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm text-[#64748B] border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    Yuklash
                  </button>
                  <span className="text-sm text-[#94A3B8]">Fayl yuklanmagan</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[#1a1a1a] mb-4">
                  Savol: {exams[0].currentQuestion}/{exams[0].totalQuestions}
                </h4>
                
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#4F7FFF] transition-all duration-300"
                      style={{ width: `${(exams[0].currentQuestion / exams[0].totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-bold text-[#1a1a1a] mb-4">
                    {exams[0].currentQuestion}. {exams[0].questions[0]?.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {exams[0].questions[0]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? "border-[#4F7FFF] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                            selectedAnswer === index
                              ? "border-[#4F7FFF] bg-[#4F7FFF]"
                              : "border-gray-300"
                          }`}>
                            {selectedAnswer === index && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-sm text-[#1a1a1a]">{String.fromCharCode(65 + index)}) {option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-5 py-2.5 text-sm font-medium text-[#64748B] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Bekor qilish
                  </button>
                  <button 
                    onClick={() => setShowExamResult(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-[#4F7FFF] rounded-lg hover:bg-[#3D6EEE] transition-colors"
                  >
                    Keyingi
                  </button>
                </div>
              </div>
            </div>
          ) : showExamResult ? (
            <div className="py-8 text-center">
              <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Test yakunlandi!</h3>
              <p className="text-sm text-[#64748B]">Natijalaringiz tez orada e'lon qilinadi</p>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-[#64748B]">Imtihonlar mavjud emas</div>
          )}
        </div>
      )}
    </div>
  );
}
