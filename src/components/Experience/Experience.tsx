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

  const calcYearsOfExperience = () => new Date().getFullYear() - 2004; // → +20 años

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const imgs = imgRefs.current;
    if (!section || !text || imgs.length === 0) return;

    const ctx = gsap.context(() => {
      // 🔹 Fade in del texto
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

      // 🔹 Texto fijo en el centro mientras scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: text,
        pinSpacing: true,
        scrub: true,
      });

      // 🔹 Movimiento de imágenes con scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
        },
      });

      imgs.forEach((img, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        tl.fromTo(
          img,
          { yPercent: dir * -60, opacity: i < 2 ? 1 : 0 },
          {
            yPercent: dir * 60,
            opacity: 1,
            ease: "power1.out",
          },
          i * 0.1
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full h-[300vh] overflow-hidden text-white"
    >
      {/* TEXTO CENTRAL */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6"
      >
        <h2
          className="font-extrabold uppercase tracking-tight leading-[0.9]
                     text-[clamp(2.5rem,10vw,8rem)]"
        >
          +{numberFlowValue}{" "}
          {myLang ? "Years of" : "Años de"} <br />
          <span className="text-[#4b64ff]">
            {myLang ? "Experience" : "Experiencia"}
          </span>
        </h2>

        <p className="mt-6 max-w-[520px] text-sm sm:text-base md:text-lg text-gray-300">
          {!myLang
            ? "Mi objetivo es lograr resultados funcionales, armónicos y personalizados, específicamente diseñados para cada paciente."
            : "My goal is to achieve functional, harmonious and personalized results, specifically designed for each patient."}
        </p>
      </div>

      {/* IMÁGENES FLOTANTES */}
      <div className="absolute inset-0 z-10">
        <img
          ref={(el) => el && (imgRefs.current[0] = el)}
          src="/img/clinic-cell.jpg"
          alt="surgery"
          className="absolute top-[10%] left-[15%] h-[22vh] w-auto rounded-lg object-cover opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[1] = el)}
          src="/img/clinic2-cell.jpg"
          alt="patient"
          className="absolute top-[20%] right-[15%] h-[25vh] w-auto rounded-lg object-cover opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[2] = el)}
          src="/img/clinic3-cell.jpg"
          alt="team"
          className="absolute bottom-[20%] left-[20%] h-[26vh] w-auto rounded-lg object-cover opacity-0"
        />
        <img
          ref={(el) => el && (imgRefs.current[3] = el)}
          src="/img/clinic4-cell.jpg"
          alt="operation"
          className="absolute bottom-[10%] right-[18%] h-[28vh] w-auto rounded-lg object-cover opacity-0"
        />
      </div>
    </section>
  );
};

export default Experience;
