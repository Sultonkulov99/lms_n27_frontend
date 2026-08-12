"use client";

import { ChevronRight } from "lucide-react";

export default function AdminDashboard() {

  return (
    <>

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
              <span className="text-sm text-gray-500 font-medium">
                Jami Administratorlar
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">12</span>
              <span className="text-sm text-gray-500 font-medium">
                Jami Mentorlar
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">24</span>
              <span className="text-sm text-gray-500 font-medium">
                Jami Assistentlar
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">400</span>
              <span className="text-sm text-gray-500 font-medium">
                Jami O'quvchilar
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">12</span>
              <span className="text-sm text-gray-500 font-medium">
                Jami Kurslar
              </span>
            </div>
          </div>
        </div>
    </>
  );
}
