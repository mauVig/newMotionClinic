"use client";
import React, { useRef, useState } from "react";
import { FaVolumeMute } from "react-icons/fa";
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.fromTo(
      circle,
      { clipPath: "circle(8% at 50% 65%)" },
      { clipPath: "circle(120% at 50% 65%)", ease: "expo.inOut", duration: 1 }
    );

    tl.to("#purpleOverlay", { opacity: 0, ease: "power2.out", duration: 0.7 }, 0.3);
    tl.to(container, { backgroundColor: "#ffffff", duration: 1 }, 0);

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* Circle reveal */}
      <div
        ref={clipElement}
        className="relative h-[100vh] w-full overflow-hidden"
        style={{ clipPath: "circle(10% at 50% 65%)" }}
      >
        <div id="purpleOverlay" className="absolute inset-0 bg-violet z-20" />

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
