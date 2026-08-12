"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  PlusCircle,
  X,
  Eye,
  EyeOff,
  Check,
  Search,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";
import Sidebar from "@/app/components/dashboard/SideBar";
import Pagination from "@/app/components/dashboard/Pagination";

export default function AdministratorsPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("+998");
  const [phoneError, setPhoneError] = useState(false);
  const [course, setCourse] = useState("");
  const [courseError, setCourseError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [admins, setAdmins] = useState([
    {
      id: 2458,
      image: "https://i.pravatar.cc/150?u=2458",
      name: "Istamov Xurshid Hazratqul o’g’li",
      course: "UI/UX Dizayn",
      phone: "+998999999999",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 3652,
      image: "https://i.pravatar.cc/150?u=3652",
      name: "Istamov Xurshid Hazratqul o’g’li",
      course: "Frontend",
      phone: "+998999999999",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4123,
      image: "https://i.pravatar.cc/150?u=4123",
      name: "Alimov Jasur",
      course: "Backend",
      phone: "+998901234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4124,
      image: "https://i.pravatar.cc/150?u=4124",
      name: "Sotvoldiyev Bobur",
      course: "Mobil",
      phone: "+998911234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4125,
      image: "https://i.pravatar.cc/150?u=4125",
      name: "Qodirova Zebo",
      course: "SMM",
      phone: "+998931234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4126,
      image: "https://i.pravatar.cc/150?u=4126",
      name: "Yusupov Doniyor",
      course: "Grafik dizayn",
      phone: "+998941234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4127,
      image: "https://i.pravatar.cc/150?u=4127",
      name: "Rustamova Kamola",
      course: "Grafik dizayn",
      phone: "+998951234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4128,
      image: "https://i.pravatar.cc/150?u=4128",
      name: "Rahmonov Sardor",
      course: "SMM",
      phone: "+998971234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4129,
      image: "https://i.pravatar.cc/150?u=4129",
      name: "Karimov Sherzod",
      course: "Backend",
      phone: "+998991234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4130,
      image: "https://i.pravatar.cc/150?u=4130",
      name: "Toxirov Murod",
      course: "Frontend",
      phone: "+998881234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
    {
      id: 4131,
      image: "https://i.pravatar.cc/150?u=4131",
      name: "Nazarova Madina (Page 2)",
      course: "Frontend",
      phone: "+998331234567",
      role: "Assistentlar",
      date: "2023-04-09 14:21:44",
      status: "Faol",
    },
  ]);

  // Derived state
  const filteredAdmins = useMemo(() => {
    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.phone.includes(searchQuery),
    );
  }, [admins, searchQuery]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAdmins.length);
  const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "F.I.Sh",
      "Biriktirilgan kurs",
      "Telefon raqam",
      "Rol",
      "Holati",
    ];
    const rows = admins.map((a) =>
      [a.id, a.name, a.phone, a.role, a.status].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "administratorlar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and plus
    let val = e.target.value.replace(/[^0-9+]/g, "");

    // Prevent deletion of +998 prefix
    if (!val.startsWith("+998")) {
      val = "+998" + val.replace(/\+998/g, "").trim();
    }

    // Ensure format "+998XXXXXXXXX" by length limit (13 chars)
    if (val.length <= 13) {
      setPhone(val);
      if (phoneError) setPhoneError(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setPhone("+998");
    setCourse("");
    setPassword("");
    setImageFile(null);
    setImagePreview(null);
    setNameError(false);
    setCourseError(false);
    setPasswordError(false);
    setPhoneError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const openEditModal = (admin: any) => {
    setEditingId(admin.id);
    setName(admin.name);
    setPhone(admin.phone);
    setCourse(admin.course || "");
    setPassword("");
    setImageFile(null);
    setImagePreview(admin.image); // Show current image in edit mode
    setNameError(false);
    setPhoneError(false);
    setCourseError(false);
    setPasswordError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAdmin = () => {
    if (deletingId) {
      setAdmins(admins.filter((a) => a.id !== deletingId));
      if (currentAdmins.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setIsDeleteModalOpen(false);
      setDeletingId(null);
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

  const handleSaveAdmin = () => {
    let hasError = false;

    if (!imagePreview) {
      setImageError(true);
      hasError = true;
    } else {
      setImageError(false);
    }

    if (!name.trim()) {
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

    if (!course) {
      setCourseError(true);
      hasError = true;
    } else {
      setCourseError(false);
    }

    if (!editingId && password.length < 8) {
      setPasswordError(true);
      hasError = true;
    } else if (editingId && password && password.length < 8) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    if (editingId) {
      setAdmins(
        admins.map((admin) => {
          if (admin.id === editingId) {
            return {
              ...admin,
              name,
              phone,
              course,
              image: imagePreview || admin.image,
            };
          }
          return admin;
        }),
      );
    } else {
      const newAdmin = {
        id: Math.floor(1000 + Math.random() * 9000),
        image: imagePreview || `https://i.pravatar.cc/150?u=${Date.now()}`,
        name: name,
        course: course,
        phone: phone,
        role: "Assistentlar",
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        status: "Faol",
      };
      setAdmins([newAdmin, ...admins]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden text-gray-900">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-22 flex items-center justify-between px-8 shrink-0 border-b border-gray-100 bg-white shadow-sm z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-gray-700" />
            <span className="font-semibold text-gray-800 text-lg">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm text-gray-500">
              <button className="relative hover:text-gray-700 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-px h-5 bg-gray-200"></div>
              <button className="hover:text-gray-700 transition-colors">
                <Settings size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm cursor-pointer">
              <span>O’zbek (Lotin)</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-3 text-left bg-white p-1 pr-4 rounded-full border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  src="https://i.pravatar.cc/150?u=admin"
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover bg-gray-100"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none mb-0.5">
                    Istamov Xurshid
                  </span>
                  <span className="text-[11px] text-gray-500 leading-none">
                    Administrator
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-400 ml-1" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-14 w-56 bg-white border border-gray-100 shadow-lg rounded-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <button className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <User size={16} /> Profil
                    </div>
                    <ChevronRight size={16} />
                  </button>
                  <button className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 mt-1 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <LogOut size={16} /> Chiqish
                    </div>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-6">
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
              Qo’shish
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-6">
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

          {/* Table (Excel Style Borders) */}
          <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200 min-w-[1000px]">
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
                      Rol{" "}
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
                    <th className="px-5 py-4 border border-gray-200">
                      Holati{" "}
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
                  {currentAdmins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-5 py-4 font-medium border border-gray-200">
                        {admin.id}
                      </td>
                      <td className="px-5 py-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={admin.image}
                            alt={admin.name}
                            className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200"
                          />
                          <span className="font-semibold text-[13px]">
                            {admin.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                        {admin.course}
                      </td>
                      <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                        {admin.phone}
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                        {admin.role}
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                        {admin.date}
                      </td>
                      <td className="px-5 py-4 border border-gray-200">
                        <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#CEEAD6]">
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 border border-gray-200">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(admin)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => confirmDelete(admin.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentAdmins.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
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

          {/* Bottom Pagination Component */}
          <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAdmins.length}
              startIndex={startIndex}
              endIndex={endIndex}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
              onDownloadXLS={handleDownloadXLS}
            />
          </div>
        </div>
      </main>

      {/* Add/Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[10px] p-4">
          <div className="bg-white relative flex flex-col w-full max-w-[673px] max-h-[95vh] rounded-[10px] p-[16px_24px] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-[20px] font-bold text-gray-900">
                {editingId ? "Tahrirlash" : "Qo’shish"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Form Fields - 1 Column Stack */}
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
                  {imageError && (
                    <p className="text-[#ff4d4f] text-[12px] -mt-1">
                      Rasm yuklash majburiy
                    </p>
                  )}
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  placeholder="Kiriting"
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors ${nameError ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f] placeholder:text-[#ff4d4f]" : "border-gray-200 focus:border-[#407BFF] text-gray-900"}`}
                />
                {nameError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    To’liq kiritilmadi
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
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors tracking-wide ${phoneError ? "border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]" : "border-gray-200 focus:border-[#407BFF] text-gray-900"}`}
                />
                {phoneError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    Telefon raqam to’liq kiritilmadi
                  </p>
                )}
              </div>

              {/* Kurs biriktirish */}
              {/* Kurs biriktirish */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Kurs biriktirish
                </label>
                <div className="relative w-full">
                  <select
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      if (courseError) setCourseError(false);
                    }}
                    className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors appearance-none bg-white cursor-pointer ${
                      course ? "text-gray-900" : "text-gray-400"
                    } ${
                      courseError
                        ? "border-[#ff4d4f] focus:border-[#ff4d4f]"
                        : "border-gray-200 focus:border-[#407BFF]"
                    }`}
                  >
                    <option value="" disabled hidden>
                      Tanlang
                    </option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="UI/UX Dizayn">UI/UX Dizayn</option>
                    <option value="Mobil">Mobil</option>
                    <option value="SMM">SMM</option>
                    <option value="Grafik dizayn">Grafik dizayn</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {courseError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">
                    Kurs tanlanmadi
                  </p>
                )}
              </div>

              {/* Parol */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Parol{" "}
                  {editingId && (
                    <span className="text-gray-400 font-normal ml-1">
                      (O’zgartirmaslik uchun bo’sh qoldiring)
                    </span>
                  )}
                </label>
                <div className="relative w-full h-[48px]">
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

            {/* Save Button */}
            <div className="mt-4 flex justify-start shrink-0">
              <button
                onClick={handleSaveAdmin}
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

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] animate-in fade-in zoom-in duration-200">
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
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDeleteAdmin}
                className="px-4 py-2 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
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
