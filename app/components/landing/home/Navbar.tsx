"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/components/landing/context/LanguageContext"; // Loyihangizdagi context yo'li

export default function Navbar() {
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);

  // Til Context-dan olinadi
  const { selectedLang, setSelectedLang, t } = useLanguage();

  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const courseCategories = [
    { title: "UI/UX Dizayn", href: "/courses/ui-ux" },
    { title: "Frontend", href: "/courses/frontend" },
    { title: "Backend", href: "/courses/backend" },
    { title: "Python", href: "/courses/python" },
  ];

  const languages: Array<"O'z" | "Рус" | "Eng"> = ["O'z", "Рус", "Eng"];

  // 1. Sahifa (route) o’zgarganda barcha menyu/dropdownlarni avtomatik yopish
  useEffect(() => {
    setLangDropdownOpen(false);
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // 2. Til tanlash menyusidan tashqariga bosilganda yopish (Click Outside)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Qaysi sahifa aktivligini aniqlash
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  // Aktiv linklar uchun matnga bevosita yaqin ko'k chiziq
  const getLinkStyle = (path: string) => {
    return isActive(path)
      ? "text-slate-900 font-semibold relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
      : "text-[#2F3641] font-medium hover:text-blue-600 transition-colors pb-1";
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors duration-300 ${isDarkMode
          ? "bg-[#151B26] border-b border-[#222A3A]"
          : "bg-white border-b border-slate-100"
        }`}
    >
      <div className="container h-[80px] flex items-center justify-between">
        {/* Chap tomon: Logo va Navigatsiya */}
        <div className="flex items-center gap-10 xl:gap-14">
          {/* KOiDA Brand Logo - Oq fondan xoli, tiniq vektor ko'rinishida */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center font-black text-2xl xl:text-3xl tracking-tight select-none">
              <span
                className={
                  isDarkMode
                    ? "text-[#3B81F4] font-sans"
                    : "text-[#0038A8] font-sans"
                }
              >
                KO
              </span>
              <span className="text-[#FF7A00] font-serif italic text-3xl xl:text-4xl mx-[0.5px]">
                i
              </span>
              <span
                className={
                  isDarkMode
                    ? "text-[#3B81F4] font-sans"
                    : "text-[#0038A8] font-sans"
                }
              >
                DA
              </span>
            </div>
          </Link>

          {/* Desktop Navigatsiya Linklari */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px]">
            {/* Asosiy */}
            <Link href="/" className={getLinkStyle("/")}>
              {t("Navbar.home")}
            </Link>

            {/* Kurslar Dropdown */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <Link
                href="/courses"
                className={`flex items-center gap-1.5 ${getLinkStyle("/courses")}`}
              >
                <span>{t("Navbar.courses")}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${coursesDropdownOpen
                    ? "rotate-180 text-blue-600"
                    : "text-slate-400"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* Kurslar Popup */}
              {coursesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fadeIn">
                  <div
                    className={`w-[135px] rounded-[10px] shadow-lg border p-3 flex flex-col gap-[6px] ${isDarkMode
                        ? "bg-[#181F2B] border-[#222A3A]"
                        : "bg-white border-slate-100"
                      }`}
                  >
                    {courseCategories.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`text-[15px] font-medium transition-colors leading-none py-1 ${isDarkMode
                            ? "text-slate-200 hover:text-blue-400"
                            : "text-[#2F3641] hover:text-blue-600"
                          }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Biz haqimizda */}
            <Link href="/about" className={getLinkStyle("/about")}>
              {t("Navbar.about")}
            </Link>

            {/* Bog’lanish */}
            <Link href="/contact" className={getLinkStyle("/contact")}>
              {t("Navbar.contact")}
            </Link>
          </nav>
        </div>

        {/* O’ng tomon: Til tanlash, Dark Mode va Kirish tugmasi */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector (Click Outside bilan ta'minlandi) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${isDarkMode
                  ? "bg-[#1B2230] text-[#CBD5E1] hover:bg-[#222A3A]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              <span>{selectedLang}</span>
              <svg
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${langDropdownOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {langDropdownOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-20 rounded-[10px] shadow-md border py-1 z-50 animate-fadeIn ${isDarkMode
                    ? "bg-[#181F2B] border-[#222A3A]"
                    : "bg-white border-slate-100"
                  }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${selectedLang === lang
                      ? "text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Icon Button */}
          <button
            onClick={toggleDarkMode}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${isDarkMode
                ? "bg-[#1B2230] text-yellow-400 hover:bg-[#222A3A]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                className="w-4 h-4 fill-current text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Kirish / Ro’yxatdan o’tish tugmasi */}
          <Link
            href="/login"
            className="px-4 py-2.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-xs"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{t("Navbar.login")}</span>
          </Link>
        </div>

        {/* Mobil Menyu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${isDarkMode
              ? "bg-[#1B2230] text-slate-200 hover:bg-[#222A3A]"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobil Menyu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 pt-4 pb-6 space-y-4 shadow-lg animate-fadeIn ${isDarkMode
              ? "bg-[#151B26] border-[#222A3A] text-slate-200"
              : "bg-white border-slate-200 text-[#2F3641]"
            }`}
        >
          <nav className="flex flex-col space-y-3 font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={isActive("/") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
            >
              {t("Navbar.home")}
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className={isActive("/courses") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
            >
              {t("Navbar.courses")}
            </Link>
            <div className={`pl-4 space-y-2 border-l-2 ${isDarkMode ? "border-[#222A3A]" : "border-slate-100"}`}>
              {courseCategories.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm hover:text-blue-500 ${isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={isActive("/about") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
            >
              {t("Navbar.about")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={isActive("/contact") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
            >
              {t("Navbar.contact")}
            </Link>
          </nav>

          <div className={`pt-4 border-t flex flex-col gap-3 ${isDarkMode ? "border-[#222A3A]" : "border-slate-100"}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Til:</span>
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLang(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${selectedLang === l
                        ? "bg-blue-600 text-white"
                        : isDarkMode
                          ? "bg-[#1B2230] text-slate-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-[10px] bg-blue-600 text-white font-medium text-sm shadow-xs"
            >
              {t("Navbar.login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
