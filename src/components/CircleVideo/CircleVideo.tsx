"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// CORRECTO: Registrar plugin solo en el cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CircleVideo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Doble check por si acaso
    if (typeof window === "undefined") return;
    if (!ScrollTrigger) return;

    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    // Estado inicial del círculo
    gsap.set(circle, {
      position: "fixed",        // ← fixed para que no se mueva con el scroll
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: "20vw",
      height: "20vw",
      minWidth: "240px",
      minHeight: "240px",
      borderRadius: "50%",
      overflow: "hidden",
      scale: 0.8,
      opacity: 1,
      zIndex: 50,
      pointerEvents: "none",
      transformOrigin: "center center",
    });

    // Timeline del círculo mágico
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        // markers: true,
      },
    });

    tl.to(circle, {
      scale: 8,
      width: "100vw",
      height: "100vw",
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* Círculo con video */}
      <div ref={circleRef} className="will-change-transform">
        <video
          src="/video/upscaled.video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: "translateZ(0)" }} // fuerza GPU
        />
      </div>

      {/* Overlay opcional para más drama */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />
    </section>
  );
};

export default CircleVideo;