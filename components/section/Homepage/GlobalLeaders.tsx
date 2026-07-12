"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import DotGridBackground from "../DotGridBackground";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: "/company-logos/puma.png", alt: "Puma", width: 80, height: 62 },
  {
    src: "/company-logos/epic-games.png",
    alt: "Epic Games",
    width: 45,
    height: 52,
  },
  { src: "/company-logos/adidas.png", alt: "Adidas", width: 112, height: 75 },
  { src: "/company-logos/visa.png", alt: "Visa", width: 95, height: 31 },
  { src: "/company-logos/citi.png", alt: "Citi", width: 65, height: 37 },
  {
    src: "/company-logos/coca-cola.png",
    alt: "Coca-Cola",
    width: 123,
    height: 38,
  },
  { src: "/company-logos/twitch.png", alt: "Twitch", width: 70, height: 16 },
];

const GlobalLeaders = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        logoRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero-section",
            endTrigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
      ).fromTo(
        bubbleRefs.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          stagger: 0.15,
          duration: 0.7,
        },
        0.3,
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="global-leaders"
      className="relative isolate min-h-screen flex flex-col justify-center gap-20 items-center bg-primary overflow-hidden py-10"
    >
      <DotGridBackground
        density={1}
        dotColor={"#9161F3"}
        className="absolute inset-0 -z-10"
      />

      <h2 ref={headingRef} className="text-2xl text-white opacity-0">
        Trusted by Global Leaders
      </h2>

      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-8">
            {logos.slice(0, 4).map((logo, i) => (
              <div
                key={logo.alt}
                ref={(el) => {
                  bubbleRefs.current[i] = el;
                }}
                className={` rounded-full bg-white flex justify-center items-center opacity-0 p-3.5 `}
                style={{
                  width: `${logo.width + 16}px`,
                  height: `${logo.width + 16}px`,
                }}
              >
                <Image
                  className="w-full"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>

          <div
            ref={logoRef}
            className="flex justify-center items-center absolute inset-0 pointer-events-none"
          >
            <Image
              src="/white-logo.svg"
              alt="White Logo"
              width={337}
              height={293}
            />
          </div>

          <div className="flex flex-col gap-8">
            {logos.slice(4).map((logo, i) => (
              <div
                key={logo.alt}
                ref={(el) => {
                  bubbleRefs.current[i + 4] = el;
                }}
                className="w-24 h-24 rounded-full bg-white flex justify-center items-center opacity-0 p-3.5"
                style={{
                  width: `${logo.width + 16}px`,
                  height: `${logo.width + 16}px`,
                }}
              >
                <Image
                  className="w-full"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalLeaders;
