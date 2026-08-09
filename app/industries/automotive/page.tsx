import IndustryAbout from "@/components/section/Industry/IndustryAbout";
import IndustryHero from "@/components/section/Industry/IndustryHero";

const page = () => {
  return (
    <main>
      <IndustryHero />
      <IndustryAbout />
      <section className="bg-white h-screen"></section>
    </main>
  );
};

export default page;
