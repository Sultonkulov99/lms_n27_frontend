import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

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
        className={`${inter.className} min-h-screen antialiased flex flex-col selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
