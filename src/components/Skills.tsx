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
  // Hover header
  // ============================================================
  const handleMouseEnter = (index: number) => {
    if (openIndex === index) return;

    const header = itemRefs.current[index];
    if (!header) return;

    const title = header.querySelector("h3");
    const plus = header.querySelector(".skills-plus");

    if (title) {
      gsap.to(title, {
        x: 8,
        color: "#444",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (plus) {
      gsap.to(plus, {
        scale: 1.12,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (openIndex === index) return;

    const header = itemRefs.current[index];
    if (!header) return;

    const title = header.querySelector("h3");
    const plus = header.querySelector(".skills-plus");

    if (title) {
      gsap.to(title, {
        x: 0,
        color: "#111",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (plus) {
      gsap.to(plus, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  // ============================================================
  // Accordion open / close
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
      onComplete: () => {
        content.style.height = "0px";
      },
    });

    if (title) {
      gsap.to(title, {
        x: 0,
        color: "#111",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (plus) {
      gsap.to(plus, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const openAccordion = (index: number) => {
    const content = contentRefs.current[index];
    const header = itemRefs.current[index];
    if (!content || !header) return;

    const title = header.querySelector("h3");
    const plus = header.querySelector(".skills-plus");

    // medir altura real
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

    const inner = content.querySelectorAll(".skills-inner");
    if (inner.length) {
      gsap.fromTo(
        inner,
        { y: 10, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.06,
        }
      );
    }

    if (title) {
      gsap.to(title, {
        x: 8,
        color: "#111",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (plus) {
      gsap.to(plus, {
        rotation: 45,
        scale: 1.15,
        duration: 0.35,
        ease: "power2.out",
      });
    }
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
  // Render
  // ============================================================
  return (
    <section
      ref={containerRef}
      id="skills"
      className="
        w-full 
        flex justify-center
        bg-white 
        py-[14vh] 
        px-6
        relative z-20 
      "
    >
      <div className="w-full max-w-[950px] mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-20 text-[#111]">
          {myLang ? "Skills" : "Tratamientos"}
        </h2>

        <div className="space-y-20">
          {skillsData.map((skill, i) => {
            const titleText =
              typeof skill.title === "object"
                ? myLang
                  ? skill.title.en
                  : skill.title.es
                : skill.title;

            const descText =
              typeof skill.description === "object"
                ? myLang
                  ? skill.description.en
                  : skill.description.es
                : skill.description;

            return (
              <div
                key={i}
                className={i !== 0 ? "border-t border-black/10 pt-10" : ""}
              >
                {/* HEADER */}
                <div
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="
                    flex justify-between items-center 
                    cursor-pointer group select-none
                  "
                  onClick={() => handleToggle(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#111] transition-all">
                    {titleText}
                  </h3>

                  {/* ICONO + HECHO A MANO */}
                  <span
                    className="
                      skills-plus
                      relative
                      w-9 h-9 
                      flex-shrink-0
                      transition-transform duration-300
                    "
                  >
                    {/* barra horizontal */}
                    <span
                      className="
                        absolute 
                        left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        w-6 h-[2px]
                        bg-black 
                        rounded-full
                      "
                    />
                    {/* barra vertical */}
                    <span
                      className="
                        absolute 
                        left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        w-[2px] h-6
                        bg-black 
                        rounded-full
                      "
                    />
                  </span>
                </div>

                {/* CONTENT */}
                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="pt-8 pb-4">
                    <div className="grid md:grid-cols-2 gap-12">
                      {/* IMG */}
                      <div className="skills-inner overflow-hidden rounded-3xl bg-white shadow-xl border border-black/5">
                        <img
                          src={skill.img}
                          alt={titleText}
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      {/* TEXT */}
                      <div className="skills-inner flex items-center">
                        <p
                          className="
                            text-[#111]/80 
                            text-base sm:text-lg 
                            leading-8 
                            tracking-wide
                          "
                          dangerouslySetInnerHTML={{ __html: descText }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
