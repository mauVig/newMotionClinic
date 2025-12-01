"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CircleVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const ringBaseRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Radios responsive
  const radiusMobile = 120;
  const radiusDesktop = 180;
  const radius =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? radiusDesktop
      : radiusMobile;

  // PROGRESS RING
  useEffect(() => {
    const video = videoRef.current!;
    const progressCircle = progressRef.current!;

    const circumference = radius * 2 * Math.PI;

    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    const updateProgress = () => {
      if (!video.duration) return;

      const progress = video.currentTime / video.duration;
      const offset = circumference * (1 - progress);

      gsap.to(progressCircle, {
        strokeDashoffset: offset,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);
  }, [radius]);


  // PLAY / PAUSE ANIMATION WOW
  const togglePlay = () => {
    const video = videoRef.current!;
    const container = containerRef.current!;
    const ring = progressRef.current!;
    const ringBase = ringBaseRef.current!;

    const expandedHeight = window.innerWidth >= 1024 ? "80vh" : "60vh";

    if (video.paused) {
      video.play();
      setIsPlaying(true);

      // ✨ EXPAND TO FULL CINEMATIC
      gsap.to(container, {
        width: "100vw",
        height: expandedHeight,
        borderRadius: "24px",
        duration: 1.4,
        ease: "power3.inOut",
      });

      gsap.to(video, {
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        duration: 1.4,
        ease: "power3.inOut",
      });

      // ✨ ANILLO VIOLETA DESAPARECE (fade + scale out)
      gsap.to([ring, ringBase], {
        autoAlpha: 0,
        scale: 1.2,
        transformOrigin: "center center",
        duration: 0.7,
        ease: "power2.out",
      });

    } else {
      video.pause();
      setIsPlaying(false);

      // ✨ SHRINK BACK TO CIRCLE
      gsap.to(container, {
        width: window.innerWidth >= 1024 ? 420 : 280,
        height: window.innerWidth >= 1024 ? 420 : 280,
        borderRadius: "9999px",
        duration: 1.2,
        ease: "power3.inOut",
      });

      gsap.to(video, {
        width: window.innerWidth >= 1024 ? 360 : 250,
        height: window.innerWidth >= 1024 ? 360 : 250,
        borderRadius: "9999px",
        duration: 1.2,
        ease: "power3.inOut",
      });

      // ✨ ANILLO VIOLETA APARECE (fade + scale in)
      gsap.fromTo(
        [ring, ringBase],
        {
          autoAlpha: 0,
          scale: 0.8,
          transformOrigin: "center center",
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  };

  return (
    <section
      className="
        relative w-full min-h-[90vh]
        flex flex-col items-center justify-center
        
        overflow-hidden
      "
    >
      {/* CONTENEDOR ANIMABLE */}
      <div
        ref={containerRef}
        className="
          relative flex items-center justify-center
          w-[280px] h-[280px]
          md:w-[420px] md:h-[420px]
          rounded-full overflow-hidden
        "
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          src='/video/video.mp4'
          className="
            object-cover rounded-full
            w-[250px] h-[250px]
            md:w-[360px] md:h-[360px]
          "
          playsInline
          muted
        />

        {/* RING ANIMABLE */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 400"
        >
          <circle
            ref={ringBaseRef}
            cx="200"
            cy="200"
            r={radius}
            stroke="rgba(150,90,255,0.25)"
            strokeWidth="12"
            fill="none"
          />
          <circle
            ref={progressRef}
            cx="200"
            cy="200"
            r={radius}
            stroke="#A987FF"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* CONTROLES */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="
            px-6 py-3 rounded-full
            bg-[#1c1c1c] text-white text-lg
            border border-[#333]
            hover:bg-[#2a2a2a] transition
          "
        >
          {isPlaying ? "Minimize" : "Play"}
        </button>
      </div>
    </section>
  );
}
