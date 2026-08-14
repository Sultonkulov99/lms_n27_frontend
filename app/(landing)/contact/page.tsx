"use client";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const infoCards = [
  {
    icon: <PhoneIcon sx={{ color: "#fff", fontSize: 22 }} />,
    title: "Telefon",
    value: "+99899 999 99 99",
  },
  {
    icon: <EmailIcon sx={{ color: "#fff", fontSize: 22 }} />,
    title: "Elektron pochta",
    value: "info@itlive.uz",
  },
  {
    icon: <LocationOnIcon sx={{ color: "#fff", fontSize: 22 }} />,
    title: "Manzil",
    value: "Manzil shu yerda kiritiladi",
  },
];

export default function ContactPage() {
  const [phone, setPhone] = useState("");

  return (
    <main className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-3xl mx-auto border border-dashed border-blue-400 rounded-xl p-6 bg-[#f0f2f5]">

        {/* Top heading */}
        <div className="mb-6">
          <p className="text-blue-500 text-sm font-medium mb-1">Bog'lanish</p>
          <h1 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-400 pb-3">
            Savollaringiz bo'lsa murojaat qiling
          </h1>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{card.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <p className="text-blue-500 text-sm font-medium text-center mb-1">
            Bog'lanish
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-7">
            Savollaringiz bo'lsa murojaat qiling
          </h2>

          <form className="flex flex-col gap-5">
            {/* F.I.SH */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                F.I.SH
              </label>
              <input
                type="text"
                placeholder="Kiriting"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              />
            </div>

            {/* Telefon raqamingiz */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                Telefon raqamingiz
              </label>
              <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition">
                {/* Country selector */}
                <div className="flex items-center gap-1 px-3 bg-white border-r border-gray-300 cursor-pointer select-none">
                  <span className="text-sm text-gray-700 font-medium">UZ</span>
                  <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#6b7280" }} />
                </div>
                {/* Prefix + input */}
                <div className="flex items-center flex-1">
                  <span className="pl-3 text-sm text-gray-500">+998</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=""
                    className="flex-1 px-2 py-2.5 text-sm text-gray-800 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Xabar */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                Xabar
              </label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition text-sm"
            >
              Yuborish
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
