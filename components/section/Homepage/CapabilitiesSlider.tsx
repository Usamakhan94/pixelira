"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type Lenis from "lenis";

import "swiper/css";
import Image from "next/image";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";

interface Capability {
  title: string;
  description: string;
  links: string[];
  image: string;
}

const capabilities: Capability[] = [
  {
    image: "/projects/duerklinkhaak.png",
    title: "Duerklinkhaak",
    description:
      "Designed, and developed an e-commerce website for a Dutch brand, along with their product listing images and social media posts.",
    links: ["UI/UX", "Social Media", "Development"],
  },
  {
    image: "/projects/duerklinkhaak.png",
    title: "Product Elevation",
    description:
      "Cutting-edge technologies that turn ideas into impactful, shippable products.",
    links: [
      "Concepts & Prototypes",
      "UX/UI & Design",
      "Full Stack Mobile & Web Development",
    ],
  },
  {
    image: "/projects/duerklinkhaak.png",
    title: "Commerce Excellence",
    description:
      "Strategy and technology combined into cohesive, high-performing commerce systems.",
    links: ["Omnichannel Strategy", "Omnichannel Integration", "eCommerce"],
  },
  {
    image: "/projects/duerklinkhaak.png",
    title: "Enterprise Transformation",
    description:
      "Digital expertise and strategic insight applied to reimagine business processes.",
    links: ["AI Integration", "Enterprise & Solution Architecture"],
  },
  {
    image: "/projects/duerklinkhaak.png",
    title: "AI & Data Evolution",
    description:
      "AI and data strategy woven together and tailored to specific business needs.",
    links: ["Generative AI For Enterprise", "LLM Strategy And Implementation"],
  },
];

const totalSlides = capabilities.length;
const SCROLL_LENGTH_VH = totalSlides * 100;
const SCROLL_STOP_DELAY = 150;

const NEXT_OFFSET = { x: 40, y: -130, skew: 10 };
const PREV_OFFSET = { x: -40, y: 130, skew: 10 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getSlideTransform(delta: number) {
  const clamped = Math.max(-1, Math.min(1, delta));

  if (clamped >= 0) {
    const x = lerp(0, NEXT_OFFSET.x, clamped);
    const y = lerp(0, NEXT_OFFSET.y, clamped);
    const skew = lerp(0, NEXT_OFFSET.skew, clamped);
    return `translate(${x}%, ${y}%) translate3d(0px, 0px, 0px) skew(${skew}deg, 0deg)`;
  }

  const t = -clamped;
  const x = lerp(0, PREV_OFFSET.x, t);
  const y = lerp(0, PREV_OFFSET.y, t);
  const skew = lerp(0, PREV_OFFSET.skew, t);
  return `translate(${x}%, ${y}%) translate3d(0px, 0px, 0px) skew(${skew}deg, 0deg)`;
}

export default function CapabilitiesSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [continuousIndex, setContinuousIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getMetrics = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
      return { rect, scrollableDistance };
    };

    const handleScroll = () => {
      const { rect, scrollableDistance } = getMetrics();
      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      const exactIndex = progress * (totalSlides - 1);

      setContinuousIndex(exactIndex);

      const nearest = Math.round(exactIndex);
      if (swiperRef.current && swiperRef.current.activeIndex !== nearest) {
        swiperRef.current.slideTo(nearest, 0);
      }

      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        snapToNearest();
      }, SCROLL_STOP_DELAY);
    };

    const snapToNearest = () => {
      const { rect, scrollableDistance } = getMetrics();
      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      const exactIndex = progress * (totalSlides - 1);
      const target = Math.round(exactIndex);

      if (Math.abs(exactIndex - target) < 0.01) return;

      const targetProgress = target / (totalSlides - 1);
      const wrapperDocTop = rect.top + window.scrollY;
      const targetScrollY = wrapperDocTop + targetProgress * scrollableDistance;

      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenis) {
        lenis.scrollTo(targetScrollY, { duration: 0.6 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative "
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Swiper
          direction="horizontal"
          slidesPerView={1}
          speed={0}
          allowTouchMove={false}
          simulateTouch={false}
          onSwiper={(s) => (swiperRef.current = s)}
          className="capabilities-swiper h-full w-full"
        >
          {capabilities.map((item, index) => {
            const delta = index - continuousIndex;

            return (
              <SwiperSlide
                key={item.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  transform: getSlideTransform(delta),
                }}
                className="flex! items-center justify-center overflow-hidden"
              >
                <div className="flex flex-col gap-8.5 max-w-300 w-full items-center bg-white p-5 rounded-[1rem] ">
                  <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1200}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-6.25 max-w-110.5">
                      <h3 className="text-4xl leading-none">{item.title}</h3>
                      <p className="text-body font-light leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <div className=" flex flex-col items-end gap-7">
                      <AnimatedButton
                        href="#"
                        trailingContent={<AnimatedArrowIcon />}
                      >
                        Case Studies
                      </AnimatedButton>
                      <ul className="flex justify-center items-center p-5 border border-black/10 rounded-[0.625rem]">
                        {item.links.map((link) => (
                          <li
                            className="relative px-2.75 first:pl-0 last:pr-0 leading-none border-r last:border-0"
                            key={link}
                          >
                            {link}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <style jsx global>{`
          .capabilities-swiper .swiper-wrapper {
            transform: none !important;
          }
        `}</style>
      </div>
    </div>
  );
}
