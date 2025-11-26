"use client";

import { useEffect, useRef } from "react";

export default function CircleVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      // Dynamic import (Astro safe)
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger ||
        scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const circle = circleRef.current;

      if (!section || !circle) return;

      // Inicialmente el círculo es más chico
      gsap.set(circle, {
        scale: 0.3,
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // El círculo crece solo hasta ocupación total, sin deformarse
      tl.to(circle, {
        scale: 4, // NO lo hago gigante: 4x = full-screen circle responsive
        duration: 2.2,
        ease: "power2.out",
      });
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative 
        h-screen 
        flex items-center justify-center
        bg-[#111]
        overflow-hidden
      "
    >
      {/* CONTENEDOR CIRCULAR */}
      <div
        ref={circleRef}
        className="
          relative
          w-[300px] h-[300px] 
          md:w-[380px] md:h-[380px]
          rounded-full 
          overflow-hidden
          shadow-[0_0_80px_rgba(91,91,196,0.4)]
          will-change-transform
        "
      >
        {/* VIDEO ADENTRO DEL CÍRCULO */}
        <video
          ref={videoRef}
          src="/video/video.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
