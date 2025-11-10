import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "./ShinyText.tsx";

gsap.registerPlugin(ScrollTrigger);

const Objective = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const chars = textEl.querySelectorAll(".char");

    // 🔧 Estado inicial: ocultar todas las letras
    gsap.set(chars, {
      yPercent: 100,
      opacity: 0,
      filter: "blur(8px)",
    });

    // 🎬 Timeline con scroll pinneado suave
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%", // duración del pin
        scrub: 2.0, // suaviza la respuesta (lerp)
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power3.out" },
    });

    // ✨ Animación principal: aparición letra por letra
    tl.to(chars, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.08,
        ease: "power2.out",
      },
      duration: 1.8,
    });

    // 🌙 Fade out suave al terminar el pin
    tl.to(chars, {
      opacity: 0.25,
      yPercent: -10,
      duration: 1.4,
      ease: "power2.inOut",
      stagger: { each: 0.04 },
    });

    // 🧹 Limpieza
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal-section"
      className="
        relative 
        min-h-[150vh] 
        flex 
        flex-col 
        items-center 
        justify-center  /* 👈 centra todo verticalmente */
        text-grey 
        px-4 
        overflow-hidden
      "
    >
      {/* Contenedor del bloque fijo */}
      <div className="flex flex-col items-center justify-center text-center space-y-24 sm:space-y-32 md:space-y-40">
        {/* Texto brillante arriba */}
        <div className="max-w-4xl mx-auto">
          <ShinyText disabled={false} speed={1.5} />
        </div>

        {/* Texto principal DO IT AGAIN */}
        <div
          ref={textRef}
          className="
            overflow-hidden 
            leading-[0.9] 
            font-bold 
            text-purple 
            text-6xl 
            sm:text-7xl 
            md:text-8xl 
            lg:text-[9rem] 
            reddit-sans-text
          "
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
