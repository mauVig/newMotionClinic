"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // OCULTAR EN MÓVIL, TABLET Y CUALQUIER DISPOSITIVO TOUCH
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (window.innerWidth <= 1024 && isTouchDevice);

    if (isTouchDevice) {
      return; // No monta nada, ni crea divs visibles
    }

    // ──────── DESKTOP ONLY: CURSOR MAGNÉTICO ────────
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    // Cursor pequeño blanco
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
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const ticker = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      xSet(mouse.x);
      ySet(mouse.y);
      fxSet(pos.x);
      fySet(pos.y);
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", moveHandler);

    // ──────── EFECTO MAGNÉTICO EN .magnetic ────────
    const handleMagnetic = (items: NodeListOf<HTMLElement>) => {
      items.forEach((el) => {
        if ((el as any)._magnetic) return;
        (el as any)._magnetic = true;

        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);

          gsap.to(el, { x: relX * 0.25, y: relY * 0.25, duration: 0.5, ease: "power3.out" });
          gsap.to(follower, { scale: 2.4, duration: 0.5, ease: "power3.out" });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.3)" });
          gsap.to(follower, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      });
    };

    handleMagnetic(document.querySelectorAll(".magnetic"));

    const observer = new MutationObserver(() => {
      handleMagnetic(document.querySelectorAll(".magnetic"));
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  // Siempre renderizamos los divs (Next.js SSR), pero en touch quedan hidden
  return (
    <>
      <div ref={cursorRef} className="fixed" />
      <div ref={followerRef} className="fixed" />
    </>
  );
}