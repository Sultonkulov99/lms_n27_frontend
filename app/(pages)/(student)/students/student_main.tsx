import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import CourseCard from "./components/CourseCard";
import banner from "../../../assets/banner.png";
import oybeksafarov from "../../../assets/oybeksafarov.png";

export default function StudentMain() {
  return (
    <div className="flex h-screen bg-[#0b0f19]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[#eef1f4] p-6">
          <h1 className="text-lg font-semibold text-[#1a1a1a] mb-4">
            Mening kurslarim
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CourseCard
              image={banner}
              tag="UI/UX Dizayn"
              instructor="Oybek Safarov"
              instructorAvatar={oybeksafarov}
              title="UI/UX Dizayn"
              progress={40}
            />
          </div>
        </main>
      </div>
    </div>
  );
}