// src/scripts/globalScrollSections.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

let lenis;
let containerAnimation;

export function initGlobalScroll() {
  if ((window as any).__GLOBAL_SCROLL_INITED__) return;
  (window as any).__GLOBAL_SCROLL_INITED__ = true;

  // LENIS
  lenis = new Lenis({
    lerp: 0.07,
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ESPERAR A QUE TODO ESTÉ LISTO
  const start = () => {
    const container = document.getElementById("sections-container");
    if (!container) return;

    const panels = gsap.utils.toArray("#sections-container > *"); // cualquier hijo directo

    if (panels.length < 2) return;

    // ANIMACIÓN PRINCIPAL (el efecto "pegado" que quieres)
    containerAnimation = gsap.to(panels, {
      yPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.3, max: 0.7 },
          delay: 0,
        },
        end: () => `+=${container.offsetHeight * (panels.length - 1)}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        // PUNTITOS DE PROGRESO (si los tienes)
        onUpdate: (self) => {
          document.querySelectorAll(".progress-dot").forEach((dot, i) => {
            const target = i / (panels.length - 1);
            dot.classList.toggle("active", Math.abs(self.progress - target) < 0.1);
          });
        },
      },
    });

    // ScrollerProxy para Lenis + ScrollTrigger
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value, { immediate: true });
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: container.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.refresh();
  };

  if (window.__SITE_READY__) {
    start();
  } else {
    window.addEventListener("site:ready", start, { once: true });
  }

  // Fallback por si tarda mucho
  setTimeout(start, 4000);
}