import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initIntroStage(lenis) {
  const stage = document.querySelector("#intro-stage");
  if (!stage) return;
ScrollTrigger.create({
  trigger: stage,
  start: "top top",
  end: "+=" + window.innerHeight * 2.2,
  pin: true,
  scrub: 1.4,
});

}
