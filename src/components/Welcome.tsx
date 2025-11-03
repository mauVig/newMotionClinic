"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import st from "../style/nav.module.css";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
  const { myLang, loading } = useStore();

  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const img = new Image();
    img.src = isMobile ? "/img/welcome-cell.webp" : "/img/welcome.webp";
    if (bgRef.current) bgRef.current.style.backgroundImage = `url("${img.src}")`;
  }, []);


  useEffect(() => {
    if (loading) return;

 
    const splitter = new SplitType(titleRef.current as HTMLElement, {
      types: "words,chars",
    });

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.3 }
    )
      .from(
        splitter.chars,
        {
          opacity: 0,
          y: 60,
          duration: 1.15,
          stagger: 0.025,
        },
        "-=0.8"
      )
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.9,
        },
        "-=0.6"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 0.8,
        },
        "-=0.5"
      );

    ScrollTrigger.refresh();


    return () => {
      splitter.revert();
    };
  }, [loading]);

  useEffect(() => {
    gsap.to(bgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      <div
        ref={bgRef}
        className={`${st.back} absolute inset-0 w-full h-full bg-cover bg-center will-change-transform`}
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      />


      <div className="min-h-screen max-w-screen-2xl mx-auto relative px-6 text-grey flex items-end">
        <div
          ref={contentRef}
          className="absolute bottom-[30%] sm:bottom-[27%] md:bottom-[26%] lg:bottom-[25%] xl:bottom-[20%]"
        >
          <h2
            ref={titleRef}
            className="text-7xl mid:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.8] tracking-tight"
          >
            The perfect surgery
          </h2>

          <p
            ref={textRef}
            className="text-[.8rem] mid:text-[.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] mt-6 lg:mt-8 mb-8"
          >
            {myLang ? (
              <>
                A masterpiece of modern hip and <br /> knee surgery.
              </>
            ) : (
              <>
                Primer Centro Integral de Cirugía Robótica
                <br />
                en Cadera y Rodilla de Argentina.
              </>
            )}
          </p>

          <a
            ref={buttonRef}
            href="/contacto"
            className="px-8 sm:px-24 py-2 bg-grey text-black rounded-full text-lg md:text-2xl truncate buttom"
          >
            {myLang ? "Contact" : "Contacto"}
          </a>

          <style>{`
            .buttom {
              box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.45);
              transition: all 0.8s;
            }
            .buttom:hover {
              box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.3);
              background: #b1b1db;
            }
            .buttom:active {
              box-shadow: inset -2px 3px 6px 6px rgba(0, 0, 0, 0.45);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
