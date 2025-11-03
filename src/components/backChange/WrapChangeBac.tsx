"use client";
import React, { useRef, useState } from "react";
import Experience from "./Experience.tsx";
import Objective from "../objetiveText/Objective.tsx";
import { FaVolumeMute } from "react-icons/fa";

// ✅ GSAP imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WrapChangeBack = () => {
  const containerRef = useRef(null);
  const clipElement = useRef(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
useGSAP(() => {
  const circle = clipElement.current;
  const container = containerRef.current;

  // Timeline maestro para controlarlos juntos
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=250%",    // más scroll para más tiempo
      scrub: 2.2,       // suavidad CodeGrid
      pin: true,        // ✅ Fija la sección
      anticipatePin: 1,
    },
  });

  // 1) Circle expand lento
  tl.fromTo(
    circle,
    { clipPath: "circle(8% at 50% 65%)" },
    {
      clipPath: "circle(120% at 50% 65%)",
      ease: "expo.inOut",
      duration: 1, // duración relativa dentro del timeline
    }
  );

  // 2) Fade overlay
  tl.to(
    "#purpleOverlay",
    { opacity: 0, ease: "power2.out", duration: 0.7 },
    0.3 // se solapa un poco
  );

  // 3) Background転fade a blanco 💎
  tl.to(
    container,
    { backgroundColor: "#ffffff", ease: "linear", duration: 1 },
    0 // ocurre desde el inicio
  );

}, []);


  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">

      <Objective />
      <Experience />

      {/* Heading */}
      <h1 className="font-bold text-center my-28 text-[clamp(2rem,8vw,5rem)]">
        DR ANDRES <br className='mid:hidden' /> ANANIA
      </h1>

      {/* CIRCLE REVEAL */}
      <div
        ref={clipElement}
        className="relative h-[100vh] w-full overflow-hidden"
        style={{ clipPath: "circle(10% at 50% 65%)" }}
      >

        {/* Violet overlay */}
        <div
          id="purpleOverlay"
          className="absolute inset-0 bg-violet z-20"
        />

        {/* Video */}
        <video
          ref={videoRef}
          src="/video/AndresVideo.mp4"
          className="absolute top-1/2 left-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 object-cover"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          controls
        />
      </div>
    </section>
  );
};

export default WrapChangeBack;
