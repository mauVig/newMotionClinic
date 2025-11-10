import { useEffect, useRef } from "react";
import gsap from "gsap";
// import style from "../style/globalStyle.css";
export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // configuración base del cursor
    gsap.set(cursor, {
      width: 14,
      height: 14,
      xPercent: -200,
      yPercent: -200,
      position: "fixed",
      pointerEvents: "none",
      border: "1px solid white",
      borderRadius: "50%",
      mixBlendMode: "difference",
      zIndex: 99999,
    });

    // seguir el mouse suavemente
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        duration: 5.2,
        x: e.clientX,
        y: e.clientY,
        ease: "power3.out",
      });
    });

    const targets = document.querySelectorAll(".magnetic");

    const moveHandler = (e: MouseEvent) => {
      const cursorPos = { x: e.clientX, y: e.clientY };

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const targetCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const distance = {
          x: targetCenter.x - cursorPos.x,
          y: targetCenter.y - cursorPos.y,
        };
        const angle = Math.atan2(distance.x, distance.y);
        const hypotenuse = Math.sqrt(distance.x ** 2 + distance.y ** 2);

        const triggerDistance = rect.width * 0.8; // radio de atracción

        if (hypotenuse < triggerDistance) {
          // dentro del campo magnético
          gsap.to(cursor, {
            duration: 0.25,
            x: targetCenter.x - (Math.sin(angle) * hypotenuse) / 2,
            y: targetCenter.y - (Math.cos(angle) * hypotenuse) / 2,
            width: rect.width * 0.9,
            height: rect.height * 0.9,
            ease: "power2.out",
          });

          // mover sutilmente el contenido del target
          const textEl = target.querySelector(".text");
          if (textEl) {
            gsap.to(textEl, {
              duration: 0.25,
              x: -((Math.sin(angle) * hypotenuse) / 3),
              y: -((Math.cos(angle) * hypotenuse) / 3),
              ease: "power2.out",
            });
          }
        } else {
          // fuera del rango
          gsap.to(cursor, {
            duration: 0.3,
            x: cursorPos.x,
            y: cursorPos.y,
            width: 14,
            height: 14,
            ease: "power3.out",
          });
          const textEl = target.querySelector(".text");
          if (textEl) {
            gsap.to(textEl, {
              duration: 0.3,
              x: 0,
              y: 0,
              ease: "power3.out",
            });
          }
        }
      });
    };

    document.addEventListener("mousemove", moveHandler);
    return () => document.removeEventListener("mousemove", moveHandler);
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
