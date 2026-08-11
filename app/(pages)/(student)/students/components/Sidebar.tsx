export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-[#0b0f19] text-white flex flex-col px-4 py-5">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-bold leading-none">
          <span className="text-[#3b82f6]">IT</span>
          <span className="text-white">live</span>
          <sup className="text-[10px] align-super">°</sup>
        </div>
        <button className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </div>

      <button className="w-full text-left bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-3 py-2 text-xs font-semibold tracking-wide mb-2">
        BOSHQARUV PANELI
      </button>

      <nav className="mt-1">
        <a
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
          </svg>
          Mening kurslarim
        </a>
      </nav>
    </aside>
  );
}