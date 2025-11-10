import { useEffect, useRef } from "react";
import ShinyText from "./ShinyText.tsx";

const Objective = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🚫 No ejecutar en SSR
    if (typeof window === "undefined") return;

    // ✅ Cargar GSAP de forma dinámica compatible con SSR
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, ScrollTriggerModule]) => {
      // Esto asegura compatibilidad con cualquier empaquetador
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      const ScrollTrigger =
        ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

      // Registrar plugin correctamente
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const textEl = textRef.current;
      if (!section || !textEl) return;

      const chars = textEl.querySelectorAll(".char");

      // Estado inicial
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
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: { each: 0.08, ease: "power2.out" },
        duration: 1.8,
      });

      tl.to(chars, {
        opacity: 0.25,
        yPercent: -10,
        duration: 1.4,
        ease: "power2.inOut",
        stagger: { each: 0.04 },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal-section"
      className="relative min-h-[100vh] flex flex-col items-center justify-center text-grey px-4 overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-24 sm:space-y-32 md:space-y-40">
        <div className="max-w-4xl mx-auto">
          <ShinyText disabled={false} speed={1.5} />
        </div>

       <div
  ref={textRef}
  className="overflow-hidden leading-[0.9] font-bold italic text-purple text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] reddit-sans-text"
>
  {"DO IT AGAIN.".split("").map((char, i) => (
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
