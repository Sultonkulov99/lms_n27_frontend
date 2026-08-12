"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import loginImage from "@/app/assets/login2.png";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-white">
            <section className="flex min-h-screen">

                {/* ================= LEFT ================= */}
                <div className="relative flex w-1/2 min-h-screen flex-col bg-white">

                    {/* LOGO */}
                    <div className="absolute left-7 top-6">
                        <span className="text-[24px] font-bold text-[#3478ed]">
                            IT
                        </span>

                        <span className="text-[24px] font-bold text-[#202020]">
                            Live
                        </span>

                        <span className="relative -top-2 text-[14px] font-bold text-[#3478ed]">
                            °
                        </span>
                    </div>

                    {/* LOGIN FORM */}
                    <div className="absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2">

                        {/* TITLE */}
                        <h1 className="mb-7 text-left text-[22px] font-bold text-black">
                            Kirish
                        </h1>

                        {/* TELEFON */}
                        <div className="mb-5">
                            <label
                                htmlFor="phone"
                                className="mb-1.5 block text-[11px] font-medium text-[#333]"
                            >
                                Telefon
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                placeholder="+998"
                                className="h-[42px] w-full rounded-md border border-[#dedede] bg-white px-3 text-[12px] text-black outline-none transition focus:border-[#3478ed] focus:ring-2 focus:ring-[#3478ed]/20"
                            />
                        </div>

                        {/* PAROL */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-[11px] font-medium text-[#333]"
                            >
                                Parol
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    className="h-[42px] w-full rounded-md border border-[#dedede] bg-white px-3 pr-10 text-[12px] text-black outline-none transition focus:border-[#3478ed] focus:ring-2 focus:ring-[#3478ed]/20"
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Parolni yashirish"
                                            : "Parolni ko'rsatish"
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] transition hover:text-[#555]"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* FORGOT PASSWORD */}
                        <div className="mb-5 mt-3 text-right">
                            <button
                                type="button"
                                className="text-[10px] text-[#3478ed] hover:underline"
                            >
                                Parolni unutdingizmi?
                            </button>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="button"
                            className="h-[42px] w-full rounded-full bg-[#3d80ed] text-[11px] font-medium text-white transition hover:bg-[#286fe0] active:scale-[0.99]"
                        >
                            Kirish
                        </button>

                        {/* REGISTER */}
                        <p className="mt-5 text-center text-[10px] text-[#666]">
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
                    <div className="absolute bottom-5 left-7 text-[9px] text-[#666]">
                        © IT Live Academy
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="relative min-h-screen w-1/2 overflow-hidden">

                    <Image
                        src={loginImage}
                        alt="IT Live"
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />

                </div>
            </section>
        </main>
    );
}