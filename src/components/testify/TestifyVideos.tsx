"use client";

import React, { useEffect, useRef, useState, Fragment } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/storeGlobal.ts";

export const TestifyVideos: React.FC = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);

  const START_COLOR = "#6e6e6ea4";
  const END_COLOR = "#cfb1fb";

  const words = (myLang
    ? "Stories that Inspire us"
    : "Conocé las historias que nos mueven"
  ).split(" ");

  /* ----------------------------------------------------
      🔥 1) ANIMACIÓN TÍTULO — NO DEPENDE DEL SCROLL
  ---------------------------------------------------- */
  useEffect(() => {
    if (!h2Ref.current) return;

    const el = h2Ref.current;
    const wordsSpan = el.querySelectorAll("span");

    gsap.set(wordsSpan, {
      autoAlpha: 0,
      y: 40,
      filter: "blur(12px)",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to(wordsSpan, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.08,
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
  }, []);

  /* ----------------------------------------------------
      🔥 2) ANIMACIÓN VIDEOS — REVEAL ÉPICO (SIN DOLLY)
  ---------------------------------------------------- */
  useEffect(() => {
    if (!videosRef.current) return;

    const vids = videosRef.current.querySelectorAll("iframe");

    gsap.set(vids, {
      autoAlpha: 0,
      y: 60,
      scale: 0.92,
      filter: "blur(14px)",
      clipPath: "inset(40% 0 40% 0)",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to(vids, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.25,
          });

          // 🔥 Se quitó el movimiento infinito.
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(videosRef.current);
  }, []);

  /* ----------------------------------------------------
      🔥 3) COLOR SHINY — TU EFECTO ORIGINAL
  ---------------------------------------------------- */
  useEffect(() => {
    const section = h2Ref.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let textProgress = 0;
      if (rect.top <= windowHeight * 0.7) {
        textProgress = Math.min(
          1,
          (windowHeight * 0.7 - rect.top) / (windowHeight * 0.6)
        );
      }

      setScrollProgress(Math.pow(textProgress, 0.9));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWordColor = (word: string, index: number) => {
    const wordProgress = Math.max(
      0,
      Math.min(1, (scrollProgress * (words.length + 5) - index) / 4)
    );

    if (wordProgress <= 0) return START_COLOR;
    if (wordProgress >= 1) return END_COLOR;

    const startRGB = { r: 110, g: 110, b: 110 };
    const endRGB = { r: 207, g: 177, b: 251 };

    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * wordProgress);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * wordProgress);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * wordProgress);

    const alpha = 0.64 + (1 - 0.64) * wordProgress;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section className="bg-backBlack p-4 relative z-10" id="testifyVideos">
      <div className="max-w-screen-2xl mx-auto xl:flex justify-between items-end mb-16 mt-8">
        
        {/* TITLE */}
        <h2
          ref={h2Ref}
          className="text-4xl mid:text-7xl text-violet font-bold leading-tight"
        >
          <span>
            {words.map((word, index) => (
              <Fragment key={index}>
                <span
                  className="inline-block"
                  style={{ color: getWordColor(word, index) }}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </span>
        </h2>

        {/* CTA */}
        <a
          href="https://www.youtube.com/@Motion.Clinic"
          target="_blank"
          className="flex justify-start xl:justify-end group mt-16 text-[.60rem] xs:text-xs mid:text-base"
        >
          <button
            type="submit"
            className="border-2 border-violet text-grey py-1 px-8 rounded-l-3xl 
              group-hover:rounded-r-full group-hover:rounded-l-full 
              transition-all duration-1000"
          >
            Mirá todas nuestras historias acá
          </button>
          <div className="h-full ml-0.5">
            <div
              className="bg-violet flex justify-center items-center rounded-r-3xl 
                group-hover:rounded-r-full group-hover:rounded-l-full 
                p-3 transition-all duration-1000"
            >
              <img src="/svg/rightArrow-07.svg" alt="Arrow" className="h-4 w-4" />
            </div>
          </div>
        </a>
      </div>

      {/* VIDEOS */}
      <div
        ref={videosRef}
        className="flex flex-col md:flex-row justify-center items-center gap-y-4"
      >
        <iframe
          src="https://www.youtube.com/embed/omRTk4AG_yE"
          title="YouTube video"
          className="w-full xl:w-1/2 h-[700px]"
          allowFullScreen
        ></iframe>

        <iframe
          src="https://www.youtube.com/embed/JhfeY0h7D9M"
          title="YouTube video"
          className="w-full xl:w-1/2 h-[700px]"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default TestifyVideos;
