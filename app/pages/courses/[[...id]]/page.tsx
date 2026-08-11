import { notFound } from "next/navigation";
import { CourseHero } from "@/app/features/course-details/components/course-hero";
import { CourseSidebar } from "@/app/features/course-details/components/course-sidebar";
import { AccordionList } from "@/app/features/course-details/components/accordion-list";
import { CommentsSection } from "@/app/features/course-details/components/comments-section";

interface PageProps {
  params: Promise<{ id?: string[] }>;
}

async function getCourseData(id: string) {
  return {
    title: "Frontend dasturlash",
    description: "Asosiy tushunchalarning mustahkam poydevoriga ega bo'ling...",
    price: 750000,
    duration: "20 soat 56 daqiqa",
    studentsCount: 255,
    level: "Beginner",
  };
}

export default async function CoursePage({ params }: PageProps) {
  const resolvedParams = await params;

  const courseId = Array.isArray(resolvedParams.id) && resolvedParams.id.length > 0
    ? resolvedParams.id[0]
    : "1";

  const course = await getCourseData(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <CourseHero
        title={course.title}
        description={course.description}
        duration={course.duration}
        studentsCount={course.studentsCount}
        level={course.level}
      />

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:col-span-1">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <AccordionList courseId={courseId} />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <CommentsSection courseId={courseId} />
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="top-6 -mt-71.75 relative z-10">
            <CourseSidebar price={course.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
