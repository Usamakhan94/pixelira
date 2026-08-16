"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { NewsletterForm } from "./Newsletter";
import { Button } from "../ui/button";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      x: "-100%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        markers: true,
      },
    });
  }, {});

  return (
    <footer className="bg-[#121212] pt-21 relative isolate overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-nowrap absolute top-1/2 -translate-y-1/2 translate-x-full right-0 w-full h-full -z-10"
      >
        <div className="bg-[#1C1C1C] w-192.5 min-w-192.5 h-192.5 rounded-full" />
        <div className="bg-[#1C1C1C] w-192.5 min-w-192.5 h-192.5 rounded-full" />
        <div className="bg-[#1C1C1C] w-192.5 min-w-192.5 h-192.5 rounded-full" />
        <div className="bg-[#1C1C1C] w-192.5 min-w-192.5 h-192.5 rounded-full" />
        <div className="bg-[#1C1C1C] w-192.5 min-w-192.5 h-192.5 rounded-full" />
      </div>
      <div className="container">
        <div className="flex justify-between mb-35">
          <div className="flex flex-col gap-7.75">
            <Link href="/">
              <Image src="/f-logo.svg" alt="Logo" width={184} height={45} />
            </Link>
            <div className="flex gap-2.5">
              <Link
                href="#"
                className="text-white border border-white/8 [&_svg]:w-full [&_svg]:h-full p-3.5 rounded-[8px] flex justify-center items-center w-full max-w-13.5 bg-linear-to-br from-white/14 to-transparent"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                className="text-white border border-white/8 [&_svg]:w-full [&_svg]:h-full p-3.5 rounded-[8px] flex justify-center items-center w-full max-w-13.5 bg-linear-to-br from-white/14 to-transparent"
              >
                <FaInstagram />
              </Link>
              <Link
                href="#"
                className="text-white border border-white/8 [&_svg]:w-full [&_svg]:h-full p-3.5 rounded-[8px] flex justify-center items-center w-full max-w-13.5 bg-linear-to-br from-white/14 to-transparent"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
          <div className="flex flex-col max-w-[24rem] gap-7">
            <h6 className="text-white font-normal text-xl">
              Stay in the loop with us...
            </h6>
            <div className="relative isolate">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end pb-38.5">
          <Button className="p-0! rounded-none! -rotate-90 translate-y-26.25">
            <AnimatedArrowIcon />
          </Button>
          <div className="flex gap-26.25">
            <div>
              <h6 className="text-white/20 text-xl font-normal">Links</h6>
              <ul>
                <li>
                  <Link className="text-white text-body" href="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-body" href="">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-body" href="">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-white/20 text-xl font-normal">Socials</h6>
              <ul>
                <li>
                  <Link className="text-white text-body" href="">
                    Linkedin
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-body" href="">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-body" href="">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-white/20 text-xl font-normal">Legal</h6>
              <ul>
                <li>
                  <Link className="text-white text-body" href="">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-white text-body" href="">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 py-8.5">
          <span className="text-white text-body">
            PIXELIRA {new Date().getFullYear()} | ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
