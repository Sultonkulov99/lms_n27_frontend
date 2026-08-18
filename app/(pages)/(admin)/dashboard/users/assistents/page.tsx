"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  PlusCircle,
  X,
  Eye,
  EyeOff,
  Check,
  Search,
  Pencil,
  Trash2,
  Upload,
  Globe,
  Send,
  Camera,
  Briefcase,
  Code,
} from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import {
  Assistant,
  getAssistants,
  createAssistant,
  updateAssistant,
  deleteAssistant,
} from "@/app/lib/api/assistants";
import {
  CourseAssistantLink,
  getCourseAssistants,
  createCourseAssistant,
  updateCourseAssistant,
  deleteCourseAssistant,
} from "@/app/lib/api/course-assistant";
import { Course, getCourses } from "@/app/lib/api/courses";

export default function AssistentsPage() {
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAssistent, setViewingAssistent] = useState<Assistant | null>(
    null,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingLink, setEditingLink] = useState<CourseAssistantLink | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [fullName, setName] = useState("");
  const [fullNameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("+998");
  const [phoneError, setPhoneError] = useState(false);
  // course хранит courseId строкой (значение <select>) — "" значит "без курса"
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [assistents, setAssistents] = useState<Assistant[]>([]);
  const [courseLinks, setCourseLinks] = useState<CourseAssistantLink[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [assistantsData, linksData, coursesData] = await Promise.all([
        getAssistants(),
        getCourseAssistants(),
        getCourses(),
      ]);

      setAssistents(assistantsData);
      setCourseLinks(linksData);
      setCourses(coursesData);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Yuklanmadi");
    } finally {
      setLoading(false);
    }
  };

  // Курс (если есть) для конкретного ассистента — из /course-assistant, т.к. там связка userId -> courseId
  const linkForUser = (userId: number) =>
    courseLinks.find((l) => l.userId === userId) || null;

  const courseNameById = (id: number) =>
    courses.find((c) => c.id === id)?.name || "—";

  const getAvatarUrl = (file?: string | null) => {
    if (!file) return "/default-avatar.png";
    if (file.startsWith("http")) return file;
    return `http://63.180.181.4:8080/uploads/${file}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  // Derived state
  const filteredAssistents = useMemo(() => {
    return assistents.filter((assistent) => {
      const link = linkForUser(assistent.id);
      const courseName = link ? courseNameById(link.courseId) : "";
      return (
        (assistent.fullName || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        assistent.phone.includes(searchQuery) ||
        courseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [assistents, courseLinks, courses, searchQuery]);

  const totalPages = Math.ceil(filteredAssistents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredAssistents.length,
  );
  const currentAssistents = filteredAssistents.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "F.I.Sh",
      "Biriktirilgan kurs",
      "Telefon raqam",
      "Yaratilgan vaqt",
    ];
    const rows = assistents.map((a) => {
      const link = linkForUser(a.id);
      const courseName = link ? courseNameById(link.courseId) : "";
      return [a.id, a.fullName, courseName, a.phone, a.created_at].join(",");
    });
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assistentlar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9+]/g, "");
    if (!val.startsWith("+998")) {
      val = "+998" + val.replace(/\+998/g, "").trim();
    }
    if (val.length <= 13) {
      setPhone(val);
      if (phoneError) setPhoneError(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setEditingLink(null);
    setName("");
    setPhone("+998");
    setCourse("");
    setPassword("");
    setImageFile(null);
    setImagePreview(null);
    setNameError(false);
    setPasswordError(false);
    setPhoneError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const openEditModal = (assistent: Assistant) => {
    const link = linkForUser(assistent.id);
    setEditingId(assistent.id);
    setEditingLink(link);
    setName(assistent.fullName);
    setPhone(assistent.phone);
    setCourse(link ? String(link.courseId) : "");
    setPassword("");
    setImageFile(null);
    setImagePreview(getAvatarUrl(assistent.file));
    setNameError(false);
    setPhoneError(false);
    setPasswordError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  // Удаляет ассистента полностью: сначала связку с курсом (если есть), потом самого пользователя
  const handleDeleteAssistent = async () => {
    if (!deletingId) return;

    try {
      const link = linkForUser(deletingId);
      if (link) {
        await deleteCourseAssistant(link.id);
      }
      await deleteAssistant(deletingId);

      await loadAll();

      if (currentAssistents.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      setIsDeleteModalOpen(false);
      setDeletingId(null);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Assistent o'chirilmadi");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(false);
    }
  };

  const handleSaveAssistent = async () => {
    let hasError = false;

    if (!fullName.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (phone.length < 13) {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }

    if (
      (!editingId && password.length < 8) ||
      (editingId && password && password.length < 8)
    ) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    // Курс НЕ обязателен — специально не валидируется
    if (hasError) return;

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      if (password) formData.append("password", password);
      if (imageFile) formData.append("file", imageFile);

      let userId: number;

      if (editingId) {
        await updateAssistant(editingId, formData);
        userId = editingId;
      } else {
        const created = await createAssistant(formData);
        userId = created.data.id;
      }

      // Курс объединяем только если реально выбран
      if (course) {
        const courseId = Number(course);
        if (editingLink) {
          if (editingLink.courseId !== courseId) {
            await updateCourseAssistant(editingLink.id, { courseId });
          }
        } else {
          await createCourseAssistant(courseId, userId);
        }
      }

      await loadAll();

      setIsModalOpen(false);
      setIsSuccessModalOpen(true);

      setEditingId(null);
      setEditingLink(null);
      setName("");
      setPhone("+998");
      setCourse("");
      setPassword("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Xatolik yuz berdi");
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        {/* Top Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h1 className="text-[24px] font-bold text-gray-900 mb-1">
              Assistentlar
            </h1>
            <div className="flex items-center text-[13px] text-gray-500 font-medium">
              Foydalanuvchilar{" "}
              <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></span>{" "}
              Assistentlar
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-colors shadow-sm"
          >
            <PlusCircle size={18} strokeWidth={2} />
            Qo'shish
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-100">
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

        {loading && (
          <div className="py-10 text-center text-gray-400 text-sm">
            Yuklanmoqda...
          </div>
        )}
        {!loading && error && (
          <div className="py-4 text-center text-red-500 text-sm">{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Table */}
            <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200 min-w-250">
                  <thead>
                    <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                      <th className="px-5 py-4 w-16 border border-gray-200">
                        ID
                      </th>
                      <th className="px-5 py-4 border border-gray-200">
                        F.I.Sh{" "}
                        <ChevronDown
                          size={14}
                          className="inline-block text-gray-400 ml-1"
                        />
                      </th>
                      <th className="px-5 py-4 border border-gray-200">
                        Biriktirilgan kurs{" "}
                        <ChevronDown
                          size={14}
                          className="inline-block text-gray-400 ml-1"
                        />
                      </th>
                      <th className="px-5 py-4 border border-gray-200">
                        Telefon raqam{" "}
                        <ChevronDown
                          size={14}
                          className="inline-block text-gray-400 ml-1"
                        />
                      </th>
                      <th className="px-5 py-4 border border-gray-200">
                        Yaratilgan vaqt{" "}
                        <ChevronDown
                          size={14}
                          className="inline-block text-gray-400 ml-1"
                        />
                      </th>
                      <th className="px-5 py-4 text-center border border-gray-200">
                        Amallar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-gray-800">
                    {currentAssistents.map((assistent) => {
                      const link = linkForUser(assistent.id);
                      return (
                        <tr
                          key={assistent.id}
                          className="hover:bg-gray-50 transition-colors group"
                        >
                          <td className="px-5 py-4 font-medium border border-gray-200">
                            {assistent.id}
                          </td>
                          <td className="px-5 py-4 border border-gray-200">
                            <div
                              className="flex items-center gap-3 cursor-pointer hover:text-[#407BFF] transition-colors"
                              onClick={() => {
                                setViewingAssistent(assistent);
                                setIsViewModalOpen(true);
                              }}
                            >
                              <img
                                src={getAvatarUrl(assistent.file)}
                                alt={assistent.fullName}
                                className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200"
                              />
                              <span className="font-semibold text-[13px]">
                                {assistent.fullName}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                            {link ? (
                              courseNameById(link.courseId)
                            ) : (
                              <span className="text-gray-400 italic">
                                Biriktirilmagan
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                            {assistent.phone}
                          </td>
                          <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                            {formatDate(assistent.created_at)}
                          </td>
                          <td className="px-5 py-4 border border-gray-200">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openEditModal(assistent)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => confirmDelete(assistent.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {currentAssistents.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-gray-500 border border-gray-200"
                        >
                          Ma'lumot topilmadi
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAssistents.length}
                startIndex={startIndex}
                endIndex={endIndex}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                onDownloadXLS={handleDownloadXLS}
              />
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[10px] p-4">
          <div className="bg-white relative flex flex-col w-full max-w-168.25 max-h-[95vh] rounded-[10px] p-[16px_24px] overflow-hidden">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-[20px] font-bold text-gray-900">
                {editingId ? "Tahrirlash" : "Qo'shish"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 pb-2">
              {/* Rasm */}
              <div className="flex flex-col items-center gap-1 w-full shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 w-full text-left">
                  Rasm
                </label>
                <div className="flex flex-col items-center gap-2 w-full">
                  <label
                    className={`flex flex-col items-center justify-center w-1/2 aspect-square border-[1.5px] border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white overflow-hidden relative ${imageError ? "border-[#ff4d4f]" : "border-gray-300"}`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex flex-col items-center ${imageError ? "text-[#ff4d4f]" : "text-gray-400"}`}
                      >
                        <Upload size={32} />
                        <span className="text-[13px] mt-2 font-medium">
                          Yuklash
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <label className="cursor-pointer text-blue-600 text-[13px] font-medium hover:underline text-center">
                      Qayta yuklash
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* F.I.Sh */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  F.I.Sh
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fullNameError) setNameError(false);
                  }}
                  placeholder="Kiriting"
                  className={`w-full px-4 h-12 rounded-lg border text-[14px] outline-none transition-colors ${fullNameError ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f] placeholder:text-[#ff4d4f]" : "border-gray-200 focus:border-[#407BFF] text-gray-900"}`}
                />
                {fullNameError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    To'liq kiritilmadi
                  </p>
                )}
              </div>

              {/* Telefon raqami */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Telefon raqami
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 h-12 rounded-lg border text-[14px] outline-none transition-colors tracking-wide ${phoneError ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]" : "border-gray-200 focus:border-[#407BFF] text-gray-900"}`}
                />
                {phoneError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    Telefon raqam to'liq kiritilmadi
                  </p>
                )}
              </div>

              {/* Kurs biriktirish — ixtiyoriy */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Kurs biriktirish{" "}
                  <span className="text-gray-400 font-normal ml-1">
                    (ixtiyoriy)
                  </span>
                </label>
                <div className="relative w-full">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className={`w-full px-4 h-12 rounded-lg border text-[14px] outline-none transition-colors appearance-none bg-white cursor-pointer border-gray-200 focus:border-[#407BFF] ${
                      course ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    <option value="">Kurssiz</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Parol */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Parol{" "}
                  {editingId && (
                    <span className="text-gray-400 font-normal ml-1">
                      (O'zgartirmaslik uchun bo'sh qoldiring)
                    </span>
                  )}
                </label>
                <div className="relative w-full h-12">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError && e.target.value.length >= 8)
                        setPasswordError(false);
                    }}
                    placeholder="******"
                    className={`w-full h-full px-4 pr-10 rounded-lg border text-[14px] outline-none transition-colors tracking-widest placeholder:tracking-normal ${passwordError ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]" : "border-gray-200 focus:border-[#407BFF] text-gray-900"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    Eng kamida 8 ta belgi
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-start shrink-0">
              <button
                onClick={handleSaveAssistent}
                className="flex items-center justify-center bg-[#407BFF] hover:bg-blue-600 text-white font-medium transition-colors shadow-sm"
                style={{
                  width: "129px",
                  height: "48px",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  gap: "10px",
                }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl p-6 w-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              O'chirishni tasdiqlash
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Haqiqatan ham o'chirmoqchimisiz? Bu amalni ortga qaytarib
              bo'lmaydi.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDeleteAssistent}
                className="px-4 py-2 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-xs"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="bg-white rounded-[20px] shadow-xl p-8 w-100 flex flex-col items-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-21 h-21 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-6">
              <div className="w-15 h-15 rounded-full bg-[#137333] flex items-center justify-center text-white">
                <Check size={32} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-8 text-center">
              Muvaffaqiyatli saqlandi
            </h3>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-8 py-3 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* View Assistent Modal */}
      {isViewModalOpen && viewingAssistent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-xs p-4"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-150 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[20px] font-bold text-gray-900">
                Assistent haqida
              </h2>
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
                  src={getAvatarUrl(viewingAssistent.file)}
                  alt={viewingAssistent.fullName}
                  className="w-20 h-20 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-1">
                    {viewingAssistent.fullName}
                  </h3>
                  <p className="text-gray-500 text-[14px]">Assistent</p>
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                To'liq ma'lumotlar
              </h4>

              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">
                    Telefon raqami
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {viewingAssistent.phone}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">
                    Biriktirilgan kurs
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {(() => {
                      const link = linkForUser(viewingAssistent.id);
                      return link
                        ? courseNameById(link.courseId)
                        : "Biriktirilmagan";
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Rol</p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {viewingAssistent.role}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">
                    Ro'yxatdan o'tgan vaqti
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {formatDate(viewingAssistent.created_at)}
                  </p>
                </div>
              </div>

              <h4 className="text-[16px] font-bold text-gray-900 mb-4">
                Ijtimoiy tarmoq sahifalari:
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10.5 h-10.5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors">
                    <Globe size={20} />
                  </div>
                  <div className="w-10.5 h-10.5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors">
                    <Send size={20} />
                  </div>
                  <div className="w-10.5 h-10.5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors">
                    <Camera size={20} />
                  </div>
                  <div className="w-10.5 h-10.5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors">
                    <Briefcase size={20} />
                  </div>
                  <div className="w-10.5 h-10.5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors">
                    <Code size={20} />
                  </div>
                  <div className="h-10.5 px-4 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-bold text-[14px] hover:bg-gray-200 cursor-pointer transition-colors">
                    Portfolio
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openEditModal(viewingAssistent);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-[14px]"
                >
                  <Pencil size={16} />
                  Tahrirlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
