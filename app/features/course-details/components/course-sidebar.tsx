import { PrecisionStars } from "./precision-stars";

interface CourseSidebarProps {
  price: number;
}

export function CourseSidebar({ price }: CourseSidebarProps) {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center text-white text-xs">
          [ Kursga video razm solish ]
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {formattedPrice} UZS
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Asosiy tushunchalarning mustahkam poydevoriga ega bo'ling va
            qiziqarli va foydali ilovalar yarating!
          </p>
        </div>

        <div className="flex items-center gap-1">
          <PrecisionStars rating={4.5} stars={5} />
        </div>

        <button className="w-full bg-[#1C232C] hover:bg-[#0f172a] text-white py-3 rounded-xl font-medium transition-colors text-sm">
          Sotib olish
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0 relative overflow-hidden">
            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
              OS
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-gray-900 text-sm leading-tight">
              Oybek Safarov
            </h4>
            <p className="text-xs text-gray-400">
              Front-end Developer, Designer
            </p>
            <div className="flex items-center gap-1 pt-0.5">
              <PrecisionStars rating={4.6} stars={1} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-3">
          <div>
            <div className="font-bold text-gray-800 text-sm">100</div>
            <div className="text-[10px] text-gray-400">O'quvchilar</div>
          </div>
          <div className="border-x border-gray-100 px-2">
            <div className="font-bold text-gray-800 text-sm">2</div>
            <div className="text-[10px] text-gray-400">Kurslar</div>
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">245</div>
            <div className="text-[10px] text-gray-400">Ko'rishlar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
