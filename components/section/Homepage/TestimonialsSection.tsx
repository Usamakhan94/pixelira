"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";

const testimonials = [
  {
    id: 1,
    logo: "/logos/toyota.svg",
    company: "TOYOTA",
    image: "/images/toyota-bg.jpg",
    quote:
      "Digital Culture's team exemplifies strategic expertise and fearless innovation. Their commitment to solving complex problems is commendable.",
    author: "AKIO TANAKA / TOYOTA",
  },
  {
    id: 2,
    logo: "/logos/nike.svg",
    company: "NIKE",
    image: "/images/nike-bg.jpg",
    quote:
      "Working with this team pushed our digital experience forward faster than any partner we've had. They just get it.",
    author: "ALEXANDRA REED / NIKE",
  },
  {
    id: 3,
    logo: "/logos/spotify.svg",
    company: "SPOTIFY",
    image: "/images/spotify-bg.jpg",
    quote:
      "A rare blend of creative vision and technical execution. Every milestone shipped on time and exceeded expectations.",
    author: "MARCUS CHEN / SPOTIFY",
  },
  {
    id: 4,
    logo: "/logos/airbnb.svg",
    company: "AIRBNB",
    image: "/images/airbnb-bg.jpg",
    quote:
      "They didn't just build what we asked for, they challenged our assumptions and made the product better for it.",
    author: "SOFIA RAMIREZ / AIRBNB",
  },
  {
    id: 5,
    logo: "/logos/samsung.svg",
    company: "SAMSUNG",
    image: "/images/samsung-bg.jpg",
    quote:
      "Reliable, sharp, and genuinely invested in our success. It felt like an extension of our own team.",
    author: "DAVID KIM / SAMSUNG",
  },
];

const TestimonialsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lastClientPos = useRef({ x: 0, y: 0 });
  const [hoverZone, setHoverZone] = useState<"top" | "bottom" | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const evaluateHover = useCallback((clientX: number, clientY: number) => {
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    if (!wrapperRect) return;

    setCursorPos({
      x: clientX - wrapperRect.left,
      y: clientY - wrapperRect.top,
    });

    const swiper = swiperRef.current;
    const activeSlideEl = swiper?.slides[swiper.activeIndex] as
      | HTMLElement
      | undefined;
    if (!activeSlideEl) {
      setHoverZone(null);
      return;
    }

    const slideRect = activeSlideEl.getBoundingClientRect();
    const centerX = slideRect.left + slideRect.width / 2;
    const centerY = slideRect.top + slideRect.height / 2;
    const radius = slideRect.width / 2;
    const dist = Math.hypot(clientX - centerX, clientY - centerY);

    if (dist > radius) {
      setHoverZone(null);
      return;
    }

    const relativeY = clientY - slideRect.top;
    setHoverZone(relativeY < slideRect.height / 2 ? "top" : "bottom");
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    lastClientPos.current = { x: e.clientX, y: e.clientY };
    evaluateHover(e.clientX, e.clientY);
  }

  function handleMouseLeave() {
    setHoverZone(null);
  }

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)"); // your xl breakpoint
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const activeSwiper = () =>
    isDesktop ? desktopSwiperRef.current : mobileSwiperRef.current;

  return (
    <section className="bg-primary flex items-center justify-between xl:p-0 py-10 ">
      <div className="xl:p-6 xl:max-w-110 w-full flex flex-col gap-10">
        <h3 className="sm:text-3xl text-2xl font-medium xl:text-left text-center leading-none">
          What our partners say
        </h3>
        <div className="relative xl:hidden block">
          <Swiper
            onSwiper={(s) => (mobileSwiperRef.current = s)}
            direction="horizontal"
            slidesPerView="auto"
            className="testimonials-swiper h-full w-full mr-0!"
            loop
            centeredSlides
            spaceBetween={0}
            speed={900}
            modules={[Autoplay]}
          >
            {testimonials.map((item) => (
              <SwiperSlide
                key={item.id}
                className="relative flex! items-center justify-center"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden sm:px-0 px-10">
                  <Image
                    src={item.image}
                    alt={item.company}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />

                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center text-white">
                    <div className=" text-white mb-6">
                      <span className="font-bold text-sm">{item.company}</span>
                    </div>
                    <p className="text-lg font-medium leading-snug max-w-md">
                      “{item.quote}”
                    </p>
                    {/* <span className="mt-4 text-xs tracking-wide text-white/70">
                    {item.author}
                  </span> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex gap-2 self-center xl:self-start">
          <button
            className="rotate-180 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              activeSwiper()?.slidePrev();
            }}
          >
            <AnimatedArrowIcon
              className="group hover:bg-white bg-black"
              bgColor="black"
            />
          </button>
          <button
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              activeSwiper()?.slideNext();
            }}
          >
            <AnimatedArrowIcon
              className="group hover:bg-white bg-black"
              bgColor="black"
            />
          </button>
        </div>
      </div>
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-h-screen h-screen xl:block hidden"
      >
        <Swiper
          onSwiper={(s) => (desktopSwiperRef.current = s)}
          onSlideChangeTransitionEnd={() => {
            evaluateHover(lastClientPos.current.x, lastClientPos.current.y);
          }}
          direction="vertical"
          slidesPerView="auto"
          className="testimonials-swiper h-full w-full mr-0!"
          loop
          centeredSlides
          spaceBetween={0}
          speed={900}
          watchSlidesProgress
          modules={[Autoplay]}
        >
          {testimonials.map((item) => (
            <SwiperSlide
              key={item.id}
              className="relative flex! items-center justify-center"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.company}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center text-white">
                  <div className=" text-white mb-6">
                    <span className="font-bold text-sm">{item.company}</span>
                  </div>
                  <p className="text-lg font-medium leading-snug max-w-md">
                    “{item.quote}”
                  </p>
                  {/* <span className="mt-4 text-xs tracking-wide text-white/70">
                    {item.author}
                  </span> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={(e) => {
            e.stopPropagation();
            desktopSwiperRef.current?.slidePrev();
          }}
          style={{ top: cursorPos.y, left: cursorPos.x }}
          className={`flex justify-center items-center gap-1 cursor-none absolute -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white text-black w-28.5 h-28.5 text-sm font-semibold origin-center transition-transform duration-300 ${
            hoverZone === "top" ? "scale-100" : "scale-0 pointer-events-none"
          }`}
        >
          PREV{" "}
          <span className="-rotate-90 w-fit h-fit ">
            <AnimatedArrowIcon
              className="[&_svg]:text-black! p-0! size-3!"
              bgColor={"transparent"}
            />
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            desktopSwiperRef.current?.slideNext();
          }}
          style={{ top: cursorPos.y, left: cursorPos.x }}
          className={`flex justify-center items-center gap-1 cursor-none absolute -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white text-black w-28.5 h-28.5 text-sm font-semibold origin-center transition-transform duration-300 ${
            hoverZone === "bottom" ? "scale-100" : "scale-0 pointer-events-none"
          }`}
        >
          NEXT
          <span className="rotate-90 w-fit h-fit ">
            <AnimatedArrowIcon
              className="[&_svg]:text-black! p-0! size-3!"
              bgColor={"transparent"}
            />
          </span>
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
