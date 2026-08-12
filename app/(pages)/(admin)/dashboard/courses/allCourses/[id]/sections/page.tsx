"use client";

import React, { useState, use } from "react";
import { 
  Plus, 
  Filter,
  Pen,
  Trash2,
  X,
  Check
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/Pagination";

export default function CourseSectionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = use(params);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [sections, setSections] = useState([
    { id: 1, name: "Veb dasturlashga kirish" },
    { id: 2, name: "CSS asoslari" }
  ]);

  const [newSectionName, setNewSectionName] = useState("");
  const [editingSection, setEditingSection] = useState<{ id: number; name: string } | null>(null);
  const [deletingSectionId, setDeletingSectionId] = useState<number | null>(null);

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    setSections([...sections, { id: Date.now(), name: newSectionName.trim() }]);
    setNewSectionName("");
    setIsAddModalOpen(false);
  };

  const handleEditSection = () => {
    if (!editingSection || !editingSection.name.trim()) return;
    setSections(sections.map(s => s.id === editingSection.id ? { ...s, name: editingSection.name.trim() } : s));
    setEditingSection(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteSection = () => {
    if (deletingSectionId === null) return;
    setSections(sections.filter(s => s.id !== deletingSectionId));
    setDeletingSectionId(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full bg-transparent">
        
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
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <Plus size={18} />
            Bo'lim qo'shish
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-t-xl shadow-sm overflow-hidden border border-gray-200 border-b-0 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white text-[13px] text-gray-900 font-bold tracking-wide border-b border-gray-200">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200">
                    <div className="flex items-center gap-2 cursor-pointer group">
                      Bo'lim nomi <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-right w-32 border border-gray-200">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {sections.length > 0 ? sections.map((section) => (
                  <tr key={section.id} className="bg-white hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${section.id}/lessons`} className="hover:text-blue-600 transition-colors cursor-pointer block w-full">
                        {section.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right border border-gray-200">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button onClick={() => { setEditingSection(section); setIsEditModalOpen(true); }} className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button onClick={() => { setDeletingSectionId(section.id); setIsDeleteModalOpen(true); }} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500 border border-gray-200">
                      Bo'limlar mavjud emas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={15}
            totalItems={sections.length}
            startIndex={0}
            endIndex={Math.min(10, sections.length)}
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

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setNewSectionName(""); setEditingSection(null); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] flex flex-col animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Bo'lim {isEditModalOpen ? "tahrirlash" : "qo'shish"}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setNewSectionName(""); setEditingSection(null); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Biriktirilgan kurs</label>
                <input type="text" disabled value="Veb dasturlash" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-[14px] cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Bo'lim nomi</label>
                <input 
                  type="text" 
                  placeholder="Kiriting" 
                  value={isEditModalOpen ? (editingSection?.name || "") : newSectionName}
                  onChange={(e) => {
                    if (isEditModalOpen && editingSection) {
                      setEditingSection({ ...editingSection, name: e.target.value });
                    } else {
                      setNewSectionName(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]" 
                />
              </div>
              <button 
                onClick={isEditModalOpen ? handleEditSection : handleAddSection}
                className="w-[120px] bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mt-2" 
              >
                <Check size={18} /> Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[400px] flex flex-col items-center text-center p-8 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">?</div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-8">Rostdan ham o'chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => { setIsDeleteModalOpen(false); setDeletingSectionId(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                Bekor qilish
              </button>
              <button onClick={handleDeleteSection} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1">
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
