"use client";

import React, { useState, use, useRef } from "react";
import { 
  Plus, 
  Filter,
  Pen,
  Trash2,
  X,
  Check,
  Play,
  UploadCloud,
  FileVideo,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/Pagination";
import { useCourseStore } from "@/app/store/useCourseStore";

interface Lesson {
  id: number;
  title: string;
  description: string;
  video: { name: string; size: string } | null;
}

export default function LessonsPage({ params }: { params: Promise<{ id: string; sectionId: string }> }) {
  const { id: courseId, sectionId } = use(params);
  const { courses } = useCourseStore();
  const currentCourse = courses.find((c) => c.id.toString() === courseId);
  const courseTitle = currentCourse?.title || "Frontend dasturlash";
  
  // Mock section name
  const isBackend = courseTitle.toLowerCase().includes("backend");
  let sectionName = "CSS asoslari";
  if (sectionId === "1") {
    sectionName = isBackend ? "Node JS" : "Veb dasturlashga kirish";
  } else if (sectionId === "2") {
    sectionName = isBackend ? "SQL asoslari" : "CSS asoslari";
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    let initialTitle = "Asosiy dars";
    let initialDesc = "Dars haqida ma'lumot";
    
    if (isBackend) {
      if (sectionId === "1") {
        initialTitle = "Node JS ga kirish";
        initialDesc = "Node JS orqali server yozishni o'rganamiz";
      } else {
        initialTitle = "Ma'lumotlar bazasi bilan ishlash";
        initialDesc = "SQL so'rovlarini tuzish va ma'lumotlarni boshqarish";
      }
    } else {
      if (sectionId === "1") {
        initialTitle = "Veb dasturlashga kirish";
        initialDesc = "Frontend dasturlash veb dasturlashning bir qismi hisoblanadi";
      } else {
        initialTitle = "CSS selektorlari va xossalari";
        initialDesc = "CSS orqali veb sahifaga uslub berish asoslari";
      }
    }
    
    return [
      { 
        id: parseInt(sectionId) * 1, 
        title: initialTitle, 
        description: initialDesc,
        video: { name: "video_2026-08-10_11-15-10.mp4", size: "15.4 MB" }
      }
    ];
  });

  const [newLesson, setNewLesson] = useState<{ title: string; description: string; video: { name: string; size: string; progress: number } | null }>({
    title: "",
    description: "",
    video: null
  });

  const [editingLesson, setEditingLesson] = useState<(Lesson & { videoProgress?: number }) | null>(null);
  const [deletingLessonId, setDeletingLessonId] = useState<number | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setNewLesson({ title: "", description: "", video: null });
    setEditingLesson(null);
    setTitleError(false);
  };

  const handleAddLesson = () => {
    if (!newLesson.title.trim()) {
      setTitleError(true);
      return;
    }
    setLessons([
      ...lessons, 
      { 
        id: Date.now(), 
        title: newLesson.title.trim(), 
        description: newLesson.description.trim(),
        video: newLesson.video ? { name: newLesson.video.name, size: newLesson.video.size } : null
      }
    ]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditLesson = () => {
    if (!editingLesson || !editingLesson.title.trim()) {
      setTitleError(true);
      return;
    }
    setLessons(lessons.map(l => l.id === editingLesson.id ? { 
      ...l, 
      title: editingLesson.title.trim(), 
      description: editingLesson.description.trim(),
      video: editingLesson.video ? { name: editingLesson.video.name, size: editingLesson.video.size } : null
    } : l));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteLesson = () => {
    if (deletingLessonId === null) return;
    setLessons(lessons.filter(l => l.id !== deletingLessonId));
    setDeletingLessonId(null);
    setIsDeleteModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const fileName = file.name;
    
    // Simulate upload
    const updateVideo = (progress: number) => {
      if (isEditModalOpen && editingLesson) {
        setEditingLesson({ ...editingLesson, videoProgress: progress, video: { name: fileName, size: fileSize } });
      } else {
        setNewLesson(prev => ({ ...prev, video: { name: fileName, size: fileSize, progress } }));
      }
    };
    
    updateVideo(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      updateVideo(currentProgress);
    }, 200);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const fileName = file.name;
    
    // Simulate upload
    const updateVideo = (progress: number) => {
      if (isEditModalOpen && editingLesson) {
        setEditingLesson({ ...editingLesson, videoProgress: progress, video: { name: fileName, size: fileSize } });
      } else {
        setNewLesson(prev => ({ ...prev, video: { name: fileName, size: fileSize, progress } }));
      }
    };
    
    updateVideo(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      updateVideo(currentProgress);
    }, 200);
  };

  const openEditModal = (lesson: Lesson) => {
    setEditingLesson({ ...lesson, videoProgress: lesson.video ? 100 : undefined });
    setTitleError(false);
    setIsEditModalOpen(true);
  };

  const renderModalContent = (isEdit: boolean) => {
    const currentVideo = isEdit ? editingLesson?.video : newLesson.video;
    const currentProgress = isEdit ? (editingLesson?.videoProgress || 0) : (newLesson.video?.progress || 0);

    return (
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Bo&apos;lim nomi</label>
          <input type="text" disabled value={sectionName} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-[14px] cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">
            Dars nomi <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="Kiriting" 
            value={isEdit ? (editingLesson?.title || "") : newLesson.title}
            onChange={(e) => {
              setTitleError(false);
              if (isEdit && editingLesson) {
                setEditingLesson({ ...editingLesson, title: e.target.value });
              } else {
                setNewLesson({ ...newLesson, title: e.target.value });
              }
            }}
            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px] ${titleError ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} 
          />
          {titleError && <p className="text-red-500 text-[12px] mt-1.5 font-medium">Dars mavzusi kiritilishi shart</p>}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Dars haqida</label>
          <input 
            type="text" 
            placeholder="Kiriting" 
            value={isEdit ? (editingLesson?.description || "") : newLesson.description}
            onChange={(e) => {
              if (isEdit && editingLesson) {
                setEditingLesson({ ...editingLesson, description: e.target.value });
              } else {
                setNewLesson({ ...newLesson, description: e.target.value });
              }
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]" 
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Video fayl</label>
          
          {!currentVideo ? (
            <div 
              className="border border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                <UploadCloud size={20} className="text-gray-500" />
              </div>
              <p className="text-[14px] text-gray-600 text-center">
                <span className="text-blue-600 font-medium">Bu yerga bosing</span> yoki faylni suring
              </p>
              <p className="text-[12px] text-gray-400 mt-1">.mp4 yoki .MOV</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                accept="video/mp4,video/quicktime"
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-white relative">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                <FileVideo size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[14px] font-medium text-gray-900 truncate pr-4">{currentVideo.name}</p>
                  {currentProgress === 100 && <CheckCircle2 size={16} className="text-blue-600 shrink-0" />}
                </div>
                <p className="text-[12px] text-gray-500 mb-2">{currentVideo.size}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEdit && editingLesson) {
                    setEditingLesson({ ...editingLesson, video: null, videoProgress: 0 });
                  } else {
                    setNewLesson({ ...newLesson, video: null });
                  }
                }}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={isEdit ? handleEditLesson : handleAddLesson}
          className="w-[120px] bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mt-2" 
        >
          <Check size={18} /> Saqlash
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full bg-transparent">
        
        {/* Box Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Darslar</h1>
            <div className="flex items-center text-[13px] font-medium gap-2">
              <Link href="/dashboard/courses/allCourses" className="text-gray-500 hover:text-gray-700 transition-colors">Kurslar</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <Link href={`/dashboard/courses/allCourses/${courseId}/sections`} className="text-gray-500 hover:text-gray-700 transition-colors">{courseTitle}</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <Link href={`/dashboard/courses/allCourses/${courseId}/sections`} className="text-gray-500 hover:text-gray-700 transition-colors">Bo&apos;limlar</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-gray-900">Darslar</span>
            </div>
          </div>
          <button onClick={() => { resetForm(); setIsAddModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <Plus size={18} />
            Dars qo&apos;shish
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col">
          <div className="overflow-x-auto rounded-t-xl overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[1000px] bg-white">
              <thead className="bg-gray-50">
                <tr className="text-[13px] text-gray-900 font-bold tracking-wide">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[20%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Biriktirilgan kurs <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[20%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Dars mavzusi <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[30%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Dars haqida <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[15%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Dars video fayli <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[10%]">
                    Materiallar
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-center w-[5%] border border-gray-200">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {lessons.length > 0 ? lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/materials`} className="hover:text-blue-600 transition-colors cursor-pointer block w-full">
                        {courseTitle}
                      </Link>
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/materials`} className="hover:text-blue-600 transition-colors cursor-pointer block w-full">
                        {lesson.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-600 text-[13px]">
                      {lesson.description}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      {lesson.video ? (
                        <button onClick={() => setIsPlayingVideo(true)} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-[13px] font-medium cursor-pointer">
                          <Play size={14} className="fill-blue-600" />
                          Video
                        </button>
                      ) : (
                        <span className="text-gray-400 text-[13px] italic">Yuklanmagan</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/materials`} className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-[13px] font-medium transition-colors inline-block text-center">
                        Biriktirish
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button onClick={() => openEditModal(lesson)} className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button onClick={() => { setDeletingLessonId(lesson.id); setIsDeleteModalOpen(true); }} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 border border-gray-200 bg-white">
                      Darslar mavjud emas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-2 py-1 shadow-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(lessons.length / itemsPerPage) || 1}
              totalItems={lessons.length}
              startIndex={Math.min((currentPage - 1) * itemsPerPage, lessons.length)}
              endIndex={Math.min(currentPage * itemsPerPage, lessons.length)}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(limit) => {
                setItemsPerPage(limit);
                setCurrentPage(1);
              }}
              onDownloadXLS={() => {}}
            />
          </div>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] flex flex-col animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Dars {isEditModalOpen ? "tahrirlash" : "qo&apos;shish"}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            {renderModalContent(isEditModalOpen)}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[400px] flex flex-col items-center text-center p-8 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">?</div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-8">Rostdan ham o&apos;chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => { setIsDeleteModalOpen(false); setDeletingLessonId(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                Bekor qilish
              </button>
              <button onClick={handleDeleteLesson} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1">
                O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Video Player Modal */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsPlayingVideo(false)}>
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsPlayingVideo(false)} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors">
              <X size={18} />
            </button>
            <video 
              className="w-full aspect-video object-cover" 
              controls 
              autoPlay 
              src="/video_2026-08-10_11-15-10.mp4" 
            />
          </div>
        </div>
      )}
    </>
  );
}
