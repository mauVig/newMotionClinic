"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/storeGlobal.ts";

gsap.registerPlugin(ScrollTrigger);

const ClinicTestify = () => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const info = infoRef.current;
    if (!section || !title || !info) return;

    gsap.fromTo(
      [title, info],
      {
        autoAlpha: 0,
        y: 40,
        filter: "blur(14px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full 
        px-6 md:px-10 
        py-16 md:py-20
        bg-[#111]
        text-white
        flex flex-col
      "
    >
      <div ref={titleRef} className="max-w-[600px]">
        <p className="text-sm tracking-wider mb-2 opacity-80">
          Motion Clinic
        </p>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-10">
          {myLang ? "Location" : "Ubicación"}
        </h2>
      </div>

      <div ref={infoRef} className="space-y-6">
        <div
          className="
            w-full max-w-[620px]
            overflow-hidden rounded-3xl shadow-2xl
            bg-[#1a1a1a] border border-white/10
            backdrop-blur-xl
          "
        >
          <iframe
            className="w-full h-[380px] md:h-[500px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5261873764753!2d-58.43667917068962!3d-34.56555015989195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b97072cbb1%3A0xfec53bcc88faa676!2sMaure%201608%2C%20C1426CUD%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757915667649!5m2!1ses-419!2sar"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        <a
          href="https://www.google.com/maps/place/Maure+1608,+C1426CUD+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/"
          target="_blank"
          className="flex items-center gap-4 group cursor-pointer"
        >
          <img
            src="/img/locationIcon.svg"
            className="w-9 opacity-90 group-hover:opacity-100 transition duration-300"
            alt="Location Icon"
          />

          <p className="text-lg font-medium leading-tight group-hover:underline decoration-white/60 underline-offset-4">
            LA IMPRENTA <br /> Maure 1608, Piso 2.
          </p>
        </a>
      </div>
    </section>
  );
};

export default ClinicTestify;
