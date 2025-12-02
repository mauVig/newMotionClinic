import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal.ts";



export const ShinyText = ({ disabled = false, className = "" }) => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const START_COLOR = "#6e6e6ea4";
  const END_COLOR = "#cfb1fb";

  const getFullText = () =>
    myLang
      ? "Our goal is to help you regain your quality of life. We are here to help you continue doing what you love and keep trying to improve yourself. With years of experience and the most advanced techniques, we make sure that your surgery is a success and your recovery is as fast as possible."
      : "Nuestro objetivo es ayudarte a recuperar tu calidad de vida. Estamos acá para que sigas haciendo lo que más te gusta y sigas intentando superarte. Con años de experiencia y las técnicas más avanzadas, nos aseguramos que tu cirugía sea un éxito y tu recuperación sea lo más rápida posible.";

  const words = getFullText().split(" ");

  useEffect(() => {
    if (disabled || !sectionRef.current) return;
    const section = sectionRef.current;
    const spans = wordsRef.current.filter(Boolean);

    gsap.set(spans, {
      color: START_COLOR,
      filter: "blur(6px)",
      opacity: 0.2,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom top", // 👈 se estira el recorrido total
        scrub: 2.5,        // 👈 lerp largo
        anticipatePin: 1,
      },
    });

    tl.to(spans, {
      color: END_COLOR,
      opacity: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.25, // 👈 palabra por palabra más lento
        ease: "power2.out",
      },
      duration: 2.4, // más tiempo en cada bloque
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [disabled, myLang]);

  return (
    <div
      ref={sectionRef}
      className={`inline-block text-center text-[#6e6e6ea4] max-w-screen-lg ${className}`}
    >
      <p className="text-center block text-xl sm:text-2xl lg:text-4xl leading-relaxed">
        {words.map((word, index) => (
          <Fragment key={index}>
            <span
              ref={(el) => (wordsRef.current[index] = el)}
              className="inline-block will-change-transform"
            >
              {word}
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </div>
  );
};

export default ShinyText;