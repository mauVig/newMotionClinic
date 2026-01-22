"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import FractalGlassBackground from "./FractalGlassBackground"; // ⬅️ nuevo import

export const Welcome = () => {
  const { myLang, loading } = useStore();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [bgImage, setBgImage] = useState<string>("");

  // 🔹 Elijo imagen según viewport y la precargo
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 1024;
    const src = isMobile ? "/img/welcome-cell.webp" : "/img/welcome.webp";
    setBgImage(src);

    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    const fallback = setTimeout(() => setImageLoaded(true), 2500);

    return () => clearTimeout(fallback);
  }, []);

  // 🔹 Cuando termina el loading global + imagen cargada, muestro contenido
  useEffect(() => {
    if (!loading && imageLoaded) setShowContent(true);
  }, [loading, imageLoaded]);

  // 🔹 Animación de líneas + botón (igual que antes)
  useEffect(() => {
    if (!showContent || !sectionRef.current) return;

    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default;

      const el = sectionRef.current;
      const lines = el.querySelectorAll(".line-wrapper span");
      const button = el.querySelector("a");

      gsap.set(lines, {
        yPercent: 100,
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
      });
      // El botón ya tiene su estado inicial en CSS, no necesita gsap.set

      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
        delay: 0.3,
      });

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.12,
      }).to(
        button,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
    })();
  }, [showContent]);

  // 🔹 Botón magnético (igual que antes)
  useEffect(() => {
    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap || gsapModule.default;

      const btn = document.querySelector(".magnetic");
      if (!btn) return;

      const easing = 0.15;
      let x = 0,
        y = 0,
        targetX = 0,
        targetY = 0;

      const handleMove = (e: MouseEvent) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        const distance = Math.sqrt(relX ** 2 + relY ** 2);
        const radius = rect.width * 0.8;
        const force = Math.max(0, 1 - distance / radius);

        targetX = relX * force;
        targetY = relY * force;
      };

      const handleLeave = () => {
        targetX = 0;
        targetY = 0;
      };

      const animate = () => {
        x += (targetX - x) * easing;
        y += (targetY - y) * easing;
        gsap.set(btn, { x, y });
      };

      gsap.ticker.add(animate);
      window.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
        gsap.ticker.remove(animate);
      };
    })();
  }, []);

  return (
    <section
      className="relative flex items-center justify-start w-full min-h-screen overflow-hidden px-[clamp(2rem,6vw,6rem)] bg-black"
      style={{
        color: "#e8e8e8",
      }}
    >
      {/* 🔵 Fondo fractal con Three.js */}
      <div className="absolute inset-0 z-[1]">
        {bgImage && <FractalGlassBackground imageSrc={bgImage} />}
      </div>

      {/* 🔹 Gradiente por encima del shader */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* 🔹 Contenido */}
      {showContent && (
        <header
          ref={sectionRef}
          className="content relative z-[3] text-left text-white max-w-[70rem]"
        >
        <h1 className="
  text-[clamp(1.8rem,6vw,6rem)]
  font-bold 
  leading-[1.15]
  tracking-[-0.02em]
  mb-[clamp(0.8rem,1.5vh,2rem)]
">

            {["The Perfect", "Surgery"].map((word, i) => (
              <div key={i} className="line-wrapper overflow-hidden block">
                <span className="inline-block">{word}</span>
              </div>
            ))}
          </h1>

          <div className="
            text-white/80 
            text-[clamp(0.85rem,1.4vw,1.4rem)]
            leading-[1.45]
            font-light
            max-w-[32rem]
            mb-[clamp(1.5rem,4vh,2.5rem)]
            mr-auto
          ">

            <div className="line-wrapper overflow-hidden">
              <span className="inline-block">
                {myLang
                  ? "A masterpiece of modern hip and"
                  : "Primer Centro Integral de Cirugía Robótica"}
              </span>
            </div>
            <div className="line-wrapper overflow-hidden">
              <span className="inline-block">
                {myLang
                  ? "knee surgery."
                  : "en Cadera y Rodilla de Argentina."}
              </span>
            </div>
          </div>

          <a
            href="/contacto"
            className="magnetic relative inline-flex items-center justify-center
                       px-[clamp(2.8rem,6vw,4rem)] py-[clamp(0.4rem,0.8vw,0.6rem)]
                       rounded-[0.7rem] font-semibold text-[clamp(1rem,1.4vw,1.2rem)]
                       uppercase tracking-wide text-white bg-transparent border border-[#a855f7]
                       overflow-hidden group
                       hover:bg-[#a855f7]/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
                       focus-visible:ring-2 focus-visible:ring-[#a855f7]/60
                       active:scale-[0.97]
                       opacity-0"
            style={{ 
              transform: 'translateY(20px) scale(0.8)',
              transition: 'box-shadow 0.3s ease, background-color 0.3s ease'
            }}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              {myLang ? "CONTACT" : "CONTACTO"}
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899]
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
                         rounded-[0.7rem]"
            />
          </a>
        </header>
      )}
    </section>
  );
};

export default Welcome;
