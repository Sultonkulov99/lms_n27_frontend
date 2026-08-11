"use client";

import { useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  image: string;
  mentor: {
    name: string;
    avatar: string;
  };
  rating: number;
  ratingCount: string;
  price: string;
  description: string;
  category: string;
}

export default function PopularCourses() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedCourses, setLikedCourses] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedCourses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", label: "Barcha kurslar" },
    { id: "design", label: "Dizayn" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "mobile", label: "Mobil" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "Sun'iy intellekt" },
    { id: "other", label: "Boshqalar" },
  ];

  const courses: Course[] = [
    {
      id: "php-laravel",
      title: "PHP, Laravel",
      badge: "PHP, Laravel",
      badgeColor: "bg-[#10B981]",
      image: "/Frame 270990506.png",
      mentor: { name: "Oybek Safarov", avatar: "/mentors/oybek.png" },
      rating: 4.5,
      ratingCount: "(4.5)",
      price: "250 000 uzs",
      description: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
      category: "backend",
    },
    {
      id: "react-js",
      title: "React.js",
      badge: "JavaScript, React.js",
      badgeColor: "bg-[#EC4899]",
      image: "/Frame 270990506 (1).png",
      mentor: { name: "Oybek Safarov", avatar: "/mentors/oybek.png" },
      rating: 4.5,
      ratingCount: "(4.5)",
      price: "250 000 uzs",
      description: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
      category: "frontend",
    },
    {
      id: "cpp",
      title: "C++",
      badge: "C++, Python",
      badgeColor: "bg-[#EF4444]",
      image: "/Frame 270990506 (2).png",
      mentor: { name: "Oybek Safarov", avatar: "/mentors/oybek.png" },
      rating: 4.5,
      ratingCount: "(4.5)",
      price: "250 000 uzs",
      description: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
      category: "other",
    },
    {
      id: "go",
      title: "Go",
      badge: "C++",
      badgeColor: "bg-[#F59E0B]",
      image: "/Frame 270990506 (3).png",
      mentor: { name: "Oybek Safarov", avatar: "/mentors/oybek.png" },
      rating: 4.5,
      ratingCount: "(4.5)",
      price: "250 000 uzs",
      description: "SMM sohasini 0 dan o'rganing va faoliyatingizni eng yaxshi kompaniyada olib boring",
      category: "backend",
    },
  ];

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section id="courses" className="pt-8 pb-16 bg-[#F8FAFC]">
      <div className="container">

        {/* Heading — 48px / 700 / 60px line-height */}
        <h2
          className="text-center"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "60px",
            letterSpacing: 0,
            color: "#0F172A",
            marginBottom: "32px",
          }}
        >
          Ommabop kurslar
        </h2>

        {/* Subtitle — 20px / 500 / 30px line-height / #636C79 */}
        <p
          className="text-center"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: 0,
            color: "#636C79",
            marginBottom: "32px",
          }}
        >
          Kasbga yo&#39;nalitirilgan praktikumlar yordamida eng tez va samarali yo&#39;llar bilan mutaxassislar qatoriga qo&#39;shiling. Har bir praktikum
          <br />
          soha mutaxassislari tomonidan eng zamoaviy o&#39;quv reja asosida tayyorlangan
        </p>

        {/* Kategoriya filtrlari — 32px gap pastdan */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 border cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-600 border-blue-100 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/*
          Grid:
          - gap: 32px
          - Card: width=405px, height=515px (262+253), border-radius=4px
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
          style={{ gap: "32px" }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 mx-auto"
              style={{
                width: "405px",
                minWidth: "401px",
                maxWidth: "405px",
                height: "515px",
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
                opacity: 1,
              }}
            >
              {/* Kurs rasmi */}
              <div
                className="relative w-full overflow-hidden flex-shrink-0"
                style={{ width: "405px", height: "262px" }}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${course.badgeColor}`}
                  >
                    {course.badge}
                  </span>
                </div>
              </div>

              {/* Karta tarkibi */}
              <div
                className="flex flex-col justify-between flex-shrink-0"
                style={{
                  width: "405px",
                  height: "253px",
                  padding: "20px",
                  gap: "16px",
                  boxSizing: "border-box",
                }}
              >
                {/* Top block */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                  {/* Mentor va Like */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                        <img
                          src={course.mentor.avatar}
                          alt={course.mentor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        {course.mentor.name}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLike(course.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Sevimlilarga qo'shish"
                    >
                      <svg
                        className={`w-5 h-5 ${
                          likedCourses[course.id]
                            ? "fill-red-500 text-red-500"
                            : "fill-none"
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Kurs nomi */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>

                  {/* Tavsif */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  {/* Reyting yulduzlari */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs font-medium text-slate-400 ml-1">
                      {course.ratingCount}
                    </span>
                  </div>
                </div>

                {/* Narxi */}
                <div>
                  <div className="text-[11px] text-slate-400 mb-0.5">Kurs narxi:</div>
                  <div className="text-base font-bold text-slate-900">
                    {course.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Barcha kurslarni ko'rish" */}
        <div className="text-center mt-8">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-8 py-3 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all cursor-pointer shadow-xs"
          >
            Barcha kurslarni ko&#39;rish
          </Link>
        </div>

      </div>
    </section>
  );
}