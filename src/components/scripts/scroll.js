import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export function initGlobalScroll() {
  const lenis = new Lenis({ smooth: true, lerp: 0.1 });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 🔹 Esperá a que todo se monte y recalculá
  window.addEventListener("load", () => {
    setTimeout(() => ScrollTrigger.refresh(), 500);
  });
}
