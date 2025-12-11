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

  useEffect(() => {
    if (!h2Ref.current) return;
    const el = h2Ref.current;
    const wordsSpan = el.querySelectorAll("span");
    gsap.set(wordsSpan, { autoAlpha: 0, y: 40, filter: "blur(12px)" });

    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          gsap.to(wordsSpan, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.08
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
  }, []);

  useEffect(() => {
    if (!videosRef.current) return;

    const vids = videosRef.current.querySelectorAll(".video-box");

    gsap.set(vids, {
      autoAlpha: 0,
      y: 60,
      scale: 0.92,
      filter: "blur(14px)",
      clipPath: "inset(40% 0 40% 0)"
    });

    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          gsap.to(vids, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.25
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(videosRef.current);
  }, []);

  useEffect(() => {
    const section = h2Ref.current;
    if (!section) return;

    const onScroll = () => {
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

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
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
    <section 
      id="testifyVideos"
      className="relative flex flex-col items-center w-full text-white pt-24 pb-28 bg-backBlack"
    >
      <div className="w-full max-w-[950px] px-4 mx-auto">
        
        <h2
          ref={h2Ref}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.7rem]
          font-semibold tracking-tight leading-tight mb-10"
        >
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
        </h2>

        <a
          href="https://www.youtube.com/@Motion.Clinic"
          target="_blank"
          className="inline-flex group text-xs sm:text-sm md:text-base mb-16"
        >
          <button
            type="submit"
            className={`
              border border-violet text-grey py-2 px-6 rounded-l-3xl
              group-hover:rounded-full transition-all duration-500
              ${!myLang ? "w-[320px]" : ""}
            `}
          >
            {myLang ? "See all our stories here" : "Mirá todas nuestras historias acá"}
          </button>

          <div className="ml-1">
            <div
              className="
                bg-violet h-full flex items-center justify-center rounded-r-3xl
                p-3 group-hover:rounded-full transition-all duration-500
              "
            >
              <img src="/svg/rightArrow-07.svg" alt="Arrow" className="h-4 w-4" />
            </div>
          </div>
        </a>

        <div
          ref={videosRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="video-box rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/omRTk4AG_yE"
              title="Video 1"
              className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-box rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/JhfeY0h7D9M"
              title="Video 2"
              className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover"
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestifyVideos;
