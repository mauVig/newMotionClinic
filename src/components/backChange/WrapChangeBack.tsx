import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "./Experience.tsx";
import Objective from "../objetiveText/Objective.tsx";
import CircleVideo from "../objetiveText/CircleVideo";
import { FaVolumeMute } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const WrapChangeBack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showMuteIcon, setShowMuteIcon] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ---- SCROLL GRADIENT BACKGROUND ----
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start with initial gradient
    gsap.set(container, {
      background: "linear-gradient(to bottom, #131313 0%, #333333 50%, #ffffff 100%)",
    });

    // Animate gradient stops over scroll
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
      background: "linear-gradient(to bottom, #e0e0e0 0%, #f5f5f5 50%, #ffffff 100%)",
      ease: "none",
    });
  }, []);

  // ---- MOUSE INTERACTION ----
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (showMuteIcon && window.innerWidth > 768) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [showMuteIcon]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative transition-colors duration-700 ease-out overflow-hidden"
    >
      {/* Top gradient fade (for smooth transition with previous section) */}
      <div className="absolute -top-[149px] left-0 right-0 h-[150px] bg-gradient-to-t from-[#131313] to-transparent -mb-1 pointer-events-none" />

      <Objective />
      <Experience />
      <CircleVideo />

      <h1 className="font-bold text-center mt-28 text-[#1a1a1a] text-[clamp(1.2rem,3vw,2rem)] md:text-[clamp(3rem,8vw,4.5rem)]">
        DR ANDRES <br className="mid:hidden" /> ANANIA
      </h1>
    </section>
  );
};

export default WrapChangeBack;
