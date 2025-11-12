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
      title: "Especialiacion médica",
      description:
        "Soy Andrés Anania, médico traumatólogo, subespecializado en las afeciones de la cadera y rodilla",
    },
    {
      index: "02",
      title: "Inovacion Médica",
      description:
        "Mi formación incluye un ",
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

        // 🔹 Crear pin + efecto de profundidad
        cards.forEach((card, index) => {
          // Pin de cada card (excepto la última)
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

          // Transición al pasar a la siguiente card
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

        // 🔹 Refrescar ScrollTrigger después del layout final
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }, container);
    }

    // ✅ Esperar carga completa antes de iniciar GSAP
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

    // 🔹 Limpieza local (no global)
    return () => {
      ctx?.revert(); // solo revierte lo creado dentro del context
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full bg-black overflow-hidden select-none"
    >
      {processCardsData.map((card, i) => (
        <div
          key={i}
          className="process-card relative w-full h-screen flex flex-col justify-center items-center text-center bg-[#f5f5f5] text-black px-6 transition-transform duration-300 will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          style={{ borderRadius: "1rem" }}
        >
          {/* número grande de fondo */}
          <div className="absolute top-6 left-6 text-black/10 font-extrabold text-[10vw] select-none leading-none">
            {card.index}
          </div>

          {/* contenido */}
          <div className="z-10 max-w-[700px]">
            <h2 className="uppercase text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] font-bold mb-4 tracking-tight">
              {card.title}
            </h2>
            <p className="text-[1rem] sm:text-[1.1rem] md:text-[1.25rem] text-gray-700 leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
