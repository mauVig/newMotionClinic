"use client";
import { useEffect, useRef } from "react";
import ShinyText from "./ShinyText.tsx";

const Objective = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

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

      const chars = textEl.querySelectorAll(".char-inner");

      gsap.set(chars, {
        yPercent: 110,
        opacity: 0,
        filter: "blur(12px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.06,
        duration: 1.6,
      });

      tl.to(chars, {
        yPercent: -40,
        opacity: 0.2,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.04,
      });

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
      className="
        relative min-h-[120vh] flex flex-col items-center justify-center px-4
       bg-[#111] text-white will-change-transform
      "
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-32 md:space-y-40">
        <div className="max-w-4xl mx-auto">
          <ShinyText disabled={false} speed={1.5} />
        </div>

        <div
          ref={textRef}
          className="
            leading-[1.05]
            font-bold italic
            text-white
            reddit-sans-text
            max-w-[92vw] mx-auto
            pr-[0.35em]
            text-5xl tracking-[-0.02em]
            sm:text-4xl sm:tracking-tight
            md:text-7xl
            lg:text-[9rem]
            pb-32 pt-20
            will-change-transform
          "
        >
          {"DO IT AGAIN".split("").map((char, i) => (
<span key={i} className="char inline-block will-change-transform">
  <span className="char-inner inline-block will-change-transform">

                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objective;
