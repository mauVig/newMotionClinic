"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsData } from "@/data/GlobalData";
import { useStore } from "@/store/storeGlobal";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const { myLang } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // ============================================================
      // ✨ ENTRADA CINEMÁTICA DEL TÍTULO
      // ============================================================
      const title = container.querySelector("h2");

      if (title) {
        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 40, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // ============================================================
      // ✨ ENTRADA CINEMÁTICA DE CADA DROPDOWN (HEADER)
      // ============================================================
      const headers = itemRefs.current.filter(Boolean);

      if (headers.length > 0) {
        gsap.fromTo(
          headers,
          {
            autoAlpha: 0,
            y: 30,
            filter: "blur(14px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // ============================================================
      // 🟣 LÓGICA DE HOVER + ACCORDION COMO TENÍAS
      // ============================================================
      skillsData.forEach((_, i) => {
        const header = itemRefs.current[i];
        const content = contentRefs.current[i];
        const title = header?.querySelector("h3");
        const plus = header?.querySelector("svg");

        if (!header || !content || !title || !plus) return;

        header.addEventListener("mouseenter", () => {
          if (content.classList.contains("open")) return;
          gsap.to(title, {
            x: 36,
            color: "#a78bff",
            duration: 0.5,
            ease: "power3.out",
          });
        });

        header.addEventListener("mouseleave", () => {
          if (content.classList.contains("open")) return;
          gsap.to(title, {
            x: 0,
            color: "#666666",
            duration: 0.6,
            ease: "power3.out",
          });
        });

        header.addEventListener("click", () => {
          const isOpen = content.classList.contains("open");

          if (isOpen) {
            gsap.to(content, {
              height: 0,
              opacity: 0,
              marginTop: 0,
              duration: 1.1,
              ease: "power4.inOut",
              onComplete: () => {
                content.classList.remove("open");
                content.style.height = "0px";
                content.style.marginTop = "0px";
              },
            });

            gsap.to([title, plus], {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              color: "#666666",
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.05,
            });
          } else {
            content.classList.add("open");
            const targetHeight = content.scrollHeight;

            gsap.fromTo(
              content,
              { height: 0, opacity: 0, marginTop: 0 },
              {
                height: targetHeight,
                opacity: 1,
                marginTop: 96,
                duration: 1.3,
                ease: "power4.out",
                onComplete: () => (content.style.height = "auto"),
              }
            );

            gsap.to(title, {
              y: 36,
              x: 24,
              scale: 1.18,
              color: "#e8e8e8",
              duration: 1.2,
              ease: "power4.out",
            });

            gsap.to(plus, {
              rotation: 45,
              duration: 0.9,
              ease: "power3.out",
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [myLang]);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="bg-backBlack text-[#666666] px-6 py-40 relative z-10"
    >
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl mid:text-6xl xsm:text-7xl mb-40 text-[#cfb1fb] font-bold -ml-1">
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
                className={`${i !== 0 ? "border-t border-[#666666]/30 pt-20" : ""}`}
              >
                {/* HEADER */}
                <div
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="flex justify-between items-center cursor-pointer select-none group"
                >
                  <h3 className="text-lg mid:text-4xl font-bold will-change-transform origin-left">
                    {titleText}
                  </h3>

                  <svg
                    className="w-11 h-11 will-change-transform text-[#666666] group-hover:text-white/10 transition-colors duration-500"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="8" y1="20" x2="32" y2="20" strokeLinecap="round" />
                    <line x1="20" y1="8" x2="20" y2="32" strokeLinecap="round" />
                  </svg>
                </div>

                {/* CONTENT */}
                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="pt-24 pb-16">
                    <div className="grid xl:grid-cols-2 gap-20">
                      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl border border-white/5">
                        <img
                          src={skill.img}
                          alt={titleText}
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      <div className="flex items-center">
                        <p
                          className="text-[#e8e8e8]/95 text-base mid:text-xl leading-10 tracking-wider font-light"
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
