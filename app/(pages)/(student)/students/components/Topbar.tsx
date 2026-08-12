"use client";

import Image from "next/image";
import ismatxurshidov from "../../../../assets/ismatxurshidov.png";
import { useState, useRef, useEffect } from "react";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1a1a1a]">
        {/* Galochka icon */}
        <div className="w-5 h-5 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        Student
      </div>

      <div className="flex items-center gap-4">
        {/* Bell notification */}
        <button className="relative w-10 h-10 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 bg-[#EF4444] text-white text-[10px] font-bold leading-none rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Hexagon icon */}
        <button className="w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>

        {/* Language selector */}
        <button className="flex items-center gap-1.5 text-sm text-[#1a1a1a] font-medium px-3 py-1.5">
          O&apos;zbek tili
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* User profile */}
        <div className="relative pl-4 border-l border-gray-200" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5"
          >
            <Image
              src={ismatxurshidov}
              alt="Ismat Xurshidov"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-[#1a1a1a]">Ismat Xurshidov</p>
              <p className="text-xs text-[#94A3B8]">Administrator</p>
            </div>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1a1a1a" 
              strokeWidth="2"
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm text-[#1a1a1a] font-medium">Saytga qaytish</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-sm text-[#1a1a1a] font-medium">Profil ma&apos;lumotlari</span>
              </button>
              
              <div className="h-px bg-gray-200 my-1.5 mx-2"></div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-sm text-[#EF4444] font-medium">Profildan chiqish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
