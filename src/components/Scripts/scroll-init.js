import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initScrollSystem() {
  console.log("🚀 Global Scroll System Iniciado");

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
  });

  // Lenis → GSAP
  lenis.on("scroll", () => ScrollTrigger.update());

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // IMPORTANTÍSIMO
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return lenis;
}
