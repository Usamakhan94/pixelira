"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type Lenis from "lenis";

import "swiper/css";

interface Capability {
  title: string;
  description: string;
  links: string[];
  backgroundColor: string;
}

const capabilities: Capability[] = [
  {
    title: "Brand Intelligence",
    description:
      "Advanced analytics paired with strategic expertise to map market and competition.",
    links: ["Brand Strategy", "Competitive & Competitor Intelligence"],
    backgroundColor: "red",
  },
  {
    title: "Product Elevation",
    description:
      "Cutting-edge technologies that turn ideas into impactful, shippable products.",
    links: [
      "Concepts & Prototypes",
      "UX/UI & Design",
      "Full Stack Mobile & Web Development",
    ],
    backgroundColor: "blue",
  },
  {
    title: "Commerce Excellence",
    description:
      "Strategy and technology combined into cohesive, high-performing commerce systems.",
    links: ["Omnichannel Strategy", "Omnichannel Integration", "eCommerce"],
    backgroundColor: "green",
  },
  {
    title: "Enterprise Transformation",
    description:
      "Digital expertise and strategic insight applied to reimagine business processes.",
    links: ["AI Integration", "Enterprise & Solution Architecture"],
    backgroundColor: "yellow",
  },
  {
    title: "AI & Data Evolution",
    description:
      "AI and data strategy woven together and tailored to specific business needs.",
    links: ["Generative AI For Enterprise", "LLM Strategy And Implementation"],
    backgroundColor: "purple",
  },
];

const totalSlides = capabilities.length;
const SCROLL_LENGTH_VH = totalSlides * 100;
const SCROLL_STOP_DELAY = 150;

const NEXT_OFFSET = { x: 25, y: -100, skew: 10 };
const PREV_OFFSET = { x: -25, y: 50, skew: 10 };

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

      // Always (re)schedule the "did the user stop scrolling" check.
      // We deliberately do NOT gate this on "a snap is already running" —
      // if a prior snap animation gets interrupted by new scroll input
      // (which cancels it without firing onComplete), gating here would
      // permanently block future snaps. The settled-check inside
      // snapToNearest makes repeated/overlapping calls harmless.
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

      // Already settled — nothing to snap.
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
                  backgroundColor: item.backgroundColor,
                }}
              >
                <div className="flex h-full w-full items-center">
                  <div className="mx-auto w-full max-w-7xl px-8 md:px-24">
                    <h2 className="mb-6 text-4xl font-semibold text-white md:text-6xl">
                      {item.title}
                    </h2>

                    <p className="mb-8 max-w-xl text-lg text-white/70">
                      {item.description}
                    </p>

                    <ul className="flex flex-col gap-3">
                      {item.links.map((link) => (
                        <li
                          key={link}
                          className="text-xl text-white underline underline-offset-4"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
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
