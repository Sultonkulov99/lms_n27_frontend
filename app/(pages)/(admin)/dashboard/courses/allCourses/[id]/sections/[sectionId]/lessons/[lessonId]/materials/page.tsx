"use client";

import React, { useState, use, useRef } from "react";
import { 
  PlusCircle, 
  Filter,
  Pen,
  Trash2,
  X,
  Check,
  UploadCloud,
  Image as ImageIcon,
  FileSpreadsheet,
  FileText,
  File as FileIcon,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/Pagination";
import { useCourseStore } from "@/app/store/useCourseStore";

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  url?: string;
}

interface Material {
  id: number;
  title: string;
  description: string;
  files: AttachedFile[];
}

// Maps a file's extension to a display icon, color, and short type label.
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

export default function MaterialsPage({ params }: { params: Promise<{ id: string; sectionId: string; lessonId: string }> }) {
  const { id: courseId, sectionId, lessonId } = use(params);
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
  
  const [materials, setMaterials] = useState<Material[]>([
    { 
      id: 1, 
      title: "Veb dasturlashga kirish", 
      description: "Frontend dasturlash veb dasturlashning bir qismi hisoblanadi",
      files: [
        { id: "seed-1", name: "Kirish.xlsx", size: "1.1 MB" },
        { id: "seed-2", name: "Kirish.pdf", size: "2.4 MB" }
      ]
    }
  ]);

  const [newMaterial, setNewMaterial] = useState<{ title: string; description: string; files: AttachedFile[] }>({
    title: "",
    description: "",
    files: []
  });

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deletingMaterialId, setDeletingMaterialId] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setNewMaterial({ title: "", description: "", files: [] });
    setEditingMaterial(null);
  };

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) return;
    setMaterials([
      ...materials, 
      { 
        id: Date.now(), 
        title: newMaterial.title.trim(), 
        description: newMaterial.description.trim(),
        files: newMaterial.files
      }
    ]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditMaterial = () => {
    if (!editingMaterial || !editingMaterial.title.trim()) return;
    setMaterials(materials.map(l => l.id === editingMaterial.id ? { 
      ...l, 
      title: editingMaterial.title.trim(), 
      description: editingMaterial.description.trim(),
      files: editingMaterial.files
    } : l));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteMaterial = () => {
    if (deletingMaterialId === null) return;
    setMaterials(materials.filter(l => l.id !== deletingMaterialId));
    setDeletingMaterialId(null);
    setIsDeleteModalOpen(false);
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const picked = filesFromFileList(fileList);
    if (isEditModalOpen && editingMaterial) {
      setEditingMaterial({ ...editingMaterial, files: [...editingMaterial.files, ...picked] });
    } else {
      setNewMaterial(prev => ({ ...prev, files: [...prev.files, ...picked] }));
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
    if (isEdit && editingMaterial) {
      setEditingMaterial({ ...editingMaterial, files: editingMaterial.files.filter(f => f.id !== fileId) });
    } else {
      setNewMaterial(prev => ({ ...prev, files: prev.files.filter(f => f.id !== fileId) }));
    }
  };

  const openEditModal = (material: Material) => {
    setEditingMaterial({ ...material, files: [...material.files] });
    setIsEditModalOpen(true);
  };

  const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const handleDownloadXLS = () => {
    const headers = [
      "ID",
      "Dars",
      "Material uchun izoh",
      "Biriktirilgan fayllar",
    ];
    const rows = materials.map((m) =>
      [
        m.id,
        csvEscape(m.title),
        csvEscape(m.description),
        csvEscape(m.files.map((f) => f.name).join("; ")),
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "materiallar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderModalContent = (isEdit: boolean) => {
    const currentFiles = isEdit ? (editingMaterial?.files || []) : newMaterial.files;

    return (
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Bo&apos;lim nomi</label>
          <input type="text" disabled value={sectionName} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-400 text-[14px] cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Dars nomi</label>
          <input 
            type="text" 
            placeholder="Kiriting" 
            value={isEdit ? (editingMaterial?.title || "") : newMaterial.title}
            onChange={(e) => {
              if (isEdit && editingMaterial) {
                setEditingMaterial({ ...editingMaterial, title: e.target.value });
              } else {
                setNewMaterial({ ...newMaterial, title: e.target.value });
              }
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]" 
          />
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Dars haqida</label>
          <input 
            type="text" 
            placeholder="Kiriting" 
            value={isEdit ? (editingMaterial?.description || "") : newMaterial.description}
            onChange={(e) => {
              if (isEdit && editingMaterial) {
                setEditingMaterial({ ...editingMaterial, description: e.target.value });
              } else {
                setNewMaterial({ ...newMaterial, description: e.target.value });
              }
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]" 
          />
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Fayllar</label>

          <div 
            className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors"
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
            <p className="text-[12px] text-gray-400 mt-1">PDF, Excel, Word, rasm va h.k.</p>
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
            <div className="mt-3 space-y-2">
              {currentFiles.map((file) => {
                const { Icon, color } = getFileMeta(file.name);
                return (
                  <div key={file.id} className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-gray-900 truncate pr-4">{file.name}</p>
                      <p className="text-[12px] text-gray-500">{file.size}</p>
                    </div>
                    <button 
                      onClick={() => removeFile(file.id, isEdit)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button 
          onClick={isEdit ? handleEditMaterial : handleAddMaterial}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors mt-2" 
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
            <Link href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}`} className="text-gray-500 hover:text-gray-700 transition-colors">Darslar</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-gray-900">{sectionName}</span>
          </div>
        </div>

        {/* Tabs + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 gap-1">
            <Link
              href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lessonId}/materials`}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors bg-blue-600 text-white`}
            >
              Materiallar
            </Link>
            <Link
              href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lessonId}/tasks`}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-colors text-gray-600 hover:bg-gray-50`}
            >
              Vazifalar
            </Link>
            <Link
              href={`/dashboard/courses/allCourses/${courseId}/sections/${sectionId}/lessons/${lessonId}/exams`}
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
            <table className="w-full text-left border-collapse min-w-[1000px] bg-white">
              <thead className="bg-gray-50">
                <tr className="text-[13px] text-gray-900 font-bold tracking-wide">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[20%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Dars <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[40%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Material uchun izoh <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[30%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Biriktirilgan fayllar <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-center w-[10%] border border-gray-200">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {materials.length > 0 ? materials.map((material) => (
                  <tr key={material.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      {material.title}
                    </td>
                    <td className="px-6 py-4 border border-gray-200 text-gray-600 text-[13px]">
                      {material.description}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      {material.files.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {material.files.map((file) => {
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
                        <button onClick={() => openEditModal(material)} className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button onClick={() => { setDeletingMaterialId(material.id); setIsDeleteModalOpen(true); }} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 border border-gray-200 bg-white">
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
              totalPages={Math.ceil(materials.length / itemsPerPage) || 1}
              totalItems={materials.length}
              startIndex={Math.min((currentPage - 1) * itemsPerPage, materials.length)}
              endIndex={Math.min(currentPage * itemsPerPage, materials.length)}
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
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
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[400px] flex flex-col items-center text-center p-8 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">?</div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-8">Rostdan ham o&apos;chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => { setIsDeleteModalOpen(false); setDeletingMaterialId(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                Bekor qilish
              </button>
              <button onClick={handleDeleteMaterial} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1">
                O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}