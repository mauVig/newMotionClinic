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
      setShowContent(true);
    }
  }, [loading, imageLoaded]);

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

    tl.to(lines, {
      xPercent: 0,
      stagger: 0.15,
    }).to(
      button,
      {
        xPercent: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }
}, [showContent]);


// --- 🌀 Efecto Parallax por Mouse (lerp real y ambos ejes)
useEffect(() => {
  if (!showContent) return;

  const bg = document.querySelector(`.${st.back}`);
  if (!bg) return console.warn("❌ No se encontró el fondo .back");

  console.log("✅ Parallax real activado en:", bg);
  bg.style.backgroundPosition = "50% 50%";

  // valores objetivo
  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;

  const handleMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 a 1
    const yNorm = (e.clientY / innerHeight - 0.5) * 2; // -1 a 1

    // movimiento sutil e invertido vertical
    targetX = 50 + xNorm * 2.5; // ±2.5%
    targetY = 50 - yNorm * 2.5; // invertido
  };

  // suavizado manual tipo lerp (interpolación progresiva)
  const update = () => {
    currentX += (targetX - currentX) * 0.05; // factor 0.05 = muy suave
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


  return (
    <ParallaxProvider>
      <Parallax translateY={[-CSSEffect, CSSEffect]} className={st.back}>
        <div className="min-h-screen max-w-screen-2xl mx-auto w-full relative px-6 text-grey overflow-hidden">

          {showContent && (
            <div
              ref={sectionRef}
              className="absolute bottom-[30%] sm:bottom-[27%] md:bottom-[26%] lg:bottom-[25%] xl:bottom-[20%]"
            >
       <h2
  className="text-7xl mid:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-bold w-fit leading-[1.05]" // ⬅ más altura entre líneas
>
  {["The", "Perfect", "Surgery"].map((word, i) => (
    <div
      key={i}
      className="line-wrapper overflow-hidden"
      style={{
        display: "block",
       //  padding: "0.25em 0", ⬅ le da más espacio vertical
      }}
    >
      <span className="inline-block">{word}</span>
    </div>
  ))}
</h2>

<p className="text-[.8rem] mid:text-[.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] mt-6 lg:mt-8 mb-8 w-fit leading-[1.4]">
  <div className="line-wrapper overflow-hidden" style={{ padding: "0.2em 0" }}>
    <span className="inline-block">
      {myLang
        ? "A masterpiece of modern hip and"
        : "Primer Centro Integral de Cirugía Robótica"}
    </span>
  </div>
  <div className="line-wrapper overflow-hidden" style={{ padding: "0.2em 0" }}>
    <span className="inline-block">
      {myLang
        ? "knee surgery."
        : "en Cadera y Rodilla de Argentina."}
    </span>
  </div>
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
