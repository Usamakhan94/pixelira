"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { forwardRef, useImperativeHandle, useRef, ReactNode } from "react";

gsap.registerPlugin(SplitText);

export type AnimatedSplitHandle = {
  play: () => void;
  reverse: () => void;
  restart: () => void;
};

type AnimatedSplitProps = {
  children: ReactNode;
  className?: string;
};

const AnimatedSplit = forwardRef<AnimatedSplitHandle, AnimatedSplitProps>(
  ({ children, className }, ref) => {
    const scopeRef = useRef<HTMLSpanElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
      () => {
        const front = new SplitText(".split-front", { type: "chars" });
        const back = new SplitText(".split-back", { type: "chars" });

        gsap.set(back.chars, { y: 14, rotateX: -90, opacity: 0 });

        tl.current = gsap.timeline({ paused: true });
        tl.current
          .to(front.chars, {
            y: -14,
            rotateX: 90,
            opacity: 0,
            stagger: 0.035,
            duration: 0.35,
            ease: "power2.out",
          })
          .to(
            back.chars,
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              stagger: 0.035,
              duration: 0.35,
              ease: "power2.out",
            },
            0,
          );

        return () => {
          front.revert();
          back.revert();
        };
      },
      { scope: scopeRef },
    );

    useImperativeHandle(ref, () => ({
      play: () => tl.current?.play(),
      reverse: () => tl.current?.reverse(),
      restart: () => tl.current?.restart(),
    }));

    return (
      <span
        ref={scopeRef}
        className={`split-text relative inline-flex ${className ?? ""}`}
      >
        <span className="split-front inline-block whitespace-nowrap">
          {children}
        </span>
        <span className="split-back absolute left-0 top-0 inline-block whitespace-nowrap">
          {children}
        </span>
      </span>
    );
  },
);

AnimatedSplit.displayName = "AnimatedSplit";
export default AnimatedSplit;
