"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal";
import CircleVideo from "../CircleVideo/CircleVideo-deprecated";

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { myLang } = useStore();
  const [years, setYears] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tickerFn: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const cards = imgRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const isMobile = window.innerWidth < 768;

      // MUCH more cinematic exaggerated depth
      const depths = isMobile ? [80, 120, 160, 200] : [120, 200, 280, 360];
      const dirs = [1, -1, 1, -1];

      // ------------------------------
      // TEXT INTRO
      // ------------------------------
      gsap.fromTo(
        ".experience-text",
        { autoAlpha: 0, y: 50, filter: "blur(18px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // ------------------------------
      // COUNTER
      // ------------------------------
      const counter = { value: 0 };
      const targetYears = new Date().getFullYear() - 2009;

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        onEnter: () => {
          gsap.to(counter, {
            value: targetYears,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => setYears(Math.round(counter.value)),
          });
        },
      });

      // ------------------------------
      // CINEMATIC FLOATING IMAGES
      // ------------------------------
      const state = cards.map((_, i) => ({
        current: 0,
        target: 0,
        depth: depths[i],
        dir: dirs[i],
      }));

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      // FIRST ENTRANCE
      cards.forEach((card, i) => {
        gsap.set(card, { y: -60 * state[i].dir, opacity: 0, scale: 0.85 });

        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.15 * i,
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true,
          },
        });
      });

      // MAIN PARALLAX MOTION
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.6,
        onUpdate: (self) => {
          const p = (self.progress - 0.5) * 2;
          state.forEach((s) => (s.target = p * s.depth * s.dir));
        },
      });

      tickerFn = () => {
        state.forEach((s, i) => {
          s.current = lerp(s.current, s.target, isMobile ? 0.1 : 0.12);
          gsap.set(cards[i], { y: s.current });
        });
      };

      gsap.ticker.add(tickerFn);

      return () => st.kill();
    }, section);

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="experience"
        className="
          relative 
          w-full 
          min-h-[180vh]    /* 🔥 REDUCED HEIGHT — more compact */
          bg-[#111] 
          text-white 
          overflow-visible
        "
      >
        {/* TEXT FIXED */}
        <div className="sticky top-0 flex flex-col items-center justify-center text-center h-screen px-6 z-20">
          <div className="experience-text max-w-[700px] mx-auto">
            <h2 className="font-bold tracking-tight text-[clamp(3rem,7vw,4.5rem)] leading-[0.9] uppercase">
              +{years}
              <span className="absolute invisible">{new Date().getFullYear() - 2009}</span>
              {myLang ? (
                <>
                  <span className="block mt-2">Years of</span>
                  <span className="block text-[#835bff] italic font-bold">
                    Experience
                  </span>
                </>
              ) : (
                <>
                  <span className="block mt-2">Años de</span>
                  <span className="block text-[#835bff] italic font-bold">
                    Experiencia
                  </span>
                </>
              )}
            </h2>

            <p className="mt-8 text-[clamp(1.05rem,1.6vw,1.3rem)] text-white/70 leading-relaxed">
              {myLang
                ? "We achieve functional and personalized results, specifically designed for each patient."
                : "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente."}
            </p>
          </div>
        </div>

        {/* FLOATING IMAGES — ORIGINAL POSITIONS */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            ref={(el) => (imgRefs.current[0] = el)}
            className="absolute top-[4vh] right-[6vw] w-[52vw] max-w-[280px] md:w-[32vw] md:max-w-[340px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img src="/img/clinic-cell.webp" alt="Clinica de Rehabilitación en Buenos Aires" className="w-full h-auto object-cover" />
          </div>

          <div
            ref={(el) => (imgRefs.current[1] = el)}
            className="absolute top-[80vh] left-[10vw] w-[50vw] max-w-[270px] md:w-[30vw] md:max-w-[330px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img src="/img/clinic2-cell.webp" alt='Médico revisando estudios de rodilla' className="w-full h-auto object-cover" />
          </div>

          <div
            ref={(el) => (imgRefs.current[2] = el)}
            className="absolute top-[150vh] right-[10vw] w-[48vw] max-w-[260px] md:w-[28vw] md:max-w-[320px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img src="/img/clinic3-cell.webp" alt="Andrés Anania, cirujano ortopedista especializado" className="w-full h-auto object-cover" />
          </div>

          <div
            ref={(el) => (imgRefs.current[3] = el)}
            className="absolute top-[200vh] left-[8vw] w-[50vw] max-w-[270px] md:w-[30vw] md:max-w-[330px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img src="/img/clinic4-cell.webp" alt="Andrés Anania, trabajando en su centro" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* <CircleVideo /> */}
    </>
  );
};

export default Experience;
