"use client";

import React, { useState, use, useRef } from "react";
import Link from "next/link";
import { useCourseStore } from "@/app/store/useCourseStore";
import { PlusCircle, Filter, Pen, Trash2, X, Check, UploadCloud, Image as ImageIcon, FileSpreadsheet, FileText, File as FileIcon, type LucideIcon } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  url?: string;
}

interface Task {
  id: number;
  lesson: string;
  task: string;
  files: AttachedFile[];
}

const getFileMeta = (name: string): { Icon: LucideIcon; color: string; label: string } => {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (["xls", "xlsx", "csv"].includes(ext)) return { Icon: FileSpreadsheet, color: "bg-green-600", label: "Excel" };
  if (ext === "pdf") return { Icon: FileText, color: "bg-red-600", label: "PDF" };
  if (["doc", "docx"].includes(ext)) return { Icon: FileText, color: "bg-blue-600", label: "Word" };
  if (["ppt", "pptx"].includes(ext)) return { Icon: FileText, color: "bg-orange-500", label: "PowerPoint" };
  if (["svg", "png", "jpg", "jpeg", "gif"].includes(ext)) return { Icon: ImageIcon, color: "bg-purple-600", label: "Rasm" };
  return { Icon: FileIcon, color: "bg-gray-500", label: "Fayl" };
};

const UPLOAD_ACCEPT = ".pdf,.xls,.xlsx,.csv,.doc,.docx,.ppt,.pptx,.svg,.png,.jpg,.jpeg,.gif";

const filesFromFileList = (fileList: FileList): AttachedFile[] =>
  Array.from(fileList).map((file) => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
    url: URL.createObjectURL(file)
  }));

export default function TasksPage({ params }: { params: Promise<{ id: string; sectionId: string; lessonId: string }> }) {
  const { id: courseId, sectionId, lessonId } = use(params);
  const { courses } = useCourseStore();
  const currentCourse = courses.find((c) => c.id.toString() === courseId);
  const courseTitle = currentCourse?.title || "Frontend dasturlash";

  // Mock section and lesson name
  const isBackend = courseTitle.toLowerCase().includes("backend");
  let sectionName = "CSS asoslari";
  if (sectionId === "1") {
    sectionName = isBackend ? "Node JS" : "Veb dasturlashga kirish";
  } else if (sectionId === "2") {
    sectionName = isBackend ? "SQL asoslari" : "CSS asoslari";
  }
  const lessonTitle = "Veb dasturlashga kirish";

  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      lesson: lessonTitle, 
      task: "Vazifani bajaring", 
      files: [{ id: "seed-1", name: "Kodlar.pdf", size: "4.2 MB" }] 
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskFiles, setNewTaskFiles] = useState<AttachedFile[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived state
  const totalPages = Math.ceil(tasks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tasks.length);
  const currentTasks = tasks.slice(startIndex, endIndex);

  const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const handleDownloadXLS = () => {
    const headers = ["ID", "Dars", "Topshiriq", "Fayllar"];
    const rows = tasks.map(t => [
      t.id, 
      csvEscape(t.lesson), 
      csvEscape(t.task), 
      csvEscape(t.files.map((f) => f.name).join("; "))
    ].join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vazifalar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setNewTaskName("");
    setNewTaskFiles([]);
    setEditingTask(null);
  };

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      lesson: lessonTitle,
      task: newTaskName.trim(),
      files: newTaskFiles
    };
    setTasks([...tasks, newTask]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditTask = () => {
    if (!editingTask || !newTaskName.trim()) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? { 
      ...t, 
      task: newTaskName.trim(),
      files: editingTask.files
    } : t));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteTask = () => {
    if (deletingTaskId === null) return;
    setTasks(tasks.filter(t => t.id !== deletingTaskId));
    setDeletingTaskId(null);
    setIsDeleteModalOpen(false);
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const picked = filesFromFileList(fileList);
    if (isEditModalOpen && editingTask) {
      setEditingTask({ ...editingTask, files: [...editingTask.files, ...picked] });
    } else {
      setNewTaskFiles(prev => [...prev, ...picked]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (fileId: string, isEdit: boolean) => {
    if (isEdit && editingTask) {
      setEditingTask({ ...editingTask, files: editingTask.files.filter(f => f.id !== fileId) });
    } else {
      setNewTaskFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask({ ...task, files: [...task.files] });
    setNewTaskName(task.task);
    setIsEditModalOpen(true);
  };

  const baseUrl = `/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lessonId}`;

  const renderModalContent = (isEdit: boolean) => {
    const currentFiles = isEdit ? (editingTask?.files || []) : newTaskFiles;

    return (
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Dars</label>
          <div className="relative">
            <select disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-[14px] appearance-none cursor-not-allowed">
              <option>{lessonTitle}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Topshiriq</label>
          <input 
            type="text" 
            placeholder="Kiriting" 
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]" 
          />
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Fayl biriktirish</label>
          <div 
            className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors mb-4"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
              <UploadCloud size={20} className="text-gray-500" />
            </div>
            <p className="text-[14px] text-gray-600 text-center">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-[12px] text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload}
              accept={UPLOAD_ACCEPT}
              multiple
              className="hidden"
            />
          </div>

          {currentFiles.length > 0 && (
            <div className="space-y-3">
              {currentFiles.map((file) => {
                const { Icon, color } = getFileMeta(file.name);
                return (
                  <div key={file.id} className="border border-gray-200 rounded-xl p-4 flex gap-4 bg-white">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <p className="text-[14px] font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-[12px] text-gray-500">{file.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeFile(file.id, isEdit)} className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-red-500">
                            <X size={16} />
                          </button>
                          <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center text-white shrink-0">
                            <Check size={14} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <span className="text-[12px] text-gray-500 ml-3 font-medium w-[30px] text-right">100%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button 
          onClick={isEdit ? handleEditTask : handleAddTask}
          disabled={!newTaskName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-50" 
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
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1.5">Darslar</h1>
          <div className="flex items-center text-[13px] font-medium gap-2">
            <Link href="/dashboard/courses/allCourses" className="text-gray-500 hover:text-gray-700 transition-colors">Kurslar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}`} className="text-gray-500 hover:text-gray-700 transition-colors">{courseTitle}</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}/sections`} className="text-gray-500 hover:text-gray-700 transition-colors">Bo&apos;limlar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons`} className="text-gray-500 hover:text-gray-700 transition-colors">Darslar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-gray-900">{sectionName}</span>
          </div>
        </div>

        {/* Tabs + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 gap-1">
            <Link
              href={`${baseUrl}/materials`}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors text-gray-600 hover:bg-gray-50`}
            >
              Materiallar
            </Link>
            <Link
              href={`${baseUrl}/tasks`}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors bg-blue-600 text-white`}
            >
              Vazifalar
            </Link>
            <Link
              href={`${baseUrl}/exams`}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors text-gray-600 hover:bg-gray-50`}
            >
              Imtihonlar
            </Link>
          </div>
          <button onClick={() => { resetForm(); setIsAddModalOpen(true); }} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <PlusCircle size={18} />
            Qo&apos;shish
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col">
          <div className="overflow-x-auto rounded-t-xl overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse min-w-250 bg-white">
              <thead className="bg-gray-50">
                <tr className="text-[13px] text-gray-900 font-bold tracking-wide">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[20%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Dars <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[40%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Topshiriq <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[30%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Fayllar <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-center w-[10%] border border-gray-200">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {currentTasks.length > 0 ? currentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      {task.lesson}
                    </td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-600 text-[13px]">
                      {task.task}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      {task.files.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {task.files.map((file) => {
                            const { Icon, color } = getFileMeta(file.name);
                            return (
                              <a 
                                key={file.id} 
                                href={file.url || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                download={file.name}
                                onClick={(e) => {
                                  if (!file.url) {
                                    e.preventDefault();
                                    
                                    // Fallback for mock file
                                    const blob = new Blob(["Bu mock fayl mazmuni"], { type: "text/plain" });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = file.name;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(url);
                                  }
                                }}
                                title={file.name}
                                className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <span className={`w-6 h-6 rounded-md text-white flex items-center justify-center shrink-0 ${color}`}>
                                  <Icon size={13} />
                                </span>
                                {file.name.length > 15 ? file.name.slice(0, 15) + '...' : file.name}
                              </a>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[13px] italic">Yuklanmagan</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button onClick={() => openEditModal(task)} className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button onClick={() => { setDeletingTaskId(task.id); setIsDeleteModalOpen(true); }} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 border border-gray-200 bg-white">
                      Vazifalar mavjud emas
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
              totalPages={totalPages}
              totalItems={tasks.length}
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
          </div>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-120 flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{isEditModalOpen ? "Tahrirlash" : "Qo\u2019shish"}</h2>
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
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-100 flex flex-col items-center text-center p-8 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">?</div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-8">Rostdan ham o&apos;chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => { setIsDeleteModalOpen(false); setDeletingTaskId(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                Bekor qilish
              </button>
              <button onClick={handleDeleteTask} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1">
                O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
