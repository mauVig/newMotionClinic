"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal";
import ProcessCards from "./ProcessCards";

gsap.registerPlugin(ScrollTrigger);

const Biography: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore();

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;

    function init() {
      const section = sectionRef.current;
      const header = headerRef.current;
      if (!section || !header) return;
      if ((section as any).__bio_inited) return;
      (section as any).__bio_inited = true;

      ctx = gsap.context(() => {
        gsap.fromTo(
          header,
          { autoAlpha: 0, yPercent: 20, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          section,
          { backgroundColor: "#111" },
          {
            backgroundColor: "#111",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "center center",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          header.querySelectorAll("h2, p"),
          { color: "#ffffff" },
          {
            color: "#000000",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "center center",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, section);
    }

    if ((window as any).__SITE_READY__) {
      init();
    } else {
      const handler = () => init();
      window.addEventListener("site:ready", handler, { once: true });
      return () => window.removeEventListener("site:ready", handler);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
  ref={sectionRef}
  id="biography"
  className="relative w-full min-h-[140vh] bg-black text-white flex flex-col justify-center items-center px-6 py-24 overflow-hidden transition-colors duration-700"
>
  <div ref={headerRef} className="max-w-[800px] text-center pb-16">
    <p className={myLang ? "text-violet" : "text-[#5b25d4]"}>
      {myLang ? "Biography" : "Biografía"}
    </p>
    <h2
      className="uppercase font-bold tracking-tight leading-[0.95]
      text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem]
      text-white pb-10"
    >
      Andrés Anania
    </h2>
  </div>

  <ProcessCards />
</section>

  );
};

export default Biography;
