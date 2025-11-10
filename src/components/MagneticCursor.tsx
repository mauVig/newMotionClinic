"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Cursor base
    gsap.set(cursor, {
      width: 8,
      height: 8,
      xPercent: -50,
      yPercent: -50,
      position: "fixed",
      background: "white",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 99999,
      mixBlendMode: "difference",
    });

    // Halo violeta translúcido
    gsap.set(follower, {
      width: 36,
      height: 36,
      xPercent: -50,
      yPercent: -50,
      position: "fixed",
      background: "rgba(168, 85, 247, 0.25)",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 99998,
      mixBlendMode: "difference",
      scale: 1,
    });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.25;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fxSet = gsap.quickSetter(follower, "x", "px");
    const fySet = gsap.quickSetter(follower, "y", "px");

    const moveHandler = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      xSet(mouse.x);
      ySet(mouse.y);
      fxSet(pos.x);
      fySet(pos.y);
    });

    window.addEventListener("mousemove", moveHandler);

    // --- Efectos magnéticos globales ---
    const moveIn = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // movimiento leve del elemento
      gsap.to(el, {
        x: relX * 0.25,
        y: relY * 0.25,
        duration: 0.4,
        ease: "power3.out",
      });

      // agrandar el halo
      gsap.to(follower, {
        scale: 2.2,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const moveOut = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;

      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });

      gsap.to(follower, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // --- Observador: detecta todos los .magnetic ---
    const handleMagneticElements = () => {
      const magneticItems = document.querySelectorAll(".magnetic");
      magneticItems.forEach((item) => {
        if ((item as any)._hasMagneticListener) return;
        (item as any)._hasMagneticListener = true;
        item.addEventListener("mousemove", moveIn);
        item.addEventListener("mouseleave", moveOut);
      });
    };

    // Llamar al cargar
    handleMagneticElements();

    // Delay leve para esperar hidratación de Astro/React
setTimeout(() => {
  const observer = new MutationObserver(() => handleMagneticElements());
  observer.observe(document.body, { childList: true, subtree: true });
}, 1500);


    // Y observar el DOM
    const observer = new MutationObserver(() => handleMagneticElements());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      observer.disconnect();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}></div>
      <div ref={followerRef}></div>
    </>
  );
}
