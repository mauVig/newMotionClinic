"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsData } from "@/data/GlobalData";
import { useStore } from "@/store/storeGlobal";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const { myLang } = useStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ============================================================
  // ScrollTrigger — entrada suave + cambio fondo body
  // ============================================================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // Cambio de fondo del Body (Efecto Inmersivo)
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: "#ffffff",
            duration: 0.7,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: "#000000",
            duration: 0.7,
            ease: "power2.out",
          }),
      });

      const title = container.querySelector("h2");
      const headers = itemRefs.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      });

      if (title) {
        tl.from(title, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (headers.length) {
        tl.from(
          headers,
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [myLang]);

  // ============================================================
  // Lógica de Animación de Acordeón
  // ============================================================
  
  const closeAccordion = (index: number) => {
    const content = contentRefs.current[index];
    const header = itemRefs.current[index];
    if (!content || !header) return;

    const title = header.querySelector("h3");
    const plus = header.querySelector(".skills-plus");

    gsap.to(content, {
      height: 0,
      opacity: 0,
      marginTop: 0,
      filter: "blur(4px)",
      duration: 0.4,
      ease: "power2.inOut",
    });

    if (title) gsap.to(title, { x: 0, color: "#111", duration: 0.3 });
    if (plus) gsap.to(plus, { rotation: 0, scale: 1, duration: 0.3 });
  };

  const openAccordion = (index: number) => {
    const content = contentRefs.current[index];
    const header = itemRefs.current[index];
    if (!content || !header) return;

    const title = header.querySelector("h3");
    const plus = header.querySelector(".skills-plus");

    // Cálculo de altura dinámica para GSAP
    content.style.height = "auto";
    const targetHeight = content.scrollHeight;
    content.style.height = "0px";

    gsap.to(content, {
      height: targetHeight,
      opacity: 1,
      marginTop: 16,
      filter: "blur(0px)",
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        content.style.height = "auto";
      },
    });

    const innerElements = content.querySelectorAll(".skills-inner");
    if (innerElements.length) {
      gsap.fromTo(
        innerElements,
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }

    if (title) gsap.to(title, { x: 8, color: "#111", duration: 0.35 });
    if (plus) gsap.to(plus, { rotation: 45, scale: 1.15, duration: 0.35 });
  };

  const handleToggle = (index: number) => {
    if (openIndex !== null && openIndex !== index) {
      closeAccordion(openIndex);
    }

    if (openIndex === index) {
      closeAccordion(index);
      setOpenIndex(null);
    } else {
      openAccordion(index);
      setOpenIndex(index);
    }
  };

  // ============================================================
  // Eventos de Hover (Feedback visual)
  // ============================================================
  const handleMouseEnter = (index: number) => {
    if (openIndex === index) return;
    const header = itemRefs.current[index];
    if (header) {
        gsap.to(header.querySelector("h3"), { x: 8, color: "#444", duration: 0.25 });
        gsap.to(header.querySelector(".skills-plus"), { scale: 1.1, duration: 0.25 });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (openIndex === index) return;
    const header = itemRefs.current[index];
    if (header) {
        gsap.to(header.querySelector("h3"), { x: 0, color: "#111", duration: 0.25 });
        gsap.to(header.querySelector(".skills-plus"), { scale: 1, duration: 0.25 });
    }
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="w-full flex justify-center bg-white py-[14vh] px-6 relative z-20"
    >
      <div className="w-full max-w-[950px] mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-20 text-[#111]">
          {myLang ? "Skills" : "Tratamientos"}
        </h2>

        <div className="space-y-20">
          {skillsData.map((skill, i) => {
            const titleText = typeof skill.title === "object" 
              ? (myLang ? skill.title.en : skill.title.es) 
              : skill.title;

            const descText = typeof skill.description === "object"
              ? (myLang ? skill.description.en : skill.description.es)
              : skill.description;

            return (
              <article 
                key={i} 
                className={i !== 0 ? "border-t border-black/10 pt-10" : ""}
              >
                {/* HEADER - Accesible y Semántico */}
                <div
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="flex justify-between items-center cursor-pointer group select-none"
                  onClick={() => handleToggle(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  role="button"
                  aria-expanded={openIndex === i}
                  tabIndex={0} // Permite navegar con el teclado
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#111] transition-all">
                    {titleText}
                  </h3>

                  <span className="skills-plus relative w-9 h-9 flex-shrink-0 transition-transform duration-300">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[2px] bg-black rounded-full" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-6 bg-black rounded-full" />
                  </span>
                </div>

                {/* CONTENT - Renderizado para SEO pero controlado por GSAP */}
                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }} // Estado inicial para evitar parpadeo
                >
                  <div className="pt-8 pb-4">
                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Imagen con Lazy Loading */}
                      <div className="skills-inner overflow-hidden rounded-3xl bg-white shadow-xl border border-black/5">
                        <img
                          src={skill.img}
                          alt={titleText}
                          loading="lazy"
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      {/* Texto - Google lo lee aquí perfectamente */}
                      <div className="skills-inner flex items-center">
                        {/* Añadimos un ID o una clase específica y nos aseguramos 
                            de que el contenido NO sea nulo antes de renderizar 
                        */}
                        {descText ? (
                          <div
                            itemProp="description"
                            className="text-[#111]/80 text-base sm:text-lg leading-8 tracking-wide content-rich-text"
                            dangerouslySetInnerHTML={{ __html: descText }}
                          />
                        ) : (
                          <div itemProp="description" className="hidden">
                            {/* Fallback para que la etiqueta exista siempre para el SEO */}
                            Cargando descripción de {titleText}...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;