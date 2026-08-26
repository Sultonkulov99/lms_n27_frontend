"use client";

import { useEffect, useState } from "react";
import { Check, User } from "lucide-react";
import { baseAPI } from "@/app/lib/utils";

interface Profile { fullName: string; phone: string; file?: string | null; mentor?: Record<string, string | number | null> | null }

export default function MentorProfilePage() {
  const [profile, setProfile] = useState<Profile>({ fullName: "", phone: "" });
  const [tab, setTab] = useState<"personal" | "mentor">("personal");
  const [fullName, setFullName] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [socials, setSocials] = useState({ telegram: "", instagram: "", facebook: "", linkedin: "", github: "", site: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    baseAPI.get("/profile").then(({ data }) => {
      const next = data?.data ?? data;
      const mentor = next.mentor;
      setProfile(next);
      setFullName(next.fullName ?? "");
      setJob(String(mentor?.job ?? ""));
      setExperience(mentor?.experience == null ? "" : String(mentor.experience));
      setDescription(String(mentor?.description ?? ""));
      setSocials({ telegram: String(mentor?.telegram ?? ""), instagram: String(mentor?.instagram ?? ""), facebook: String(mentor?.facebook ?? ""), linkedin: String(mentor?.linkedin ?? ""), github: String(mentor?.github ?? ""), site: String(mentor?.site ?? "") });
    }).catch(() => setError("Profil ma'lumotlarini yuklashda xatolik yuz berdi"));
  }, []);

  const save = async () => {
    try {
      setError("");
      await baseAPI.patch("/profile", tab === "personal" ? { fullName } : { job, experience: experience ? Number(experience) : undefined, description, ...socials });
      setMessage("Profil muvaffaqiyatli saqlandi");
      setTimeout(() => setMessage(""), 3000);
    } catch (saveError: any) {
      setError(saveError.response?.data?.message || "Saqlashda xatolik yuz berdi");
    }
  };

  const updateSocial = (key: keyof typeof socials, value: string) => setSocials((current) => ({ ...current, [key]: value }));
  const fields = [["telegram", "Telegram"], ["instagram", "Instagram"], ["facebook", "Facebook"], ["linkedin", "LinkedIn"], ["github", "GitHub"], ["site", "Veb-sayt"]] as const;

  return <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]"><h1 className="text-2xl font-bold text-gray-900 mb-6">Profil sozlamalari</h1>{message && <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700">{message}</div>}{error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700">{error}</div>}<div className="flex flex-col md:flex-row gap-6 items-start"><div className="w-full md:w-60 flex flex-col gap-1"><button onClick={() => setTab("personal")} className={`text-left px-5 py-3 rounded-xl ${tab === "personal" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>Shaxsiy ma&apos;lumotlar</button><button onClick={() => setTab("mentor")} className={`text-left px-5 py-3 rounded-xl ${tab === "mentor" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>Mentor ma&apos;lumotlari</button></div><div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">{tab === "personal" ? <div className="space-y-5"><div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><User size={28} /></div><label className="block text-sm font-bold">To&apos;liq ism<input value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-200" /></label><label className="block text-sm font-bold">Telefon<input value={profile.phone} disabled className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-500" /></label></div> : <div className="space-y-5"><div className="grid sm:grid-cols-2 gap-5"><label className="block text-sm font-bold">Kasb / Lavozim<input value={job} onChange={(event) => setJob(event.target.value)} className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-200" /></label><label className="block text-sm font-bold">Tajriba (yil)<input type="number" value={experience} onChange={(event) => setExperience(event.target.value)} className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-200" /></label></div><label className="block text-sm font-bold">O&apos;zingiz haqingizda<textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 w-full min-h-28 p-4 rounded-lg border border-gray-200" /></label><div className="grid sm:grid-cols-2 gap-5">{fields.map(([key, label]) => <label key={key} className="block text-sm font-bold">{label}<input value={socials[key]} onChange={(event) => updateSocial(key, event.target.value)} className="mt-2 w-full h-12 px-4 rounded-lg border border-gray-200" /></label>)}</div></div>}<button onClick={save} className="mt-6 flex items-center gap-2 bg-[#407BFF] text-white px-6 py-3 rounded-lg"><Check size={18} /> Saqlash</button></div></div></div>;
}
