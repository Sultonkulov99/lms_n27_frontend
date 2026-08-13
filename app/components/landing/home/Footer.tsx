"use client";

import Link from "next/link";
import FinalCTA from "./FinalCTA";

export default function Footer() {

  return (
    <footer className="w-full transition-colors duration-300 bg-white">
      {/* ── Final CTA section included inside Footer ──────────────────────── */}
      <FinalCTA />

      {/* ── Footer Bottom Bar ────────────────────────────────────────────── */}
      <div className="border-t py-6 text-sm transition-colors duration-300 border-slate-100 text-slate-500">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright — 2026 */}
          <div className="font-medium text-[14px] text-[#636C79]">
            © 2026. Barcha huquqlar himoyalangan
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6">
            <Link
              href="#terms"
              className="font-medium text-[14px] transition-colors no-underline text-[#636C79] hover:text-slate-900"
            >
              Terminlar
            </Link>
            <Link
              href="#security"
              className="font-medium text-[14px] transition-colors no-underline text-[#636C79] hover:text-slate-900"
            >
              Xavfsizlik
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
