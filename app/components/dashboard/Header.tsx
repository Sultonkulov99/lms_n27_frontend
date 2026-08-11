"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-[88px] flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-2">
        <ShieldCheck size={20} className="text-gray-700" />
        <span className="font-semibold text-gray-800 text-lg">Admin</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Icons Box */}
        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm text-gray-500">
          <button className="relative hover:text-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-[1px] h-5 bg-gray-200"></div>
          <button className="hover:text-gray-700 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Language Selector Box */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm cursor-pointer">
          <span>O'zbek (Lotin)</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* Profile Box */}
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
                Inomov Xurshid
              </span>
              <span className="text-[11px] text-gray-500 leading-none">
                Administrator
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-400 ml-1" />
          </button>

          {/* Profile Dropdown Menu */}
          <div
            className={`absolute right-0 top-14 w-56 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-xl py-1 z-50 origin-top-right transition-all duration-200 ease-out ${
              isProfileOpen
                ? "opacity-100 scale-100 translate-y-0 visible"
                : "opacity-0 scale-95 -translate-y-2 invisible"
            }`}
          >
            <button className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <User size={16} className="text-gray-400" />
                <span className="font-medium">Profilga o'tish</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5">
                <Settings size={16} className="text-gray-400" />
                <span className="font-medium">Profil sozlamalari</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors mt-1 border-t border-gray-50">
              <div className="flex items-center gap-2.5">
                <LogOut size={16} className="text-gray-400" />
                <span className="font-medium">Tizimdan chiqish</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
