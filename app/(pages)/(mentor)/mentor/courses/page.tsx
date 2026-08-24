"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ChevronDown, PlusCircle, Eye, Upload, Check } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import { useMentorStore } from "@/store/useMentorStore";

export default function MentorCoursesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const { courses, addCourse } = useMentorStore();

  // Derived state
  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCourses.length);
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handleSaveCourse = () => {
    // Basic validation could be added here
    const newCourse = {
      id: Math.floor(1000 + Math.random() * 9000),
      banner: "https://via.placeholder.com/150", // Placeholder for newly added course
      name: courseName || "Yangi Kurs",
      level: level || "BEGINNER",
      price: price || "0 so'm",
      category: category || "Boshqa",
      status: "Faol",
    };
    
    addCourse(newCourse);
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Reset form
    setCourseName("");
    setCourseDesc("");
    setLevel("");
    setPrice("");
    setCategory("");
  };

  const handleDownloadXLS = () => {
    console.log("Download XLS");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 relative">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 mb-1">Mening kurslarim</h1>
          <div className="flex items-center text-[13px] text-gray-500 font-medium">
            Materiallar <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></span> Mening kurslarim
          </div>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle size={18} strokeWidth={2} />
          Qo'shish
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Izlash..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors bg-white shadow-sm"
          />
          {searchQuery && (
            <X 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" 
              size={16} 
              onClick={() => setSearchQuery("")} 
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-t-xl shadow-sm overflow-hidden border border-gray-200 border-b-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-hidden min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-l-0 border-r-0">Banner</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Kurs nomi</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Darajasi</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Narxi</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Kategoriya</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Holati</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-gray-800">
              {currentCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4 border border-gray-200 border-l-0 border-r-0">
                    <img 
                      src={course.banner} 
                      alt={course.name} 
                      className="h-[40px] w-auto object-contain rounded border border-gray-100 bg-white"
                    />
                  </td>
                  <td className="px-5 py-4 font-medium text-blue-600 border border-gray-200 border-r-0 cursor-pointer hover:underline">
                    {course.name}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-900 text-[13px] border border-gray-200 border-r-0">
                    {course.level}
                  </td>
                  <td className="px-5 py-4 font-bold text-[13px] text-gray-900 border border-gray-200 border-r-0">
                    {course.price}
                  </td>
                  <td className="px-5 py-4 text-blue-600 text-[13px] font-medium border border-gray-200 border-r-0 cursor-pointer hover:underline">
                    {course.category}
                  </td>
                  <td className="px-5 py-4 border border-gray-200 border-r-0">
                    <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#CEEAD6]">
                      {course.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border border-gray-200 border-r-0">
                    <div className="flex items-center justify-center">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500 border border-gray-200 border-l-0 border-r-0">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bottom Pagination Component */}
      <div className="border border-gray-200 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCourses.length}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onDownloadXLS={handleDownloadXLS}
        />
      </div>

      {/* Add Modal Overlay */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px] p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="bg-white relative flex flex-col w-full max-w-[700px] max-h-[90vh] rounded-[16px] p-[24px_32px] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0 border-b border-gray-100 pb-4">
              <h2 className="text-[20px] font-bold text-gray-900">
                Qo'shish
              </h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>
            
            {/* Form Fields */}
            <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2 pb-4">
              
              {/* Uploads Row */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Banner Upload */}
                <div className="flex-1 flex flex-col">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Banner</label>
                  <label className="flex flex-col items-center justify-center h-[140px] rounded-xl border-[1.5px] border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 border border-gray-100">
                      <PlusCircle size={20} className="text-gray-400" />
                    </div>
                    <span className="text-[13px] text-gray-500 mb-1">
                      <span className="text-blue-600 font-medium">Bu yerga bosing</span> yoki faylni suring
                    </span>
                    <span className="text-[11px] text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                
                {/* Intro Video Upload */}
                <div className="flex-1 flex flex-col">
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Intro video</label>
                  <label className="flex flex-col items-center justify-center h-[140px] rounded-xl border-[1.5px] border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 border border-gray-100">
                      <PlusCircle size={20} className="text-gray-400" />
                    </div>
                    <span className="text-[13px] text-gray-500 mb-1">
                      <span className="text-blue-600 font-medium">Bu yerga bosing</span> yoki faylni suring
                    </span>
                    <span className="text-[11px] text-gray-400">.mp4 fayl kengaytma mumkin (max. 5 Mb)</span>
                    <input type="file" accept="video/mp4" className="hidden" />
                  </label>
                </div>
              </div>
              
              {/* Kurs nomi */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Kurs nomi</label>
                <input 
                  type="text" 
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Kiriting" 
                  className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                />
              </div>
              
              {/* Kurs haqida */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Kurs haqida</label>
                <textarea 
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="Kiriting" 
                  className="w-full px-4 py-3 min-h-[100px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors resize-y"
                ></textarea>
              </div>

              {/* Darajasi & Narxi */}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col relative">
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Darajasi</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 h-[48px] appearance-none rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors bg-white cursor-pointer"
                  >
                    <option value="" disabled>Tanlang</option>
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="ADVANCED">ADVANCED</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-[38px] text-gray-400 pointer-events-none" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Narxi</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00 so'm" 
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Kategoriya */}
              <div className="flex flex-col shrink-0 relative">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Kategoriya</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 h-[48px] appearance-none rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors bg-white cursor-pointer"
                >
                  <option value="" disabled>Tanlang</option>
                  <option value="Dasturlash">Dasturlash</option>
                  <option value="Dizayn">Dizayn</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-[38px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Save Button */}
            <div className="mt-6 shrink-0">
              <button 
                onClick={handleSaveCourse}
                className="w-full h-[48px] flex items-center justify-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
              >
                <Check size={18} strokeWidth={2.5} />
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px]"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[20px] shadow-xl p-8 w-[400px] flex flex-col items-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[84px] h-[84px] rounded-full bg-[#E6F4EA] flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] rounded-full bg-[#137333] flex items-center justify-center text-white">
                <Check size={32} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-8 text-center">Muvaffaqiyatli qo'shildi</h3>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-8 py-3 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
