import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
  const { myLang, loading } = useStore();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const img = new Image();
    img.src = isMobile ? "/img/welcome-cell.webp" : "/img/welcome.webp";
    img.onload = () => setImageLoaded(true);
    const fallback = setTimeout(() => setImageLoaded(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!loading && imageLoaded) setShowContent(true);
  }, [loading, imageLoaded]);

  // Animación de entrada
  useEffect(() => {
    if (showContent && sectionRef.current) {
      const el = sectionRef.current;
      const lines = el.querySelectorAll(".line-wrapper span");
      const button = el.querySelector("a");

      gsap.set(lines, { yPercent: 100, opacity: 0, scale: 1.05, filter: "blur(8px)" });
      gsap.set(button, { scale: 0.8, opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
        delay: 0.3,
      });

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.12,
      })
        .to(
          button,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
    }
  }, [showContent]);

  useEffect(() => {
    if (!showContent || !bgRef.current) return;
    const bg = bgRef.current;
    bg.style.backgroundPosition = "50% 50%";

    let targetX = 50,
      targetY = 50;
    let currentX = 50,
      currentY = 50;

    const handleMove = (e: MouseEvent) => {
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

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { scale: 1 },
      {
        scale: 1.05,
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

  // Efecto magnético del botón
  useEffect(() => {
    const btn = document.querySelector(".magnetic");
    if (!btn) return;

    const strength = 40;
    const easing = 0.15;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = (btn as HTMLElement).getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      const distance = Math.sqrt(relX ** 2 + relY ** 2);
      const radius = rect.width * 0.8;
      const force = Math.max(0, 1 - distance / radius);

      targetX = relX * force;
      targetY = relY * force;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      x += (targetX - x) * easing;
      y += (targetY - y) * easing;
      gsap.set(btn, { x, y });
    };

    gsap.ticker.add(animate);
    window.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
      gsap.ticker.remove(animate);
    };
  }, []);

  return (
    <section
      className="relative flex items-center justify-start w-full min-h-screen overflow-hidden px-[clamp(2rem,6vw,6rem)]"
      style={{
        color: "#e8e8e8",
        backgroundColor: imageLoaded ? "transparent" : "#000",
      }}
    >
      {/* Fondo */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${
            window.innerWidth < 1024
              ? "/img/welcome-cell.webp"
              : "/img/welcome.webp"
          })`,
          transformOrigin: "center center",
        }}
      ></div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)
          `,
        }}
      ></div>

      {/* Contenido */}
      {showContent && (
        <div
          ref={sectionRef}
          className="content relative z-[3] text-left text-white max-w-[70rem]"
        >
          <h2 className="text-[clamp(2rem,8vw,8rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-[clamp(1rem,2vh,2.5rem)] 
    color: white;">
            {["The", "Perfect", "Surgery"].map((word, i) => (
              <div key={i} className="line-wrapper overflow-hidden block">
                <span className="inline-block">{word}</span>
              </div>
            ))}
          </h2>

          <p className="text-white/80 text-[clamp(1rem,2vw,1.8rem)] leading-[1.5] mb-[clamp(2rem,5vh,3rem)] font-light max-w-[35rem] mr-auto 
    color: white;">
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

          <a
            href="/contacto"
            className="magnetic relative inline-flex items-center justify-center
                       px-[clamp(2.8rem,6vw,4rem)] py-[clamp(0.4rem,0.8vw,0.6rem)]
                       rounded-[0.7rem] font-semibold text-[clamp(1rem,1.4vw,1.2rem)]
                       uppercase tracking-wide text-white bg-transparent border border-[#a855f7]
                       transition-all duration-500 ease-out overflow-hidden group
                       hover:bg-[#a855f7]/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
                       focus-visible:ring-2 focus-visible:ring-[#a855f7]/60
                       active:scale-[0.97]"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              {myLang ? "CONTACT" : "CONTACTO"}
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899]
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
                         rounded-[0.7rem]"
            ></span>
          </a>
        </div>
      )}
    </section>
  );
};

export default Welcome;
