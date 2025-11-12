"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ShinyText = ({ className = "" }) => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const getText = () =>
    myLang
      ? "Our goal is to help you regain your quality of life. We are here to help you continue doing what you love and keep trying to improve yourself. With years of experience and the most advanced techniques, we make sure that your surgery is a success and your recovery is as fast as possible."
      : "Nuestro objetivo es ayudarte a recuperar tu calidad de vida. Estamos acá para que sigas haciendo lo que más te gusta y sigas intentando superarte. Con años de experiencia y las técnicas más avanzadas, nos aseguramos que tu cirugía sea un éxito y tu recuperación sea lo más rápida posible.";

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: gsap.Context;

    (async () => {
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      const section = sectionRef.current;
      const textEl = textRef.current;
      if (!section || !textEl) return;

      ctx = gsap.context(() => {
        // limpiar splits previos
        ScrollTrigger.getAll().forEach((st) => st.kill());
        const split = new SplitText(textEl, { type: "lines" });

        split.lines.forEach((line) => {
          gsap.set(line, {
            backgroundImage: `linear-gradient(to right, #ffffff 50%, #444 50%)`,
            backgroundSize: "200% 100%",
            backgroundPositionX: "100%",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          });

          gsap.to(line, {
            backgroundPositionX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top center",
              end: "bottom center",
              scrub: 2.6,
              // markers: true,
            },
          });
        });
      }, section);
    })();

    return () => ctx?.revert();
  }, [myLang]);

  return (
    <div
      ref={sectionRef}
      className={`max-w-screen-lg mx-auto text-center ${className}`}
    >
      <h1
        ref={textRef}
        className="text-xl sm:text-2xl lg:text-4xl leading-relaxed font-light whitespace-pre-line"
      >
        {getText()}
      </h1>
    </div>
  );
};

export default ShinyText;
