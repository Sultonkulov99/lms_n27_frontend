"use client";

import { useState } from "react";
import { Camera, Check } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("Istamov Xurshid");
  const [phone, setPhone] = useState("+998 91 791 11 22");
  const [email, setEmail] = useState("example@gmail.com");

  const [image, setImage] = useState(
    "https://i.pravatar.cc/150?u=admin-profile"
  );

  const [notifications, setNotifications] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

  const handleDeleteImage = () => {
    setImage("https://i.pravatar.cc/150?u=admin-profile");
  };

  return (
    <main className="min-h-full w-full bg-[#F3F4F6] px-[13px] py-[17px]">
      {/* =========================
          PAGE TITLE
      ========================== */}

      <h1 className="mb-[28px] text-[18px] font-bold leading-[22px] text-[#171717]">
        {activeTab === "profile"
          ? "Shaxsiy ma’lumotlar"
          : "Profil sozlamalari"}
      </h1>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="grid w-full grid-cols-[256px_minmax(0,1fr)] gap-[12px]">
        {/* =========================
            LEFT MENU
        ========================== */}

        <aside className="w-[256px]">
          <div className="flex flex-col gap-[10px]">
            {/* PROFILE */}

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`h-[42px] w-full rounded-[5px] px-[12px] text-left text-[14px] font-medium leading-none transition ${
                activeTab === "profile"
                  ? "bg-white text-[#171717]"
                  : "bg-transparent text-[#404040] hover:bg-white/60"
              }`}
            >
              Shaxsiy ma’lumotlar
            </button>

            {/* SECURITY */}

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`h-[42px] w-full rounded-[5px] px-[12px] text-left text-[14px] font-medium leading-none transition ${
                activeTab === "security"
                  ? "bg-white text-[#171717]"
                  : "bg-transparent text-[#404040] hover:bg-white/60"
              }`}
            >
              Xavfsizlik
            </button>

            {/* NOTIFICATIONS */}

            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`h-[42px] w-full rounded-[5px] px-[12px] text-left text-[14px] font-medium leading-none transition ${
                activeTab === "notifications"
                  ? "bg-white text-[#171717]"
                  : "bg-transparent text-[#404040] hover:bg-white/60"
              }`}
            >
              Bildirishnomalar
            </button>
          </div>
        </aside>

        {/* =========================
            RIGHT CONTENT
        ========================== */}

        <section className="min-w-0">
          {/* ==================================================
              PROFILE
          ================================================== */}

          {activeTab === "profile" && (
            <div className="w-full rounded-[6px] bg-white px-[11px] py-[11px]">
              {/* IMAGE */}

              <div className="mb-[18px] flex items-center gap-[10px]">
                <div className="relative h-[44px] w-[44px] shrink-0">
                  <img
                    src={image}
                    alt="Profile"
                    className="h-[44px] w-[44px] rounded-full object-cover"
                  />

                  {/* CAMERA */}

                  <label className="absolute bottom-[-1px] right-[-1px] flex h-[17px] w-[17px] cursor-pointer items-center justify-center rounded-full border-[2px] border-white bg-[#407BFF]">
                    <Camera
                      size={9}
                      strokeWidth={2.5}
                      className="text-white"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="flex h-[24px] w-[64px] items-center justify-center rounded-full bg-[#F5F6F8] text-[11px] font-medium text-[#8A8F98]"
                >
                  O'chirish
                </button>
              </div>

              {/* NAME */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  To'liq ism
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* PHONE */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  Telefon
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* EMAIL */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* SAVE */}

              <button
                type="button"
                className="flex h-[43px] w-[120px] items-center justify-center gap-[5px] rounded-[5px] bg-[#407BFF] px-[12px] text-[12px] font-medium text-white transition hover:bg-[#306BEF]"
              >
                <Check
                  size={11}
                  strokeWidth={2.5}
                />
                Saqlash
              </button>
            </div>
          )}

          {/* ==================================================
              SECURITY
          ================================================== */}

          {activeTab === "security" && (
            <div className="w-full rounded-[6px] bg-white px-[11px] py-[11px]">
  

              {/* OLD PASSWORD */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  Joriy parol
                </label>

                <input
                  type="password"
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* NEW PASSWORD */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  Yangi parol
                </label>

                <input
                  type="password"
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="mb-[9px]">
                <label className="mb-[5px] block p-[4px] text-[13px] font-medium leading-none text-[#4B5563]">
                  Yangi parolni tasdiqlash
                </label>

                <input
                  type="password"
                  className="h-[40px] w-full rounded-[5px] border border-[#DDE1E7] bg-white px-[8px] text-[12px] text-[#7A8494] outline-none transition focus:border-[#407BFF]"
                />
              </div>

              {/* CHANGE PASSWORD */}

              <button
                type="button"
                className="flex h-[43px] w-[160px] items-center justify-center rounded-[5px] bg-[#407BFF] px-[12px] text-[12px] font-medium text-white transition hover:bg-[#306BEF]"
              >
                Parolni o'zgartirish
              </button>
            </div>
          )}

          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          {activeTab === "notifications" && (
            <div className="w-full rounded-[6px] bg-white px-[11px] py-[11px]">
              {/* TITLE */}

              <h2 className="mb-[10px] text-[15px] font-bold leading-none text-[#171717]">
                Pochta bildirishnomalari
              </h2>

              {/* TOGGLE */}

              <div className="mb-[9px] flex items-center gap-[7px]">
                <button
                  type="button"
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                  className={`relative h-[16px] w-[30px] shrink-0 rounded-full transition ${
                    notifications
                      ? "bg-[#407BFF]"
                      : "bg-[#E8EBF0]"
                  }`}
                  aria-label="Bildirishnomalarni yoqish"
                >
                  <span
                    className={`absolute top-[3px] h-[10px] w-[10px] rounded-full bg-white shadow-sm transition ${
                      notifications
                        ? "left-[17px]"
                        : "left-[3px]"
                    }`}
                  />
                </button>

                <span className="text-[13px] font-normal leading-none text-[#596273]">
                  Bildirishnomalarni qabul qilish
                </span>
              </div>

              {/* SAVE */}

              <button
                type="button"
                className="flex h-[43px] w-[120px] items-center justify-center gap-[5px] rounded-[5px] bg-[#407BFF] px-[12px] text-[12px] font-medium text-white transition hover:bg-[#306BEF]"
              >
                <Check
                  size={11}
                  strokeWidth={2.5}
                />
                Saqlash
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}