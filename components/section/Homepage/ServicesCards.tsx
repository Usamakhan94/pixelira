"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

interface CardDetails {
  title: string;
  imgUrl: string;
  href: string;
}

const ServicesCards = ({
  cardDetails,
  servicesList,
  i,
}: {
  cardDetails: CardDetails;
  servicesList: CardDetails[];
  i: number;
}) => {
  const { title, imgUrl, href } = cardDetails;
  const containers = useRef<null | HTMLAnchorElement>(null);
  const image = useRef<null | HTMLImageElement>(null);

  const mouseLeaveHandler = () => {
    gsap.to(image.current, {
      opacity: 0,
      scale: 0.5,
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const mouseEnterHandler = () => {
    gsap.to(image.current, {
      opacity: 1,
      scale: 1.05,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (containers.current == null) return;
    const rect = containers.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateY = (deltaX / centerX) * 20;
    const rotateX = -(deltaY / centerY) * 20;

    const moveX = (deltaX / centerX) * 50;
    const moveY = (deltaY / centerY) * 50;

    gsap.to(image.current, {
      rotationZ: rotateY,
      rotationX: rotateX,
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useLayoutEffect(() => {
    if (containers == null || image == null) return;
    mouseLeaveHandler();
  }, [image]);
  return (
    <Link
      href={href}
      ref={containers}
      onMouseEnter={() => mouseEnterHandler()}
      onMouseLeave={() => mouseLeaveHandler()}
      onMouseMove={(e) => mouseMoveHandler(e)}
      className={` lg:py-14.75 py-8 relative before:absolute before:bottom-0 before:w-full before:h-px before:bg-black/10 hover:before:bg-primary before:-z-10 perspective-near last:before:hidden group`}
    >
      <h3
        className={`text-4xl group-hover:text-primary ${(i + 1) % 2 == 0 ? "lg:text-right text-center" : "lg:text-left text-center"}`}
      >
        {title}
      </h3>
      <Image
        className="lg:inline-block hidden pointer-events-none w-full h-full object-cover rounded-[10px] overflow-hidden max-w-60.75 min-h-80 absolute lg:left-1/2 left-full -top-1/2 -translate-x-1/2 translate-y-1/2"
        ref={image}
        src={imgUrl}
        alt={title}
        width={243}
        height={320}
      />
    </Link>
  );
};

export default ServicesCards;
