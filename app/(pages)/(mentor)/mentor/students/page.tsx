"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import { useMentorStore } from "@/store/useMentorStore";

export default function StudentsPage() {
  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { courses } = useMentorStore();
  const [selectedCourse, setSelectedCourse] = useState("");

  // Update selected course if courses load and none is selected
  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0].name);
    }
  }, [courses, selectedCourse]);

  const [students, setStudents] = useState([
    { id: 8, image: "https://i.pravatar.cc/150?u=8", name: "Alisher", phone: "+998338644553", price: "1 200 000 so'm", date: "19.08.2026", course: "CSS" },
    { id: 9, image: "https://i.pravatar.cc/150?u=9", name: "Cloud", phone: "+998903551111", price: "1 200 000 so'm", date: "12.08.2026", course: "CSS" },
    { id: 11, image: "https://i.pravatar.cc/150?u=11", name: "Ali Valiyevl", phone: "+998995095602", price: "1 200 000 so'm", date: "14.08.2026", course: "CSS" },
    { id: 23, image: "https://i.pravatar.cc/150?u=23", name: "admin", phone: "+998505209272", price: "1 200 000 so'm", date: "19.08.2026", course: "CSS" },
  ]);

  // Derived state
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      (student.course === selectedCourse) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       student.phone.includes(searchQuery))
    );
  }, [students, searchQuery, selectedCourse]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    // Dummy implementation for now
    console.log("Download XLS");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Top Page Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 mb-1">O'quvchilarim</h1>
        <div className="flex items-center text-[13px] text-gray-500 font-medium">
          Mening kurslarim <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></span> O'quvchilar
        </div>
      </div>

      {/* Filter Row: Dropdown */}
      <div className="mb-4 w-[300px]">
        <div className="relative">
          <select 
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 outline-none shadow-sm cursor-pointer"
          >
            {courses.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Search and Pagination Info Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Izlash..."
            value={searchQuery}
            onChange={e => {
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
        
        {/* We can place the pagination here or rely on the bottom pagination component from Kebyu's design. The screenshot shows pagination at the top right, but the standard Kebyu UI has Pagination component at the bottom. I'll add the standard Kebyu UI Pagination at the bottom to follow the "Kebyu UI" rule tightly, but I'll add a simplified top pagination info to match the screenshot if needed. Let's just stick to the standard Kebyu UI Pagination at the bottom, and maybe a small page info at the top. The image has 'Bir sahifada: 10', '1', 'Keyingi' at the top right. I'll put a simplified version here if I don't use the full component. Actually, `Pagination` component is designed for the bottom. I will just use `Pagination` at the bottom to perfectly match Kebyu's style. */}
      </div>

      {/* Table (Excel Style Borders) */}
      <div className="bg-white rounded-t-xl shadow-sm overflow-hidden border border-gray-200 border-b-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-hidden min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                <th className="px-5 py-4 w-16 border border-gray-200 border-t-0 border-l-0 border-r-0">ID</th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">O'quvchi <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Telefon raqam <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Narxi <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                <th className="px-5 py-4 border border-gray-200 border-t-0 border-r-0">Sotib olgan sana <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-gray-800">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4 font-medium border border-gray-200 border-l-0 border-r-0">{student.id}</td>
                  <td className="px-5 py-4 border border-gray-200 border-r-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-[12px]">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-[13px]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200 border-r-0">{student.phone}</td>
                  <td className="px-5 py-4 font-bold text-[13px] text-gray-900 border border-gray-200 border-r-0">{student.price}</td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200 border-r-0">{student.date}</td>
                </tr>
              ))}
              {currentStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 border border-gray-200 border-l-0 border-r-0">
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
          totalItems={filteredStudents.length}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onDownloadXLS={handleDownloadXLS}
        />
      </div>
    </div>
  );
}
