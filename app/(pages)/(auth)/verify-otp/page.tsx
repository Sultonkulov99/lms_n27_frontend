"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageLogin from "@/app/assets/login.png";
import { Copy, RefreshCw } from "lucide-react";

export default function VerificationPage() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(46);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResend = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      // Logic for resending SMS code
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-white">
      <div className="hidden lg:flex flex-col justify-center items-center bg-[#F0F6FF] p-8 relative">
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={ImageLogin} 
                  alt="Illustration" 
                  fill 
                  className="object-contain" 
                  priority 
                /> 
           
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-blue-400">
              <span className="text-sm text-gray-400 mt-1">
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative min-h-screen">
        <div className="flex justify-end w-full">
          <div className="relative h-10 w-32 flex items-center justify-end">
            {/* Logo rasmi uchun placeholder:
                <Image 
                  src="/logo.svg" 
                  alt="IT LIVE Logo" 
                  width={120} 
                  height={40} 
                  className="object-contain"
                /> 
            */}
            <div className="flex items-center gap-1 font-extrabold text-2xl tracking-wide">
              <span className="text-black">IT</span>
              <span className="bg-[#3B82F6] text-white px-2 py-0.5 rounded-md text-xl">
                LIVE
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Tasdiqlash kodi
          </h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              // Code submit logic
            }}
          >
            <div className="text-left">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Tasdiqlash kodi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={7}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="0 0 0 - 0 0 0"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pr-10 tracking-widest font-mono"
                  required
                />
                <Copy className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[1.5]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 py-1">
              <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                {formatTime(timeLeft)}
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`text-xs sm:text-sm transition-colors ${
                  timeLeft > 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                }`}
              >
                Kodni qayta yuborish
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
            >
              Davom etish
            </button>
          </form>
        </div>

        <div className="w-full text-center text-xs text-gray-400"></div>
      </div>
    </div>
  );
}