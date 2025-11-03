"use client";
import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

const ShinySection = () => {
  const { myLang } = useStore();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const text = myLang
    ? "Our goal is to help you regain your quality of life. We help you continue doing what you love, improving yourself every day..."
    : "Nuestro objetivo es ayudarte a recuperar tu calidad de vida. Estamos acá para que sigas haciendo lo que amás y sigas superándote...";

  const words = text.split(" ");

  useEffect(() => {
    const spans = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      spans,
      { color: "rgba(110,110,110,0.25)" },
      {
        color: "#cfb1fb",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=120% top",
          pin: true,
          scrub: 1.2, // hace el lerp suave
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center text-center px-8"
    >
      <p
        ref={textRef}
        className="max-w-3xl text-2xl md:text-4xl font-light leading-tight"
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span>{w}</span>{" "}
          </Fragment>
        ))}
      </p>
    </section>
  );
};

export default ShinySection;
