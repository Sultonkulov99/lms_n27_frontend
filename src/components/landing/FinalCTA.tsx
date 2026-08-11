"use client";

export default function FinalCTA() {
  return (
    <div className="bg-white py-16 text-center border-t border-slate-100">
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* ── KOiDA Brand Logo ────────────────────────────────────────────── */}
        <div className="flex items-center justify-center font-black text-3xl tracking-tight select-none">
          <span className="text-[#0F172A] font-sans">KO</span>
          <span style={{ color: "#FF3B30", fontFamily: "Georgia, serif", fontStyle: "italic", margin: "0 1px" }}>i</span>
          <span className="text-[#0F172A] font-sans">DA</span>
        </div>

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <h2 className="font-bold text-[32px] leading-[120%] text-[#0F172A] m-0">
          Biz bilan muvaffaqiyatga erishing
        </h2>

        {/* ── Subtitle ───────────────────────────────────────────────────── */}
        <p className="font-medium text-[16px] leading-[140%] text-[#636C79] m-0">
          Eng kuchlilar biz bilan qoladi!
        </p>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {/* Chapdagi oq button: Intro video */}
          <a
            href="#video"
            className="inline-flex items-center justify-center gap-2 w-[214px] h-[48px] rounded-[8px] border border-slate-200 bg-white text-[#1C232C] hover:bg-slate-50 font-medium text-[15px] leading-none no-underline cursor-pointer transition-colors box-border"
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
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
            <span>Intro video</span>
          </a>

          {/* O'ngdagi ko'k button: Bog'lanish (#3B81F4) */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center w-[214px] h-[48px] rounded-[8px] bg-[#3B81F4] hover:bg-blue-600 text-white font-medium text-[15px] leading-none no-underline cursor-pointer transition-colors box-border"
          >
            Bog&#39;lanish
          </a>
        </div>

      </div>
    </div>
  );
}
