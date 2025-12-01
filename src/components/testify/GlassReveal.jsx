"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FractalGlassBackground from "../Welcome/FractalGlassBackground";

export default function GlassReveal({ imageSrc, onClose }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline();

    tl.to(el, {
      autoAlpha: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
    });

    tl.to(el, {
      autoAlpha: 0,
      scale: 1.1,
      duration: 1.2,
      delay: 2.5,
      ease: "power3.inOut",
      onComplete: onClose,
    });
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-[99999] pointer-events-none">
      <FractalGlassBackground imageSrc={imageSrc} />
    </div>
  );
}
