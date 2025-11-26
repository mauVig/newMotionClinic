"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal";
import ProcessCards from "./ProcessCards";

gsap.registerPlugin(ScrollTrigger);

// LOGOS + TEXTOS
const LOGOS = [
  { src: "/svg/acreditaciones-01.svg", label: "Cirujano Ortopedista Internacional" },
  { src: "/svg/acreditaciones-02.svg", label: "Miembro Internacional" },
  { src: "/svg/acreditaciones-03.svg", label: "Miembro Certificado" },
  { src: "/svg/acreditaciones-04.svg", label: "Miembro Titular" },
  { src: "/svg/acreditaciones-05.svg", label: "Miembro Certificado" },
];

const Biography: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll("p, h2"),
        {
          autoAlpha: 0,
          y: 40,
          filter: "blur(12px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);


  useLayoutEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -totalWidth,
          repeat: -1,
          duration: 20,
          ease: "linear",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
   <section
  ref={sectionRef}
  id="biography"
  className="
    relative w-full
    bg-[#111] text-white
    flex flex-col items-center
    px-6 
    pt-[18vh] 
    pb-[20vh]
    overflow-hidden
  "
>
  {/* HEADER */}
  <div
    ref={headerRef}
    className="
      max-w-[850px] mx-auto text-center
      flex flex-col items-center justify-center
      gap-6
      pb-32
    "
  >
    {/* MINI LABEL */}
    <p
      className={`
        text-xs sm:text-sm tracking-[0.25em] uppercase 
        ${myLang ? "text-[#b4afff]" : "text-[#b4afff]"}
        opacity-80
      `}
    >
      {myLang ? "Biography" : "Biografía"}
    </p>

    {/* NOMBRE */}
    <h2
      className="
        font-bold
        leading-[0.9]
        tracking-tight
        text-[2.8rem] 
        sm:text-[4.5rem] 
        md:text-[5rem] 
        lg:text-[6.3rem]
        drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]
        text-white
      "
    >
      Andrés Anania
    </h2>

    {/* SUBTITULO / DESCRIPCIÓN CORTA */}
    <p
      className="
        text-base sm:text-lg md:text-xl
        font-light
        leading-relaxed 
        max-w-[650px]
        text-white/70
        mt-4
      "
    >
      {myLang
        ? "Orthopedic surgeon specialized in advanced minimally invasive procedures with international accredited certifications."
        : "Cirujano ortopedista especializado en procedimientos mínimamente invasivos con acreditaciones internacionales avanzadas."}
    </p>
  </div>


      <ProcessCards />


      <div className="w-full overflow-hidden mt-32 py-10 opacity-90 select-none">
        <div
          ref={carouselRef}
          className="flex gap-32 items-center whitespace-nowrap will-change-transform"
        >

          {[...LOGOS, ...LOGOS].map((item, i) => (
            <div
              key={i}
              className="
                flex flex-col items-center justify-center
                text-center
                hover:opacity-100 
                hover:scale-[1.05]
                transition-all duration-600
                w-[200px] md:w-[260px]
              "
            >
              <img
                src={item.src}
                alt={item.label}
                className="
                  h-24 md:h-32 w-auto mb-4
                  opacity-90 
                  transition-all duration-600
                  will-change-transform
                "
              />
              <p className="text-sm md:text-base text-white/70 tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Biography;
