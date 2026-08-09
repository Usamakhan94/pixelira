"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import { Autoplay, Mousewheel } from "swiper/modules";
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

const STACK_SCALE = 0.8;
const STACK_OPACITY = 0.8;
const STACK_BLUR = 8;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function getStackStyle(localProgress: number): React.CSSProperties {
  if (localProgress <= 0) {
    const enter = clamp01(localProgress + 1);
    return {
      transform: `translateY(${lerp(100, 0, enter)}%) scale(1)`,
      opacity: 1,
      filter: "blur(0px)",
    };
  }

  const t = clamp01(localProgress);
  return {
    transform: `translateY(0%) scale(${lerp(1, STACK_SCALE, t)})`,
    opacity: lerp(1, STACK_OPACITY, t),
    filter: `blur(${lerp(0, STACK_BLUR, t)}px)`,
  };
}

export default function StackingCapabilitiesSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);
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
    <>
      <div
        ref={wrapperRef}
        className="relative lg:block hidden mt-10"
        style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {capabilities.map((item, index) => {
            const localProgress = continuousIndex - index;
            const style = getStackStyle(localProgress);

            return (
              <div
                key={item.title}
                className="absolute inset-0 h-full flex items-center justify-center will-change-transform"
                style={{
                  ...style,
                  zIndex: index,
                  transformOrigin: "center center",
                }}
              >
                <div className="flex flex-col gap-8.5 max-w-300 w-full lg:h-fit h-full items-center bg-white p-5 rounded-[1rem]">
                  <div className="relative w-full flex-1 min-h-0 max-h-[45vh] lg:max-h-[50vh] rounded-[1rem] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1200}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between w-full shrink-0">
                    <div className="flex flex-col gap-6.25 max-w-110.5">
                      <h3 className="text-4xl leading-none">{item.title}</h3>
                      <p className="text-body font-light leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-7">
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
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10 lg:hidden block">
        <div className="md:min-h-screen w-full overflow-hidden">
          <div className="flex gap-2 absolute top-10 left-10 z-10">
            <button
              className="rotate-180 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                mobileSwiperRef.current?.slidePrev();
              }}
            >
              <AnimatedArrowIcon
                className="group hover:bg-white bg-black size-10!"
                bgColor="black"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                mobileSwiperRef.current?.slideNext();
              }}
            >
              <AnimatedArrowIcon
                className="group hover:bg-white bg-black size-10!"
                bgColor="black"
              />
            </button>
          </div>
          <Swiper
            onSwiper={(s) => (mobileSwiperRef.current = s)}
            direction="horizontal"
            loop
            slidesPerView={1}
            speed={3000}
            modules={[Autoplay, Mousewheel]}
            mousewheel={{ forceToAxis: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="h-full w-full"
          >
            {capabilities.map((item) => (
              <SwiperSlide
                key={item.title}
                style={{ width: "100%", height: "100%" }}
                className="flex! items-center justify-center overflow-hidden"
              >
                <div className="flex flex-col gap-8.5 max-w-300 w-full h-full items-center bg-white p-5">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={320}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex justify-between flex-col md:gap-0 gap-6 w-full">
                    <div className="flex flex-col gap-6.25 max-w-150">
                      <h3 className="lg:text-4xl sm:text-2xl text-xl leading-none">
                        {item.title}
                      </h3>
                      <p className="sm:text-body text-sm font-light leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end items-start gap-7">
                      <AnimatedButton
                        href="#"
                        trailingContent={<AnimatedArrowIcon />}
                      >
                        Case Studies
                      </AnimatedButton>
                      <ul className="flex justify-center sm:flex-row flex-col sm:items-center items-start lg:p-5 sm:p-3 border border-black/10 rounded-[0.625rem] sm:w-fit w-full">
                        {item.links.map((link) => (
                          <li
                            className="relative lg:px-2.75 sm:px-2 sm:first:pl-0 sm:last:pr-0 p-2.5 leading-none sm:border-r sm:last:border-0 sm:w-fit w-full sm:border-b-0 border-b last:border-b-0"
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
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
