"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, X, Calendar, ArrowUpDown, Filter, AlertCircle } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import {
  ExamScore,
  getScores,
  isScoresEndpointMissing,
  SCORES_ENDPOINT,
} from "@/app/lib/api/scores";
import { useProfileStore } from "@/store/useProfileStore";

const ADMIN_ROLES = ["ADMIN", "SUPERADMIN"];

type SortKey = "correct" | "incorrect" | "passed";
type SortDir = "asc" | "desc";

export default function ScorePage() {
  const { profile, fetchProfile, error: profileError } = useProfileStore();

  const [scores, setScores] = useState<ExamScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [endpointMissing, setEndpointMissing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const isAdmin = !!profile && ADMIN_ROLES.includes(profile.role);

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [profile, fetchProfile]);

  const loadScores = async () => {
    try {
      setLoading(true);
      setError("");
      setEndpointMissing(false);
      setScores(await getScores());
    } catch (err: any) {
      console.error(err);
      if (isScoresEndpointMissing(err)) {
        setEndpointMissing(true);
        setScores([]);
      } else {
        setError(err.response?.data?.message || err.message || "Yuklanmadi");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadScores();
  }, [isAdmin]);

  const courseName = (row: ExamScore) => row.course?.name || "—";
  const sectionName = (row: ExamScore) => row.section?.name || "—";
  const studentName = (row: ExamScore) => row.user?.fullName || "—";

  const courseOptions = useMemo(
    () => [...new Set(scores.map(courseName))].filter((n) => n !== "—"),
    [scores],
  );
  const sectionOptions = useMemo(
    () => [...new Set(scores.map(sectionName))].filter((n) => n !== "—"),
    [scores],
  );

  const getAvatarUrl = (file?: string | null) => {
    if (!file) return "/default-avatar.png";
    if (file.startsWith("http")) return file;
    return `${process.env.NEXT_PUBLIC_API_URL}${file}`;
  };

  const filteredScores = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();
    const from = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
    const to = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : null;

    const rows = scores.filter((row) => {
      if (search && !studentName(row).toLowerCase().includes(search)) return false;
      if (courseFilter && courseName(row) !== courseFilter) return false;
      if (sectionFilter && sectionName(row) !== sectionFilter) return false;

      if (from || to) {
        const created = row.created_at ? new Date(row.created_at).getTime() : NaN;
        if (Number.isNaN(created)) return false;
        if (from && created < from) return false;
        if (to && created > to) return false;
      }
      return true;
    });

    if (sortKey) {
      const factor = sortDir === "asc" ? 1 : -1;
      rows.sort((a, b) => {
        const valA = sortKey === "passed" ? Number(a.passed) : a[sortKey];
        const valB = sortKey === "passed" ? Number(b.passed) : b[sortKey];
        return (valA - valB) * factor;
      });
    }

    return rows;
  }, [scores, searchQuery, courseFilter, sectionFilter, dateFrom, dateTo, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredScores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredScores.length);
  const currentScores = filteredScores.slice(startIndex, endIndex);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setCurrentPage(1);
  };

  const handleDownloadXLS = () => {
    const headers = [
      "F.I.Sh",
      "Kurs",
      "Bo’lim",
      "To’g’ri javob",
      "Noto’g’ri javob",
      "Imtihondan o’tish natijasi",
    ];
    const rows = filteredScores.map((row) =>
      [
        studentName(row),
        courseName(row),
        sectionName(row),
        row.correct,
        row.incorrect,
        row.passed ? "O’tgan" : "O’tmagan",
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "natijalar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (profileError) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-red-500 text-sm">
        {profileError}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-400 text-sm">
        Yuklanmoqda...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center p-6">
        <AlertCircle size={40} className="text-red-400" />
        <h1 className="text-[20px] font-bold text-gray-900">Ruxsat yo’q</h1>
        <p className="text-[14px] text-gray-500">
          Bu sahifani faqat administrator ko’ra oladi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-4">
        <h1 className="text-[24px] font-bold text-gray-900 mb-1">Natijalar</h1>
        <div className="flex items-center text-[13px] text-gray-500 font-medium">
          Natijalar
          <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-100 min-w-70">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="O’quvchining ismi yoki familiyasi"
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

        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="text-[13px] text-gray-700 outline-none bg-transparent"
          />
          <span className="text-gray-400">–</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="text-[13px] text-gray-700 outline-none bg-transparent"
          />
          <Calendar size={16} className="text-gray-400" />
        </div>

        {(searchQuery || courseFilter || sectionFilter || dateFrom || dateTo) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setCourseFilter("");
              setSectionFilter("");
              setDateFrom("");
              setDateTo("");
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Tozalash
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center text-gray-400 text-sm">Yuklanmoqda...</div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 text-sm">{error}</div>
      )}

      {!loading && !error && endpointMissing && (
        <div className="flex items-start gap-3 mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>
            Backendda <code className="font-mono">{SCORES_ENDPOINT}</code>{" "}
            endpointi hali mavjud emas, shuning uchun jadval bo’sh. Endpoint
            qo’shilgach sahifa avtomatik ishlaydi.
          </span>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200 min-w-275">
                <thead>
                  <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                    <th className="px-5 py-4 border border-gray-200">
                      F.I.Sh
                      <Filter size={12} className="inline-block text-gray-400 ml-1.5" />
                    </th>
                    <th className="px-5 py-4 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        Kurs
                        <select
                          value={courseFilter}
                          onChange={(e) => {
                            setCourseFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="text-[12px] font-medium text-gray-500 bg-transparent outline-none cursor-pointer"
                        >
                          <option value="">Barchasi</option>
                          {courseOptions.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                    <th className="px-5 py-4 border border-gray-200">
                      <div className="flex items-center gap-1.5">
                        Bo’lim
                        <select
                          value={sectionFilter}
                          onChange={(e) => {
                            setSectionFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="text-[12px] font-medium text-gray-500 bg-transparent outline-none cursor-pointer"
                        >
                          <option value="">Barchasi</option>
                          {sectionOptions.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                    <th
                      className="px-5 py-4 border border-gray-200 cursor-pointer select-none"
                      onClick={() => toggleSort("correct")}
                    >
                      To’g’ri javob
                      <ArrowUpDown size={12} className="inline-block text-gray-400 ml-1.5" />
                    </th>
                    <th
                      className="px-5 py-4 border border-gray-200 cursor-pointer select-none"
                      onClick={() => toggleSort("incorrect")}
                    >
                      Noto’g’ri javob
                      <ArrowUpDown size={12} className="inline-block text-gray-400 ml-1.5" />
                    </th>
                    <th
                      className="px-5 py-4 border border-gray-200 text-center cursor-pointer select-none"
                      onClick={() => toggleSort("passed")}
                    >
                      Imtihondan o’tish natijasi
                      <ArrowUpDown size={12} className="inline-block text-gray-400 ml-1.5" />
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-800">
                  {currentScores.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                        <td className="px-5 py-4 border border-gray-200">
                          <div className="flex items-center gap-3">
                            <img
                              src={getAvatarUrl(row.user?.file)}
                              alt={studentName(row)}
                              className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200"
                            />
                            <span className="font-semibold text-[13px]">
                              {studentName(row)}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                          {courseName(row)}
                        </td>
                        <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                          {sectionName(row)}
                        </td>
                        <td className="px-5 py-4 border border-gray-200">
                          {row.correct}
                        </td>
                        <td className="px-5 py-4 border border-gray-200">
                          {row.incorrect}
                        </td>
                        <td className="px-5 py-4 border border-gray-200 text-center">
                          <span
                            className={`inline-block px-4 py-1 rounded-full font-medium text-[12px] ${
                              row.passed
                                ? "bg-[#E6F4EA] text-[#1E8E3E]"
                                : "bg-[#FCE8E6] text-[#D93025]"
                            }`}
                          >
                            {row.passed ? "O’tgan" : "O’tmagan"}
                          </span>
                        </td>
                    </tr>
                  ))}

                  {currentScores.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-gray-400 text-[14px] border border-gray-200"
                      >
                        Natijalar topilmadi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredScores.length}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1);
            }}
            onDownloadXLS={handleDownloadXLS}
          />
        </>
      )}
    </div>
  );
}
