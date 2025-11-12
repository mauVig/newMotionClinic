"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProcessCards.module.css";
import { useStore } from "@/store/storeGlobal";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards: React.FC = () => {
  const { myLang } = useStore();
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const cardsData = [
    {
      index: "01",
      title: myLang ? "Patient Commitment" : "Compromiso con el Paciente",
      description: myLang
        ? "Excellent care combining innovation and personalized attention."
        : "Atención de excelencia combinando vanguardia y cuidado personalizado.",
    },
    {
      index: "02",
      title: myLang ? "Medical Specialization" : "Especialización Médica",
      description: myLang
        ? "Orthopedic surgeon specialized in hip and knee."
        : "Traumatólogo subespecializado en cadera y rodilla.",
    },
    {
      index: "03",
      title: myLang ? "Academic Training" : "Formación Académica",
      description: myLang
        ? "AVP Fellowship (HSS, NY). Executive programs at Harvard/Stanford."
        : "Fellowship AVP (HSS, NY). Programas ejecutivos en Harvard/Stanford.",
    },
    {
      index: "04",
      title: myLang ? "Medical Innovation" : "Innovación Médica",
      description: myLang
        ? "Experience in medical innovation and new technologies."
        : "Trayectoria en innovación médica y nuevas tecnologías.",
    },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      ScrollTrigger.getAll().forEach((st) => st.kill());

      if (!isMobile) {
        // 🖥️ DESKTOP — centrado y horizontal
        gsap.set(cards, {
          xPercent: (i) => i * 5,
          zIndex: (i) => cards.length - i,
          scale: (i) => 1 - i * 0.04,
          opacity: 1,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1.2 },
          scrollTrigger: {
            trigger: container.current,
            start: "top center+=10%",
            end: "+=400%",
            pin: true,
            scrub: 1.3,
            pinSpacing: true,
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              xPercent: `-=${60 + i * 10}`,
              scale: `-=${0.08}`,
              opacity: 0.3,
            },
            i * 0.6
          );
        });
      } else {
        // 📱 MOBILE — cada card se pinea brevemente (tipo storytelling)
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, yPercent: 20 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top center+=15%",
                end: "bottom center-=15%",
                pin: true,
                pinSpacing: false,
                scrub: true,
                onLeave: () =>
                  gsap.to(card, {
                    autoAlpha: 0,
                    yPercent: -20,
                    duration: 0.8,
                    ease: "power1.inOut",
                  }),
              },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [myLang, isMobile]);

  return (
    <section ref={container} className={styles.wrapper}>
      <div className={styles.cards}>
        {cardsData.map((c) => (
          <article key={c.index} className={styles.card}>
            <div className={styles.inner}>
              <span className={styles.index}>{c.index}</span>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.description}>{c.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProcessCards;
