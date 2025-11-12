"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CircleVideo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    // Estado inicial
    gsap.set(circle, {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: "25vw",
      height: "25vw",
      borderRadius: "50%",
      overflow: "hidden",
      clipPath: "circle(10% at 50% 50%)",
      scale: 1,
      zIndex: 5,
    });

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // empieza cuando la sección entra desde abajo
        end: "bottom top",   // termina al salir
        scrub: 1.2,
        pin: true,           // 🔥 se mantiene fijo mientras crece
        anticipatePin: 1,
      },
    });

    tl.to(circle, {
      clipPath: "circle(100% at 50% 50%)",
      scale: 6,
      duration: 2,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="circle-video-section"
      className="relative h-[100vh] bg-[#111] flex items-center justify-center overflow-hidden"
    >
      {/* Círculo con video */}
      <div ref={circleRef}>
        <video
          src="/video/upscaled.video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default CircleVideo;

