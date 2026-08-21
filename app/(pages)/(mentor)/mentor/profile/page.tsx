"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Check, Eye, EyeOff, Trash2 } from "lucide-react";
import { useMentorStore } from "@/store/useMentorStore";

export default function MentorProfilePage() {
  const { fullName: storeFullName, profileImage: storeProfileImage, updateProfile } = useMentorStore();
  
  const [activeTab, setActiveTab] = useState("personal");

  // Personal Info State
  const [fullName, setFullName] = useState(storeFullName);
  const [profileImage, setProfileImage] = useState<string | null>(storeProfileImage);
  const [phone, setPhone] = useState("+998333551116");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(storeFullName);
    setProfileImage(storeProfileImage);
  }, [storeFullName, storeProfileImage]);

  // Mentor Info State
  const [profession, setProfession] = useState("Full Stack");
  const [experience, setExperience] = useState("1");
  const [about, setAbout] = useState("React & Node.js");
  const [socials, setSocials] = useState({
    telegram: "https://elderlearn.netlify.app/",
    instagram: "https://elderlearn.netlify.app/",
    facebook: "https://elderlearn.netlify.app/",
    linkedin: "https://elderlearn.netlify.app/",
    github: "https://elderlearn.netlify.app/",
    website: "https://elderlearn.netlify.app/",
  });

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    if (activeTab === "personal") {
      updateProfile(fullName, profileImage);
    }
    console.log("Saved tab:", activeTab);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
      <h1 className="text-[24px] font-bold text-gray-900 mb-6">Profil sozlamalari</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Tabs */}
        <div className="w-full md:w-[240px] shrink-0 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab("personal")}
            className={`text-left px-5 py-3 rounded-xl text-[14px] font-medium transition-colors cursor-pointer ${
              activeTab === "personal"
                ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Shaxsiy ma'lumotlar
          </button>
          <button
            onClick={() => setActiveTab("mentor")}
            className={`text-left px-5 py-3 rounded-xl text-[14px] font-medium transition-colors cursor-pointer ${
              activeTab === "mentor"
                ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Mentor ma'lumotlari
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`text-left px-5 py-3 rounded-xl text-[14px] font-medium transition-colors cursor-pointer ${
              activeTab === "security"
                ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Xavfsizlik
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">
          
          {/* TAB: Personal Info */}
          {activeTab === "personal" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              {/* Profile Image */}
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-[72px] h-[72px] rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                    <User size={32} />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Rasm tanlash
                  </button>
                  {profileImage && (
                    <button 
                      onClick={handleRemoveImage}
                      className="px-4 py-2 bg-white border border-gray-200 text-red-500 text-[13px] font-medium rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Rasmni o'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-gray-900 mb-2">To'liq ism</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-gray-900 mb-2">Telefon</label>
                <input
                  type="text"
                  value={phone}
                  disabled
                  className="w-full px-4 h-[48px] rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
                >
                  <Check size={18} strokeWidth={2.5} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* TAB: Mentor Info */}
          {activeTab === "mentor" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Profession */}
                <div className="flex-1 flex flex-col">
                  <label className="text-[13px] font-bold text-gray-900 mb-2">Kasb / Lavozim</label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                  />
                </div>

                {/* Experience */}
                <div className="flex-1 flex flex-col">
                  <label className="text-[13px] font-bold text-gray-900 mb-2">Tajriba (yil)</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* About */}
              <div className="flex flex-col border-b border-gray-100 pb-8">
                <label className="text-[13px] font-bold text-gray-900 mb-2">O'zingiz haqingizda</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-4 py-3 min-h-[120px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors resize-y"
                ></textarea>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-1">Ijtimoiy tarmoqlar</h3>
                  <p className="text-[12px] text-gray-500">Har bir maydonga to'liq havola kiriting (masalan: https://t.me/username). Bo'sh qoldirsangiz bo'ladi.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">Telegram</label>
                    <input
                      type="text"
                      value={socials.telegram}
                      onChange={(e) => setSocials({ ...socials, telegram: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">Instagram</label>
                    <input
                      type="text"
                      value={socials.instagram}
                      onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">Facebook</label>
                    <input
                      type="text"
                      value={socials.facebook}
                      onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      value={socials.linkedin}
                      onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">GitHub</label>
                    <input
                      type="text"
                      value={socials.github}
                      onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[13px] font-bold text-gray-900 mb-2">Veb-sayt</label>
                    <input
                      type="text"
                      value={socials.website}
                      onChange={(e) => setSocials({ ...socials, website: e.target.value })}
                      className="w-full px-4 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
                >
                  <Check size={18} strokeWidth={2.5} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {/* TAB: Security */}
          {activeTab === "security" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col gap-4 max-w-2xl">
                {/* Current Password */}
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-gray-900 mb-2">Joriy parol</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 pr-12 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors tracking-widest placeholder:tracking-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-gray-900 mb-2">Yangi parol</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 pr-12 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors tracking-widest placeholder:tracking-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-gray-900 mb-2">Yangi parolni tasdiqlang</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 pr-12 h-[48px] rounded-lg border border-gray-200 focus:border-[#407BFF] text-[14px] text-gray-900 outline-none transition-colors tracking-widest placeholder:tracking-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#407BFF] hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer w-fit"
                >
                  <Check size={18} strokeWidth={2.5} />
                  Saqlash
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
