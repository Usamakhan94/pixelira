"use client";
import Image from "next/image";
import DotGridBackground from "../DotGridBackground";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(logoRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        endTrigger: "#global-leaders",
        start: "top top",
        end: "bottom bottom",
        pin: logoRef.current,
        pinSpacing: false,
        scrub: true,
      },
    });
  });

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen flex justify-center items-center overflow-hidden "
    >
      <DotGridBackground
        density={1}
        dotColor={"#EFEEF8"}
        className="absolute inset-0 -z-10"
      />
      <div className="container">
        <div className="grid grid-cols-3 items-center">
          <h1 className="text-3xl font-regular">
            Moving your brand forward, faster.
          </h1>
          <div ref={logoRef} className="flex justify-center items-center">
            <Image src="/logo.svg" alt="Logo" width={337} height={293} />
          </div>
          <div className="flex flex-col gap-7.5 max-w-71 ml-auto">
            <p>
              Pixelira is a no-non sense growth agency delivering excellence to
              startups and medium-sized companies.
            </p>
            <AnimatedButton trailingContent={<AnimatedArrowIcon />}>
              Case Studies
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
