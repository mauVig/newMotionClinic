import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberFlow from "@number-flow/react";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const { myLang } = useStore();
  const [numberFlowValue, setNumberFlowValue] = useState(0);

  const calcYearsOfExperience = () => new Date().getFullYear() - 2009;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const imgs = imgRefs.current;
    if (!section || !text || imgs.length === 0) return;

    const ctx = gsap.context(() => {
      // 🔹 Aparece el texto con fade/slide
      gsap.fromTo(
        text,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          onStart: () => setNumberFlowValue(calcYearsOfExperience()),
        }
      );

      // 🔹 Mantener el texto fijo mientras se mueven las imágenes
    ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom top", // cuando la sección termina, se libera el pin
  pin: text,
  pinSpacing: false, // evita agregar espacio extra
  scrub: true,
});


      // 🔹 Timeline de imágenes en movimiento (por detrás)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
        },
      });

      imgs.forEach((img, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        tl.fromTo(
          img,
          { yPercent: dir * -40, opacity: 0 },
          {
            yPercent: dir * 40,
            opacity: 1,
            ease: "none",
          },
          0
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full h-[300vh] overflow-hidden bg-[#f8f8f8]"
    >
      {/* 🩶 Texto fijo y centrado */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6"
      >
        <h2
          className="text-5xl mid:text-6xl sm:text-7xl md:text-8xl lx:text-9xl font-bold text-[#222]"
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

        <p className="mt-6 max-w-[420px] text-xs sm:text-sm mid:text-base text-[#444]">
          {!myLang
            ? "Logramos resultados funcionales y personalizados, específicamente diseñados para cada paciente. Cada persona es única."
            : "We achieve functional and personalized results, specifically designed for each patient. Each person is unique."}
        </p>
      </div>

      {/* 🌫️ Imágenes que se mueven detrás */}
      <div className="absolute inset-0 z-10">
        <img
          ref={(el) => el && (imgRefs.current[0] = el)}
          src="/img/clinic-cell.jpg"
          alt=""
          className="absolute top-10 right-10 h-32 sm:h-52 opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[1] = el)}
          src="/img/clinic2-cell.jpg"
          alt=""
          className="absolute top-20 left-10 h-36 sm:h-56 opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[2] = el)}
          src="/img/clinic3-cell.jpg"
          alt=""
          className="absolute bottom-24 right-16 h-28 sm:h-48 opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[3] = el)}
          src="/img/clinic4-cell.jpg"
          alt=""
          className="absolute bottom-10 left-12 h-36 sm:h-60 opacity-0"
        />
      </div>
    </section>
  );
};

export default Experience;
