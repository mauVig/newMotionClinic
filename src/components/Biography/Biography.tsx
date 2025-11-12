"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessCards from "./ProcessCards";
import styles from "./Biography.module.css";
import { useStore } from "@/store/storeGlobal";

gsap.registerPlugin(ScrollTrigger);

const Biography: React.FC = () => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      // Fondo gris → negro
      gsap.fromTo(
        section,
        { backgroundColor: "#111" },
        {
          backgroundColor: "#000",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // Fade del header
      gsap.fromTo(
        header,
        { autoAlpha: 0, yPercent: 20 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [myLang]);

  return (
    <section ref={sectionRef} className={styles.biographySection}>
      <div ref={headerRef} className={styles.bioHeader}>
        <p className={styles.kicker}>{myLang ? "BIOGRAPHY" : "BIOGRAFÍA"}</p>
        <h2 className={styles.title}>Andrés Anania</h2>
        <p className={styles.paragraph}>
          {myLang
            ? "With a patient-centered approach and more than 16 years of experience, Dr. Anania specializes in orthopedic surgery and sports medicine."
            : "Con una mirada centrada en el paciente y más de 16 años de experiencia, el Dr. Anania se especializa en cirugía ortopédica y medicina del deporte."}
        </p>
      </div>

      {/* 🔹 Bloque de Process Cards */}
      <ProcessCards />
    </section>
  );
};

export default Biography;
