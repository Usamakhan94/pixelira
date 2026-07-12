import GlobalLeaders from "@/components/section/Homepage/GlobalLeaders";
import Hero from "@/components/section/Homepage/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <GlobalLeaders />
      <section className="min-h-screen"></section>
    </main>
  );
}
