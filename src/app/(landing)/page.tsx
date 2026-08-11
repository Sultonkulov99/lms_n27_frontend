import Hero from "@/components/landing/Hero";
import PopularCourses from "@/components/landing/PopularCourses";
import JoinSection from "@/components/landing/JoinSection";
import CTASection from "@/components/landing/CTASection";
import Mentors from "@/components/landing/Mentors";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="bg-white text-slate-900 selection:bg-blue-600 selection:text-white relative">
      <Hero />
      <PopularCourses />
      <JoinSection />
      <CTASection />
      <Mentors />
      <Testimonials />
    </main>
  );
}