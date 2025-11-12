"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberFlow from "@number-flow/react";
import { useStore } from "@/store/storeGlobal.ts";
import CircleVideo from "../CircleVideo/CircleVideo";


gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { myLang } = useStore();
  const [years, setYears] = useState(0);

  const calcYears = () => new Date().getFullYear() - 2009;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // --- Animar aparición del texto
      gsap.fromTo(
        ".experience-text",
        { autoAlpha: 0, yPercent: 20 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 70%",
            scrub: false,
            once: true,
          },
        }
      );

      // --- Parallax + fade-in imágenes
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          img,
          { yPercent: dir * -20, autoAlpha: 0 },
          {
            yPercent: dir * 20,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom top",
              scrub: 1.3,
              markers: false,
            },
          }
        );
      });

      // --- Número dinámico
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 30%",
        onEnter: () => setYears(calcYears()),
        onLeaveBack: () => setYears(0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-[200vh] bg-[#111] text-white overflow-visible"
    >
      {/* --- Texto sticky --- */}
      <div className="sticky top-0 flex flex-col items-center justify-center text-center h-[100vh] z-20 text-white">
        <div className="experience-text">
          <h2
            className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white"
            style={{
              lineHeight: 0.85,
              color: "#ffffff", // fuerza blanco puro
            }}
          >
            +<NumberFlow value={years} />{" "}
            {myLang ? (
              <>
                Years of <br /> experience
              </>
            ) : (
              <>
                Años de <br /> experiencia
              </>
            )}
          </h2>
          <p
            className="mt-6 max-w-md text-xs sm:text-sm"
            style={{
              opacity: 1,
              color: "#ffffff",
            }}
          >
            {myLang
              ? "We achieve functional and personalized results, specifically designed for each patient."
              : "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente."}
          </p>
        </div>
      </div>

      {/* --- Imágenes --- */}
      <img
        ref={(el) => {
          imgRefs.current[0] = el;
        }}
        src="/img/clinic-cell.jpg"
        alt=""
        className="absolute top-[25vh] right-8 h-40 sm:h-52 lg:h-64 rounded-md opacity-0"
      />
      <img
        ref={(el) => {
          imgRefs.current[1] = el;
        }}
        src="/img/clinic2-cell.jpg"
        alt=""
        className="magnetic absolute top-[70vh] left-8 h-40 sm:h-52 lg:h-64 rounded-md opacity-0"
      />
      <img
        ref={(el) => {
          imgRefs.current[2] = el;
        }}
        src="/img/clinic3-cell.jpg"
        alt=""
        className="absolute bottom-[35vh] right-8 h-36 sm:h-44 lg:h-56 rounded-md opacity-0"
      />
      <img
        ref={(el) => {
          imgRefs.current[3] = el;
        }}
        src="/img/clinic4-cell.jpg"
        alt=""
        className="absolute bottom-[5vh] left-8 h-40 sm:h-52 lg:h-64 rounded-md opacity-0"
      />

    </section>
  );
};

export default Experience;
