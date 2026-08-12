"use client";

import React, { useState } from "react";
import {
  Search,
  Settings2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/app/components/dashboard/SideBar";
import Header from "@/app/components/dashboard/Header";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows([1, 2]); // assuming 2 rows
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        {/* Breadcrumb */}
        <div className="px-8 pt-4 pb-2">
          <p className="text-[13px] text-blue-500 font-medium">
            Kurslar \ Barcha kurslar
          </p>
        </div>

        <div className="flex-1 overflow-auto p-8 pt-2">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Kursda qatnashuvchilar
            </h1>
            <div className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="font-medium">Kurslar</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Frontend dasturlash</span>
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white p-4 rounded-t-2xl border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between shadow-sm">
            {/* Search & Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Izlash"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-gray-400 bg-gray-50/50 transition-shadow"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                <Settings2 size={18} />
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Bir sahifada:</span>
                <select className="border border-gray-200 rounded-lg px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  3
                </button>
                <span className="text-gray-400 mx-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  15
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 ml-1 text-sm font-medium">
                  Keyingi <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-4 w-[50px]">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedRows.length === 2}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-4 text-[13px] font-semibold text-gray-600">
                      Ism
                    </th>
                    <th className="p-4 text-[13px] font-semibold text-gray-600">
                      Telefon raqami
                    </th>
                    <th className="p-4 text-[13px] font-semibold text-gray-600">
                      Narxi
                    </th>
                    <th className="p-4 text-[13px] font-semibold text-gray-600">
                      To’lov turi
                    </th>
                    <th className="p-4 text-[13px] font-semibold text-gray-600">
                      Yaratilgan vaqt
                    </th>
                    <th className="p-4 w-[50px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Row 1 */}
                  <tr
                    className={`hover:bg-blue-50/30 transition-colors ${selectedRows.includes(1) ? "bg-blue-50/50" : ""}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(1)}
                        onChange={() => handleSelectRow(1)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-900">Akbar</td>
                    <td className="p-4 text-gray-600 text-[13px]">
                      +998 00 000 00 00
                    </td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600 text-[13px]">Payme</td>
                    <td className="p-4 text-gray-500 text-[13px]">
                      01.01.2024
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr
                    className={`hover:bg-blue-50/30 transition-colors ${selectedRows.includes(2) ? "bg-blue-50/50" : ""}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(2)}
                        onChange={() => handleSelectRow(2)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-900">Sherali</td>
                    <td className="p-4 text-gray-600 text-[13px]">
                      +998 00 000 00 00
                    </td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600 text-[13px]">Naqd</td>
                    <td className="p-4 text-gray-500 text-[13px]">
                      01.01.2024
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Footer Info */}
            <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-6">
                <p className="text-gray-500">Sahifada 1-10 gacha. Umumiy 5ta</p>
                <button className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors">
                  <Download size={14} />5 ta nusxab olish XLS
                </button>
              </div>

              {/* Bottom Pagination */}
              <div className="flex items-center gap-1">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium shadow-sm">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  2
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  3
                </button>
                <span className="text-gray-400 mx-1">...</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
                  15
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 ml-1 font-medium">
                  Keyingi <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
