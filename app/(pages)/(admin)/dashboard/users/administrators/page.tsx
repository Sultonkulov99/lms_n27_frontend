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
  Globe,
  Send,
  Camera,
  Briefcase,
  Code,
} from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";

export default function AdministratorsPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAdmin, setViewingAdmin] = useState<any>(null);
  
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
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [admins, setAdmins] = useState([
    { id: 2458, image: "https://i.pravatar.cc/150?u=2458", name: "Istamov Xurshid Hazratqul o'g'li", phone: "+998999999999", date: "2023-04-09 14:21:44", role: "Administrator", status: "Faol" },
    { id: 3652, image: "https://i.pravatar.cc/150?u=3652", name: "Istamov Xurshid Hazratqul o'g'li", phone: "+998999999999", date: "2023-04-09 14:21:44", role: "Administrator", status: "Faol" },
    { id: 4123, image: "https://i.pravatar.cc/150?u=4123", name: "Alimov Jasur", phone: "+998901234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4124, image: "https://i.pravatar.cc/150?u=4124", name: "Sotvoldiyev Bobur", phone: "+998911234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4125, image: "https://i.pravatar.cc/150?u=4125", name: "Qodirova Zebo", phone: "+998931234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4126, image: "https://i.pravatar.cc/150?u=4126", name: "Yusupov Doniyor", phone: "+998941234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4127, image: "https://i.pravatar.cc/150?u=4127", name: "Rustamova Kamola", phone: "+998951234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4128, image: "https://i.pravatar.cc/150?u=4128", name: "Rahmonov Sardor", phone: "+998971234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4129, image: "https://i.pravatar.cc/150?u=4129", name: "Karimov Sherzod", phone: "+998991234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4130, image: "https://i.pravatar.cc/150?u=4130", name: "Toxirov Murod", phone: "+998881234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
    { id: 4131, image: "https://i.pravatar.cc/150?u=4131", name: "Nazarova Madina (Page 2)", phone: "+998331234567", date: "2023-05-12 10:15:00", role: "Administrator", status: "Faol" },
  ]);

  // Derived state
  const filteredAdmins = useMemo(() => {
    return admins.filter(admin => 
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      admin.phone.includes(searchQuery)
    );
  }, [admins, searchQuery]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAdmins.length);
  const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

  const handleDownloadXLS = () => {
    const headers = ["ID", "F.I.Sh", "Telefon raqam", "Yaratilgan vaqt", "Rol", "Holati"];
    const rows = admins.map(a => [a.id, a.name, a.phone, a.date, a.role, a.status].join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    
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
    let val = e.target.value.replace(/[^0-9+]/g, '');
    
    // Prevent deletion of +998 prefix
    if (!val.startsWith("+998")) {
      val = "+998" + val.replace(/\+998/g, '').trim();
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
    setPassword("");
    setImageFile(null);
    setImagePreview(null);
    setNameError(false);
    setPasswordError(false);
    setPhoneError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const openEditModal = (admin: any) => {
    setEditingId(admin.id);
    setName(admin.name);
    setPhone(admin.phone);
    setPassword("");
    setImageFile(null);
    setImagePreview(admin.image); // Show current image in edit mode
    setNameError(false);
    setPasswordError(false);
    setPhoneError(false);
    setImageError(false);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAdmin = () => {
    if (deletingId) {
      setAdmins(admins.filter(a => a.id !== deletingId));
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
      setAdmins(admins.map(admin => {
        if (admin.id === editingId) {
          return {
            ...admin,
            name,
            phone,
            image: imagePreview || admin.image
          };
        }
        return admin;
      }));
    } else {
      const newAdmin = {
        id: Math.floor(1000 + Math.random() * 9000),
        image: imagePreview || `https://i.pravatar.cc/150?u=${Date.now()}`,
        name: name,
        phone: phone,
        date: new Date().toISOString().replace('T', ' ').slice(0, 19),
        role: "Administrator",
        status: "Faol"
      };
      setAdmins([newAdmin, ...admins]);
    }
    
    setIsModalOpen(false);
    if (!editingId) {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Top Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <div>
              <h1 className="text-[24px] font-bold text-gray-900 mb-1">Administratorlar</h1>
              <div className="flex items-center text-[13px] text-gray-500 font-medium">
                Foydalanuvchilar <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></span> Administratorlar
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
                    <th className="px-5 py-4 w-16 border border-gray-200">ID</th>
                    <th className="px-5 py-4 border border-gray-200">F.I.Sh <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                    <th className="px-5 py-4 border border-gray-200">Telefon raqam <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                    <th className="px-5 py-4 border border-gray-200">Yaratilgan vaqt <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                    <th className="px-5 py-4 border border-gray-200">Rol <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                    <th className="px-5 py-4 border border-gray-200">Holati <ChevronDown size={14} className="inline-block text-gray-400 ml-1"/></th>
                    <th className="px-5 py-4 text-center border border-gray-200">Amallar</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-800">
                  {currentAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-5 py-4 font-medium border border-gray-200">{admin.id}</td>
                      <td className="px-5 py-4 border border-gray-200">
                        <div 
                          className="flex items-center gap-3 cursor-pointer hover:text-[#407BFF] transition-colors"
                          onClick={() => { setViewingAdmin(admin); setIsViewModalOpen(true); }}
                        >
                          <img src={admin.image} alt={admin.name} className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200" />
                          <span className="font-semibold text-[13px]">{admin.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">{admin.phone}</td>
                      <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">{admin.date}</td>
                      <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">{admin.role}</td>
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
                      <td colSpan={7} className="px-6 py-10 text-center text-gray-500 border border-gray-200">
                        Ma'lumot topilmadi
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

      {/* Add/Edit Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[10px] p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white relative flex flex-col w-full max-w-[673px] max-h-[95vh] rounded-[10px] p-[16px_24px] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
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
            
            {/* Form Fields - 1 Column Stack */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 pb-2">
              {/* Rasm */}
              <div className="flex flex-col items-center gap-1 w-full shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 w-full text-left">Rasm</label>
                <div className="flex flex-col items-center gap-2 w-full">
                  <label className={`flex flex-col items-center justify-center w-[120px] h-[120px] rounded-full border-[1.5px] border-dashed cursor-pointer hover:bg-gray-50 transition-colors bg-white overflow-hidden relative ${imageError ? 'border-[#ff4d4f]' : 'border-gray-300'}`}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`flex flex-col items-center ${imageError ? 'text-[#ff4d4f]' : 'text-gray-400'}`}>
                        <Upload size={32} />
                        <span className="text-[13px] mt-2 font-medium">Yuklash</span>
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
                    <p className="text-[#ff4d4f] text-[12px] -mt-1">Rasm yuklash majburiy</p>
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
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">F.I.Sh</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  placeholder="Kiriting" 
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors ${nameError ? 'border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f] placeholder:text-[#ff4d4f]' : 'border-gray-200 focus:border-[#407BFF] text-gray-900'}`}
                />
                {nameError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">To'liq kiritilmadi</p>
                )}
              </div>
              
              {/* Telefon raqami */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Telefon raqami</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 h-[48px] rounded-lg border text-[14px] outline-none transition-colors tracking-wide ${phoneError ? 'border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]' : 'border-gray-200 focus:border-[#407BFF] text-gray-900'}`}
                />
                {phoneError && (
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">Telefon raqam to'liq kiritilmadi</p>
                )}
              </div>
              
              {/* Parol */}
              <div className="flex flex-col shrink-0">
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Parol {editingId && <span className="text-gray-400 font-normal ml-1">(O'zgartirmaslik uchun bo'sh qoldiring)</span>}</label>
                <div className="relative w-full h-[48px]">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError && e.target.value.length >= 8) setPasswordError(false);
                    }}
                    placeholder="******" 
                    className={`w-full h-full px-4 pr-10 rounded-lg border text-[14px] outline-none transition-colors tracking-widest placeholder:tracking-normal ${passwordError ? 'border-[#ff4d4f] focus:border-[#ff4d4f] text-[#ff4d4f]' : 'border-gray-200 focus:border-[#407BFF] text-gray-900'}`}
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
                  <p className="text-[#ff4d4f] text-[12px] mt-1.5">Eng kamida 8 ta belgi</p>
                )}
              </div>
            </div>
            
            {/* Save Button */}
            <div className="mt-4 flex justify-start shrink-0">
              <button 
                onClick={handleSaveAdmin}
                className="flex items-center justify-center bg-[#407BFF] hover:bg-blue-600 text-white font-medium transition-colors shadow-sm"
                style={{
                  width: '129px',
                  height: '48px',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  gap: '10px'
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px]"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[20px] shadow-xl p-8 w-[400px] flex flex-col items-center animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-[84px] h-[84px] rounded-full bg-[#FFF0F0] flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] rounded-full bg-[#FF4D4F] flex items-center justify-center text-white text-[32px] font-bold">
                ?
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-8 text-center">Siz rostdan ham o'chirmoqchimisiz?</h3>
            <div className="flex items-center justify-center gap-4 w-full">
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingId(null);
                }}
                className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleDeleteAdmin}
                className="flex-1 py-3 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px]"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[20px] shadow-xl p-8 w-[400px] flex flex-col items-center animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-[84px] h-[84px] rounded-full bg-[#E6F4EA] flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] rounded-full bg-[#137333] flex items-center justify-center text-white">
                <Check size={32} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-8 text-center">Muvaffaqiyatli qo'shildi</h3>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-8 py-3 rounded-lg bg-[#407BFF] hover:bg-blue-600 text-white transition-colors text-sm font-medium"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* View Admin Modal */}
      {isViewModalOpen && viewingAdmin && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] backdrop-blur-[4px] p-4"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[16px] shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[20px] font-bold text-gray-900">Administrator haqida</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-8">
                <img src={viewingAdmin.image} alt={viewingAdmin.name} className="w-[80px] h-[80px] rounded-full object-cover border border-gray-200" />
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-1">{viewingAdmin.name}</h3>
                  <p className="text-gray-500 text-[14px]">Administrator</p>
                </div>
              </div>
              
              <h4 className="text-[16px] font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">To'liq ma'lumotlar</h4>
              
              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Telefon raqami</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingAdmin.phone}</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Rol</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingAdmin.role}</p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 mb-1">Ro'yxatdan o'tgan vaqti</p>
                  <p className="text-[15px] font-bold text-gray-900">{viewingAdmin.date}</p>
                </div>
              </div>
              
              <h4 className="text-[16px] font-bold text-gray-900 mb-4">Ijtimoiy tarmoq sahifalari:</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Globe size={20} /></div>
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Send size={20} /></div>
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Camera size={20} /></div>
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Briefcase size={20} /></div>
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"><Code size={20} /></div>
                  <div className="h-[42px] px-4 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-bold text-[14px] hover:bg-gray-200 cursor-pointer transition-colors">Portfolio</div>
                </div>
                <button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openEditModal(viewingAdmin);
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
