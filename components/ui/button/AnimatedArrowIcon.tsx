import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DottedArrow } from "../icons";

const AnimatedArrowIcon = ({ bgColor }: { bgColor?: string }) => {
  return (
    <span
      className={`${bgColor ? bgColor : "bg-primary"} group-hover:bg-white sm:size-12.75 size-10 overflow-hidden flex items-center justify-center rounded-[0.3125rem] [&_svg]:w-full [&_svg]:h-full p-3 text-white group-hover:text-black duration-450 [&_circle]:[animation-play-state:paused] group-hover:[&_circle]:[animation-play-state:running] [&_circle]:transition-all [&_circle]:duration-450! [&_circle]:ease-[cubic-bezier(0.4,0,0.2,1)]`}
    >
      <DottedArrow />
    </span>
  );
};

export default AnimatedArrowIcon;
