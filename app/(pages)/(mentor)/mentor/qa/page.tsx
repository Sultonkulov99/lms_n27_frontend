"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useMentorStore } from "@/store/useMentorStore";

export default function QAPage() {
  const { courses } = useMentorStore();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  // Initialize selected course
  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0].name);
    }
  }, [courses, selectedCourse]);

  const chats = [
    {
      id: 1,
      course: "CSS",
      studentName: "Alisher",
      lastMessage: "Assalomu alaykum yaxshimisiz? css bu nima",
      date: "12.08.2026 15:39",
      status: "Javob berilgan",
      color: "bg-pink-500",
    },
    {
      id: 2,
      course: "CSS",
      studentName: "Cloud",
      lastMessage: "salom",
      date: "12.08.2026 14:08",
      status: "Javob berilgan",
      color: "bg-blue-500",
    },
  ];

  const filteredChats = chats.filter(
    (chat) =>
      chat.course === selectedCourse &&
      chat.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-hidden p-6 flex flex-col relative h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 mb-1">Savol-javoblar</h1>
          <div className="text-[14px] text-gray-500 font-medium">
            {selectedCourse}
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FFF0F0] text-[#FF4D4F] px-3 py-1.5 rounded-full text-[12px] font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D4F]"></div>
          offline
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Left Pane - Chat List */}
        <div className="w-full lg:w-[350px] flex flex-col shrink-0">
          
          {/* Dropdown */}
          <div className="mb-4 relative">
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedChat(null);
              }}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 outline-none shadow-sm cursor-pointer font-medium"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
              {courses.length === 0 && <option value="">Tanlang</option>}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl flex-1 flex flex-col overflow-hidden shadow-sm">
            {/* Search */}
            <div className="p-4 border-b border-gray-100 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Izlash.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-[13px] outline-none focus:border-blue-500 transition-colors bg-white"
                />
              </div>
            </div>

            {/* Chat Items */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-gray-50 flex gap-3 cursor-pointer transition-colors ${
                    selectedChat === chat.id ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center font-bold text-[14px] ${chat.color}`}>
                    {chat.studentName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 truncate">
                      {chat.studentName}
                    </h4>
                    <p className="text-[12px] text-gray-600 truncate mb-1">
                      {chat.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-medium">
                      <span className="text-gray-400">{chat.date}</span>
                      <span className="text-[#137333]">{chat.status}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredChats.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-[13px]">
                  Ma'lumot topilmadi
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Pane - Chat Window Placeholder */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center">
          {!selectedChat ? (
            <span className="text-gray-500 text-[14px] font-medium">Savolni tanlang</span>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-gray-500 text-[14px] font-medium">Chat oynasi (Tez orada...)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
