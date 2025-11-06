// src/scripts/scroll.js
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGlobalScroll() {
  // Inicializar Lenis
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1, // suavidad
    wheelMultiplier: 1,
  });

  // Loop de animación
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sincronizar con ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Debug opcional
  window.lenis = lenis;
  console.log("✨ Lenis + GSAP ScrollTrigger activos");
}
