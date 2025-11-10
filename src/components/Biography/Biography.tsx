"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/storeGlobal";
import ProcessCards from "./ProcessCards";

const Biography: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const perfectSurgeryRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);

  const START_COLOR = "#6e6e6ea4";
  const END_COLOR = "#cfb1fb";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.target.classList.contains("fade-element") ||
            entry.target.classList.contains("line-fade")
          ) {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
              entry.target.classList.remove("fade-out");
            } else {
              entry.target.classList.remove("fade-in");
              entry.target.classList.add("fade-out");
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      const fadeElements = sectionRef.current.querySelectorAll(
        ".fade-element, .line-fade"
      );
      fadeElements.forEach((element) => observer.observe(element));
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = perfectSurgeryRef.current;
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

  const getWordColor = (index: number, totalWords: number) => {
    const wordProgress = Math.max(
      0,
      Math.min(1, (scrollProgress * (totalWords + 5) - index) / 4)
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
      ref={sectionRef}
      className="w-full relative px-6 py-24 overflow-hidden z-30"
      style={{ backgroundColor: "#131313", color: "#e8e8e8" }}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="pb-32 xl:grid xl:grid-cols-2 relative">
          <div className="fade-element">
            <span
              className="block transform -translate-y-4 translate-x-1"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
            >
              {myLang ? "BIOGRAPHY" : "BIOGRAFÍA"}
            </span>
            <h1
              className="font-bold"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
            >
              Andrés Anania
            </h1>
          </div>

          <div>
            <main>

              <div className="mt-8">
                <ProcessCards />
              </div>
            </main>

            {/* --- Acreditaciones (mantiene tu diseño anterior) --- */}
            <div className="grid gap-y-4 grid-cols-2 mid:grid-cols-3 sm:gap-y-0 sm:grid-cols-5 mt-8 fade-element text-gl leading-5">
              <a
                href="https://aaot.org.ar/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center text-center transition-all duration-700 hover:scale-125"
              >
                <img
                  src="svg/acreditaciones-05.svg"
                  className="h-28 block mx-auto"
                  alt="aaot"
                />
                <p className="whitespace-pre-line">
                  {myLang
                    ? "Certified \n Member"
                    : "Miembro \n Certificado"}
                </p>
              </a>
              {/* ... resto de logos */}
            </div>
          </div>
        </div>

        {/* --- Segunda parte: texto con gradiente animado --- */}
        <div ref={perfectSurgeryRef} className="pt-8 xl:grid xl:grid-cols-2">
          <div className="fade-element">
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
            >
              {(() => {
                const titleText = myLang
                  ? "The Perfect Surgery"
                  : "La Cirugía Perfecta";
                const words = titleText.split(" ");
                const breakIndex = 2;

                return (
                  <>
                    {words.slice(0, breakIndex).map((word, index) => (
                      <span
                        key={index}
                        style={{ color: getWordColor(index, words.length) }}
                      >
                        {word}{" "}
                      </span>
                    ))}
                    <br />
                    {words.slice(breakIndex).map((word, index) => (
                      <span
                        key={index + breakIndex}
                        style={{
                          color: getWordColor(index + breakIndex, words.length),
                        }}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </>
                );
              })()}
            </h2>
          </div>
        </div>
      </div>

      <style>{`
        .fade-element {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 0.4s ease-out;
        }
        .fade-in {
          opacity: 1;
          transform: translateX(0);
        }
        .fade-out {
          opacity: 0;
          transform: translateX(-100px);
        }
      `}</style>
    </section>
  );
};

export default Biography;
