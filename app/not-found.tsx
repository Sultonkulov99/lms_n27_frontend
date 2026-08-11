import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-slate-900">
      <h2 className="mb-4 text-4xl font-bold">404 - Sahifa topilmadi</h2>
      <p className="mb-8 text-slate-600">Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
