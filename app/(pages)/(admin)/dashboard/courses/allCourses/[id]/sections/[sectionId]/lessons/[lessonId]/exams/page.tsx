"use client";

import React, { useState, use } from "react";
import { PlusCircle, Filter, Pen, Trash2, X, Check } from "lucide-react";
import Pagination from "@/app/components/dashboard/Pagination";
import { useLessonMeta } from "@/app/components/lesson/useLessonMeta";
import LessonHeader from "@/app/components/lesson/LessonHeader";
import LessonTabs from "@/app/components/lesson/LessonTabs";

type AnswerKey = "A" | "B" | "C" | "D";

interface ExamQuestion {
  id: number;
  question: string;
  answers: Record<AnswerKey, string>;
  correctAnswer: AnswerKey;
}

const ANSWER_KEYS: AnswerKey[] = ["A", "B", "C", "D"];

const emptyQuestionDraft = (): { question: string; answers: Record<AnswerKey, string>; correctAnswer: AnswerKey } => ({
  question: "",
  answers: { A: "", B: "", C: "", D: "" },
  correctAnswer: "A"
});

export default function LessonExamsPage({
  params,
}: {
  params: Promise<{ id: string; sectionId: string; lessonId: string }>;
}) {
  const { id: courseId, sectionId, lessonId } = use(params);
  const { courseTitle } = useLessonMeta(courseId, sectionId);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([
    {
      id: 1,
      question: "CSS kengaytmasini toping",
      answers: {
        A: "Cascading Style Sheets",
        B: "Cascading Style Sheets",
        C: "Cascading Style Sheets",
        D: "Cascading Style Sheets"
      },
      correctAnswer: "A"
    }
  ]);

  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [isDeleteExamModalOpen, setIsDeleteExamModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState(emptyQuestionDraft());
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);
  const [deletingQuestionId, setDeletingQuestionId] = useState<number | null>(null);

  const resetExamForm = () => {
    setNewQuestion(emptyQuestionDraft());
    setEditingQuestion(null);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim()) return;
    setExamQuestions([...examQuestions, { id: Date.now(), ...newQuestion }]);
    setIsAddExamModalOpen(false);
    resetExamForm();
  };

  const handleEditQuestion = () => {
    if (!editingQuestion || !editingQuestion.question.trim()) return;
    setExamQuestions(examQuestions.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    setIsEditExamModalOpen(false);
    resetExamForm();
  };

  const handleDeleteQuestion = () => {
    if (deletingQuestionId === null) return;
    setExamQuestions(examQuestions.filter(q => q.id !== deletingQuestionId));
    setDeletingQuestionId(null);
    setIsDeleteExamModalOpen(false);
  };

  const openEditExamModal = (q: ExamQuestion) => {
    setEditingQuestion({ ...q, answers: { ...q.answers } });
    setIsEditExamModalOpen(true);
  };

  const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const handleDownloadXLS = () => {
    const headers = ["№", "Savol", "A javob", "B javob", "C javob", "D javob", "To'g'ri javob"];
    const rows = examQuestions.map((q, index) =>
      [
        index + 1,
        csvEscape(q.question),
        csvEscape(q.answers.A),
        csvEscape(q.answers.B),
        csvEscape(q.answers.C),
        csvEscape(q.answers.D),
        q.correctAnswer,
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "imtihon-savollari.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderExamModalContent = (isEdit: boolean) => {
    const current = isEdit ? editingQuestion : newQuestion;
    if (isEdit && !current) return null;

    const updateQuestionText = (value: string) => {
      if (isEdit && editingQuestion) {
        setEditingQuestion({ ...editingQuestion, question: value });
      } else {
        setNewQuestion({ ...newQuestion, question: value });
      }
    };

    const updateAnswerText = (key: AnswerKey, value: string) => {
      if (isEdit && editingQuestion) {
        setEditingQuestion({ ...editingQuestion, answers: { ...editingQuestion.answers, [key]: value } });
      } else {
        setNewQuestion({ ...newQuestion, answers: { ...newQuestion.answers, [key]: value } });
      }
    };

    const updateCorrectAnswer = (key: AnswerKey) => {
      if (isEdit && editingQuestion) {
        setEditingQuestion({ ...editingQuestion, correctAnswer: key });
      } else {
        setNewQuestion({ ...newQuestion, correctAnswer: key });
      }
    };

    return (
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Savol matni</label>
          <textarea
            rows={2}
            placeholder="Kiriting"
            value={current?.question || ""}
            onChange={(e) => updateQuestionText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px] resize-none"
          />
        </div>
        <div>
          <label className="block text-[14px] font-bold text-gray-900 mb-2">Javob variantlari</label>
          <div className="space-y-2.5">
            {ANSWER_KEYS.map((key) => {
              const isCorrect = current?.correctAnswer === key;
              return (
                <div key={key} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateCorrectAnswer(key)}
                    title="To'g'ri javob qilib belgilash"
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isCorrect ? "border-blue-600" : "border-gray-300 hover:border-gray-400"}`}
                  >
                    {isCorrect && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                  </button>
                  <span className="w-5 text-[13px] font-bold text-gray-500 shrink-0">{key}</span>
                  <input
                    type="text"
                    placeholder={`${key} javobi`}
                    value={current?.answers[key] || ""}
                    onChange={(e) => updateAnswerText(key, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                  />
                </div>
              );
            })}
          </div>
          <p className="text-[12px] text-gray-400 mt-2">To&apos;g&apos;ri javobni belgilash uchun doiraga bosing</p>
        </div>
        <button
          onClick={isEdit ? handleEditQuestion : handleAddQuestion}
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
        <LessonHeader courseId={courseId} sectionId={sectionId} courseTitle={courseTitle} />

        <div className="flex items-center justify-between mb-6">
          <LessonTabs courseId={courseId} sectionId={sectionId} lessonId={lessonId} active="exams" />
          <button onClick={() => { resetExamForm(); setIsAddExamModalOpen(true); }} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <PlusCircle size={18} />
            Savol qo&apos;shish
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="overflow-x-auto rounded-t-xl overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[1100px] bg-white">
              <thead className="bg-gray-50">
                <tr className="text-[13px] text-gray-900 font-bold tracking-wide">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[5%]">
                    №
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[22%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      Savol <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[18%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      A javob <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[15%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      B javob <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[15%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      C javob <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap border border-gray-200 w-[15%]">
                    <div className="flex items-center justify-between cursor-pointer group">
                      D javob <Filter size={14} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-center w-[10%] border border-gray-200">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-800">
                {examQuestions.length > 0 ? examQuestions.map((q, index) => (
                  <tr key={q.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 border border-gray-200">
                      {q.question}
                    </td>
                    {ANSWER_KEYS.map((key) => (
                      <td key={key} className="px-6 py-4 border border-gray-200 text-gray-700">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span>{q.answers[key]}</span>
                          {q.correctAnswer === key && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium whitespace-nowrap">
                              To&apos;g&apos;ri javob
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center border border-gray-200">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button onClick={() => openEditExamModal(q)} className="p-1 hover:text-blue-600 transition-colors">
                          <Pen size={16} />
                        </button>
                        <button onClick={() => { setDeletingQuestionId(q.id); setIsDeleteExamModalOpen(true); }} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 border border-gray-200 bg-white">
                      Savollar mavjud emas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-2 py-1 shadow-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(examQuestions.length / itemsPerPage) || 1}
              totalItems={examQuestions.length}
              startIndex={Math.min((currentPage - 1) * itemsPerPage, examQuestions.length)}
              endIndex={Math.min(currentPage * itemsPerPage, examQuestions.length)}
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

      {(isAddExamModalOpen || isEditExamModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => { setIsAddExamModalOpen(false); setIsEditExamModalOpen(false); resetExamForm(); }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{isEditExamModalOpen ? "Savolni tahrirlash" : "Savol qo\u2019shish"}</h2>
              <button onClick={() => { setIsAddExamModalOpen(false); setIsEditExamModalOpen(false); resetExamForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            {renderExamModalContent(isEditExamModalOpen)}
          </div>
        </div>
      )}

      {isDeleteExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeleteExamModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[400px] flex flex-col items-center text-center p-8 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">?</div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-8">Rostdan ham o&apos;chirmoqchimisiz?</h2>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => { setIsDeleteExamModalOpen(false); setDeletingQuestionId(null); }} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                Bekor qilish
              </button>
              <button onClick={handleDeleteQuestion} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1">
                O&apos;chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
