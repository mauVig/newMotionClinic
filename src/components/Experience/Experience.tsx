"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberFlow from "@number-flow/react";
import { useStore } from "@/store/storeGlobal.ts";

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

  const init = () => {
    const ctx = gsap.context(() => {
      // --- Texto principal
      gsap.fromTo(
        ".experience-text",
        { autoAlpha: 0, yPercent: 20, filter: "blur(6px)" },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 65%",
            once: true,
          },
        }
      );

      // --- Parallax imágenes
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          img,
          { yPercent: dir * -10, opacity: 0.6 },
          {
            yPercent: dir * 10,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      });

      // --- Contador dinámico
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => setYears(calcYears()),
        onLeaveBack: () => setYears(0),
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  // Esperá al evento 'load' y un pequeño delay
  window.addEventListener("load", () => {
    setTimeout(init, 300);
  });

  return () => {
    window.removeEventListener("load", init);
  };
}, []);


  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-[220vh] bg-[#111] text-white overflow-visible"
    >
      {/* --- Texto sticky --- */}
      <div className="sticky top-0 flex flex-col items-center justify-center text-center h-[100vh] px-6 z-20">
        <div className="experience-text max-w-[700px] mx-auto">
       <h2
  className="
    font-bold text-white text-center leading-[0.95]
    text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]
    tracking-tight uppercase
  "
  style={{ color: "#fff" }}
>
  +16
  {myLang ? (
    <>
      <span className="block">Years of</span>
      <span
        className="block text-[#cfb1fb] italic"
        style={{ fontWeight: 700 }}
      >
        Experience
      </span>
    </>
  ) : (
    <>
      <span className="block">Años de</span>
      <span
        className="block text-[#cfb1fb] italic"
        style={{ fontWeight: 700 }}
      >
        Experiencia
      </span>
    </>
  )}
</h2>

          <p
            className="mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-[#e1e1e1]"
            style={{ color: "#e1e1e1" }}
          >
            {myLang
              ? "We achieve functional and personalized results, specifically designed for each patient."
              : "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente."}
          </p>
        </div>
      </div>

      {/* --- Imágenes visibles --- */}
      <div className="absolute inset-0 z-10 overflow-visible">
        <img
          ref={(el) => {
            imgRefs.current[0] = el;
          }}
          src="/img/clinic-cell.jpg"
          alt="Clinic 1"
          className="absolute top-[12vh] right-[6vw] w-[45vw] min-w-[180px] max-w-[320px] rounded-xl opacity-80 object-cover shadow-lg"
        />
        <img
          ref={(el) => {
            imgRefs.current[1] = el;
          }}
          src="/img/clinic2-cell.jpg"
          alt="Clinic 2"
          className="absolute top-[55vh] left-[8vw] w-[45vw] min-w-[180px] max-w-[320px] rounded-xl opacity-80 object-cover shadow-lg"
        />
        <img
          ref={(el) => {
            imgRefs.current[2] = el;
          }}
          src="/img/clinic3-cell.jpg"
          alt="Clinic 3"
          className="absolute bottom-[30vh] right-[10vw] w-[45vw] min-w-[180px] max-w-[320px] rounded-xl opacity-80 object-cover shadow-lg"
        />
        <img
          ref={(el) => {
            imgRefs.current[3] = el;
          }}
          src="/img/clinic4-cell.jpg"
          alt="Clinic 4"
          className="absolute bottom-[5vh] left-[12vw] w-[45vw] min-w-[180px] max-w-[320px] rounded-xl opacity-80 object-cover shadow-lg"
        />
      </div>
    </section>
  );
};

export default Experience;
