// src/components/CircleVideo.tsx
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

    gsap.set(circle, {
      scale: 2,
      borderRadius: "50%",
      width: "30vw",
      height: "30vw",
      xPercent: -50,
      yPercent: -50,
      top: "25%",
      left: "50%",
      clipPath: "circle(10% at 50% 50%)",
      backgroundColor: "transparent", // ⬅ fondo transparente
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "power2.out" },
    });

    tl.to(circle, {
      clipPath: "circle(75% at 50% 50%)",
      scale: 5.4,
      duration: 3,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] overflow-hidden bg-white text-black"
      id="circle-video-section"
    >
      {/* Círculo blanco con video dentro */}
      <div
        ref={circleRef}
        className="absolute flex items-center justify-center overflow-hidden z-10 shadow-2xl"
        style={{ willChange: "clip-path, transform" }}
      >
        <video
          src="/video/AndresVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      {/* Texto superpuesto
      <div className="absolute inset-0 flex items-center justify-center text-center z-20 pointer-events-none">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black mix-blend-difference">
          Healing in Motion
        </h2>
      </div> */}
    </section>
  );
};

export default CircleVideo;
