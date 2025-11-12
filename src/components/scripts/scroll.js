// src/scripts/scroll.js
export function initGlobalScroll() {
  console.log("🌍 initGlobalScroll ejecutado");

  // Ejemplo: activar Lenis + ScrollTrigger global
  import("lenis").then(({ default: Lenis }) => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    console.log("✅ Lenis activo");
  });
}
