import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(lenis) {
  // Sync Lenis & ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  // ✅ Text Reveal
  const split = new SplitType(".reveal", { types: "lines, words" });

  gsap.from(split.words, {
    opacity: 0,
    y: 30,
    duration: 1.2,
    stagger: 0.03,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".reveal",
      start: "top 90%",
    },
  });

  ScrollTrigger.refresh();
}
