import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useStore } from "@/store/storeGlobal.ts";
import st from "../style/nav.module.css";
import gsap from "gsap";

export const Welcome = () => {
  const CSSEffect = 30;
  const { myLang, loading } = useStore();
  const sectionRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // --- Preload imagen de fondo
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const img = new Image();
    img.src = isMobile ? "/img/welcome-cell.webp" : "/img/welcome.webp";
    img.onload = () => setImageLoaded(true);
    const fallback = setTimeout(() => setImageLoaded(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  // --- Esperar a que termine el loader y la imagen esté lista
  useEffect(() => {
    if (!loading && imageLoaded) {
      // ✨ Mostrar el contenido ya oculto (sin flash)
      setShowContent(true);
    }
  }, [loading, imageLoaded]);

  // --- Animación GSAP de entrada
  useEffect(() => {
    if (showContent && sectionRef.current) {
      const el = sectionRef.current;
      const h2 = el.querySelector("h2");
      const p = el.querySelector("p");
      const a = el.querySelector("a");

      // Aseguramos que empiece oculto
      gsap.set([h2, p, a], { opacity: 0, y: 60, filter: "blur(8px)" });

      // Animación secuencial
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      tl.to(h2, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power4.out",
      })
        .to(
          p,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          "-=0.7"
        )
        .to(
          a,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
          },
          "-=0.5"
        );
    }
  }, [showContent]);

  return (
    <ParallaxProvider>
      <Parallax translateY={[-CSSEffect, CSSEffect]} className={st.back}>
        <div className="min-h-screen max-w-screen-2xl mx-auto w-full relative px-6 text-grey overflow-hidden">
          {/* Mostrar texto solo cuando está todo listo */}
          {showContent && (
            <div
              ref={sectionRef}
              className="absolute bottom-[30%] sm:bottom-[27%] md:bottom-[26%] lg:bottom-[25%] xl:bottom-[20%]"
            >
              <h2
                className="text-7xl mid:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-bold w-32"
                style={{ lineHeight: ".8" }}
              >
                The perfect surgery
              </h2>

              <p className="text-[.8rem] mid:text-[.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] mt-6 lg:mt-8 mb-8">
                {myLang ? (
                  <>
                    A masterpiece of modern hip and
                    <br />
                    knee surgery.
                  </>
                ) : (
                  <>
                    Primer Centro Integral de Cirugía Robótica
                    <br />
                    en Cadera y Rodilla de Argentina.
                  </>
                )}
              </p>

              <a
                href="/contacto"
                className="opacity-0 translate-y-[40px] px-8 sm:px-24 py-2 bg-grey text-black rounded-full text-lg md:text-2xl truncate buttom"
              >
                {myLang ? "Contact" : "Contacto"}
              </a>

              <style>{`
                .buttom {
                  box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.45);
                  transition: all 0.8s;
                }
                .buttom:hover {
                  box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.3);
                  background: #b1b1db;
                }
                .buttom:active {
                  box-shadow: inset -2px 3px 6px 6px rgba(0, 0, 0, 0.45);
                }
              `}</style>
            </div>
          )}
        </div>
      </Parallax>
    </ParallaxProvider>
  );
};

export default Welcome;
