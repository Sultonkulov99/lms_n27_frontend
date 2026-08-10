import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IT Live Academy — Zamonaviy IT Kasblar Maktabi",
  description:
    "Dasturlash, UI/UX Dizayn, Kiberxavfsizlik va Data Science bo'yicha amaliy IT kurslar va karyera markazi.",
  keywords: [
    "IT Live Academy",
    "Dasturlash kursi",
    "Frontend",
    "Backend",
    "UI/UX Dizayn",
    "Toshkent IT maktab",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
