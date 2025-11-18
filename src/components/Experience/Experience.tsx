"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    // ============================================================
    // FIX: Esto garantiza que Experience se refresca después del pin
    // ============================================================
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const ctx = gsap.context(() => {
      // ===== TEXTO =====
      gsap.fromTo(
        ".experience-text",
        {
          autoAlpha: 0,
          yPercent: 35,
          filter: "blur(12px)",
          color: "transparent", // Evitamos cambiar el color
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          color: "transparent", // Mantener color transparente
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 75%",
            once: true,
          },
        }
      );

      // ===== IMÁGENES =====
      imgRefs.current.forEach((img, i) => {
        if (!img) return;

        const depth = [50, 75, 110, 145][i];
        const dir = i % 2 === 0 ? 1 : -1;

        gsap.set(img, {
          yPercent: dir * -25,
          opacity: 0,
          scale: 0.9,
        });

        // entrada suave
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true,
          },
        });

        // parallax profundo
        gsap.to(img, {
          yPercent: dir * depth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.2,
          },
        });
      });

      // ===== COUNTER =====
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => setYears(calcYears()),
        onLeaveBack: () => setYears(0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ===========================
          EXPERIENCE SECTION
      ============================ */}
      <section
        ref={sectionRef}
        id="experience"
        className="relative w-full min-h-[250vh] bg-[#ffffff] text-black overflow-visible"
      >
        {/* BLOQUE FIJO */}
        <div className="sticky top-0 flex flex-col items-center justify-center text-center h-[100vh] px-6 z-20">
          <div className="experience-text max-w-[700px] mx-auto">
            <h2 className="text-black font-bold tracking-tight text-[7vw] leading-[0.9] uppercase">
              +{years}
              {myLang ? (
                <>
                  <span className="block">Years of</span>
                  <span className="block text-[#5e05ff] italic font-bold">
                    Experience
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Años de</span>
                  <span className="block text-[#5e05ff] italic font-bold">
                    Experiencia
                  </span>
                </>
              )}
            </h2>

            <p className="mt-8 text-[1.5rem] text-black/70 leading-relaxed">
              {myLang
                ? "We achieve functional and personalized results, specifically designed for each patient."
                : "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente."}
            </p>
          </div>
        </div>

        {/* IMÁGENES */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <img
            ref={(el) => (imgRefs.current[0] = el)}
            src="/img/clinic-cell.jpg"
            className="absolute top-[10vh] right-[5vw] w-[35vw] max-w-[320px] rounded-xl shadow-xl"
          />
          <img
            ref={(el) => (imgRefs.current[1] = el)}
            src="/img/clinic2-cell.jpg"
            className="absolute top-[55vh] left-[15vw] w-[35vw] max-w-[320px] rounded-xl shadow-xl"
          />
          <img
            ref={(el) => (imgRefs.current[2] = el)}
            src="/img/clinic3-cell.jpg"
            className="absolute bottom-[30vh] right-[7vw] w-[35vw] max-w-[320px] rounded-xl shadow-xl"
          />
          <img
            ref={(el) => (imgRefs.current[3] = el)}
            src="/img/clinic4-cell.jpg"
            className="absolute bottom-[5vh] left-[8vw] w-[35vw] max-w-[320px] rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* ===========================
          SEPARADOR QUE ARREGLA EL PIN
          (necesario para GSAP + sticky)
      ============================ */}
      <div className="h-[5vh] w-full"></div>

      {/* ===========================
          PORTAL (PIN FUNCIONANDO BIEN)
      ============================ */}
      <CircleVideo />
    </>
  );
};

export default Experience;
