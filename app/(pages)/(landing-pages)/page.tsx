import CTASection from "../../components/landing/home/CTASection";
import Hero from "../../components/landing/home/Hero";
import JoinSection from "../../components/landing/home/JoinSection";
import Mentors from "../../components/landing/home/Mentors";
import PopularCourses from "../../components/landing/home/PopularCourses";
import Testimonials from "../../components/landing/home/Testimonials";

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