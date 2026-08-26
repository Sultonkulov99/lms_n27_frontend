"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import { API_URL, baseAPI } from "@/app/lib/utils";

interface Course { id: number; name: string }
interface Student {
  id: number;
  name: string;
  phone: string;
  image?: string | null;
  price?: string;
  date?: string;
  course: string;
}

export default function StudentsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await baseAPI.get("/courses/my-courses");
        const data = Array.isArray(response.data) ? response.data : response.data?.data ?? [];
        setCourses(data);
        if (data.length) setSelectedCourse(String(data[0].id));
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    baseAPI.get(`/students/my-students?courseId=${selectedCourse}`)
      .then((response) => setStudents(response.data?.data ?? []))
      .catch(() => setStudents([]));
  }, [selectedCourse]);

  const filteredStudents = useMemo(() => students.filter((student) =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) || student.phone?.includes(searchQuery)
  ), [students, searchQuery]);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);
  const getAvatarUrl = (image?: string | null) => image?.startsWith("http") ? image : image ? `${API_URL}${image}` : null;
  const download = () => {
    const rows = filteredStudents.map((student) => [student.id, student.name, student.phone, student.course].join(","));
    const url = URL.createObjectURL(new Blob([["ID,Ism,Telefon,Kurs", ...rows].join("\n")], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url; link.download = "oquvchilar.csv"; link.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6"><h1 className="text-[24px] font-bold text-gray-900 mb-1">O&apos;quvchilarim</h1><div className="text-[13px] text-gray-500">Mening kurslarim <span className="mx-2">•</span> O&apos;quvchilar</div></div>
      <div className="mb-4 w-[300px] relative">
        <select value={selectedCourse} onChange={(event) => { setSelectedCourse(event.target.value); setCurrentPage(1); }} className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 outline-none shadow-sm">
          {courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
        </select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-3.5 text-gray-500" />
      </div>
      <div className="relative max-w-[400px] mb-6"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="Izlash..." className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm outline-none bg-white shadow-sm" />{searchQuery && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} onClick={() => setSearchQuery("")} />}</div>
      <div className="bg-white rounded-t-xl shadow-sm overflow-hidden border border-gray-200 border-b-0 overflow-x-auto"><table className="w-full text-left min-w-[850px]"><thead><tr className="text-[12px] font-bold text-gray-900"><th className="px-5 py-4">ID</th><th className="px-5 py-4">O&apos;quvchi</th><th className="px-5 py-4">Telefon raqam</th><th className="px-5 py-4">Narxi</th><th className="px-5 py-4">Sotib olgan sana</th></tr></thead><tbody className="text-[14px]">
        {loading ? <tr><td colSpan={5} className="p-10 text-center"><Loader2 className="inline animate-spin" /></td></tr> : currentStudents.length ? currentStudents.map((student) => { const avatar = getAvatarUrl(student.image); return <tr key={`${student.id}-${student.course}`} className="border-t border-gray-100"><td className="px-5 py-4">{student.id}</td><td className="px-5 py-4"><div className="flex items-center gap-3">{avatar ? <img src={avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">{student.name?.[0]}</div>}<span className="font-semibold">{student.name}</span></div></td><td className="px-5 py-4 text-gray-600">{student.phone}</td><td className="px-5 py-4">{student.price ?? "-"}</td><td className="px-5 py-4 text-gray-600">{student.date ? new Date(student.date).toLocaleDateString() : "-"}</td></tr>; }) : <tr><td colSpan={5} className="p-10 text-center text-gray-500">Ma&apos;lumot topilmadi</td></tr>}
      </tbody></table></div>
      <div className="border border-gray-200 rounded-b-xl overflow-hidden bg-[#F8F9FA]"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredStudents.length} startIndex={startIndex} endIndex={endIndex} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} onItemsPerPageChange={setItemsPerPage} onDownloadXLS={download} /></div>
    </div>
  );
}
