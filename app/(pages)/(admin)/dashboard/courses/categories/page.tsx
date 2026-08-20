"use client";

import React, { use, useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Pen,
  Trash2,
  X,
  Check,
  Loader2,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/Pagination";
import { useCourseStore } from "@/app/store/useCourseStore";
import { baseAPI } from "@/app/lib/utils";

interface Section {
  id: number;
  name: string;
  courseId?: number;
}

export default function CourseSectionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);

  const { courses } = useCourseStore();

  const currentCourse = courses.find(
    (course) => course.id.toString() === courseId
  );

  const courseTitle =
    currentCourse?.title || "Frontend dasturlash";

  // ============================================================
  // STATES
  // ============================================================

  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ============================================================
  // MODALS
  // ============================================================

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    useState(false);

  // TRUE = warning
  // FALSE = success
  const [isWarningModal, setIsWarningModal] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  // ============================================================
  // FORM STATES
  // ============================================================

  const [newSectionName, setNewSectionName] =
    useState("");

  const [editingSection, setEditingSection] =
    useState<Section | null>(null);

  const [deletingSectionId, setDeletingSectionId] =
    useState<number | null>(null);

  // ============================================================
  // GET SECTIONS
  // GET /api/v1/sections
  // ============================================================

  const getSections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await baseAPI.get("/sections");

      console.log(
        "GET SECTIONS RESPONSE:",
        response.data
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      console.log("ALL SECTIONS:", data);

      // FAQAT HOZIRGI KURS SECTIONS
      const filteredSections = data.filter(
        (section: Section) =>
          Number(section.courseId) ===
          Number(courseId)
      );

      console.log(
        "CURRENT COURSE ID:",
        courseId
      );

      console.log(
        "FILTERED SECTIONS:",
        filteredSections
      );

      setSections(filteredSections);
    } catch (error: any) {
      console.error(
        "GET SECTIONS ERROR:",
        error
      );

      console.error(
        "API ERROR:",
        error?.response?.data
      );

      setSections([]);

      setError(
        error?.response?.data?.message ||
          "Bo'limlarni yuklashda xatolik yuz berdi."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD
  // ============================================================

  useEffect(() => {
    getSections();
  }, [courseId]);

  // ============================================================
  // ADD SECTION
  // POST /api/v1/sections
  // ============================================================

  const handleAddSection = async () => {
    if (!newSectionName.trim()) {
      setSuccessMessage(
        "Bo'lim nomini kiriting."
      );

      setIsWarningModal(true);
      setIsSuccessModalOpen(true);

      return;
    }

    try {
      setSaving(true);
      setError("");

      const body = {
        name: newSectionName.trim(),
        courseId: Number(courseId),
      };

      console.log(
        "POST /sections BODY:",
        body
      );

      const response = await baseAPI.post(
        "/sections",
        body
      );

      console.log(
        "CREATE SECTION RESPONSE:",
        response.data
      );

      // Serverdan qayta olish
      await getSections();

      // Formni tozalash
      setNewSectionName("");

      // Add modalni yopish
      setIsAddModalOpen(false);

      // Birinchi sahifaga qaytish
      setCurrentPage(1);

      // ========================================================
      // SUCCESS MODAL
      // ========================================================

      setSuccessMessage(
        "Muvaffaqiyatli qo'shildi"
      );

      setIsWarningModal(false);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error(
        "CREATE SECTION ERROR:",
        error
      );

      console.error(
        "API ERROR:",
        error?.response?.data
      );

      setSuccessMessage(
        error?.response?.data?.message ||
          "Bo'lim qo'shishda xatolik yuz berdi"
      );

      setIsWarningModal(true);
      setIsSuccessModalOpen(true);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // EDIT SECTION
  // PATCH /api/v1/sections/:id
  // ============================================================

  const handleEditSection = async () => {
    if (!editingSection) return;

    if (!editingSection.name.trim()) {
      setSuccessMessage(
        "Bo'lim nomini kiriting."
      );

      setIsWarningModal(true);
      setIsSuccessModalOpen(true);

      return;
    }

    try {
      setSaving(true);
      setError("");

      const body = {
        name: editingSection.name.trim(),
        courseId: Number(courseId),
      };

      console.log(
        `PATCH /sections/${editingSection.id} BODY:`,
        body
      );

      const response = await baseAPI.patch(
        `/sections/${editingSection.id}`,
        body
      );

      console.log(
        "UPDATE SECTION RESPONSE:",
        response.data
      );

      // Serverdan qayta olish
      await getSections();

      // Edit modalni yopish
      setIsEditModalOpen(false);

      // State tozalash
      setEditingSection(null);

      // ========================================================
      // SUCCESS MODAL
      // ========================================================

      setSuccessMessage(
        "Muvaffaqiyatli tahrirlandi"
      );

      setIsWarningModal(false);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error(
        "UPDATE SECTION ERROR:",
        error
      );

      console.error(
        "API ERROR:",
        error?.response?.data
      );

      setSuccessMessage(
        error?.response?.data?.message ||
          "Bo'limni tahrirlashda xatolik yuz berdi"
      );

      setIsWarningModal(true);
      setIsSuccessModalOpen(true);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE SECTION
  // DELETE /api/v1/sections/:id
  // ============================================================

  const handleDeleteSection = async () => {
    if (deletingSectionId === null) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      console.log(
        `DELETE /sections/${deletingSectionId}`
      );

      const response = await baseAPI.delete(
        `/sections/${deletingSectionId}`
      );

      console.log(
        "DELETE SECTION RESPONSE:",
        response.data
      );

      // ========================================================
      // LOCAL STATEDAN O'CHIRISH
      // ========================================================

      setSections((prev) =>
        prev.filter(
          (section) =>
            section.id !== deletingSectionId
        )
      );

      // ========================================================
      // DELETE MODALNI YOPISH
      // ========================================================

      setIsDeleteModalOpen(false);
      setDeletingSectionId(null);

      // ========================================================
      // SUCCESS MODAL
      // ========================================================

      setSuccessMessage(
        "Muvaffaqiyatli o'chirildi"
      );

      setIsWarningModal(false);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error(
        "DELETE SECTION ERROR:",
        error
      );

      console.error(
        "API ERROR:",
        error?.response?.data
      );

      // ========================================================
      // 409 - SECTIONDA LESSONLAR BO'LSA
      // ========================================================

      if (
        error?.response?.status === 409
      ) {
        setIsDeleteModalOpen(false);
        setDeletingSectionId(null);

        setSuccessMessage(
          error?.response?.data?.message ||
            "Bu bo'limda ma'lumotlar mavjud. Avval ularni o'chiring."
        );

        setIsWarningModal(true);
        setIsSuccessModalOpen(true);

        return;
      }

      // ========================================================
      // BOSHQA XATOLAR
      // ========================================================

      setIsDeleteModalOpen(false);
      setDeletingSectionId(null);

      setSuccessMessage(
        error?.response?.data?.message ||
          "Bo'limni o'chirishda xatolik yuz berdi"
      );

      setIsWarningModal(true);
      setIsSuccessModalOpen(true);
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // CLOSE ADD / EDIT MODAL
  // ============================================================

  const closeFormModal = () => {
    if (saving) return;

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);

    setNewSectionName("");
    setEditingSection(null);
  };

  // ============================================================
  // FILTER / PAGINATION
  // ============================================================

  const totalItems = sections.length;

  const totalPages =
    Math.ceil(
      totalItems / itemsPerPage
    ) || 1;

  const startIndex = Math.min(
    (currentPage - 1) * itemsPerPage,
    totalItems
  );

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    totalItems
  );

  const paginatedSections =
    sections.slice(
      startIndex,
      endIndex
    );

  // ============================================================
  // DOWNLOAD CSV
  // ============================================================

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "Bo'lim nomi",
    ];

    const rows = sections.map(
      (section) =>
        [
          section.id,
          `"${section.name.replace(
            /"/g,
            '""'
          )}"`,
        ].join(",")
    );

    const csvContent =
      "\uFEFF" +
      [
        headers.join(","),
        ...rows,
      ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "bolimlar.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full bg-transparent">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">
              Bo&apos;limlar
            </h1>

            <div className="flex items-center text-[13px] font-medium gap-2">

              <Link
                href="/dashboard/courses/allCourses"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Kurslar
              </Link>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <Link
                href={`/dashboard/courses/allCourses/${courseId}/sections`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {courseTitle}
              </Link>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="text-gray-900">
                Bo&apos;limlar
              </span>

            </div>

          </div>

          {/* ADD */}

          <button
            onClick={() => {
              setNewSectionName("");
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#3366FF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
          >
            <Plus size={18} />

            Bo&apos;lim qo&apos;shish
          </button>

        </div>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ======================================================
            TABLE
        ====================================================== */}

        <div className="flex-1 flex flex-col">

          <div className="overflow-x-auto rounded-t-xl overflow-hidden border border-gray-200">

            <table className="w-full text-left border-collapse min-w-[800px] bg-white">

              <thead className="bg-gray-50">

                <tr className="text-[13px] text-gray-900 font-bold tracking-wide">

                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200">

                    <div className="flex items-center gap-2 cursor-pointer group">

                      Bo&apos;lim nomi

                      <Filter
                        size={14}
                        className="text-gray-400 group-hover:text-gray-600"
                      />

                    </div>

                  </th>

                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-right w-32 border border-gray-200">
                    Amallar
                  </th>

                </tr>

              </thead>

              <tbody className="text-[14px] text-gray-800">

                {/* LOADING */}

                {loading ? (
                  <tr>

                    <td
                      colSpan={2}
                      className="px-6 py-12 text-center border border-gray-200"
                    >

                      <div className="flex items-center justify-center gap-2 text-gray-500">

                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Bo&apos;limlar yuklanmoqda...

                      </div>

                    </td>

                  </tr>
                ) : paginatedSections.length > 0 ? (

                  paginatedSections.map(
                    (section) => (

                      <tr
                        key={section.id}
                        className="hover:bg-blue-50/30 transition-colors group"
                      >

                        {/* SECTION NAME */}

                        <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">

                          <Link
                            href={`/dashboard/courses/allCourses/${courseId}/sections/${section.id}/lessons`}
                            className="hover:text-blue-600 transition-colors cursor-pointer block w-full"
                          >
                            {section.name}
                          </Link>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4 text-right border border-gray-200">

                          <div className="flex items-center justify-end gap-3 text-gray-400">

                            {/* EDIT */}

                            <button
                              onClick={() => {
                                setEditingSection({
                                  ...section,
                                });

                                setIsEditModalOpen(
                                  true
                                );
                              }}
                              className="p-1 hover:text-blue-600 transition-colors"
                              title="Tahrirlash"
                              disabled={saving || deleting}
                            >
                              <Pen size={16} />
                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() => {
                                setDeletingSectionId(
                                  section.id
                                );

                                setIsDeleteModalOpen(
                                  true
                                );
                              }}
                              className="p-1 hover:text-red-500 transition-colors"
                              title="O'chirish"
                              disabled={saving || deleting}
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={2}
                      className="px-6 py-8 text-center text-gray-500 border border-gray-200 bg-white"
                    >
                      Bo&apos;limlar mavjud emas
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* ====================================================
              PAGINATION
          ==================================================== */}

          <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-2 py-1 shadow-sm">

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(limit) => {
                setItemsPerPage(limit);
                setCurrentPage(1);
              }}
              onDownloadXLS={
                handleDownloadXLS
              }
            />

          </div>

        </div>

      </div>

      {/* ========================================================
          ADD MODAL
      ======================================================== */}

      {isAddModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
          onClick={closeFormModal}
        >

          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-[440px] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

              <h2 className="text-[17px] font-bold text-gray-900">
                Qo&apos;shish
              </h2>

              <button
                onClick={closeFormModal}
                disabled={saving}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="p-6">

              {/* COURSE */}

              <div className="mb-5">

                <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                  Biriktirilgan kurs
                </label>

                <input
                  type="text"
                  disabled
                  value={courseTitle}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                />

              </div>

              {/* NAME */}

              <div className="mb-6">

                <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                  Bo&apos;lim nomi
                </label>

                <input
                  type="text"
                  placeholder="Kiriting"
                  value={newSectionName}
                  onChange={(e) =>
                    setNewSectionName(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !saving
                    ) {
                      handleAddSection();
                    }
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                />

              </div>

              {/* SAVE */}

              <button
                onClick={handleAddSection}
                disabled={saving}
                className="bg-[#3366FF] hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm"
              >

                {saving ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Check
                    size={18}
                    strokeWidth={2.5}
                  />
                )}

                {saving
                  ? "Saqlanmoqda..."
                  : "Saqlash"}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ========================================================
          EDIT MODAL
      ======================================================== */}

      {isEditModalOpen &&
        editingSection && (

          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
            onClick={closeFormModal}
          >

            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-[440px] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

                <h2 className="text-[17px] font-bold text-gray-900">
                  Tahrirlash
                </h2>

                <button
                  onClick={closeFormModal}
                  disabled={saving}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <X size={20} />
                </button>

              </div>

              {/* BODY */}

              <div className="p-6">

                {/* COURSE */}

                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Biriktirilgan kurs
                  </label>

                  <input
                    type="text"
                    disabled
                    value={courseTitle}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                  />

                </div>

                {/* NAME */}

                <div className="mb-6">

                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Bo&apos;lim nomi
                  </label>

                  <input
                    type="text"
                    placeholder="Kiriting"
                    value={
                      editingSection.name
                    }
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        name: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !saving
                      ) {
                        handleEditSection();
                      }
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                  />

                </div>

                {/* SAVE */}

                <button
                  onClick={
                    handleEditSection
                  }
                  disabled={saving}
                  className="bg-[#3366FF] hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm"
                >

                  {saving ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Check
                      size={18}
                      strokeWidth={2.5}
                    />
                  )}

                  {saving
                    ? "Saqlanmoqda..."
                    : "Saqlash"}

                </button>

              </div>

            </div>

          </div>
        )}

      {/* ========================================================
          DELETE CONFIRMATION MODAL
      ======================================================== */}

      {isDeleteModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
          onClick={() => {
            if (!deleting) {
              setIsDeleteModalOpen(false);
              setDeletingSectionId(null);
            }
          }}
        >

          <div
            className="bg-white rounded-[24px] shadow-xl w-full max-w-[360px] p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ICON */}

            <div className="w-16 h-16 bg-[#EF4444] text-white rounded-full flex items-center justify-center mb-5 shadow-[0_8px_16px_rgba(239,68,68,0.25)]">

              <HelpCircle
                size={32}
                strokeWidth={2.5}
              />

            </div>

            {/* TITLE */}

            <h2 className="text-[17px] font-bold text-gray-900 mb-8">
              Ma&apos;lumotni
              <br />
              o&apos;chirmoqchimisiz?
            </h2>

            {/* BUTTONS */}

            <div className="flex items-center gap-3 w-full justify-center">

              {/* CANCEL */}

              <button
                onClick={() => {
                  if (deleting) return;

                  setIsDeleteModalOpen(
                    false
                  );

                  setDeletingSectionId(
                    null
                  );
                }}
                disabled={deleting}
                className="px-5 py-3 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors flex-1 disabled:opacity-50"
              >
                Bekor qilish
              </button>

              {/* DELETE */}

              <button
                onClick={
                  handleDeleteSection
                }
                disabled={deleting}
                className="px-5 py-3 text-white bg-[#3366FF] hover:bg-blue-600 disabled:bg-blue-300 rounded-xl text-sm font-bold transition-colors shadow-sm flex-1 flex items-center justify-center gap-2"
              >

                {deleting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    O&apos;chirilmoqda...
                  </>
                ) : (
                  "O'chirish"
                )}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ========================================================
          SUCCESS / WARNING MODAL
      ======================================================== */}

      {isSuccessModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
          onClick={() => {
            setIsSuccessModalOpen(
              false
            );

            setIsWarningModal(false);
          }}
        >

          <div
            className="bg-white rounded-[24px] shadow-xl w-full max-w-[360px] p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ==================================================
                ICON
            ================================================== */}

            <div
              className={`w-16 h-16 text-white rounded-full flex items-center justify-center mb-5 ${
                isWarningModal
                  ? "bg-[#F59E0B] shadow-[0_8px_16px_rgba(245,158,11,0.25)]"
                  : "bg-[#22C55E] shadow-[0_8px_16px_rgba(34,197,68,0.25)]"
              }`}
            >

              {isWarningModal ? (
                <AlertTriangle
                  size={36}
                  strokeWidth={3}
                />
              ) : (
                <Check
                  size={36}
                  strokeWidth={3}
                />
              )}

            </div>

            {/* ==================================================
                MESSAGE
            ================================================== */}

            <h2 className="text-[17px] font-bold text-gray-900 mb-8">
              {successMessage}
            </h2>

            {/* ==================================================
                CLOSE
            ================================================== */}

            <button
              onClick={() => {
                setIsSuccessModalOpen(
                  false
                );

                setIsWarningModal(false);
              }}
              className="bg-[#3366FF] hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm min-w-[140px]"
            >
              Yopish
            </button>

          </div>

        </div>

      )}

    </>
  );
}