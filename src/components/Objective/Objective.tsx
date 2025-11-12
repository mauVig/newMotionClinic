import { useEffect, useRef } from "react";
import ShinyText from "./ShinyText.tsx";
import { useStore } from "@/store/storeGlobal.ts"; // <- si tu store guarda el idioma

const Objective = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore(); // 🔹 idioma reactivo

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: gsap.Context;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const textEl = textRef.current;
      if (!section || !textEl) return;

      const chars = textEl.querySelectorAll(".char");

      // limpiar triggers previos antes de reinicializar
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(chars);

      // estado inicial
      gsap.set(chars, { yPercent: 100, opacity: 0, filter: "blur(12px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom+=20% top",
          scrub: 1.6,
          pin: true,
          anticipatePin: 1.2,
          // markers: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: { each: 0.08 },
        duration: 2,
      }).to(
        textEl,
        {
          opacity: 0,
          filter: "blur(12px)",
          duration: 2.2,
          ease: "power2.inOut",
        },
        "+=0.5"
      );

      ctx = gsap.context(() => tl);
    })();

    return () => {
      ctx?.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [myLang]); // 👈 vuelve a correr al cambiar idioma

  return (
    <section
      ref={sectionRef}
      id="objective"
      className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#111] text-white will-change-transform"
    >
      <div className="absolute inset-0 bg-[#111] z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-24 sm:space-y-32 md:space-y-40">
        <div className="max-w-4xl mx-auto">
          <ShinyText />
        </div>

        <div
          ref={textRef}
          className="overflow-hidden leading-[0.9] font-bold italic text-[#cfb1fb]
                     text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] reddit-sans-text"
        >
          {("DO IT AGAIN" ).split("").map((char, i) => (
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
