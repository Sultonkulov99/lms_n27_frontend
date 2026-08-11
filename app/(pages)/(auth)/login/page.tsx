"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import loginImage from "@/app/assets/login.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#0e0a0b] px-3 pt-1 pb-3">
      {/* TITLE */}
      <div className="h-8 text-sm text-[#555]">
        Login
      </div>

      {/* LOGIN CARD */}
      <section className="flex h-[calc(100vh-44px)] min-h-[600px] overflow-hidden">
        
        {/* LEFT */}
        <div className="relative w-1/2 bg-white">

          {/* LOGO */}
          <div className="absolute left-7 top-6">
            <span className="text-3xl font-bold tracking-tight text-[#3478ed]">
              IT
            </span>

            <span className="text-3xl font-bold tracking-tight text-[#202020]">
              Live
            </span>

            <span className="relative -top-2 text-lg font-bold text-[#3478ed]">
              °
            </span>
          </div>

          {/* LOGIN FORM */}
          <div className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2">

            {/* TITLE */}
            <h1 className="mb-9 text-center text-[26px] font-bold text-black">
              Kirish
            </h1>

            {/* TELEFON */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#333]"
              >
                Telefon
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="+998"
                className="h-[52px] w-full rounded-lg border border-[#dedede] bg-white px-4 text-sm text-black outline-none transition focus:border-[#3478ed] focus:ring-2 focus:ring-[#3478ed]/20"
              />
            </div>

            {/* PAROL */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#333]"
              >
                Parol
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-[52px] w-full rounded-lg border border-[#dedede] bg-white px-4 pr-12 text-sm text-black outline-none transition focus:border-[#3478ed] focus:ring-2 focus:ring-[#3478ed]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="mb-6 mt-4 text-right">
              <button
                type="button"
                className="text-sm text-[#3478ed] hover:underline"
              >
                Parolni unutdingizmi?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="button"
              className="h-[52px] w-full rounded-full bg-[#3d80ed] text-sm font-medium text-white transition hover:bg-[#286fe0] active:scale-[0.99]"
            >
              Kirish
            </button>

            {/* REGISTER */}
            <p className="mt-6 text-center text-sm text-[#666]">
              Men hali ro&apos;yxatdan o&apos;tmadim!{" "}
              <a
                href="/register"
                className="text-[#3478ed] hover:underline"
              >
                Ro&apos;yxatdan o&apos;tish
              </a>
            </p>
          </div>

          {/* FOOTER */}
          <div className="absolute bottom-6 left-7 text-xs text-[#666]">
            © IT Live Academy
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src={loginImage}
            alt="IT Live"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}