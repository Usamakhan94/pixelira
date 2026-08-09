"use client";
import { DottedArrow } from "@/components/ui/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const IndustryHero = () => {
  const bgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(bgRef.current, {
      y: 200,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-start sm:py-10 px-4 md:px-20 xl:px-40 overflow-hidden relative isolate"
    >
      <Image
        ref={bgRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
        src="/industry/automotive.png"
        alt="Automotive Hero"
        width={1440}
        height={900}
      />
      <div className="max-w-134.5">
        <h1 className="text-3xl font-normal text-white">
          Automotive agency, and consulting firm
        </h1>
        <p className="text-body mt-6 text-white">
          As a leading automotive consulting firm, we help brands accelerate
          digital transformation, stay competitive, and unlock new growth
          opportunities through smart strategy and innovative experiences. Let’s
          drive what’s next together.
        </p>
      </div>
      <span className="absolute animate-bounce bottom-10 left-1/2 -translate-x-1/2 text-white flex items-center gap-2 ">
        <span className="w-7 rotate-90 [&_svg]:w-full [&_svg]:h-full">
          <DottedArrow />
        </span>
      </span>
    </section>
  );
};

export default IndustryHero;
