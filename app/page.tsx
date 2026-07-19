import FeaturedProjects from "@/components/section/Homepage/FeaturedProjects";
import GlobalLeaders from "@/components/section/Homepage/GlobalLeaders";
import Hero from "@/components/section/Homepage/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <GlobalLeaders />
      <FeaturedProjects />
      <section className="min-h-screen bg-white"></section>
      <section className="min-h-screen bg-white"></section>
      <section className="min-h-screen bg-white"></section>
    </main>
  );
}
