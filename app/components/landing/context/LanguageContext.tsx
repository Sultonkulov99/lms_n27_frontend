"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import uz from "@/app/components/landing/messages/uz.json";
import ru from "@/app/components/landing/messages/ru.json";
import en from "@/app/components/landing/messages/en.json";

type Language = "O'z" | "Рус" | "Eng";

const translations: Record<Language, any> = {
  "O'z": uz,
  "Рус": ru,
  "Eng": en,
};

interface LanguageContextType {
  selectedLang: Language;
  setSelectedLang: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLang, setSelectedLang] = useState<Language>("O'z");

  // LocalStorage ga tilni saqlash va yuklash
  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && ["O'z", "Рус", "Eng"].includes(saved)) {
      setSelectedLang(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setSelectedLang(lang);
    localStorage.setItem("app_lang", lang);
  };

  // Nesting bo'yicha matnni olish kodi (masalan: "Navbar.home")
  const t = (path: string) => {
    const keys = path.split(".");
    let current = translations[selectedLang];
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key];
      } else {
        return path;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}