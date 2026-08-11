"use client";

import {
  ChevronDown,
  Search,
  Filter,
  Plus,
  FileText,
  Download
} from "lucide-react";
import Sidebar from "@/app/components/dashboard/SideBar";
import Header from "@/app/components/dashboard/Header";

export default function AllCoursesPage() {

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden text-gray-900">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        {/* Courses List Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-2">
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-7 flex flex-col min-h-full">
            {/* Box Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Kurslar</h1>
                <div className="flex items-center text-[13px] font-medium gap-2">
                  <span className="text-gray-500">Kurslar</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-blue-500">Barcha kurslar</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
                <Plus size={18} />
                Qo'shish
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Search */}
              <div className="relative w-[340px]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Izlash"
                  className="w-full pl-10 pr-11 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer border-l border-gray-200 my-2.5 pl-3">
                  <Filter size={16} className="text-gray-400 hover:text-gray-600" />
                </div>
              </div>

              {/* Pagination Top */}
              <div className="flex items-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-3 text-gray-500">
                  <span>Bir sahifada:</span>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                    <span className="text-gray-700">10</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[13px]">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                  <span className="text-gray-400 px-1">...</span>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">15</button>
                  <button className="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ml-1">Keyingi</button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-[13px] text-gray-500 border-b border-gray-100">
                    <th className="p-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-blue-600" />
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Banner <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      Kurs nomi
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Bo'limlar <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Darajasi <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Narxi <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Kategoriya <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end cursor-pointer group">
                        Holati
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {/* Row 1 */}
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer" />
                    </td>
                    <td className="p-4">
                      <div className="w-[60px] h-[36px] rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 shadow-sm"></div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      Frontend dasturlash
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors font-medium">
                        Batafsil <FileText size={15} />
                      </button>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">Beginner</td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600">Web dasturlash</td>
                    <td className="p-4 text-right">
                      <span className="text-green-600 font-medium text-[13px]">Faol</span>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer" />
                    </td>
                    <td className="p-4">
                      <div className="w-[60px] h-[36px] rounded-lg bg-gradient-to-br from-orange-400 to-red-500 shadow-sm"></div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      Frontend dasturlash
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors font-medium">
                        Batafsil <FileText size={15} />
                      </button>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">Beginner</td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600">Web dasturlash</td>
                    <td className="p-4 text-right">
                      <span className="text-red-500 font-medium text-[13px]">Nofaol</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="flex items-center justify-between mt-auto pt-2 text-[13px] font-medium">
              <div className="flex items-center gap-6">
                <span className="text-gray-500">
                  Sahifada 1-10 gacha. Umumiy 2ta
                </span>
                <button className="flex items-center gap-2 text-[#00A36C] bg-[#E8F8F1] hover:bg-[#D1F0E3] px-3.5 py-2 rounded-lg transition-colors font-semibold">
                  <Download size={16} />
                  Yuklab olish XLS
                </button>
              </div>
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-3">
                  <span>Bir sahifada:</span>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 text-gray-700">
                    <span>10</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                  <span className="text-gray-400 px-1">...</span>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">15</button>
                  <button className="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ml-1">Keyingi</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
