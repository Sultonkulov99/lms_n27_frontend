"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; // To'g'ri path ko'rsatilganiga ishonch hosil qiling

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden min-h-[660px] flex items-center bg-gradient-to-r from-[#EAF2FF] via-[#F8FAFC] to-[#FFF3EB] py-12 lg:py-0">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Chap ustun: Gradient Sarlavha, Subtitle va Tugma */}
          <div className="space-y-6 text-left max-w-xl">
            {/* Sarlavha */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              <span
                style={{
                  background:
                    "linear-gradient(92.51deg, #615DFF -2.3%, #FF1111 38.2%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="inline-block"
              >
                {t("hero.title_gradient")}
              </span>{" "}
              <span className="text-slate-900">{t("hero.title_part1")}</span>
              <br />
              <span className="text-slate-900">{t("hero.title_part2")}</span>
            </h1>

            {/* Subtitle / Tavsif */}
            <p className="text-[#64748B] text-base lg:text-[16px] font-normal leading-relaxed max-w-lg">
              {t("hero.subtitle")}
            </p>

            {/* Ko'k Tugma */}
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm lg:text-base shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                {t("hero.button")}
              </Link>
            </div>
          </div>

          {/* O'ng ustun: Hero Rasmi */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px]">
              <Image
                src="/hero.png"
                alt="IT Live Academy Hero Illustration"
                width={600}
                height={450}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}