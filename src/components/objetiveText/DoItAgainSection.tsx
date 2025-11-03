"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DoItAgainSection = () => {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(titleRef.current, { types: "chars" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 2,
       stagger: {
  each: 0.05,       // velocidad entre letras
  from: "start",    // puede ser 'center' para efecto onda
  ease: "power3.out",
},
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom+=120% top",
          pin: true,
          pinSpacing: false,

          scrub: 2.2,
ease: "expo.inOut",

        },
      }
    );

    return () => split.revert();
  }, []);

  return (
  <section
  ref={wrapperRef}
  className="min-h-screen flex items-start justify-center pt-[20vh]" // 👈 Lo bajamos visualmente
>
  <div className="sticky top-0 h-screen flex items-center justify-center">
    <h2
      ref={titleRef}
      className="text-5xl md:text-8xl font-bold text-purple tracking-tight"
    >
      DO IT AGAIN.
    </h2>
  </div>
</section>

  );
};

export default DoItAgainSection;
