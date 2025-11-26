"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

const ClinicTestify = () => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const info = infoRef.current;
    if (!section || !title || !info) return;

    gsap.fromTo(
      [title, info],
      {
        autoAlpha: 0,
        y: 40,
        filter: "blur(14px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full 
        flex flex-col items-center
        bg-[#111]
        text-white
        py-[12vh]
      "
    >
      {/* MISMO ANCHO QUE SLIDETESTIFY */}
      <div className="w-full max-w-[950px] flex flex-col gap-8">

        {/* HEADER */}
        <div ref={titleRef} className="flex flex-col gap-2">
          <p className="text-sm tracking-[0.22em] text-white/60 uppercase">
            Motion Clinic
          </p>

          <h2
            className="
              text-3xl sm:text-4xl md:text-5xl 
              font-bold tracking-tight leading-[0.9]
            "
          >
            {myLang ? "Location" : "Ubicación"}
          </h2>
        </div>

        {/* MAP + DIRECCIÓN */}
        <div ref={infoRef} className="flex flex-col gap-4">
          {/* MAPA — MISMOS PROPORCIONES QUE EL SLIDER */}
          <div
            className="
              relative 
              w-full 
              h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px]
              rounded-3xl overflow-hidden
              bg-[#1a1a1a]
              border border-white/10
              shadow-[0_10px_40px_rgba(0,0,0,0.45)]
              backdrop-blur-xl
            "
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5261873764753!2d-58.43667917068962!3d-34.56555015989195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b97072cbb1%3A0xfec53bcc88faa676!2sMaure%201608%2C%20C1426CUD%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757915667649!5m2!1ses-419!2sar"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          {/* INFO DE DIRECCIÓN */}
          <div
            className="
              flex flex-col sm:flex-row 
              items-start sm:items-center 
              justify-between
              gap-4
            "
          >
            <div>
              <p className="text-sm sm:text-base font-medium">
                Maure 1608
              </p>
              <p className="text-xs sm:text-sm text-white/60">
                C1426CUD · Ciudad Autónoma de Buenos Aires · Argentina
              </p>
            </div>

            <a
              href="https://www.google.com/maps/place/Maure+1608,+C1426CUD+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/"
              target="_blank"
              className="
                text-xs sm:text-sm 
                tracking-[0.18em] 
                uppercase 
                text-white/60 
                hover:text-white
                flex items-center gap-2
              "
            >
              <span>{myLang ? "Open in Google Maps" : "Abrir en Google Maps"}</span>
              <span className="text-lg translate-y-[-1px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicTestify;
