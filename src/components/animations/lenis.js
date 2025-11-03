import Lenis from '@studio-freight/lenis'

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.3,       // suavidad global
    smooth: true,
    smoothWheel: true,
    smoothTouch: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    lerp: 0.08,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}
