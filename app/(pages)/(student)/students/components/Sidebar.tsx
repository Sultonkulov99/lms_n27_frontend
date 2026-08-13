"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Mening kurslarim",
    href: "/students",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={`${isOpen ? 'w-[280px]' : 'w-[70px]'} shrink-0 bg-[#0b0f19] text-white flex flex-col px-4 py-5 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <div className="text-xl font-bold leading-none">
            <span className="text-[#3b82f6]">IT</span>
            <span className="text-white">live</span>
            <sup className="text-[10px] align-super">°</sup>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M15 18l-6-6 6-6" />
            ) : (
              <path d="M9 18l6-6-6-6" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wide text-white/40 uppercase">
            Boshqaruv paneli
          </p>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}

      {!isOpen && (
        <div className="flex flex-col items-center gap-2 mt-2">
          {navItems.map((item) => {
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={item.label}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}