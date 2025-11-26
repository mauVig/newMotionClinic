"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/storeGlobal.ts";

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
  let ctx: gsap.Context | null = null;

  (async () => {
    const gsapModule = await import("gsap");
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    const splitTextModule = await import("gsap/SplitText");

    const gsap = gsapModule.gsap || gsapModule.default;
    const ScrollTrigger =
      scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
    const SplitText =
      splitTextModule.SplitText || splitTextModule.default;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    
    const split = new SplitText(textEl, { type: "lines" });

    split.lines.forEach((line: HTMLElement) => {
      gsap.set(line, {
       backgroundImage: "linear-gradient(to right, #ffffff 50%, #444 50%)",

        backgroundSize: "200% 100%",
        backgroundPositionX: "100%",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
      });
    });


    ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",      
          end: "bottom 25%",    
          scrub: 10,           
          // markers: true,
        },
      }).to(split.lines, {
        backgroundPositionX: 0,
        ease: "none",
        stagger: {
          each: 1.3,            
          from: "start",
        },
      });
    });
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
  className="
    text-lg 
    sm:text-xl 
    lg:text-2xl 
    leading-relaxed 
    font-light 
    whitespace-pre-line
    max-w-[680px] 
    mx-auto 
    text-center
  "
>

        {getText()}
      </h1>
    </div>
  );
};

export default ShinyText;
