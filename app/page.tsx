import FeaturedProjects from "@/components/section/Homepage/FeaturedProjects";
import GlobalLeaders from "@/components/section/Homepage/GlobalLeaders";
import Hero from "@/components/section/Homepage/Hero";
import ProvenGrowth from "@/components/section/Homepage/ProvenGrowth";
import Services from "@/components/section/Homepage/Services";
import TestimonialsSection from "../components/section/Homepage/TestimonialsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <GlobalLeaders />
      <FeaturedProjects />
      <ProvenGrowth />
      <Services />
      <TestimonialsSection />
    </main>
  );
}
