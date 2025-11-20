"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import ShinyText from "./ShinyText.tsx";

const Objective = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      const ScrollTrigger =
        ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const textEl = textRef.current;
      if (!section || !textEl) return;

      const chars = textEl.querySelectorAll(".char");

      gsap.set(chars, { yPercent: 100, opacity: 0, filter: "blur(8px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Entrada
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: { each: 0.08, ease: "power2.out" },
        duration: 1.8,
      });

      // Salida
      tl.to(chars, {
        opacity: 0.25,
        yPercent: -10,
        duration: 4.4,
        ease: "power2.inOut",
        stagger: { each: 0.04 },
      });
ad
      window.addEventListener("load", () => {
        setTimeout(() => {
          if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
          }
        }, 300);
      });
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal-section"
      className="relative min-h-[120vh] flex flex-col items-center justify-center px-4 
                 overflow-hidden bg-[#111] text-white will-change-transform"
    >
      <div className="flex flex-col items-center justify-center text-center 
                      space-y-24 sm:space-y-32 md:space-y-40">
        <div className="max-w-4xl mx-auto">
          <ShinyText disabled={false} speed={1.5} />
        </div>

        <div
          ref={textRef}
          className="overflow-hidden leading-[0.9] font-bold italic text-[#cfb1fb]
                     text-6xl text-color-[#111] sm:text-7xl md:text-8xl lg:text-[9rem] reddit-sans-text"
        >
          {"DO IT AGAIN".split("").map((char, i) => (
            <span key={i} className="char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objective;
