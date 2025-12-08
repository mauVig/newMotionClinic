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
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const info = infoRef.current;
    const map = mapRef.current;
    if (!section || !title || !info || !map) return;

  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

 
    tl.fromTo(
      section,
      {
        opacity: 0,
        y: 120,
        filter: "blur(30px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power4.out",
      }
    );

    // 2 — títulos
    tl.fromTo(
      title.children,
      {
        opacity: 0,
        y: 40,
        filter: "blur(18px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.12,
      },
      "-=1.1"
    );

    // 3 — mapa (clip reveal + zoom subtle)
    tl.fromTo(
      map,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        scale: 1.08,
        filter: "blur(26px)",
        y: 40,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.8,
        ease: "power4.out",
      },
      "-=0.9"
    );

    // 4 — respiración (micro parallax)
    gsap.to(map, {
      y: "+=6",
      duration: 3,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // 5 — dirección
    tl.fromTo(
      info.children,
      {
        opacity: 0,
        y: 20,
        filter: "blur(14px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.18,
      },
      "-=0.9"
    );


    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      const handleMove = (e: MouseEvent) => {
        const rect = map.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateY = ((x - midX) / midX) * 7; // inclinación horizontal
        const rotateX = ((y - midY) / midY) * -7; // inclinación vertical

        gsap.to(map, {
          rotateY,
          rotateX,
          transformPerspective: 800,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const resetTilt = () => {
        gsap.to(map, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };

      map.addEventListener("mousemove", handleMove);
      map.addEventListener("mouseleave", resetTilt);

      return () => {
        map.removeEventListener("mousemove", handleMove);
        map.removeEventListener("mouseleave", resetTilt);
      };
    }
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
      id='studio'
    >
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

        <div
          ref={mapRef}
          className="
            clinic-map
            relative 
            w-full 
            h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px]
            rounded-3xl overflow-hidden
            bg-[#1a1a1a]
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            will-change-transform
          "
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5261873764753!2d-58.43667917068962!3d-34.56555015989195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b97072cbb1%3A0xfec53bcc88faa676!2sMaure%201608%2C%20C1426CUD%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757915667649!5m2!1ses-419!2sar"
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
        </div>

        {/* DIRECCIÓN */}
        <div
          ref={infoRef}
          className="clinic-address flex flex-col gap-4"
        >
          <div style={{ paddingTop: "30px" }}>
            <p className="text-sm sm:text-base font-medium">Maure 1608</p>
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
            <span className="text-lg -translate-y-[1px]">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClinicTestify;
