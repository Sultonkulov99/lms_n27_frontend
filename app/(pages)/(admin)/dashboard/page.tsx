"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  Users,
  BookOpen,
  CreditCard,
  MonitorPlay,
  ShieldCheck,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  PanelLeftClose,
  MessageSquare,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const userSubLinks = ["adminstrators", "assistents", "mentors", "students"];

  return (
    <aside
      className={`${
        isOpen ? "w-[280px]" : "w-[80px]"
      } bg-[#0F172A] text-white flex flex-col h-full flex-shrink-0 transition-all duration-300 ease-in-out z-20`}
    >
      {/* Logo Area */}
      <div
        className={`flex items-center h-16 ${
          isOpen ? "px-6 justify-between" : "justify-center"
        }`}
      >
        <div
          className={`text-2xl font-bold flex items-center tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isOpen ? "w-auto opacity-100" : "w-0 opacity-0"
          }`}
        >
          <span className="text-blue-500">i</span>TLive
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white p-1 rounded bg-white/10 transition-colors"
        >
          <PanelLeftClose
            size={18}
            className={`transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-6">
        <div>
          <div
            className={`mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isOpen ? "px-6 opacity-100" : "px-0 opacity-0 h-0"
            }`}
          >
            Boshqaruv Paneli
          </div>
          <nav className={`space-y-1 ${isOpen ? "px-3" : "px-2"}`}>
            <a
              href="#"
              className={`flex items-center py-2.5 bg-white/10 rounded-lg text-white transition-all overflow-hidden ${
                isOpen ? "px-3 gap-3" : "justify-center px-0 gap-0"
              }`}
              title="Asosiy"
            >
              <LayoutGrid size={20} className="text-white flex-shrink-0" />
              <span
                className={`font-medium text-sm whitespace-nowrap transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                Asosiy
              </span>
            </a>

            {/* Foydalanuvchilar Accordion */}
            <div>
              <button
                onClick={() => {
                  if (!isOpen) {
                    setIsOpen(true);
                    setIsUsersOpen(true);
                  } else {
                    setIsUsersOpen(!isUsersOpen);
                  }
                }}
                className={`w-full flex items-center justify-between py-2.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg group transition-all overflow-hidden ${
                  isOpen ? "px-3" : "justify-center px-0"
                }`}
                title="Foydalanuvchilar"
              >
                <div className={`flex items-center ${isOpen ? "gap-3" : "gap-0"}`}>
                  <Users size={20} className="flex-shrink-0" />
                  <span
                    className={`font-medium text-sm whitespace-nowrap transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}
                  >
                    Foydalanuvchilar
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isUsersOpen ? "rotate-180" : ""
                  } ${isOpen ? "opacity-100 w-4 ml-2" : "opacity-0 w-0 ml-0"}`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen && isUsersOpen ? "max-h-60 mt-1 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-11 pr-3 py-1 space-y-1">
                  {userSubLinks.map((link) => (
                    <a
                      key={link}
                      href={`/dashboard/${link}`}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg capitalize transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Kurslar Accordion */}
            <div>
              <button
                onClick={() => {
                  if (!isOpen) {
                    setIsOpen(true);
                    setIsCoursesOpen(true);
                  } else {
                    setIsCoursesOpen(!isCoursesOpen);
                  }
                }}
                className={`w-full flex items-center justify-between py-2.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg group transition-all overflow-hidden ${
                  isOpen ? "px-3" : "justify-center px-0"
                }`}
                title="Kurslar"
              >
                <div className={`flex items-center ${isOpen ? "gap-3" : "gap-0"}`}>
                  <BookOpen size={20} className="flex-shrink-0" />
                  <span
                    className={`font-medium text-sm whitespace-nowrap transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}
                  >
                    Kurslar
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isCoursesOpen ? "rotate-180" : ""
                  } ${isOpen ? "opacity-100 w-4 ml-2" : "opacity-0 w-0 ml-0"}`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen && isCoursesOpen ? "max-h-96 mt-1 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-11 pr-3 py-1 space-y-1">
                  {[
                    "Barcha kurslar",
                    "Kategoriyalar",
                    "Guruhlar",
                    "Darslar",
                    "Vazifalar",
                    "Testlar",
                    "Savol javoblar",
                    "Uyga vazifalar",
                  ].map((link, idx) => (
                    <a
                      key={link}
                      href="#"
                      className={`block px-3 py-2 text-sm rounded-lg capitalize transition-colors ${
                        idx === 0 
                          ? "bg-white/10 text-white font-medium" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#"
              className={`flex items-center py-2.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all overflow-hidden ${
                isOpen ? "px-3 gap-3" : "justify-center px-0 gap-0"
              }`}
              title="To'lovlar"
            >
              <CreditCard size={20} className="flex-shrink-0" />
              <span
                className={`font-medium text-sm whitespace-nowrap transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                To'lovlar
              </span>
            </a>
            
            <a
              href="#"
              className={`flex items-center py-2.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all overflow-hidden ${
                isOpen ? "px-3 gap-3" : "justify-center px-0 gap-0"
              }`}
              title="Izohlar"
            >
              <MessageSquare size={20} className="flex-shrink-0" />
              <span
                className={`font-medium text-sm whitespace-nowrap transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                Izohlar
              </span>
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default function AdminDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans overflow-hidden text-gray-900">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-[88px] flex items-center justify-between px-8 flex-shrink-0">
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
                className={`absolute right-0 top-12 w-56 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-xl py-1 z-50 origin-top-right transition-all duration-200 ease-out ${
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

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Asosiy</h1>
            <div className="flex items-center text-sm text-gray-500 font-medium">
              Boshqaruv paneli <ChevronRight size={14} className="mx-1" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">3</span>
              <span className="text-sm text-gray-500 font-medium">Jami Administratorlar</span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">12</span>
              <span className="text-sm text-gray-500 font-medium">Jami Mentorlar</span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">24</span>
              <span className="text-sm text-gray-500 font-medium">Jami Assistentlar</span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">400</span>
              <span className="text-sm text-gray-500 font-medium">Jami O'quvchilar</span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">12</span>
              <span className="text-sm text-gray-500 font-medium">Jami Kurslar</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
