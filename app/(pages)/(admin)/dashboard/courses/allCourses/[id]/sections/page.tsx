"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Filter,
  Pen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/Pagination";

export default function CourseSectionsPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Fake data for sections
  const sections = [
    { id: 1, name: "Veb dasturlashga kirish" },
    { id: 2, name: "CSS asoslari" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-7 flex flex-col min-h-full">
        
        {/* Box Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Bo'limlar</h1>
            <div className="flex items-center text-[13px] font-medium gap-2">
              <Link href="/dashboard/courses/allCourses" className="text-gray-500 hover:text-gray-700 transition-colors">Kurslar</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-gray-500">Frontend dasturlash</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-gray-900">Bo'limlar</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <Plus size={18} />
            Bo'lim qo'shish
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex-1 mb-6 border border-gray-100 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white text-[13px] text-gray-900 font-bold tracking-wide border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-2 cursor-pointer group">
                      Bo'lim nomi <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-right w-32">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800 divide-y divide-gray-100">
                {sections.map((section) => (
                  <tr key={section.id} className="bg-white hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link href={`/dashboard/courses/allCourses/${params.id}/sections/${section.id}/lessons`} className="hover:text-blue-600 transition-colors cursor-pointer block w-full">
                        {section.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={15}
            totalItems={2}
            startIndex={0}
            endIndex={10}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1);
            }}
            onDownloadXLS={() => {}}
          />
        </div>

      </div>
    </div>
  );
}
