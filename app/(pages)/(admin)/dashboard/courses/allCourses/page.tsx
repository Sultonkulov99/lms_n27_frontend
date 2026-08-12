"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Pen,
  Trash2,
  X,
  UploadCloud,
  Check,
  EyeOff,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/dashboard/Header";

export default function AllCoursesPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isToggleActive, setIsToggleActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignedAssistant, setAssignedAssistant] = useState<string | null>(null);

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows([1, 2]); // We have 2 mock rows
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <>
        {/* Courses List Content */}
        <div className="flex-1 overflow-y-auto p-6">
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
              <div className="flex items-center gap-6">
                {selectedRows.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-gray-700">
                      {isToggleActive ? "Faol qilingan" : "Nofaol qilingan"}
                    </span>
                    <button 
                      onClick={() => setIsToggleActive(!isToggleActive)}
                      className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                        isToggleActive ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        isToggleActive ? "translate-x-4" : "translate-x-0"
                      }`}></div>
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setModalMode("add");
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
                >
                  <Plus size={18} />
                  Qo’shish
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Search */}
              <div className="relative w-85">
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
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={selectedRows.length === 2}
                        className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer" 
                      />
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
                      <div className="flex items-center gap-2 justify-center cursor-pointer group">
                        Holati <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                    </th>
                    <th className="p-4 font-medium whitespace-nowrap text-center">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {/* Row 1 */}
                  <tr className={`${selectedRows.includes(1) ? "bg-blue-50/50 hover:bg-blue-50/70" : "hover:bg-gray-50/50"} transition-colors group`}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(1)}
                        onChange={() => handleSelectRow(1)}
                        className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer" 
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-15 h-9 rounded-lg bg-linear-to-brr from-blue-400 to-indigo-500 shadow-sm"></div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      <Link href="/dashboard/courses/allCourses/1" className="hover:text-blue-600 hover:underline transition-colors">
                        Frontend dasturlash
                      </Link>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">Beginner</td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600">Web dasturlash</td>
                    <td className="p-4 text-center">
                      <span className="text-green-600 font-medium text-[13px]">Faol</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button 
                          onClick={() => setIsViewModalOpen(true)}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setModalMode("edit");
                            setIsModalOpen(true);
                          }}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Pen size={16} />
                        </button>
                        <button 
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr className={`${selectedRows.includes(2) ? "bg-blue-50/50 hover:bg-blue-50/70" : "hover:bg-gray-50/50"} transition-colors group`}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(2)}
                        onChange={() => handleSelectRow(2)}
                        className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer" 
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-15 h-9 rounded-lg bg-linear-to-br from-orange-400 to-red-500 shadow-sm"></div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      <Link href="/dashboard/courses/allCourses/2" className="hover:text-blue-600 hover:underline transition-colors">
                        Frontend dasturlash
                      </Link>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">Beginner</td>
                    <td className="p-4 text-gray-900 font-medium">250 000</td>
                    <td className="p-4 text-gray-600">Web dasturlash</td>
                    <td className="p-4 text-center">
                      <span className="text-red-500 font-medium text-[13px]">Nofaol</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button 
                          onClick={() => setIsViewModalOpen(true)}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setModalMode("edit");
                            setIsModalOpen(true);
                          }}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Pen size={16} />
                        </button>
                        <button 
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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

      {/* Add Course Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl w-full max-w-150 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "add" ? "Qo’shish" : "Tahrirlash"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              
              {/* Uploads */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Banner</label>
                  <div className={`border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center ${modalMode === "edit" ? "p-2" : "py-6 px-4"} bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group text-center`}>
                    {modalMode === "edit" ? (
                      <div className="w-full h-24 mb-3 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 shadow-sm relative overflow-hidden flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <UploadCloud size={16} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={20} />
                      </div>
                    )}
                    <p className="text-[12px] text-gray-500 mb-0.5"><span className="text-blue-600 font-medium">Bu yerga torting</span> yoki faylni tanlang</p>
                    <p className="text-[10px] text-gray-400">SVG, PNG, JPG (max. 800x400)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kirish video</label>
                  <div className={`border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center ${modalMode === "edit" ? "p-2" : "py-6 px-4"} bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group text-center`}>
                    {modalMode === "edit" ? (
                      <div className="w-full h-24 mb-3 rounded-xl bg-linear-to-br from-orange-400 to-red-500 shadow-sm relative overflow-hidden flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <UploadCloud size={16} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={20} />
                      </div>
                    )}
                    <p className="text-[12px] text-gray-500 mb-0.5"><span className="text-blue-600 font-medium">Bu yerga torting</span> yoki faylni tanlang</p>
                    <p className="text-[10px] text-gray-400">MP4, WebM (max. 50MB)</p>
                  </div>
                </div>
              </div>

              {/* Course Name */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kurs nomi</label>
                <input 
                  type="text" 
                  defaultValue={modalMode === "edit" ? "Frontend dasturlash" : ""}
                  placeholder="Kiriting" 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-gray-400 transition-shadow"
                />
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kurs haqida</label>
                <textarea 
                  rows={3}
                  defaultValue={modalMode === "edit" ? "Bu kursda siz noldan boshlab frontend dasturlashni o’rganasiz..." : ""}
                  placeholder="Kiriting" 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-gray-400 transition-shadow resize-none"
                />
              </div>

              {/* Level & Price */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Darajasi</label>
                  <div className="relative">
                    <select 
                      defaultValue={modalMode === "edit" ? "beginner" : ""}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 bg-white appearance-none transition-shadow cursor-pointer"
                    >
                      <option value="" disabled>Tanlang</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Narxi</label>
                  <input 
                    type="number" 
                    defaultValue={modalMode === "edit" ? 250000 : undefined}
                    placeholder="400 000" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-gray-400 transition-shadow"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kategoriya</label>
                <div className="relative">
                  <select 
                    defaultValue={modalMode === "edit" ? "web" : ""}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 bg-white appearance-none transition-shadow cursor-pointer"
                  >
                    <option value="" disabled>Tanlang</option>
                    <option value="web">Web Dasturlash</option>
                    <option value="mobile">Mobil Dasturlash</option>
                    <option value="design">Dizayn</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex items-center bg-gray-50/50 rounded-b-3xl">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSuccessMessage(modalMode === "add" ? "Muvaffaqiyatli qo’shildi" : "Muvaffaqiyatli o’zgartirildi");
                  setIsSuccessModalOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
              >
                <Check size={18} />
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl w-full max-w-100 p-8 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <span className="text-3xl font-bold">?</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-8">Siz rostdan ham o’chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                O’chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl w-full max-w-100 p-8 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-8">{successMessage}</h2>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm inline-block"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* View Course Details Modal */}
      {isViewModalOpen && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl w-full max-w-125 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Batafsil</h2>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <EyeOff size={18} />
                </button>
                <button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setModalMode("edit");
                    setIsModalOpen(true);
                  }}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Pen size={18} />
                </button>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              
              <div>
                <p className="text-[12px] font-semibold text-gray-500 mb-1">Kurs nomi</p>
                <p className="text-sm font-medium text-gray-900">Frontend dasturlash</p>
              </div>

              <div>
                <div className="w-full h-32 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 shadow-sm mb-2"></div>
                <div className="flex items-center gap-1.5 text-blue-600 text-[13px] font-medium cursor-pointer hover:underline">
                  <LinkIcon size={14} />
                  Banner.jpg
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Darajasi</p>
                  <p className="text-sm font-medium text-gray-900">Beginner</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Narxi</p>
                  <p className="text-sm font-medium text-gray-900">250 000 so’m</p>
                </div>
                
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Sana</p>
                  <p className="text-sm font-medium text-gray-900">24.04.2024 14:01:25</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Kategoriya</p>
                  <p className="text-sm font-medium text-gray-900">Web dasturlash</p>
                </div>
                
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Mentor</p>
                  <p className="text-sm font-medium text-gray-900">Safarov Oybek</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Holati</p>
                  <p className="text-sm font-medium text-green-600">Faol</p>
                </div>
                
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">Assistent</p>
                  {assignedAssistant ? (
                    <div className="flex items-center justify-between group">
                      <p className="text-sm font-medium text-gray-900">{assignedAssistant}</p>
                      <button 
                        onClick={() => setAssignedAssistant(null)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsAssignModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                    >
                      Biriktirish
                    </button>
                  )}
                </div>
                
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-1">O’quvchilar soni</p>
                  <p className="text-sm font-medium text-gray-900">113</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Assistant Modal */}
      {isAssignModalOpen && (
        <div 
          className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsAssignModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-xl w-full max-w-100 flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Assistent biriktirish</h2>
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-6">
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Assistentni tanlang</label>
              <div className="relative">
                <select 
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 bg-white appearance-none transition-shadow cursor-pointer"
                >
                  <option value="" disabled>Tanlang</option>
                  <option value="Safarov Oybek">Safarov Oybek</option>
                  <option value="Aliyev Vali">Aliyev Vali</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="px-6 py-5 border-t border-gray-100 flex items-center bg-gray-50/50 rounded-b-3xl">
              <button 
                onClick={() => {
                  setAssignedAssistant("Safarov Oybek");
                  setIsAssignModalOpen(false);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
              >
                <Check size={18} />
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
