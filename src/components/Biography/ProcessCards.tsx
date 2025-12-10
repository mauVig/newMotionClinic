"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const processCardsData = [
    {
      index: "01",
      title: "Especialiación médica",
      description:
        "Soy Andrés Anania, médico traumatólogo, subespecializado en las afeciones de la cadera y rodilla",
    },
    {
      index: "02",
      title: "Inovación Médica",
      description:
        "Mi formación incluye un AVP Fellowship  en el Hospital for Special Surgery en Nueva York, un MBA en el IAE Buisness School, y programas ejecutivos en Hardbard Buisness School y Stanford sobre transformación digital e inteligencia artificial aplicados a la salud ",
    },
    {
      index: "03",
      title: "Compromiso con el paciente",
      description:
        "Trabajamos en la intersección entre diseño y técnica. Cada detalle se resuelve con precisión, coherencia y cuidado material.",
    },
    {
      index: "04",
      title: "Formación Académica",
      description:
        "Creemos en una arquitectura atemporal, humana y sostenible. Nuestro objetivo es crear espacios que trasciendan y generen valor duradero.",
    },
  ];

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;

    function initAnimations() {
      const container = rootRef.current;
      if (!container) return;

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".process-card");
        if (!cards.length) return;

        cards.forEach((card, index) => {

          if (index < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: cards[cards.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
              id: `pin-${index}`,
            });
          }

 
          if (index < cards.length - 1) {
            ScrollTrigger.create({
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                const scale = 1 - progress * 0.25;
                const rotation = (index % 2 === 0 ? 4 : -4) * progress;
                const opacity = 1 - progress * 0.5;
                const blur = progress * 5;

                gsap.set(card, {
                  scale,
                  rotation,
                  opacity,
                  filter: `blur(${blur}px)`,
                });
              },
            });
          }
        });


        setTimeout(() => ScrollTrigger.refresh(), 300);
      }, container);
    }


    const safeInit = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initAnimations();
        });
      });
    };

    if (document.readyState === "complete") {
      safeInit();
    } else {
      window.addEventListener("load", safeInit, { once: true });
    }


    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden select-none"
    >
    {processCardsData.map((card, i) => (
  <div
    key={i}
    className="
      process-card relative w-full h-screen 
      flex flex-col justify-center items-center 
      px-8 md:px-14 
      bg-[#151515] 
      text-white 
      rounded-[2rem]
      shadow-[0_20px_60px_rgba(0,0,0,0.4)]
      overflow-hidden
    "
  >
  
    <div
      className="
        absolute top-10 left-10 
        text-[#5b5bc4]
        font-extrabold 
        opacity-[1]
        text-[22vw]
        leading-none 
        select-none
        pointer-events-none
      "
    >
      {card.index}
    </div>

    <div className="mb-10 flex items-center justify-center">
      <div
        className="
          w-20 h-20 md:w-24 md:h-24 
          flex items-center justify-center
          bg-[#5b5bc41a]
          border border-[#5b5bc440]
          rounded-2xl shadow-[0_4px_16px_rgba(91,91,196,0.35)]
          backdrop-blur-md
        "
      >
        <img
          src={`/svg/icon-${i + 1}.svg`}
          className="w-10 h-10 opacity-90"
        />
      </div>
    </div>

 
    <div className="z-10 max-w-[700px] text-center">
      <h2
        className="
          text-white 
          font-semibold 
           text-[#d6bcfc]
          uppercase 
          tracking-tight
          text-[1.8rem] sm:text-[2.3rem] md:text-[2.8rem]
          mb-5
        "
      >
        {card.title}
      </h2>

      <p
        className="
          text-[#e2dfff] 
          font-light 
          leading-relaxed
          text-[1rem] sm:text-[1.15rem] md:text-[1.25rem]
          opacity-85
        "
      >
        {card.description}
      </p>
    </div>
  </div>
))}

    </div>
  );
};

export default ProcessCards;
