"use client";

import { useEffect, useMemo, useState } from "react";
import { baseAPI } from "@/app/lib/utils";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  EyeOff,
  Check,
  X,
  ChevronDown,
  Heart,
  Star,
  Send,
  ArrowLeft,
} from "lucide-react";

import Pagination from "@/app/components/dashboard/Pagination";


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


type MentorForm = {
  fullName: string;
  phone: string;
  password: string;
  experience: string;
  profession: string;
  website: string;
  description: string;
  facebook: string;
  telegram: string;
  linkedin: string;
  instagram: string;
  github: string;
};


const emptyForm: MentorForm = {
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
};


export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [apiError, setApiError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [modal, setModal] = useState<
    | "add"
    | "edit"
    | "view"
    | "delete"
    | "successAdd"
    | "successEdit"
    | "successDelete"
    | null
  >(null);

  const [selectedMentor, setSelectedMentor] =
    useState<Mentor | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const [form, setForm] = useState<MentorForm>(emptyForm);

  /* =========================================================
     NORMALIZE MENTOR
  ========================================================= */

  const normalizeMentor = (
    mentor: any,
    index = 0,
  ): Mentor => {
    return {
      id: Number(
        mentor?.id ??
        mentor?.userId ??
        mentor?.user?.id ??
        index + 1,
      ),

      fullName:
        mentor?.fullName ??
        mentor?.fullname ??
        mentor?.name ??
        mentor?.user?.fullName ??
        mentor?.user?.name ??
        "-",

      phone:
        mentor?.phone ??
        mentor?.phoneNumber ??
        mentor?.user?.phone ??
        "-",

      password: mentor?.password ?? "",

      createdAt:
        mentor?.createdAt ??
        mentor?.created_at ??
        mentor?.user?.createdAt ??
        "-",

      role: "Mentor",

      experience:
        mentor?.experience ??
        mentor?.workExperience ??
        mentor?.mentorProfile?.experience ??
        "-",

      profession:
        mentor?.profession ??
        mentor?.jobTitle ??
        mentor?.specialization ??
        mentor?.mentorProfile?.profession ??
        "-",

      website:
        mentor?.website ??
        mentor?.site ??
        mentor?.mentorProfile?.website ??
        "",

      description:
        mentor?.description ??
        mentor?.about ??
        mentor?.mentorProfile?.description ??
        "",

      facebook:
        mentor?.facebook ??
        mentor?.mentorProfile?.facebook ??
        "",

      telegram:
        mentor?.telegram ??
        mentor?.mentorProfile?.telegram ??
        "",

      linkedin:
        mentor?.linkedin ??
        mentor?.mentorProfile?.linkedin ??
        "",

      instagram:
        mentor?.instagram ??
        mentor?.mentorProfile?.instagram ??
        "",

      github:
        mentor?.github ??
        mentor?.mentorProfile?.github ??
        "",

      avatar:
        mentor?.avatar ??
        mentor?.avatarUrl ??
        mentor?.image ??
        mentor?.photo ??
        mentor?.user?.avatar ??
        "https://i.pravatar.cc/150?img=12",

      status:
        mentor?.status === "Nofaol" ||
          mentor?.status === "INACTIVE" ||
          mentor?.status === "inactive"
          ? "Nofaol"
          : "Faol",

      courses: Array.isArray(mentor?.courses)
        ? mentor.courses.map(
          (course: any, courseIndex: number) => ({
            id: Number(
              course?.id ?? courseIndex + 1,
            ),

            title:
              course?.title ??
              course?.name ??
              "-",

            category:
              course?.category?.name ??
              course?.category ??
              "-",

            image:
              course?.image ??
              course?.imageUrl ??
              course?.thumbnail ??
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",

            price: String(
              course?.price ?? "0",
            ),

            rating: Number(
              course?.rating ?? 0,
            ),

            students: Number(
              course?.students ??
              course?.studentsCount ??
              0,
            ),

            description:
              course?.description ?? "",
          }),
        )
        : [],
    };
  };

  /* =========================================================
     GET ALL MENTORS
  ========================================================= */

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setApiError("");

      const response =
        await baseAPI.get("/mentors");

      console.log(
        "GET /mentors RESPONSE:",
        response.data,
      );

      const payload = response.data;

      const rawMentors = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.items)
              ? payload.items
              : [];

      const normalizedMentors =
        rawMentors.map(
          (mentor: any, index: number) =>
            normalizeMentor(
              mentor,
              index,
            ),
        );

      setMentors(normalizedMentors);
    } catch (error: any) {
      console.error(
        "GET MENTORS ERROR:",
        error,
      );

      setApiError(
        error?.response?.data?.message ??
        "Mentorlarni backenddan yuklashda xatolik yuz berdi.",
      );

      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL GET
  ========================================================= */

  useEffect(() => {
    fetchMentors();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredMentors = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return mentors;
    }

    return mentors.filter(
      (mentor) =>
        mentor.fullName
          .toLowerCase()
          .includes(query) ||
        mentor.phone
          .toLowerCase()
          .includes(query),
    );
  }, [mentors, search]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredMentors.length /
    itemsPerPage,
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredMentors.length,
  );

  const currentMentors =
    filteredMentors.slice(
      startIndex,
      endIndex,
    );

  /* =========================================================
     ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    setSelectedMentor(null);
    setForm({
      ...emptyForm,
    });
    setShowPassword(false);
    setApiError("");
    setModal("add");
  };

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const openEditModal = (
    mentor: Mentor,
  ) => {
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
    setApiError("");
    setModal("edit");
  };

  /* =========================================================
     GET ONE MENTOR
  ========================================================= */

  const openViewModal = async (
    mentor: Mentor,
  ) => {
    try {
      setLoading(true);

      const response =
        await baseAPI.get(
          `/mentors/${mentor.id}`,
        );

      console.log(
        "GET ONE MENTOR:",
        response.data,
      );

      const payload = response.data;

      const data =
        payload?.data ??
        payload?.result ??
        payload;

      const normalized =
        normalizeMentor(data);

      setSelectedMentor(
        normalized,
      );

      setModal("view");
    } catch (error: any) {
      console.error(
        "GET ONE MENTOR ERROR:",
        error,
      );

      alert(
        error?.response?.data?.message ??
        "Mentor ma'lumotlarini olishda xatolik yuz berdi.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DELETE MODAL
  ========================================================= */

  const openDeleteModal = (
    mentor: Mentor,
  ) => {
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
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     POST CREATE MENTOR
  ========================================================= */

const createMentor = async () => {
  try {
    setSaving(true);
    setApiError("");

    if (!form.fullName.trim()) {
      setApiError("F.I.Sh majburiy.");
      return;
    }

    if (!form.phone.trim()) {
      setApiError("Telefon raqami majburiy.");
      return;
    }

    if (!form.password.trim()) {
      setApiError("Parol majburiy.");
      return;
    }

    const body = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      password: form.password.trim(),
    };

    console.log("POST /mentors BODY:", body);

    const response = await baseAPI.post("/mentors", body);

    console.log("POST /mentors RESPONSE:", response.data);

    await fetchMentors();

    setModal("successAdd");

    setForm({
      ...emptyForm,
    });
  } catch (error: any) {
    console.error("CREATE MENTOR ERROR:", error);
    console.error("STATUS:", error?.response?.status);
    console.error("BACKEND RESPONSE:", error?.response?.data);

    const message = error?.response?.data?.message;

    setApiError(
      Array.isArray(message)
        ? message.join(", ")
        : message ?? "Mentor qo‘shishda xatolik yuz berdi.",
    );
  } finally {
    setSaving(false);
  }
};
  /* =========================================================
     PATCH UPDATE MENTOR
  ========================================================= */

const updateMentor = async () => {
  if (!selectedMentor) return;

  try {
    setSaving(true);
    setApiError("");

    const body: Record<string, string> = {};

    if (form.fullName.trim()) {
      body.fullName = form.fullName.trim();
    }

    if (form.phone.trim()) {
      body.phone = form.phone.trim();
    }

    if (form.password.trim()) {
      body.password = form.password.trim();
    }

    console.log(
      `PATCH /mentors/${selectedMentor.id} BODY:`,
      body,
    );

    const response = await baseAPI.patch(
      `/mentors/${selectedMentor.id}`,
      body,
    );

    console.log("PATCH RESPONSE:", response.data);

    await fetchMentors();

    setModal("successEdit");
  } catch (error: any) {
    console.error("UPDATE MENTOR ERROR:", error);
    console.error("STATUS:", error?.response?.status);
    console.error("BACKEND DATA:", error?.response?.data);

    const message = error?.response?.data?.message;

    setApiError(
      Array.isArray(message)
        ? message.join(", ")
        : message ?? "Mentorni tahrirlashda xatolik yuz berdi.",
    );
  } finally {
    setSaving(false);
  }
};
/* =========================================================
   SAVE
======================================================== */

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      alert("F.I.Sh ni kiriting");
      return;
    }

    if (!form.phone.trim()) {
      alert("Telefon raqamini kiriting");
      return;
    }

    if (
      modal === "add" &&
      !form.password.trim()
    ) {
      alert("Parolni kiriting");
      return;
    }

    if (modal === "add") {
      await createMentor();
      return;
    }

    if (
      modal === "edit" &&
      selectedMentor
    ) {
      await updateMentor();
    }
  };

  /* =========================================================
     DELETE MENTOR
  ========================================================= */

  const handleDelete = async () => {
    if (!selectedMentor) {
      return;
    }

    try {
      setDeleting(true);
      setApiError("");

      console.log(
        `DELETE /mentors/${selectedMentor.id}`,
      );

      const response =
        await baseAPI.delete(
          `/mentors/${selectedMentor.id}`,
        );

      console.log(
        "DELETE RESPONSE:",
        response.data,
      );

      await fetchMentors();

      setSelectedMentor(null);
      setModal("successDelete");
    } catch (error: any) {
      console.error(
        "DELETE MENTOR ERROR:",
        error,
      );

      const message =
        error?.response?.data?.message;

      setApiError(
        Array.isArray(message)
          ? message.join(", ")
          : message ??
          "Mentorni o‘chirishda xatolik yuz berdi.",
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     DOWNLOAD CSV
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

    const rows = mentors.map(
      (mentor) =>
        [
          mentor.id,
          `"${mentor.fullName}"`,
          `"${mentor.phone}"`,
          `"${mentor.createdAt}"`,
          mentor.role,
          mentor.status,
        ].join(","),
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows,
      ].join("\n");

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement("a");

    link.setAttribute(
      "href",
      encodedUri,
    );

    link.setAttribute(
      "download",
      "mentorlar.csv",
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <>
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
                  <span>
                    Foydalanuvchilar
                  </span>

                  <span>•</span>

                  <span>
                    Mentorlar
                  </span>
                </div>
              </div>

              <button
                onClick={
                  openAddModal
                }
                className="flex items-center gap-2 rounded-md bg-[#4385ee] px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3476df]"
              >
                <Plus size={16} />
                Qo‘shish
              </button>
            </div>

            {/* SEARCH */}

            <div className="mb-6 flex items-center gap-3">
              <div className="relative max-w-[400px] flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Izlash..."
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value,
                    );

                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-blue-500"
                />

                {search && (
                  <X
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
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
                onClick={() =>
                  setCurrentPage(1)
                }
                className="rounded-lg bg-[#407BFF] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
              >
                Izlash
              </button>
            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-t-xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse border border-gray-200 text-left">
                  <thead>
                    <tr className="bg-white text-[12px] font-bold tracking-wider text-gray-900">
                      <th className="w-16 border border-gray-200 px-5 py-4">
                        ID
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        F.I.Sh
                        <ChevronDown
                          size={14}
                          className="ml-1 inline-block text-gray-400"
                        />
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        Telefon raqam
                        <ChevronDown
                          size={14}
                          className="ml-1 inline-block text-gray-400"
                        />
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        Yaratilgan vaqt
                        <ChevronDown
                          size={14}
                          className="ml-1 inline-block text-gray-400"
                        />
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        Rol
                        <ChevronDown
                          size={14}
                          className="ml-1 inline-block text-gray-400"
                        />
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        Parol
                      </th>

                      <th className="border border-gray-200 px-5 py-4">
                        Holati
                        <ChevronDown
                          size={14}
                          className="ml-1 inline-block text-gray-400"
                        />
                      </th>

                      <th className="border border-gray-200 px-5 py-4 text-center">
                        Amallar
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-[14px] text-gray-800">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="border border-gray-200 px-6 py-10 text-center text-gray-500"
                        >
                          Mentorlar
                          yuklanmoqda...
                        </td>
                      </tr>
                    ) : apiError &&
                      mentors.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="border border-gray-200 px-6 py-10 text-center text-red-500"
                        >
                          {apiError}
                        </td>
                      </tr>
                    ) : (
                      currentMentors.map(
                        (mentor) => (
                          <tr
                            key={
                              mentor.id
                            }
                            className="group transition-colors hover:bg-gray-50"
                          >
                            <td className="border border-gray-200 px-5 py-4 font-medium">
                              {mentor.id}
                            </td>

                            <td className="border border-gray-200 px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    mentor.avatar
                                  }
                                  alt={
                                    mentor.fullName
                                  }
                                  className="h-8 w-8 rounded-full border border-gray-200 bg-gray-100 object-cover"
                                />

                                <span className="text-[13px] font-semibold">
                                  {
                                    mentor.fullName
                                  }
                                </span>
                              </div>
                            </td>

                            <td className="border border-gray-200 px-5 py-4 text-[13px] font-medium text-gray-600">
                              {
                                mentor.phone
                              }
                            </td>

                            <td className="border border-gray-200 px-5 py-4 text-[13px] text-gray-600">
                              {
                                mentor.createdAt
                              }
                            </td>

                            <td className="border border-gray-200 px-5 py-4 text-[13px] text-gray-600">
                              {
                                mentor.role
                              }
                            </td>

                            <td className="border border-gray-200 px-5 py-4 text-gray-400">
                              <div className="flex items-center gap-2">
                                <span>
                                  ********
                                </span>

                                <EyeOff
                                  size={
                                    16
                                  }
                                  className="cursor-pointer hover:text-gray-600"
                                />
                              </div>
                            </td>

                            <td className="border border-gray-200 px-5 py-4">
                              <span className="rounded-full border border-[#CEEAD6] bg-[#E6F4EA] px-3 py-1 text-[12px] font-semibold text-[#137333]">
                                {
                                  mentor.status
                                }
                              </span>
                            </td>

                            <td className="border border-gray-200 px-5 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    openViewModal(
                                      mentor,
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
                                  title="Ko‘rish"
                                >
                                  <Eye
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                <button
                                  onClick={() =>
                                    openEditModal(
                                      mentor,
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
                                  title="Tahrirlash"
                                >
                                  <Pencil
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                <button
                                  onClick={() =>
                                    openDeleteModal(
                                      mentor,
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
                                  title="O‘chirish"
                                >
                                  <Trash2
                                    size={
                                      14
                                    }
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )
                    )}

                    {!loading &&
                      !apiError &&
                      currentMentors.length ===
                      0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className="border border-gray-200 px-6 py-10 text-center text-gray-500"
                          >
                            Ma'lumot
                            topilmadi
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGINATION */}

            <div className="overflow-hidden rounded-b-xl border border-t-0 border-gray-200 bg-[#F8F9FA]">
              <Pagination
                currentPage={
                  currentPage
                }
                totalPages={
                  totalPages
                }
                totalItems={
                  filteredMentors.length
                }
                startIndex={
                  startIndex
                }
                endIndex={
                  endIndex
                }
                itemsPerPage={
                  itemsPerPage
                }
                onPageChange={
                  setCurrentPage
                }
                onItemsPerPageChange={(
                  value,
                ) => {
                  setItemsPerPage(
                    value,
                  );
                  setCurrentPage(
                    1,
                  );
                }}
                onDownloadXLS={
                  handleDownloadXLS
                }
              />
            </div>
          </>
        ) : (
          <MentorCourses
            mentor={selectedMentor}
            onBack={() => {
              setShowCourses(
                false,
              );
              setSelectedMentor(
                null,
              );
            }}
          />
        )}
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {(modal === "add" ||
        modal === "edit") && (
          <Modal
            onClose={() =>
              saving
                ? undefined
                : setModal(null)
            }
          >
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h2 className="text-[17px] font-bold text-[#151515]">
                  {modal === "add"
                    ? "Qo‘shish"
                    : "Tahrirlash"}
                </h2>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setModal(null)
                  }
                  className="text-gray-600 transition hover:text-black disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>

              {apiError && (
                <div className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">
                  {apiError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-x-5 gap-y-3 px-5 py-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input
                    label="F.I.Sh"
                    name="fullName"
                    value={
                      form.fullName
                    }
                    onChange={
                      handleInput
                    }
                    placeholder="Kiriting"
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    label="Telefon raqami"
                    name="phone"
                    value={
                      form.phone
                    }
                    onChange={
                      handleInput
                    }
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
                      value={
                        form.password
                      }
                      onChange={
                        handleInput
                      }
                      placeholder="******"
                      className="h-[38px] w-full rounded-[3px] border border-[#dfe3e8] px-3 pr-10 text-[12px] outline-none transition focus:border-[#4385ee]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) =>
                            !prev,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff
                          size={15}
                        />
                      ) : (
                        <Eye
                          size={15}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-2 pt-2">
                  <h3 className="text-[13px] font-bold">
                    Mentor haqida
                    qisqacha
                    ma’lumot
                  </h3>
                </div>

                <div className="border-b border-gray-200 pb-2 pt-2">
                  <h3 className="text-[13px] font-bold">
                    Ijtimoiy
                    tarmoqlar
                  </h3>
                </div>

                <Input
                  label="Tajriba"
                  name="experience"
                  value={
                    form.experience
                  }
                  onChange={
                    handleInput
                  }
                  placeholder="Kiriting"
                />

                <SocialInput
                  label="Facebook"
                  name="facebook"
                  value={
                    form.facebook
                  }
                  onChange={
                    handleInput
                  }
                  icon={
                    <span className="text-[12px] font-bold">
                      f
                    </span>
                  }
                />

                <Input
                  label="Kasb"
                  name="profession"
                  value={
                    form.profession
                  }
                  onChange={
                    handleInput
                  }
                  placeholder="Kiriting"
                />

                <SocialInput
                  label="Telegram"
                  name="telegram"
                  value={
                    form.telegram
                  }
                  onChange={
                    handleInput
                  }
                  icon={
                    <Send size={13} />
                  }
                />

                <Input
                  label="Sayt"
                  name="website"
                  value={
                    form.website
                  }
                  onChange={
                    handleInput
                  }
                  placeholder="http://"
                />

                <SocialInput
                  label="LinkedIn"
                  name="linkedin"
                  value={
                    form.linkedin
                  }
                  onChange={
                    handleInput
                  }
                  icon={
                    <span className="text-[9px] font-bold">
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
                    value={
                      form.description
                    }
                    onChange={
                      handleInput
                    }
                    placeholder="Kiriting"
                    className="h-[112px] w-full resize-none rounded-[3px] border border-[#dfe3e8] p-3 text-[12px] outline-none transition focus:border-[#4385ee]"
                  />
                </div>

                <div className="space-y-3">
                  <SocialInput
                    label="Instagram"
                    name="instagram"
                    value={
                      form.instagram
                    }
                    onChange={
                      handleInput
                    }
                    icon={
                      <span className="text-[14px] font-bold">
                        ◎
                      </span>
                    }
                  />

                  <SocialInput
                    label="GitHub"
                    name="github"
                    value={
                      form.github
                    }
                    onChange={
                      handleInput
                    }
                    icon={
                      <span className="text-[8px] font-bold">
                        GH
                      </span>
                    }
                  />
                </div>
              </div>

              <div className="px-5 pb-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={
                    handleSave
                  }
                  className="flex h-[38px] items-center gap-2 rounded-[4px] bg-[#4385ee] px-5 text-[12px] font-semibold text-white transition hover:bg-[#3476df] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    "Saqlanmoqda..."
                  ) : (
                    <>
                      <Check
                        size={15}
                      />
                      Saqlash
                    </>
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}

      {/* =====================================================
          VIEW MODAL
      ====================================================== */}

      {modal === "view" &&
        selectedMentor && (
          <Modal
            onClose={() =>
              setModal(null)
            }
          >
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h2 className="text-[17px] font-bold">
                  Mentor haqida
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setModal(null)
                  }
                  className="text-gray-600 hover:text-black"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                  <img
                    src={
                      selectedMentor.avatar
                    }
                    alt={
                      selectedMentor.fullName
                    }
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-[18px] font-bold leading-tight">
                      {
                        selectedMentor.fullName
                      }
                    </h3>

                    <p className="mt-1 text-[11px] font-medium text-gray-800">
                      {
                        selectedMentor.profession
                      }
                    </p>
                  </div>
                </div>

                <section className="mt-4">
                  <h3 className="border-b border-gray-200 pb-2 text-[14px] font-bold">
                    To‘liq
                    ma’lumotlar
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    <Info
                      label="Telefon raqami"
                      value={
                        selectedMentor.phone
                      }
                    />

                    <Info
                      label="Rol"
                      value={
                        selectedMentor.role
                      }
                    />

                    <Info
                      label="Ro’yxatdan o‘tgan vaqti"
                      value={
                        selectedMentor.createdAt
                      }
                    />

                    <Info
                      label="Ish tajribasi"
                      value={
                        selectedMentor.experience
                      }
                    />

                    <Info
                      label="Kasbi"
                      value={
                        selectedMentor.profession
                      }
                    />

                    <Info
                      label="Holati"
                      value={
                        selectedMentor.status
                      }
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
                      {selectedMentor
                        .courses[0]
                        ?.title ||
                        "Kurs mavjud emas"}
                    </p>
                  </div>
                </section>

                <section className="mt-4">
                  <h3 className="border-b border-gray-200 pb-2 text-[14px] font-bold">
                    Ijtimoiy
                    tarmoq
                    sahifalari:
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <SocialButton
                      icon={
                        <span className="text-[20px] font-bold">
                          f
                        </span>
                      }
                    />

                    <SocialButton
                      icon={
                        <Send
                          size={18}
                        />
                      }
                    />

                    <SocialButton
                      icon={
                        <span className="text-[20px] font-bold">
                          ◎
                        </span>
                      }
                    />

                    <SocialButton
                      icon={
                        <span className="text-[13px] font-bold">
                          in
                        </span>
                      }
                    />

                    <SocialButton
                      icon={
                        <span className="text-[11px] font-bold">
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
                    <Pencil
                      size={14}
                    />
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
            onClose={() =>
              deleting
                ? undefined
                : setModal(null)
            }
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
                Siz rostdan ham
                o‘chirmoqchimisiz?
              </h2>

              <p className="mt-2 text-[12px] text-gray-500">
                {
                  selectedMentor.fullName
                }
              </p>

              {apiError && (
                <p className="mt-3 text-[11px] text-red-500">
                  {apiError}
                </p>
              )}

              <div className="mt-5 flex justify-center gap-3">
                <button
                  disabled={
                    deleting
                  }
                  onClick={() =>
                    setModal(null)
                  }
                  className="rounded-md border px-4 py-2 text-[11px] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Bekor qilish
                </button>

                <button
                  disabled={
                    deleting
                  }
                  onClick={
                    handleDelete
                  }
                  className="rounded-md bg-red-500 px-5 py-2 text-[11px] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting
                    ? "O‘chirilmoqda..."
                    : "O‘chirish"}
                </button>
              </div>
            </div>
          </Modal>
        )}

      {/* =====================================================
          SUCCESS ADD
      ====================================================== */}

      {modal ===
        "successAdd" && (
          <Modal
            onClose={() =>
              setModal(null)
            }
            small
          >
            <div className="p-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check
                    size={25}
                  />
                </div>
              </div>

              <h2 className="text-[14px] font-bold">
                Muvaffaqiyatli
                qo‘shildi
              </h2>

              <p className="mt-2 text-[12px] text-gray-500">
                Mentor muvaffaqiyatli
                qo‘shildi.
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
          SUCCESS EDIT
      ====================================================== */}

      {modal ===
        "successEdit" && (
          <Modal
            onClose={() =>
              setModal(null)
            }
            small
          >
            <div className="p-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check
                    size={25}
                  />
                </div>
              </div>

              <h2 className="text-[14px] font-bold">
                Muvaffaqiyatli
                tahrirlandi
              </h2>

              <p className="mt-2 text-[12px] text-gray-500">
                Mentor ma'lumotlari
                yangilandi.
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

      {/* =====================================================
          SUCCESS DELETE
      ====================================================== */}

      {modal ===
        "successDelete" && (
          <Modal
            onClose={() =>
              setModal(null)
            }
            small
          >
            <div className="p-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check
                    size={25}
                  />
                </div>
              </div>

              <h2 className="text-[14px] font-bold">
                Muvaffaqiyatli
                o‘chirildi
              </h2>

              <p className="mt-2 text-[12px] text-gray-500">
                Mentor muvaffaqiyatli
                o‘chirildi.
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
    </>
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
        className={`w-full ${small
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

              <span>
                4.6
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-[12px] text-gray-500">
        <span>
          Foydalanuvchilar
        </span>

        <span>•</span>

        <span>
          Mentorlar
        </span>

        <span>•</span>

        <span className="text-gray-800">
          Mentor kurslari
        </span>
      </div>

      {mentor.courses.length ===
        0 ? (
        <div className="rounded-md bg-white p-10 text-center text-sm text-gray-400">
          Bu mentorda kurslar
          mavjud emas.
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
                    src={
                      course.image
                    }
                    alt={
                      course.title
                    }
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-orange-400 px-3 py-1 text-[10px] font-semibold text-white">
                    {
                      course.category
                    }
                  </span>

                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                  >
                    <Heart
                      size={14}
                    />
                  </button>
                </div>

                <div className="p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <img
                      src={
                        mentor.avatar
                      }
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                    />

                    <span className="text-[10px] font-semibold">
                      {
                        mentor.fullName
                      }
                    </span>
                  </div>

                  <h3 className="text-[14px] font-bold">
                    {
                      course.title
                    }
                  </h3>

                  <p className="mt-1 h-[32px] overflow-hidden text-[9px] leading-4 text-gray-500">
                    {
                      course.description
                    }
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({
                      length: 5,
                    }).map(
                      (
                        _,
                        index,
                      ) => (
                        <Star
                          key={
                            index
                          }
                          size={
                            13
                          }
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
                      (
                      {
                        course.rating
                      }
                      )
                    </span>
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <p className="text-[10px] text-gray-500">
                      Kurs narxi:
                    </p>

                    <p className="mt-1 text-[15px] font-bold">
                      {
                        course.price
                      }{" "}
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