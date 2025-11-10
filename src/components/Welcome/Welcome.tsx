import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import st from "./home.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
  const { myLang, loading } = useStore();
  const sectionRef = useRef(null);
  const bgRef = useRef(null); // 🔥 referencia al fondo
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // --- Preload imagen adaptativa
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const img = new Image();
    img.src = isMobile ? "/img/welcome-cell.webp" : "/img/welcome.webp";
    img.onload = () => setImageLoaded(true);
    const fallback = setTimeout(() => setImageLoaded(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  // --- Mostrar contenido cuando carga
  useEffect(() => {
    if (!loading && imageLoaded) setShowContent(true);
  }, [loading, imageLoaded]);

  // --- Animación de entrada de texto
  useEffect(() => {
    if (showContent && sectionRef.current) {
      const el = sectionRef.current;
      const lines = el.querySelectorAll(".line-wrapper span");
      const button = el.querySelector("a");

      gsap.set(lines, { xPercent: -120, opacity: 1 });
      gsap.set(button, { xPercent: -80, opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.1 },
        delay: 0.3,
      });

      tl.to(lines, { xPercent: 0, stagger: 0.15 })
        .to(button, { xPercent: 0, duration: 0.9, ease: "power2.out" }, "-=0.3");
    }
  }, [showContent]);

  // --- 🌀 Parallax por mouse
  useEffect(() => {
    if (!showContent) return;
    const bg = document.querySelector(`.${st.back}`);
    if (!bg) return;
    bg.style.backgroundPosition = "50% 50%";

    let targetX = 50, targetY = 50;
    let currentX = 50, currentY = 50;

    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;
      targetX = 50 + xNorm * 2.5;
      targetY = 50 - yNorm * 2.5;
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      bg.style.backgroundPosition = `${currentX}% ${currentY}%`;
    };

    gsap.ticker.add(update);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(update);
    };
  }, [showContent]);

  // --- 🪞 Zoom suave al scrollear
  useEffect(() => {
    if (!bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { scale: 1 },
      {
        scale: 1.05, // ✨ zoom sutil
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, [showContent]);

  return (
    <section
      className={`${st.back} relative flex items-center justify-center w-full min-h-screen overflow-hidden`}
    >
      {/* Imagen de fondo con zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${window.innerWidth < 1024
            ? '/img/welcome-cell.webp'
            : '/img/welcome.webp'})`,
          transformOrigin: "center center",
        }}
      ></div>

      {/* Overlay con profundidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(0,0,0,0) 45%,
              rgba(0,0,0,0.3) 65%,
              rgba(0,0,0,0.8) 100%
            )
          `,
        }}
      ></div>

      {/* Contenido */}
      {showContent && (
        <div
          ref={sectionRef}
          className="relative z-[3] text-center px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2rem,6vh,5rem)] max-w-[90rem]"
        >
          <h2
            className="text-[clamp(2.8rem,10vw,10rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white mb-[clamp(1rem,2vh,2.5rem)]"
          >
            {["The", "Perfect", "Surgery"].map((word, i) => (
              <div key={i} className="line-wrapper overflow-hidden block">
                <span className="inline-block">{word}</span>
              </div>
            ))}
          </h2>

          <p className="text-white/90 text-[clamp(1rem,2vw,1.8rem)] leading-[1.5] mb-[clamp(2rem,5vh,3rem)] font-light max-w-[40rem] mx-auto">
            <div className="line-wrapper overflow-hidden">
              <span className="inline-block">
                {myLang
                  ? "A masterpiece of modern hip and"
                  : "Primer Centro Integral de Cirugía Robótica"}
              </span>
            </div>
            <div className="line-wrapper overflow-hidden">
              <span className="inline-block">
                {myLang
                  ? "knee surgery."
                  : "en Cadera y Rodilla de Argentina."}
              </span>
            </div>
          </p>
{/* 
          <a
          id="contactButton"
            href="/contacto"
            className="inline-block bg-white text-black font-semibold px-[clamp(1.5rem,4vw,3rem)] py-[clamp(0.6rem,1vw,1rem)] rounded-full text-[clamp(1rem,1.8vw,1.4rem)] tracking-wide shadow-[0_0_15px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-500"
          >
            {myLang ? "Contact" : "Contacto"}
          </a> */}
          <button>
                <a
     
            href="/contacto"
          >
            {myLang ? "Contact" : "Contacto"}
          </a>
          </button>

          
        </div>
      )}
    </section>
  );
};

export default Welcome;
