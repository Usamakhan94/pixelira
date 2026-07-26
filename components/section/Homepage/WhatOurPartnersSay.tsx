"use client";

import { useEffect, useRef } from "react";
import Xu from "@/utils/swiper-instance";
import cf from "@/utils/cf";
import of from "@/utils/of";

type Slide = {
  video: string;
  logo: string;
  logoBg: string;
  logoWidth: number;
  logoHeight: number;
  name: string;
  quote: string;
  bgColor: string;
  lineColor: string;
  brand: string;
};

const slides: Slide[] = [
  {
    video:
      "https://digital-culture.valmax.dev/wp-content/uploads/2026/02/Hero-section-1-1-1.mp4",
    logo: "https://digital-culture.valmax.dev/wp-content/uploads/2026/01/Vector.svg",
    logoBg: "#5241d4",
    logoWidth: 56,
    logoHeight: 21,
    name: "Alexandra Reed / NIKE",
    quote:
      "\u201CUpon reviewing multiple alternatives, our selection fell on Digital Culture, \u2013 a choice that has been absolutely precise from the very start. This collaboration has brought forth immense value and positivity for Nike, making it an exceptionally gratifying endeavor.\u201D",
    bgColor: "#d9ff80",
    lineColor: "rgba(148, 189, 52, 0.1)",
    brand: "Nike",
  },
  {
    video:
      "https://digital-culture.valmax.dev/wp-content/uploads/2026/02/Hero-section-1-2-2.mp4",
    logo: "https://digital-culture.valmax.dev/wp-content/uploads/2026/01/toyota.svg",
    logoBg: "rgb(217, 255, 128)",
    logoWidth: 71,
    logoHeight: 71,
    name: "Akio Tanaka / Toyota",
    quote:
      "\u201CDigital Culture\u2019s team exemplifies strategic expertise and fearless innovation. Their commitment to solving complex problems is commendable.\u201D",
    bgColor: "rgb(222, 218, 254)",
    lineColor: "rgb(216, 212, 255)",
    brand: "Toyota",
  },
];

export default function WhatOurPartnersSay() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = sectionRef.current;
    if (!t) return;

    const i = t.querySelector(".what-our-partners-say__slider") as HTMLElement;
    let r = t.querySelectorAll(".what-our-partners-say__backgrounds__item");
    let n = t.querySelectorAll(".what-our-partners-say__lines__item");
    let s = 0;

    cf.duplicateSwiperSlides(i, 5);

    if (r.length > 0 && r.length <= 5) {
      const count = Math.ceil(5 / r.length);
      if (count > 0) {
        for (let e = 0, len = count; e < len; e++) {
          r.forEach((el, idx) => {
            const bgClone = document.createElement("div");
            bgClone.classList.add(...el.classList);
            bgClone.style.backgroundColor =
              window.getComputedStyle(el).backgroundColor;

            const lineClone = document.createElement("div");
            lineClone.classList.add(...n[idx].classList);
            lineClone.setAttribute("data-marquee-control", "");
            lineClone.innerHTML = n[idx].innerHTML;
            lineClone.style.color = window.getComputedStyle(n[idx]).color;

            n[idx].closest(".what-our-partners-say__lines")?.append(lineClone);
            el.closest(".what-our-partners-say__backgrounds")?.append(bgClone);
          });
        }
      }
    }

    r = t.querySelectorAll(".what-our-partners-say__backgrounds__item");
    n = t.querySelectorAll(".what-our-partners-say__lines__item");
    const a = t.querySelectorAll(".what-our-partners-say__slide");
    let o = true;

    const onVisible = () => {
      o = of.initVideosFromElements(a, o, "swiper-slide-active");
      if (!o) playVideo(s);
      setMarquee(s);
    };
    const onHidden = () => {
      of.stopVideosFromElements(a);
      setMarquee(-1);
    };

    t.addEventListener("sVisible", onVisible);
    t.addEventListener("sHidden", onHidden);

    const playVideo = (idx: number) => {
      a.forEach((el, i2) => {
        const video = el.querySelector("video") as HTMLVideoElement | null;
        if (!video) return;
        if (i2 === idx) video.play();
        else if (video.readyState > 0) video.pause();
      });
    };

    const setActive = (idx: number) => {
      r?.forEach((el, i2) => {
        if (i2 === idx) {
          el.classList.add("active");
          n[i2].classList.add("active");
        } else {
          if (el.classList.contains("active")) el.classList.remove("active");
          if (n[i2].classList.contains("active"))
            n[i2].classList.remove("active");
        }
      });
    };

    const setMarquee = (idx: number) => {
      n?.forEach((el, i2) => {
        el.dispatchEvent(
          new Event(idx === i2 ? "marqueePlay" : "marqueePause"),
        );
      });
    };

    const swiperInstance = Xu._swiper(i, {
      slidesPerView: "auto",
      speed: 800,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      shortSwipes: true,
      longSwipes: false,
      resistance: true,
      resistanceRatio: 0,
      followFinger: true,
      navigation: {
        nextEl: t.querySelector(
          ".what-our-partners-say__nav.mobile .swiper-button-next",
        ),
        prevEl: t.querySelector(
          ".what-our-partners-say__nav.mobile .swiper-button-prev",
        ),
      },
      breakpoints: {
        1025: {
          allowTouchMove: false,
          simulateTouch: false,
          direction: "vertical",
          navigation: {
            nextEl: [
              t.querySelector(
                ".what-our-partners-say__nav.desktop .swiper-button-next",
              ),
              t.querySelector(
                ".what-our-partners-say__hidden-nav .swiper-button-next",
              ),
            ],
            prevEl: [
              t.querySelector(
                ".what-our-partners-say__nav.desktop .swiper-button-prev",
              ),
              t.querySelector(
                ".what-our-partners-say__hidden-nav .swiper-button-prev",
              ),
            ],
          },
        },
      },
      on: {
        init(e: any) {
          s = e.realIndex;
          if (t.classList.contains("s-visible")) {
            o = of.initVideosFromElements(a, o, "swiper-slide-active");
          }
          setActive(s);
        },
        realIndexChange(e: any) {
          s = e.realIndex;
          playVideo(s);
          setActive(s);
          setMarquee(s);
        },
        breakpoint(e: any) {
          e.navigation.destroy();
          e.params.navigation.nextEl =
            e.currentBreakpoint >= 1025
              ? [
                  t.querySelector(
                    ".what-our-partners-say__nav.desktop .swiper-button-next",
                  ),
                  t.querySelector(
                    ".what-our-partners-say__hidden-nav .swiper-button-next",
                  ),
                ]
              : t.querySelector(
                  ".what-our-partners-say__nav.mobile .swiper-button-next",
                );
          e.params.navigation.prevEl =
            e.currentBreakpoint >= 1025
              ? [
                  t.querySelector(
                    ".what-our-partners-say__nav.desktop .swiper-button-prev",
                  ),
                  t.querySelector(
                    ".what-our-partners-say__hidden-nav .swiper-button-prev",
                  ),
                ]
              : t.querySelector(
                  ".what-our-partners-say__nav.mobile .swiper-button-prev",
                );
          e.navigation.init();
          e.navigation.update();
        },
      },
    });

    return () => {
      t.removeEventListener("sVisible", onVisible);
      t.removeEventListener("sHidden", onHidden);
      swiperInstance?.destroy?.(true, true);
    };
  }, []);

  return (
    <section className="what-our-partners-say" ref={sectionRef} data-section>
      <div className="container-full what-our-partners-say__wrapper">
        <div className="what-our-partners-say__block">
          <h2 className="what-our-partners-say__title h2 h2-mob">
            What our
            <br />
            partners say
          </h2>
          <div className="what-our-partners-say__nav desktop">
            <button className="swiper-button-prev" aria-label="Prev" />
            <button className="swiper-button-next" aria-label="Prev" />
          </div>
        </div>

        <div className="what-our-partners-say__slider swiper">
          <div className="swiper-wrapper">
            {slides.map((slide) => (
              <div
                className="what-our-partners-say__slide swiper-slide"
                key={slide.name}
              >
                <figure className="m-cover">
                  <video
                    data-src={slide.video}
                    preload="metadata"
                    muted
                    loop
                    playsInline
                  />
                </figure>
                <div className="what-our-partners-say__slide__info">
                  <figure
                    className="m-contain"
                    style={{ backgroundColor: slide.logoBg }}
                  >
                    <img
                      src="https://digital-culture.valmax.dev/wp-content/themes/digital_culture/media/images/img-placeholder-min.png"
                      decoding="async"
                      width={slide.logoWidth}
                      height={slide.logoHeight}
                      data-src={slide.logo}
                      className="attachment-full size-full lazyload"
                      alt=""
                    />
                  </figure>
                  <h3 className="what-our-partners-say__slide__title subheading-14 subheading-12-mob">
                    {slide.name}
                  </h3>
                  <div className="what-our-partners-say__slide__txt txt-20 txt-16-mob">
                    <p>{slide.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="what-our-partners-say__hidden-nav">
            <button
              className="swiper-button-prev"
              aria-label="Prev"
              data-custom-cursor-text="Prev"
              data-custom-cursor-type="scroll-direction-back"
            />
            <button
              className="swiper-button-next"
              aria-label="Next"
              data-custom-cursor-text="Next"
              data-custom-cursor-type="scroll-direction-next"
            />
          </div>
        </div>

        <div
          className="what-our-partners-say__backgrounds"
          style={{ ["--count-items" as any]: slides.length }}
        >
          {slides.map((slide) => (
            <div
              className="what-our-partners-say__backgrounds__item"
              style={{ backgroundColor: slide.bgColor }}
              key={slide.name}
            />
          ))}
        </div>

        <div className="what-our-partners-say__lines">
          {slides.map((slide) => (
            <div
              className="what-our-partners-say__lines__item marquee"
              data-marquee-control=""
              style={{ color: slide.lineColor }}
              key={slide.name}
            >
              <p>{slide.brand}</p>
            </div>
          ))}
        </div>

        <div className="what-our-partners-say__nav mobile">
          <button className="swiper-button-prev" aria-label="Prev" />
          <button className="swiper-button-next" aria-label="Next" />
        </div>
      </div>

      <div className="sticky-spacer" />
    </section>
  );
}
