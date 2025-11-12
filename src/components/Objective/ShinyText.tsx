"use client";
import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

export const ShinyText = ({ className = "" }) => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const BASE_COLOR = "#a1a1a1"; // gris claro base
  const HIGHLIGHT_COLOR = "#cfb1fb"; // violeta brillante

  const getFullText = () =>
    myLang
      ? "Our goal is to help you regain your quality of life. We are here to help you continue doing what you love and keep trying to improve yourself. With years of experience and the most advanced techniques, we make sure that your surgery is a success and your recovery is as fast as possible."
      : "Nuestro objetivo es ayudarte a recuperar tu calidad de vida. Estamos acá para que sigas haciendo lo que más te gusta y sigas intentando superarte. Con años de experiencia y las técnicas más avanzadas, nos aseguramos que tu cirugía sea un éxito y tu recuperación sea lo más rápida posible.";

  const words = getFullText().split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const spans = wordsRef.current.filter(Boolean);
    if (!section || spans.length === 0) return;

    // 🔹 limpiar triggers previos ANTES de crear nuevos
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf(spans);

    // 🔹 estado inicial
    gsap.set(spans, {
      color: BASE_COLOR,
      opacity: 0.7,
      filter: "blur(0px)",
    });

    // 🔹 timeline del highlight suave
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.5,
        // markers: true,
      },
      defaults: { ease: "none" },
    });

    tl.to(spans, {
      color: HIGHLIGHT_COLOR,
      opacity: 1,
      stagger: { each: 0.05 },
      duration: 2,
    });

    // cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [myLang]); // 👈 se vuelve a correr cada vez que cambia el idioma

  return (
    <div
      ref={sectionRef}
      className={`inline-block text-center max-w-screen-lg ${className}`}
    >
      <p className="text-center block text-xl sm:text-2xl lg:text-4xl leading-relaxed font-light">
        {words.map((word, i) => (
          <Fragment key={`${myLang}-${i}`}>
            <span
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block transition-colors duration-300"
            >
              {word}
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </div>
  );
};

export default ShinyText;
