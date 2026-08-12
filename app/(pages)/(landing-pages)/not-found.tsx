import Link from "next/link";
import Navbar from "@/app/components/landing/home/Navbar";
import Footer from "@/app/components/landing/home/Footer";
import { LanguageProvider } from "@/app/components/landing/context/LanguageContext";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
          <h2 className="mb-4 text-8xl font-extrabold text-[#0047FF]">404</h2>
          <h3 className="mb-4 text-3xl font-bold text-[#141518]">Sahifa topilmadi</h3>
          <p className="mb-10 max-w-[500px] text-lg text-slate-600">
            Siz qidirayotgan sahifa mavjud emas, o&apos;chirilgan yoki manzilda xatolik bo&apos;lishi mumkin. 
            Manzilni to&apos;g&apos;ri yozganingizga ishonch hosil qiling.
          </p>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0047FF] px-8 py-3.5 font-medium text-white transition-colors hover:bg-blue-700 shadow-[0_4px_14px_rgba(0,71,255,0.25)]"
          >
            <Home size={20} />
            <span>Bosh sahifaga qaytish</span>
          </Link>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
