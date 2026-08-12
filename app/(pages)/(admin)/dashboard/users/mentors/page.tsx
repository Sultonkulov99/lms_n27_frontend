"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  EyeOff,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Star,
  Send,
  ArrowLeft,
  ShieldCheck,
  Bell,
  Settings,
  LogOut,
  User,
  Menu,
} from "lucide-react";

import Sidebar from "@/app/components/dashboard/SideBar";
import Pagination from "@/app/components/dashboard/Pagination";

/* =========================================================
   TYPES
========================================================= */

type Course = {
  id: number;
  title: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  students: number;
  description: string;
};

type Mentor = {
  id: number;
  fullName: string;
  phone: string;
  password: string;
  createdAt: string;
  role: "Mentor";
  experience: string;
  profession: string;
  website: string;
  description: string;
  facebook: string;
  telegram: string;
  linkedin: string;
  instagram: string;
  github: string;
  avatar: string;
  status: "Faol" | "Nofaol";
  courses: Course[];
};

/* =========================================================
   DATA
========================================================= */

const initialMentors: Mentor[] = [
  {
    id: 1,
    fullName: "Istamov Xurshid Hazratqul o‘g‘li",
    phone: "+998 91 799 99 99",
    password: "123456",
    createdAt: "2023-04-09 14:21:44",
    role: "Mentor",
    experience: "3 yil",
    profession: "Full-stack software engineer",
    website: "https://xdes.uz",
    description:
      "Full-stack dasturlash va zamonaviy web texnologiyalar.",
    facebook: "Facebook.com",
    telegram: "Telegram.me",
    linkedin: "LinkedIn",
    instagram: "Instagram.com",
    github: "GitHub.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Faol",
    courses: [],
  },

  {
    id: 2,
    fullName: "Oybek Safarov",
    phone: "+998 99 999 99 99",
    password: "123456",
    createdAt: "2024-03-27 11:28:59",
    role: "Mentor",
    experience: "3 yil",
    profession: "Front-end Developer, Designer",
    website: "https://example.com",
    description:
      "Frontend va UI/UX yo‘nalishlarida tajribali mentor.",
    facebook: "Facebook.com",
    telegram: "Telegram.me",
    linkedin: "LinkedIn",
    instagram: "Instagram.com",
    github: "GitHub.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "Faol",

    courses: [
      {
        id: 1,
        title: "Frontend dasturlash",
        category: "Frontend",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
        price: "250 000",
        rating: 4.5,
        students: 120,
        description:
          "SMM sohasini 0 dan o‘rganing va faoliyatingizni eng yaxshi kompaniyada olib boring.",
      },

      {
        id: 2,
        title: "Grafik Dizayn",
        category: "Grafik dizayn",
        image:
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900",
        price: "250 000",
        rating: 4.5,
        students: 98,
        description:
          "Grafik dizaynni 0 dan o‘rganib professional dizayner bo‘ling.",
      },

      {
        id: 3,
        title: "Grafik Dizayn",
        category: "Grafik dizayn",
        image:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900",
        price: "250 000",
        rating: 4.5,
        students: 75,
        description:
          "Zamonaviy grafik dizayn dasturlarini o‘rganing.",
      },

      {
        id: 4,
        title: "Grafik Dizayn",
        category: "Grafik dizayn",
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900",
        price: "250 000",
        rating: 4.5,
        students: 63,
        description:
          "Professional grafik dizayn kursi.",
      },
    ],
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function MentorsPage() {
  const [mentors, setMentors] =
    useState<Mentor[]>(initialMentors);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [modal, setModal] = useState<
    | "add"
    | "edit"
    | "view"
    | "delete"
    | "successAdd"
    | "successDelete"
    | null
  >(null);

  const [selectedMentor, setSelectedMentor] =
    useState<Mentor | null>(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showCourses, setShowCourses] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "+998",
    password: "",
    experience: "",
    profession: "",
    website: "http://",
    description: "",
    facebook: "Facebook.com",
    telegram: "Telegram.me",
    linkedin: "LinkedIn",
    instagram: "Instagram.com",
    github: "GitHub.com",
  });

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredMentors = useMemo(() => {
    return mentors.filter(
      (mentor) =>
        mentor.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        mentor.phone.includes(search),
    );
  }, [mentors, search]);

  const totalPages = Math.ceil(
    filteredMentors.length / itemsPerPage,
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredMentors.length,
  );
  const currentMentors = filteredMentors.slice(
    startIndex,
    endIndex,
  );

  /* =========================================================
     ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    setSelectedMentor(null);

    setForm({
      fullName: "",
      phone: "+998",
      password: "",
      experience: "",
      profession: "",
      website: "http://",
      description: "",
      facebook: "Facebook.com",
      telegram: "Telegram.me",
      linkedin: "LinkedIn",
      instagram: "Instagram.com",
      github: "GitHub.com",
    });

    setShowPassword(false);
    setModal("add");
  };

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const openEditModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);

    setForm({
      fullName: mentor.fullName,
      phone: mentor.phone,
      password: mentor.password,
      experience: mentor.experience,
      profession: mentor.profession,
      website: mentor.website,
      description: mentor.description,
      facebook: mentor.facebook,
      telegram: mentor.telegram,
      linkedin: mentor.linkedin,
      instagram: mentor.instagram,
      github: mentor.github,
    });

    setShowPassword(false);
    setModal("edit");
  };

  /* =========================================================
     VIEW
  ========================================================= */

  const openViewModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setModal("view");
  };

  /* =========================================================
     DELETE MODAL
  ========================================================= */

  const openDeleteModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setModal("delete");
  };

  /* =========================================================
     INPUT
  ========================================================= */

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================================
     DOWNLOAD XLS
  ========================================================= */

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "F.I.Sh",
      "Telefon raqam",
      "Yaratilgan vaqt",
      "Rol",
      "Holati",
    ];

    const rows = mentors.map((mentor) =>
      [
        mentor.id,
        mentor.fullName,
        mentor.phone,
        mentor.createdAt,
        mentor.role,
        mentor.status,
      ].join(","),
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mentorlar.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = () => {
    if (!form.fullName.trim()) {
      alert("F.I.Sh ni kiriting");
      return;
    }

    if (!form.phone.trim()) {
      alert("Telefon raqamini kiriting");
      return;
    }

    if (!form.password.trim()) {
      alert("Parolni kiriting");
      return;
    }

    /* ADD */

    if (modal === "add") {
      const newMentor: Mentor = {
        id: Date.now(),
        fullName: form.fullName,
        phone: form.phone,
        password: form.password,
        createdAt: new Date()
          .toISOString()
          .replace("T", " ")
          .slice(0, 19),
        role: "Mentor",
        experience: form.experience,
        profession: form.profession,
        website: form.website,
        description: form.description,
        facebook: form.facebook,
        telegram: form.telegram,
        linkedin: form.linkedin,
        instagram: form.instagram,
        github: form.github,
        avatar: "https://i.pravatar.cc/150?img=13",
        status: "Faol",
        courses: [],
      };

      setMentors((prev) => [
        ...prev,
        newMentor,
      ]);

      setModal("successAdd");

      return;
    }

    /* EDIT */

    if (modal === "edit" && selectedMentor) {
      setMentors((prev) =>
        prev.map((mentor) =>
          mentor.id === selectedMentor.id
            ? {
                ...mentor,
                fullName: form.fullName,
                phone: form.phone,
                password: form.password,
                experience: form.experience,
                profession: form.profession,
                website: form.website,
                description: form.description,
                facebook: form.facebook,
                telegram: form.telegram,
                linkedin: form.linkedin,
                instagram: form.instagram,
                github: form.github,
              }
            : mentor,
        ),
      );

      setModal(null);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (!selectedMentor) return;

    setMentors((prev) =>
      prev.filter(
        (mentor) =>
          mentor.id !== selectedMentor.id,
      ),
    );

    setSelectedMentor(null);

    setModal("successDelete");
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA] font-sans text-[#151515]">

      {/* SIDEBAR */}

      <div
        className={`fixed inset-y-0 left-0 z-[60] transition-transform duration-300 lg:static lg:block lg:translate-x-0 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* MOBILE OVERLAY */}

      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setIsMobileSidebarOpen(false)
          }
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
        />
      )}

      {/* RIGHT SIDE */}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* TOP NAVBAR */}

        <header className="flex h-[88px] shrink-0 items-center justify-between px-5 md:px-8">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setIsMobileSidebarOpen(true)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm lg:hidden"
            >
              <Menu size={19} />
            </button>

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={20}
                className="text-gray-700"
              />

              <span className="text-lg font-semibold text-gray-800">
                Admin
              </span>

            </div>

          </div>

          <div className="flex items-center gap-2 md:gap-4">

            <div className="hidden items-center gap-4 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-gray-500 shadow-sm sm:flex">

              <button
                type="button"
                className="relative transition hover:text-gray-700"
              >
                <Bell size={20} />

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
              </button>

              <div className="h-5 w-px bg-gray-200" />

              <button
                type="button"
                className="transition hover:text-gray-700"
              >
                <Settings size={20} />
              </button>

            </div>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm sm:flex"
            >
              <span>O'zbek (Lotin)</span>

              <ChevronDown
                size={16}
                className="text-gray-400"
              />
            </button>

            {/* PROFILE */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setIsProfileOpen(
                    (prev) => !prev,
                  )
                }
                className="flex items-center gap-2 rounded-full border border-gray-100 bg-white p-1 pr-3 shadow-sm transition hover:shadow-md md:gap-3 md:pr-4"
              >

                <img
                  src="https://i.pravatar.cc/150?u=admin"
                  alt="Profile"
                  className="h-9 w-9 rounded-full bg-gray-100 object-cover"
                />

                <div className="hidden flex-col md:flex">

                  <span className="mb-0.5 text-sm font-bold leading-none text-gray-900">
                    Inomov Xurshid
                  </span>

                  <span className="text-[11px] leading-none text-gray-500">
                    Administrator
                  </span>

                </div>

                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    isProfileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* PROFILE DROPDOWN */}

              <div
                className={`absolute right-0 top-12 z-[70] w-56 origin-top-right rounded-xl border border-gray-100 bg-white py-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 ${
                  isProfileOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                }`}
              >

                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2.5">

                    <User
                      size={16}
                      className="text-gray-400"
                    />

                    <span className="font-medium">
                      Profilga o'tish
                    </span>

                  </div>

                  <ChevronRightIcon />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2.5">

                    <Settings
                      size={16}
                      className="text-gray-400"
                    />

                    <span className="font-medium">
                      Profil sozlamalari
                    </span>

                  </div>

                  <ChevronRightIcon />
                </button>

                <button
                  type="button"
                  className="mt-1 flex w-full items-center justify-between border-t border-gray-50 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2.5">

                    <LogOut
                      size={16}
                      className="text-gray-400"
                    />

                    <span className="font-medium">
                      Tizimdan chiqish
                    </span>

                  </div>

                  <ChevronRightIcon />
                </button>

              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-8">

          {!showCourses ? (
            <>

              {/* PAGE HEADER */}

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h1 className="text-[24px] font-bold">
                    Mentorlar
                  </h1>

                  <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-500">
                    <span>Foydalanuvchilar</span>
                    <span>•</span>
                    <span>Mentorlar</span>
                  </div>

                </div>

                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 rounded-md bg-[#4385ee] px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3476df]"
                >
                  <Plus size={16} />
                  Qo‘shish
                </button>

              </div>

              {/* SEARCH BAR */}

              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-[400px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                  <input
                    type="text"
                    placeholder="Izlash..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors bg-white shadow-sm"
                  />

                  {search && (
                    <X
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                      size={16}
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="bg-[#407BFF] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Izlash
                </button>
              </div>

              {/* TABLE (Excel Style Borders) */}

              <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200 min-w-[1000px]">
                    <thead>
                      <tr className="bg-white text-[12px] text-gray-900 font-bold tracking-wider">
                        <th className="px-5 py-4 w-16 border border-gray-200">ID</th>
                        <th className="px-5 py-4 border border-gray-200">
                          F.I.Sh <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                        </th>
                        <th className="px-5 py-4 border border-gray-200">
                          Telefon raqam <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                        </th>
                        <th className="px-5 py-4 border border-gray-200">
                          Yaratilgan vaqt <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                        </th>
                        <th className="px-5 py-4 border border-gray-200">
                          Rol <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                        </th>
                        <th className="px-5 py-4 border border-gray-200">Parol</th>
                        <th className="px-5 py-4 border border-gray-200">
                          Holati <ChevronDown size={14} className="inline-block text-gray-400 ml-1" />
                        </th>
                        <th className="px-5 py-4 text-center border border-gray-200">Amallar</th>
                      </tr>
                    </thead>

                    <tbody className="text-[14px] text-gray-800">
                      {currentMentors.map((mentor) => (
                        <tr key={mentor.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-5 py-4 font-medium border border-gray-200">
                            {mentor.id}
                          </td>

                          <td className="px-5 py-4 border border-gray-200">
                            <div className="flex items-center gap-3">
                              <img
                                src={mentor.avatar}
                                alt={mentor.fullName}
                                className="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200"
                              />
                              <span className="font-semibold text-[13px]">
                                {mentor.fullName}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-gray-600 font-medium text-[13px] border border-gray-200">
                            {mentor.phone}
                          </td>

                          <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                            {mentor.createdAt}
                          </td>

                          <td className="px-5 py-4 text-gray-600 text-[13px] border border-gray-200">
                            {mentor.role}
                          </td>

                          <td className="px-5 py-4 text-gray-400 border border-gray-200">
                            <div className="flex items-center gap-2">
                              <span>********</span>
                              <EyeOff size={16} className="cursor-pointer hover:text-gray-600" />
                            </div>
                          </td>

                          <td className="px-5 py-4 border border-gray-200">
                            <span className="bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#CEEAD6]">
                              {mentor.status}
                            </span>
                          </td>

                          <td className="px-5 py-4 border border-gray-200">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openViewModal(mentor)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                                title="Ko‘rish"
                              >
                                <Eye size={14} />
                              </button>

                              <button
                                onClick={() => openEditModal(mentor)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                                title="Tahrirlash"
                              >
                                <Pencil size={14} />
                              </button>

                              <button
                                onClick={() => openDeleteModal(mentor)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                                title="O‘chirish"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {currentMentors.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-6 py-10 text-center text-gray-500 border border-gray-200">
                            Ma'lumot topilmadi
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BOTTOM PAGINATION COMPONENT */}

              <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-[#F8F9FA]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredMentors.length}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  onDownloadXLS={handleDownloadXLS}
                />
              </div>

            </>

          ) : (

            <MentorCourses
              mentor={selectedMentor}
              onBack={() => {
                setShowCourses(false);
                setSelectedMentor(null);
              }}
            />

          )}

        </div>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {(modal === "add" || modal === "edit") && (

        <Modal onClose={() => setModal(null)}>

          <div className="max-h-[90vh] overflow-y-auto">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

              <h2 className="text-[17px] font-bold text-[#151515]">
                {modal === "add"
                  ? "Qo‘shish"
                  : "Tahrirlash"}
              </h2>

              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-gray-600 transition hover:text-black"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <div className="grid grid-cols-1 gap-x-5 gap-y-3 px-5 py-4 md:grid-cols-2">

              <div className="md:col-span-2">

                <Input
                  label="F.I.Sh"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInput}
                  placeholder="Kiriting"
                />

              </div>

              <div className="md:col-span-2">

                <Input
                  label="Telefon raqami"
                  name="phone"
                  value={form.phone}
                  onChange={handleInput}
                  placeholder="+998"
                />

              </div>

              <div className="md:col-span-2">

                <label className="mb-1 block text-[11px] font-semibold">
                  Parol
                </label>

                <div className="relative">

                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleInput}
                    placeholder="******"
                    className="h-[38px] w-full rounded-[3px] border border-[#dfe3e8] px-3 pr-10 text-[12px] outline-none transition focus:border-[#4385ee]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>

                </div>

              </div>

              <div className="border-b border-gray-200 pb-2 pt-2">

                <h3 className="text-[13px] font-bold">
                  Mentor haqida qisqacha ma’lumot
                </h3>

              </div>

              <div className="border-b border-gray-200 pb-2 pt-2">

                <h3 className="text-[13px] font-bold">
                  Ijtimoiy tarmoqlar
                </h3>

              </div>

              <Input
                label="Tajriba"
                name="experience"
                value={form.experience}
                onChange={handleInput}
                placeholder="Kiriting"
              />

              <SocialInput
                label="Facebook"
                name="facebook"
                value={form.facebook}
                onChange={handleInput}
                icon={
                  <span className="font-bold text-[12px]">
                    f
                  </span>
                }
              />

              <Input
                label="Kasb"
                name="profession"
                value={form.profession}
                onChange={handleInput}
                placeholder="Kiriting"
              />

              <SocialInput
                label="Telegram"
                name="telegram"
                value={form.telegram}
                onChange={handleInput}
                icon={<Send size={13} />}
              />

              <Input
                label="Sayt"
                name="website"
                value={form.website}
                onChange={handleInput}
                placeholder="http://"
              />

              <SocialInput
                label="LinkedIn"
                name="linkedin"
                value={form.linkedin}
                onChange={handleInput}
                icon={
                  <span className="font-bold text-[9px]">
                    in
                  </span>
                }
              />

              <div>

                <label className="mb-1 block text-[11px] font-semibold">
                  Qisqacha
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInput}
                  placeholder="Kiriting"
                  className="h-[112px] w-full resize-none rounded-[3px] border border-[#dfe3e8] p-3 text-[12px] outline-none transition focus:border-[#4385ee]"
                />

              </div>

              <div className="space-y-3">

                <SocialInput
                  label="Instagram"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleInput}
                  icon={
                    <span className="font-bold text-[14px]">
                      ◎
                    </span>
                  }
                />

                <SocialInput
                  label="GitHub"
                  name="github"
                  value={form.github}
                  onChange={handleInput}
                  icon={
                    <span className="font-bold text-[8px]">
                      GH
                    </span>
                  }
                />

              </div>

            </div>

            {/* SAVE */}

            <div className="px-5 pb-4">

              <button
                type="button"
                onClick={handleSave}
                className="flex h-[38px] items-center gap-2 rounded-[4px] bg-[#4385ee] px-5 text-[12px] font-semibold text-white transition hover:bg-[#3476df]"
              >
                <Check size={15} />
                Saqlash
              </button>

            </div>

          </div>

        </Modal>

      )}

      {/* =====================================================
          VIEW MODAL
      ====================================================== */}

      {modal === "view" && selectedMentor && (

        <Modal onClose={() => setModal(null)}>

          <div>

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

              <h2 className="text-[17px] font-bold">
                Mentor haqida
              </h2>

              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-gray-600 hover:text-black"
              >
                <X size={19} />
              </button>

            </div>

            <div className="px-5 py-4">

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">

                <img
                  src={selectedMentor.avatar}
                  alt={selectedMentor.fullName}
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />

                <div>

                  <h3 className="text-[18px] font-bold leading-tight">
                    {selectedMentor.fullName}
                  </h3>

                  <p className="mt-1 text-[11px] font-medium text-gray-800">
                    {selectedMentor.profession}
                  </p>

                </div>

              </div>

              <section className="mt-4">

                <h3 className="border-b border-gray-200 pb-2 text-[14px] font-bold">
                  To‘liq ma’lumotlar
                </h3>

                <div className="space-y-2.5 pt-2">

                  <Info
                    label="Telefon raqami"
                    value={selectedMentor.phone}
                  />

                  <Info
                    label="Rol"
                    value={selectedMentor.role}
                  />

                  <Info
                    label="Ro’yxatdan o‘tgan vaqti"
                    value={selectedMentor.createdAt}
                  />

                  <Info
                    label="Ish tajribasi"
                    value={selectedMentor.experience}
                  />

                  <Info
                    label="Kasbi"
                    value={selectedMentor.profession}
                  />

                  <Info
                    label="Holati"
                    value={selectedMentor.status}
                  />

                </div>

              </section>

              <section className="mt-4">

                <h3 className="border-b border-gray-200 pb-2 text-[14px] font-bold">
                  Kurslar
                </h3>

                <div className="pt-2">

                  <p className="text-[10px] text-gray-500">
                    Nomi
                  </p>

                  <p className="mt-1 text-[12px] font-bold">
                    {selectedMentor.courses[0]?.title ||
                      "Kurs mavjud emas"}
                  </p>

                </div>

              </section>

              <section className="mt-4">

                <h3 className="border-b border-gray-200 pb-2 text-[14px] font-bold">
                  Ijtimoiy tarmoq sahifalari:
                </h3>

                <div className="mt-2 flex items-center gap-2">

                  <SocialButton
                    icon={
                      <span className="font-bold text-[20px]">
                        f
                      </span>
                    }
                  />

                  <SocialButton
                    icon={<Send size={18} />}
                  />

                  <SocialButton
                    icon={
                      <span className="font-bold text-[20px]">
                        ◎
                      </span>
                    }
                  />

                  <SocialButton
                    icon={
                      <span className="font-bold text-[13px]">
                        in
                      </span>
                    }
                  />

                  <SocialButton
                    icon={
                      <span className="font-bold text-[11px]">
                        GH
                      </span>
                    }
                  />

                  <button
                    type="button"
                    className="flex h-[44px] items-center justify-center rounded-[6px] bg-[#f1f2f4] px-5 text-[11px] font-bold hover:bg-gray-200"
                  >
                    Portfolio
                  </button>

                </div>

              </section>

              <div className="mt-3 flex justify-end border-t border-gray-200 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    openEditModal(
                      selectedMentor,
                    )
                  }
                  className="flex h-[38px] items-center gap-2 rounded-[6px] border border-[#dfe3e8] px-4 text-[11px] font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <Pencil size={14} />
                  Tahrirlash
                </button>

              </div>

            </div>

          </div>

        </Modal>

      )}

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {modal === "delete" &&
        selectedMentor && (

          <Modal
            onClose={() => setModal(null)}
            small
          >

            <div className="p-6 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white">

                  <span className="text-2xl font-bold">
                    ?
                  </span>

                </div>

              </div>

              <h2 className="text-[14px] font-bold">
                Siz rostdan ham o‘chirmoqchimisiz?
              </h2>

              <p className="mt-2 text-[12px] text-gray-500">
                {selectedMentor.fullName}
              </p>

              <div className="mt-5 flex justify-center gap-3">

                <button
                  onClick={() =>
                    setModal(null)
                  }
                  className="rounded-md border px-4 py-2 text-[11px] transition hover:bg-gray-50"
                >
                  Bekor qilish
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-md bg-red-500 px-5 py-2 text-[11px] text-white transition hover:bg-red-600"
                >
                  O‘chirish
                </button>

              </div>

            </div>

          </Modal>

        )}

      {/* =====================================================
          SUCCESS ADD
      ====================================================== */}

      {modal === "successAdd" && (

        <Modal
          onClose={() => setModal(null)}
          small
        >

          <div className="p-6 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">

                <Check size={25} />

              </div>

            </div>

            <h2 className="text-[14px] font-bold">
              Muvaffaqiyatli qo‘shildi
            </h2>

            <p className="mt-2 text-[12px] text-gray-500">
              Mentor muvaffaqiyatli qo‘shildi.
            </p>

            <button
              onClick={() =>
                setModal(null)
              }
              className="mt-5 rounded-md bg-[#4385ee] px-5 py-2 text-[11px] text-white"
            >
              Yopish
            </button>

          </div>

        </Modal>

      )}

      {/* =====================================================
          SUCCESS DELETE
      ====================================================== */}

      {modal === "successDelete" && (

        <Modal
          onClose={() => setModal(null)}
          small
        >

          <div className="p-6 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">

                <Check size={25} />

              </div>

            </div>

            <h2 className="text-[14px] font-bold">
              Muvaffaqiyatli o‘chirildi
            </h2>

            <p className="mt-2 text-[12px] text-gray-500">
              Mentor muvaffaqiyatli o‘chirildi.
            </p>

            <button
              onClick={() =>
                setModal(null)
              }
              className="mt-5 rounded-md bg-[#4385ee] px-5 py-2 text-[11px] text-white transition hover:bg-[#3476df]"
            >
              Yopish
            </button>

          </div>

        </Modal>

      )}

    </div>
  );
}

/* =========================================================
   CHEVRON RIGHT
========================================================= */

function ChevronRightIcon() {
  return (
    <ChevronRight
      size={16}
      className="text-gray-400"
    />
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  children,
  onClose,
  small = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  small?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className={`w-full ${
          small
            ? "max-w-[420px]"
            : "max-w-[710px]"
        } overflow-hidden rounded-lg bg-white shadow-2xl`}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-1 block text-[11px] font-semibold">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[38px] w-full rounded-[3px] border border-[#dfe3e8] px-3 text-[12px] outline-none transition focus:border-[#4385ee]"
      />

    </div>
  );
}

/* =========================================================
   SOCIAL INPUT
========================================================= */

function SocialInput({
  label,
  name,
  value,
  onChange,
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-1 block text-[11px] font-semibold">
        {label}
      </label>

      <div className="relative">

        <input
          name={name}
          value={value}
          onChange={onChange}
          className="h-[38px] w-full rounded-[3px] border border-[#dfe3e8] px-3 pr-9 text-[12px] outline-none transition focus:border-[#4385ee]"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-[12px] font-semibold">
        {value || "-"}
      </p>

    </div>
  );
}

/* =========================================================
   SOCIAL BUTTON
========================================================= */

function SocialButton({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] bg-[#f1f2f4] transition hover:bg-gray-200"
    >
      {icon}
    </button>
  );
}

/* =========================================================
   MENTOR COURSES
========================================================= */

function MentorCourses({
  mentor,
  onBack,
}: {
  mentor: Mentor | null;
  onBack: () => void;
}) {
  if (!mentor) {
    return null;
  }

  return (
    <div>

      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-[12px] text-gray-600 hover:text-black"
      >
        <ArrowLeft size={15} />
        Orqaga
      </button>

      <div className="mb-4 rounded-md bg-white p-3 shadow-sm">

        <div className="flex items-center gap-3">

          <img
            src={mentor.avatar}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>

            <h2 className="font-bold">
              {mentor.fullName}
            </h2>

            <p className="text-[11px] text-gray-500">
              {mentor.profession}
            </p>

            <div className="mt-1 flex items-center gap-1 text-[11px]">

              <Star
                size={13}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>4.6</span>

            </div>

          </div>

        </div>

      </div>

      <div className="mb-4 flex items-center gap-2 text-[12px] text-gray-500">

        <span>Foydalanuvchilar</span>
        <span>•</span>
        <span>Mentorlar</span>
        <span>•</span>

        <span className="text-gray-800">
          Mentor kurslari
        </span>

      </div>

      {mentor.courses.length === 0 ? (

        <div className="rounded-md bg-white p-10 text-center text-sm text-gray-400">
          Bu mentorda kurslar mavjud emas.
        </div>

      ) : (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {mentor.courses.map(
            (course) => (

              <div
                key={course.id}
                className="overflow-hidden rounded-md bg-white shadow-sm"
              >

                <div className="relative h-[150px] overflow-hidden">

                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-orange-400 px-3 py-1 text-[10px] font-semibold text-white">
                    {course.category}
                  </span>

                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                  >
                    <Heart size={14} />
                  </button>

                </div>

                <div className="p-3">

                  <div className="mb-2 flex items-center gap-2">

                    <img
                      src={mentor.avatar}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                    />

                    <span className="text-[10px] font-semibold">
                      {mentor.fullName}
                    </span>

                  </div>

                  <h3 className="text-[14px] font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-1 h-[32px] overflow-hidden text-[9px] leading-4 text-gray-500">
                    {course.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1">

                    {Array.from({
                      length: 5,
                    }).map(
                      (_, index) => (

                        <Star
                          key={index}
                          size={13}
                          className={
                            index <
                            Math.round(
                              course.rating,
                            )
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />

                      ),
                    )}

                    <span className="ml-1 text-[10px] text-gray-500">
                      ({course.rating})
                    </span>

                  </div>

                  <div className="mt-3 border-t pt-3">

                    <p className="text-[10px] text-gray-500">
                      Kurs narxi:
                    </p>

                    <p className="mt-1 text-[15px] font-bold">

                      {course.price}{" "}

                      <span className="text-[10px]">
                        UZS
                      </span>

                    </p>

                  </div>

                </div>

              </div>

            ),
          )}

        </div>

      )}

    </div>
  );
}