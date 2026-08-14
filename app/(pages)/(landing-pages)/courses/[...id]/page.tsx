import { notFound } from "next/navigation";
import { CourseHero } from "@/app/components/course-details/course-hero";
import { CourseSidebar } from "@/app/components/course-details/course-sidebar";
import { AccordionList } from "@/app/components/course-details/accordion-list";
import { CommentsSection } from "@/app/components/course-details/comments-section";
import { coursesData } from "@/app/data/courses";

interface PageProps {
  params: Promise<{ id?: string[] }>;
}

async function getCourseData(id: string) {
  const numericId = parseInt(id, 10);
  const foundCourse = coursesData.find((c) => c.id === numericId);

  if (!foundCourse) return null;

  return {
    title: foundCourse.title,
    description: foundCourse.desc,
    price: parseInt(foundCourse.price.replace(/\s/g, ""), 10),
    duration: foundCourse.duration || "10 soat",
    studentsCount: foundCourse.studentsCount || 0,
    level: foundCourse.level || "Beginner",
    cover: foundCourse.cover,
    coverImg: foundCourse.coverImg,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const resolvedParams = await params;

  const courseId =
    Array.isArray(resolvedParams.id) && resolvedParams.id.length > 0
      ? resolvedParams.id[0]
      : "1";

  const course = await getCourseData(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0E17] pb-12 transition-colors duration-200">
      <CourseHero
        title={course.title}
        description={course.description}
        duration={course.duration}
        studentsCount={course.studentsCount}
        level={course.level}
      />

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:col-span-1">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-[#151C28] p-6 rounded-2xl border border-transparent dark:border-[#1E293B] transition-colors duration-200">
            <AccordionList courseId={courseId} />
          </section>

          <section className="bg-white dark:bg-[#151C28] p-6 rounded-2xl border border-transparent dark:border-[#1E293B] transition-colors duration-200">
            <CommentsSection courseId={courseId} />
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="top-6 -mt-71.75 relative z-10">
            <CourseSidebar
              price={course.price}
              cover={course.cover}
              coverImg={course.coverImg}
              title={course.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
