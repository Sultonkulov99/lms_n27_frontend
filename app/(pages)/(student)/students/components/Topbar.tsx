import Image from "next/image";
import ismatxurshidov from "../../../../assets/ismatxurshidov.png";

export default function Topbar() {
  return (
    <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        Student
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 rounded-full bg-[#f3f4f6] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
            <path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 003.4 0" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        <button className="w-9 h-9 rounded-full bg-[#f3f4f6] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>

        <button className="flex items-center gap-1 text-sm text-[#1a1a1a] px-2 py-1 rounded-md hover:bg-[#f3f4f6]">
          O&apos;zbek tili
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-[#e5e7eb]">
          <Image
            src={ismatxurshidov}
            alt="Ismat Xurshidov"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[#1a1a1a]">Ismat Xurshidov</p>
            <p className="text-xs text-[#9ca3af]">Administrator</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}