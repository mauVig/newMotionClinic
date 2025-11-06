// src/scripts/scroll.js
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGlobalScroll() {
  const lenis = new Lenis({
    duration: 1.6,
    lerp: 0.1,
    smooth: true,
    wheelMultiplier: 0.8,
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update(); // 👈 sincroniza en el mismo frame
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ✅ cuando ScrollTrigger refresca, sincroniza también Lenis
  ScrollTrigger.addEventListener("refresh", () => lenis.update());
  ScrollTrigger.defaults({ anticipatePin: 1 }); // 👈 anticipa el pin suavemente

  console.log("✨ Lenis + ScrollTrigger running globally");
}
