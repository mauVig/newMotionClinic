"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CircleVideo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;

    if (!section || !circle) return;

    // ----------------------------
    // ESTADO INICIAL — FIXED SIEMPRE
    // ----------------------------
    gsap.set(circle, {
      position: "fixed",      // 🔥 CLAVE: SIEMPRE FIJO EN VIEWPORT
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: "22vw",
      height: "22vw",
      minWidth: "200px",
      minHeight: "200px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      scale: 0.8,
      zIndex: 50,
      pointerEvents: "none",
    });

    // ----------------------------
    // PIN + ANIMACIÓN SUAVE
    // ----------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom+=160% top",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      }
    })
    .to(circle, {
      scale: 6.5,
      backgroundColor: "#000",
      ease: "power3.inOut",
      duration: 1.6,
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative 
        w-full 
        h-[260vh]  
        bg-[#111]
        overflow-hidden
      "
    >
      <div ref={circleRef} className="will-change-transform"></div>
    </section>
  );
};

export default CircleVideo;
