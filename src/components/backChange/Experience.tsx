import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberFlow from "@number-flow/react";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const [numberFlowValue, setNumberFlowValue] = useState<number>(0);
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const { myLang } = useStore();

  // 👉 Calcular años de experiencia
  const calcYearsOfExperience = () => {
    const startYear = 2009;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  // 👉 Animaciones GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const imgs = imgRefs.current;
      if (!section || imgs.length === 0) return;

      // 🎞 Timeline de parallax suave
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2, // suavidad de movimiento
        },
      });

      // Alternar direcciones para efecto más cinematográfico
      imgs.forEach((img, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        tl.to(
          img,
          {
            yPercent: direction * 80, // cuánto se mueve
            ease: "power2.out",
          },
          0 // sincroniza todas
        );
      });

      // ✨ Detectar entrada y salida del viewport
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => setSectionVisible(true),
        onLeaveBack: () => setSectionVisible(false),
      });
    });

    return () => ctx.revert();
  }, []);

  // 👉 Efecto de número animado
  useEffect(() => {
    const yearsOfExperience = calcYearsOfExperience();
    if (sectionVisible) {
      setNumberFlowValue(yearsOfExperience);
    } else {
      setNumberFlowValue(0);
    }
  }, [sectionVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 text-grey relative overflow-hidden"
      id="experience"
    >
      <div className="relative max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-center text-center py-52">
          <div className="relative flex flex-col items-center z-20">
            <h2
              className="text-5xl mid:text-6xl sm:text-7xl md:text-8xl lx:text-9xl mb-4 font-bold"
              style={{ lineHeight: 0.82 }}
            >
              <NumberFlow
                value={numberFlowValue}
                transformTiming={{ duration: 2000, easing: "ease-in-out" }}
              />
              {myLang ? (
                <span>
                  {" "}
                  Years of <br />
                  experience
                </span>
              ) : (
                <span>
                  {" "}
                  Años de <br />
                  experiencia
                </span>
              )}
            </h2>

            <p className="block mt-4 max-w-[400px] text-[.7rem] xs:text-xs mid:text-xs lx:text-base">
              {!myLang
                ? "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente. Cada persona es única."
                : "We achieve functional and personalized results, specifically designed for each patient. Each person is unique."}
            </p>
          </div>
        </div>

        {/* 🌫️ Imágenes con movimiento cinematográfico */}
        <img
          ref={(el) => el && (imgRefs.current[0] = el)}
          src="/img/clinic-cell.jpg"
          alt=""
          className="h-28 mid:h-36 sm:h-52 lx:h-60 absolute top-0 right-5 lx:right-10"
        />
        <img
          ref={(el) => el && (imgRefs.current[1] = el)}
          src="/img/clinic2-cell.jpg"
          alt=""
          className="h-24 mid:h-36 sm:h-52 lx:h-60 absolute top-14 z-20"
        />
        <img
          ref={(el) => el && (imgRefs.current[2] = el)}
          src="/img/clinic3-cell.jpg"
          alt=""
          className="h-16 mid:h-24 sm:h-40 lx:h-48 absolute bottom-12 right-12 z-20"
        />
        <img
          ref={(el) => el && (imgRefs.current[3] = el)}
          src="/img/clinic4-cell.jpg"
          alt=""
          className="h-28 xl:h-60 sm:h-52 lx:h-72 absolute bottom-6"
        />
      </div>
    </section>
  );
};

export default Experience;
