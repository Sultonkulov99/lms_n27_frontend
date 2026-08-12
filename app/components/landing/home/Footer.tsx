"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FinalCTA from "./FinalCTA";

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    const handleTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("theme-change", handleTheme);
    return () => window.removeEventListener("theme-change", handleTheme);
  }, []);

  return (
    <footer className={`w-full transition-colors duration-300 ${isDarkMode ? "bg-[#151B26]" : "bg-white"}`}>
      {/* ── Final CTA section included inside Footer ──────────────────────── */}
      <FinalCTA isDarkMode={isDarkMode} />

      {/* ── Footer Bottom Bar ────────────────────────────────────────────── */}
      <div
        className={`border-t py-6 text-sm transition-colors duration-300 ${
          isDarkMode ? "border-[#222A3A] text-[#8A99AD]" : "border-slate-100 text-slate-500"
        }`}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright — 2026 */}
          <div className={`font-medium text-[14px] ${isDarkMode ? "text-[#8A99AD]" : "text-[#636C79]"}`}>
            © 2026. Barcha huquqlar himoyalangan
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6">
            <Link
              href="#terms"
              className={`font-medium text-[14px] transition-colors no-underline ${
                isDarkMode ? "text-[#8A99AD] hover:text-white" : "text-[#636C79] hover:text-slate-900"
              }`}
            >
              Terminlar
            </Link>
            <Link
              href="#security"
              className={`font-medium text-[14px] transition-colors no-underline ${
                isDarkMode ? "text-[#8A99AD] hover:text-white" : "text-[#636C79] hover:text-slate-900"
              }`}
            >
              Xavfsizlik
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
