"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-slate-900">
      <h2 className="mb-4 text-2xl font-bold">Nimadir xato ketdi!</h2>
      <p className="mb-6 text-slate-600">Sahifani yuklashda muammo yuzaga keldi.</p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Qayta urinib ko'rish
      </button>
    </div>
  );
}
