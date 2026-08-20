"use client";

import { useMemo, useState } from "react";
import {
  PlusCircle,
  Search,
  X,
  ChevronDown,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";

interface Payment {
  id: number;
  buyer: string;
  course: string;
  direction: string;
  amount: number;
  date: string;
  paymentType: string;
  status: "To’landi" | "Kutilmoqda" | "Bekor qilindi";
  confirmed: boolean;
}

const initialPayments: Payment[] = [
  {
    id: 1,
    buyer: "Istamov Xurshid Hazratqul o’g’li",
    course: "Frontend dasturlash",
    direction: "Veb dasturlash",
    amount: 250000,
    date: "01.01.2024 - 17:31:23",
    paymentType: "Naqd",
    status: "To’landi",
    confirmed: true,
  },
  {
    id: 2,
    buyer: "Istamov Fir’davs Hazratqul o’g’li",
    course: "Frontend dasturlash",
    direction: "Veb dasturlash",
    amount: 300000,
    date: "01.01.2024 - 17:31:23",
    paymentType: "Karta",
    status: "Kutilmoqda",
    confirmed: true,
  },
  {
    id: 3,
    buyer: "Istamov Fir’davs Hazratqul o’g’li",
    course: "Frontend dasturlash",
    direction: "Veb dasturlash",
    amount: 300000,
    date: "01.01.2024 - 17:31:23",
    paymentType: "Karta",
    status: "Bekor qilindi",
    confirmed: true,
  },
];

const courses = [
  {
    id: "frontend",
    name: "Frontend dasturlash",
    direction: "Veb dasturlash",
    price: 250000,
  },
  {
    id: "backend",
    name: "Backend dasturlash",
    direction: "Dasturlash",
    price: 300000,
  },
  {
    id: "python",
    name: "Python dasturlash",
    direction: "Dasturlash",
    price: 280000,
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [buyer, setBuyer] = useState("");
  const [course, setCourse] = useState("");
  const [direction, setDirection] = useState("");
  const [price, setPrice] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState<Payment["status"]>("Kutilmoqda");
  const [confirmed, setConfirmed] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

  const filteredPayments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return payments;
    return payments.filter(
      (payment) =>
        payment.buyer.toLowerCase().includes(query) ||
        payment.course.toLowerCase().includes(query) ||
        payment.direction.toLowerCase().includes(query) ||
        payment.paymentType.toLowerCase().includes(query) ||
        payment.status.toLowerCase().includes(query),
    );
  }, [payments, searchQuery]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredPayments.length);
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "Sotib oluvchi",
      "Kurs nomi",
      "Yo’nalish",
      "Summa",
      "Sana",
      "Holat",
      "Tasdiqlash",
    ];
    const rows = payments.map((a) =>
      [
        a.id,
        a.buyer,
        a.course,
        a.direction,
        a.amount,
        a.date,
        a.status,
        a.confirmed,
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "to’lovlar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setEditingId(null);
    setBuyer("");
    setCourse("");
    setDirection("");
    setPrice("");
    setPaymentType("");
    setStatus("Kutilmoqda");
    setConfirmed(false);
    setIsModalOpen(true);
  };

  const openEditModal = (payment: Payment) => {
    setEditingId(payment.id);
    setBuyer(payment.buyer);
    setCourse(payment.course);
    setDirection(payment.direction);
    setPrice(String(payment.amount));
    setPaymentType(payment.paymentType);
    setStatus(payment.status);
    setConfirmed(payment.confirmed);
    setIsModalOpen(true);
  };

  const handleCourseChange = (courseId: string) => {
    setCourse(courseId);

    const selectedCourse = courses.find((item) => item.id === courseId);

    if (selectedCourse) {
      setDirection(selectedCourse.direction);
      setPrice(String(selectedCourse.price));
    } else {
      setDirection("");
      setPrice("");
    }
  };

  const handleSave = () => {
    if (!buyer || !course || !price || !paymentType) {
      return;
    }

    const selectedCourse = courses.find((item) => item.id === course);

    const newPayment: Payment = {
      id: editingId ?? Date.now(),
      buyer,
      course: selectedCourse?.name || course,
      direction,
      amount: Number(price),
      date: new Date().toLocaleString("uz-UZ").replace(",", " -"),
      paymentType,
      status,
      confirmed,
    };

    if (editingId) {
      setPayments((prev) =>
        prev.map((item) => (item.id === editingId ? newPayment : item)),
      );
    } else {
      setPayments((prev) => [newPayment, ...prev]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deletingId) return;

    setPayments((prev) => prev.filter((item) => item.id !== deletingId));

    setDeletingId(null);
    setIsDeleteModalOpen(false);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("ru-RU")}`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 mb-1">
            To’lovlar
          </h1>

          <div className="flex items-center text-[13px] text-gray-500 font-medium">
            Foydalanuvchilar
            <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full" />
            To’lovlar
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-colors shadow-sm"
        >
          <PlusCircle size={18} />
          Qo’shish
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-full max-w-100">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              size={16}
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          Izlash
        </button>
      </div>

      {/* {loading && (
        <div className="py-4 text-center text-gray-500 text-sm">
          Yuklanmoqda...
        </div>
      )}
      {!loading && error && (
        <div className="py-4 text-center text-red-500 text-sm">{error}</div>
      )} */}

      {/* TABLE */}
      <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-312.5">
            <thead>
              <tr className="bg-[#F8F9FA] text-[12px] text-gray-900 font-bold">
                <th className="px-5 py-4 border border-gray-200 w-16">ID</th>

                <th className="px-5 py-4 border border-gray-200">
                  Sotib oluvchi
                  <ChevronDown
                    size={14}
                    className="inline-block text-gray-400 ml-1"
                  />
                </th>

                <th className="px-5 py-4 border border-gray-200">
                  Kurs nomi
                  <ChevronDown
                    size={14}
                    className="inline-block text-gray-400 ml-1"
                  />
                </th>

                <th className="px-5 py-4 border border-gray-200">
                  Yo’nalish
                  <ChevronDown
                    size={14}
                    className="inline-block text-gray-400 ml-1"
                  />
                </th>

                <th className="px-5 py-4 border border-gray-200">Summa</th>

                <th className="px-5 py-4 border border-gray-200">Sana</th>

                <th className="px-5 py-4 border border-gray-200">
                  Holat
                  <ChevronDown
                    size={14}
                    className="inline-block text-gray-400 ml-1"
                  />
                </th>

                {/* YANGI */}
                <th className="px-5 py-4 border border-gray-200">Tasdiqlash</th>

                <th className="px-5 py-4 border border-gray-200 text-center">
                  Amallar
                </th>
              </tr>
            </thead>

            <tbody className="text-[14px] text-gray-800">
              {currentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 border border-gray-200 font-medium">
                    {payment.id}
                  </td>

                  <td className="px-5 py-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                        {payment.buyer.charAt(0)}
                      </div>

                      <span className="font-semibold text-[13px]">
                        {payment.buyer}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 border border-gray-200 text-gray-600 font-medium text-[13px]">
                    {payment.course}
                  </td>

                  <td className="px-5 py-4 border border-gray-200 text-gray-600 font-medium text-[13px]">
                    {payment.direction}
                  </td>

                  <td className="px-5 py-4 border border-gray-200 text-[13px]">
                    {formatPrice(payment.amount)}
                  </td>

                  <td className="px-5 py-4 border border-gray-200 text-[13px]">
                    {payment.date}
                  </td>

                  <td className="px-5 py-4 border border-gray-200">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                        payment.status === "To’landi"
                          ? "bg-[#E6F4EA] text-[#137333]"
                          : payment.status === "Kutilmoqda"
                            ? "bg-[#FFF4E5] text-[#B06000]"
                            : "bg-[#FDECEC] text-[#C62828]"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  {/* TASDIQLASH */}
                  <td className="px-5 py-4 border border-gray-200">
                    {payment.confirmed ? (
                      <button className="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold cursor-pointer">
                        <Check size={13} />
                        Tasdiqlangan
                      </button>
                    ) : (
                      <button className="bg-[#FFF4E5] text-[#B06000] px-3 py-1 rounded-full text-[12px] font-semibold cursor-pointer">
                        Tasdiqlanmagan
                      </button>
                    )}
                  </td>

                  <td className="px-5 py-4 border border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(payment)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => confirmDelete(payment.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentPayments.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-gray-500 border border-gray-200"
                  >
                    Ma’lumot topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPayments.length}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onDownloadXLS={handleDownloadXLS}
        />
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[10px] p-4">
          <div className="bg-white relative flex flex-col w-full max-w-156.25 max-h-[95vh] rounded-[10px] p-[16px_24px] overflow-hidden">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-[20px] font-bold text-gray-900">
                {editingId ? "Tahrirlash" : "Qo’shish"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
              {/* SOTIB OLUVCHI */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Sotib oluvchi
                </label>

                <div className="relative">
                  <select
                    value={buyer}
                    onChange={(e) => setBuyer(e.target.value)}
                    className={`w-full px-4 h-12 rounded-lg border text-[14px] outline-none appearance-none bg-white ${
                      buyer ? "text-gray-900" : "text-gray-400"
                    } border-gray-200 focus:border-[#407BFF]`}
                  >
                    <option value="">Tanlang</option>
                    <option value="Istamov Xurshid Hazratqul o’g’li">
                      Istamov Xurshid Hazratqul o’g’li
                    </option>
                    <option value="Istamov Fir’davs Hazratqul o’g’li">
                      Istamov Fir’davs Hazratqul o’g’li
                    </option>
                    <option value="Azizbek Karimov">Azizbek Karimov</option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* KURS */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Kurs
                </label>

                <div className="relative">
                  <select
                    value={course}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none appearance-none bg-white focus:border-[#407BFF]"
                  >
                    <option value="">Tanlang</option>

                    {courses.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* YO’NALISH */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Yo’nalish
                </label>

                <div className="relative">
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none appearance-none bg-white focus:border-[#407BFF]"
                  >
                    <option value="">Tanlang</option>

                    <option value="Veb dasturlash">Veb dasturlash</option>

                    <option value="Dasturlash">Dasturlash</option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* KURS NARXI */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Kurs narxi
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Kiriting"
                  className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none focus:border-[#407BFF]"
                />
              </div>

              {/* TO’LOV TURI */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  To’lov turi
                </label>

                <div className="relative">
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none appearance-none bg-white focus:border-[#407BFF]"
                  >
                    <option value="">Tanlang</option>
                    <option value="Naqd">Naqd</option>
                    <option value="Karta">Karta</option>
                    <option value="Click">Click</option>
                    <option value="Payme">Payme</option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* HOLATI */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Holati
                </label>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as Payment["status"])
                    }
                    className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none appearance-none bg-white focus:border-[#407BFF]"
                  >
                    <option value="Kutilmoqda">Kutilmoqda</option>

                    <option value="To’landi">To’landi</option>

                    <option value="Bekor qilindi">Bekor qilindi</option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* TASDIQLASH */}
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Tasdiqlash
                </label>

                <div className="relative">
                  <select
                    value={confirmed ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                    onChange={(e) =>
                      setConfirmed(e.target.value === "Tasdiqlangan")
                    }
                    className="w-full px-4 h-12 rounded-lg border border-gray-200 text-[14px] outline-none appearance-none bg-white focus:border-[#407BFF]"
                  >
                    <option value="Tasdiqlanmagan">Tasdiqlanmagan</option>

                    <option value="Tasdiqlangan">Tasdiqlangan</option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* SAVE */}
            <div className="mt-4 flex justify-start shrink-0">
              <button
                onClick={handleSave}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
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

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl p-6 w-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              O’chirishni tasdiqlash
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Haqiqatan ham o’chirmoqchimisiz? Bu amalni ortga qaytarib
              bo’lmaydi.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
              >
                O’chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
