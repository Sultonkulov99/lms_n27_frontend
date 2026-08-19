"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  ChevronDown,
  Pencil,
  Trash2,
  Eye,
  Check,
  Globe,
  Send,
  Camera,
  Briefcase,
  Code,
  ChevronRight,
} from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";

interface Student {
  id: number;
  image: string;
  name: string;
  phone: string;
  role: string;
  date: string;
  status: string;
}

const initialStudents: Student[] = [
  { id: 1, image: "https://i.pravatar.cc/150?u=s1", name: "Istamov Xurshid Hazratqul o'g'li", phone: "+998 99 999 99 99", role: "Student", date: "2023-04-09 14:21:44", status: "Faol" },
  { id: 2, image: "https://i.pravatar.cc/150?u=s2", name: "Istamov Xurshid Hazratqul o'g'li", phone: "+998 99 999 99 99", role: "Student", date: "2023-04-09 14:21:44", status: "Faol" },
  { id: 3, image: "https://i.pravatar.cc/150?u=s3", name: "Istamov Xurshid Hazratqul o'g'li", phone: "+998 99 999 99 99", role: "Student", date: "2023-04-09 14:21:44", status: "Faol" },
  { id: 4, image: "https://i.pravatar.cc/150?u=s4", name: "Alimova Barno Salim qizi", phone: "+998 90 123 45 67", role: "Student", date: "2023-05-12 10:15:00", status: "Faol" },
  { id: 5, image: "https://i.pravatar.cc/150?u=s5", name: "Yusupov Doniyor Hamid o'g'li", phone: "+998 91 234 56 78", role: "Student", date: "2023-06-18 09:30:00", status: "Faol" },
  { id: 6, image: "https://i.pravatar.cc/150?u=s6", name: "Qodirova Zebo Mansur qizi", phone: "+998 93 345 67 89", role: "Student", date: "2023-07-22 11:45:00", status: "Faol" },
  { id: 7, image: "https://i.pravatar.cc/150?u=s7", name: "Rahmonov Sardor Ulug'bek o'g'li", phone: "+998 97 456 78 90", role: "Student", date: "2023-08-05 08:00:00", status: "Faol" },
  { id: 8, image: "https://i.pravatar.cc/150?u=s8", name: "Karimova Malika Sherzod qizi", phone: "+998 99 567 89 01", role: "Student", date: "2023-09-14 13:20:00", status: "Faol" },
  { id: 9, image: "https://i.pravatar.cc/150?u=s9", name: "Toshmatov Murod Komil o'g'li", phone: "+998 88 678 90 12", role: "Student", date: "2023-10-01 16:00:00", status: "Faol" },
  { id: 10, image: "https://i.pravatar.cc/150?u=s10", name: "Nazarova Dilnoza Bekzod qizi", phone: "+998 33 789 01 23", role: "Student", date: "2023-11-11 12:30:00", status: "Faol" },
  { id: 11, image: "https://i.pravatar.cc/150?u=s11", name: "Mirzayev Jasur Anvar o'g'li (2-bet)", phone: "+998 77 890 12 34", role: "Student", date: "2023-12-25 10:00:00", status: "Faol" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // View modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editNameError, setEditNameError] = useState(false);
  const [editPhoneError, setEditPhoneError] = useState(false);

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery)
    );
  }, [students, searchQuery]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    const headers = ["ID", "F.I.Sh", "Telefon raqam", "Rol", "Yaratilgan vaqt", "Holati"];
    const rows = students.map((s) =>
      [s.id, s.name, s.phone, s.role, s.date, s.status].join(",")
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "oquvchilar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditPhone(student.phone);
    setEditNameError(false);
    setEditPhoneError(false);
    setIsEditModalOpen(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9+\s]/g, "");
    if (!val.startsWith("+998")) {
      val = "+998" + val.replace(/\+998/g, "").trim();
    }
    if (val.length <= 16) {
      setEditPhone(val);
      if (editPhoneError) setEditPhoneError(false);
    }
  };

  const handleSaveEdit = () => {
    let hasError = false;
    if (!editName.trim()) { setEditNameError(true); hasError = true; }
    else setEditNameError(false);
    if (editPhone.replace(/\s/g, "").length < 13) { setEditPhoneError(true); hasError = true; }
    else setEditPhoneError(false);
    if (hasError) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingStudent?.id
          ? { ...s, name: editName.trim(), phone: editPhone }
          : s
      )
    );
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (deletingId === null) return;
    setStudents((prev) => prev.filter((s) => s.id !== deletingId));
    if (currentStudents.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-[24px] font-bold text-gray-900 mb-1">O'quvchilar</h1>
          <div className="flex items-center text-[13px] text-gray-500 font-medium">
            Foydalanuvchilar
            <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full inline-block"></span>
            O'quvchilar
          </div>
        </div>

        {/* Top Pagination */}
        <div className="border border-gray-200 rounded-t-xl overflow-hidden bg-[#F8F9FA]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            onDownloadXLS={handleDownloadXLS}
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 py-3 px-4 bg-white border border-gray-200 border-t-0">
          <div className="relative flex-1 max-w-[400px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
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
          <button className="bg-[#407BFF] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Izlash
          </button>
        </div>

        {/* Table */}
        <div className="bg-white overflow-hidden border border-gray-200 border-t-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 min-w-[900px]">
              <thead>
                <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                  <th className="px-5 py-4 w-14 border border-gray-200">ID</th>
                  <th className="px-5 py-4 border border-gray-200">
                    F.I.Sh{" "}
                    <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                  </th>
                  <th className="px-5 py-4 border border-gray-200">
                    Telefon raqami{" "}
                    <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                  </th>
                  <th className="px-5 py-4 border border-gray-200">Rol</th>
                  <th className="px-5 py-4 border border-gray-200">
                    Yaratilgan vaqt{" "}
                    <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                  </th>
                  <th className="px-5 py-4 border border-gray-200">
                    Holat{" "}
                    <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                  </th>
                  <th className="px-5 py-4 text-center border border-gray-200">Amallar</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium border border-gray-200">{student.id}</td>
                    <td className="px-5 py-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200 shrink-0"
                        />
                        <span className="font-semibold text-[13px]">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                      {student.phone}
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                      {student.role}
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                      {student.date}
                    </td>
                    <td className="px-5 py-4 border border-gray-200">
                      <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#CEEAD6]">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 border border-gray-200">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => { setViewingStudent(student); setIsViewModalOpen(true); }}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          title="Ko'rish"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => openEditModal(student)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          title="Tahrirlash"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => confirmDelete(student.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500 border border-gray-200">
                      Ma'lumot topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            onDownloadXLS={handleDownloadXLS}
          />
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && viewingStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px] p-4"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            className="bg-white rounded-[16px] shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[20px] font-bold text-gray-900">O'quvchi haqida</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={viewingStudent.image}
                  alt={viewingStudent.name}
                  className="w-[80px] h-[80px] rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-1">{viewingStudent.name}</h3>
                  <p className="text-gray-500 text-[14px]">Student</p>
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                To'liq ma'lumotlar
              </h4>

              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Telefon raqami</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingStudent.phone}</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Rol</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingStudent.role}</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Ro'yxatdan o'tgan vaqti</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingStudent.date}</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Holati</p>
                  <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#CEEAD6]">
                    {viewingStudent.status}
                  </span>
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-gray-900 mb-4">
                Ijtimoiy tarmoq sahifalari:
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Globe size={20} /></div>
                <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Send size={20} /></div>
                <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Camera size={20} /></div>
                <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Briefcase size={20} /></div>
                <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Code size={20} /></div>
                <div className="h-[42px] px-4 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-bold text-[14px] hover:bg-gray-200 cursor-pointer transition-colors">Portfolio</div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => { setIsViewModalOpen(false); openEditModal(viewingStudent); }}
                  className="flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white font-medium px-5 h-[44px] rounded-lg text-sm transition-colors"
                >
                  <Pencil size={16} />
                  Tahrirlash
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[10px] p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-white relative flex flex-col w-full max-w-[560px] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-gray-900">Tahrirlash</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* F.I.Sh */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">F.I.Sh</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => { setEditName(e.target.value); if (editNameError) setEditNameError(false); }}
                  placeholder="Kiriting"
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors ${
                    editNameError
                      ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f] placeholder:text-[#ff4d4f]"
                      : "border-gray-200 focus:border-[#407BFF] text-gray-900"
                  }`}
                />
                {editNameError && <p className="text-[#ff4d4f] text-[12px] mt-1">To'liq kiritilmadi</p>}
              </div>

              {/* Telefon raqami */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Telefon raqami</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors tracking-wide ${
                    editPhoneError
                      ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]"
                      : "border-gray-200 focus:border-[#407BFF] text-gray-900"
                  }`}
                />
                {editPhoneError && <p className="text-[#ff4d4f] text-[12px] mt-1">Telefon raqam to'liq kiritilmadi</p>}
              </div>
            </div>

            <div className="mt-5 flex justify-start">
              <button
                onClick={handleSaveEdit}
                className="flex items-center justify-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white font-medium transition-colors shadow-sm rounded-lg px-5 h-[48px]"
              >
                <Check size={18} strokeWidth={2.5} />
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px]"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-[20px] shadow-xl p-8 w-[400px] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[84px] h-[84px] rounded-full bg-[#FFF0F0] flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] rounded-full bg-[#FF4D4F] flex items-center justify-center text-white text-[32px] font-bold">
                ?
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-8 text-center">
              Siz rostdan ham o'chirmoqchimisiz?
              
            </h3>
            <div className="flex items-center justify-center gap-4 w-full">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setDeletingId(null); }}
                className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
