"use client";
import React from "react";
import { useStore } from "@/store/storeGlobal.ts";

interface FooterProps {
  contacto?: "yes" | "no";
}

const Footer: React.FC<FooterProps> = ({ contacto = "no" }) => {
  const { myLang, myFocus } = useStore();
  const year = new Date().getFullYear();

  const handleClick = () => {
    if (contacto === "no") {
      window.location.href = "/contacto";
    } else {
      myFocus();
    }
  };

  return (
    <footer
      className="
        relative w-full 
        bg-[#0b0b0b] 
        text-white 
        pt-[18vh] pb-[12vh]
        overflow-hidden
      "
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0b0b0b]/90 to-black pointer-events-none" />

      {/* MAX WIDTH CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-6">

        {/* GRID — full responsive */}
        <div
          className="
            grid grid-cols-1 
            md:grid-cols-3 
            gap-20 md:gap-32 
            items-start
          "
        >
          {/* ============================================================= */}
          {/*     COLUMN 1 — LOGO + LOCALIDAD                              */}
          {/* ============================================================= */}
          <div className="flex flex-col items-center gap-8">

            {/* LOGO */}
            <img
              src="/svg/logo.svg"
              alt="Motion Clinic"
              className="
                w-[180px] sm:w-[230px] md:w-[260px] lg:w-[300px] 
                opacity-90
              "
            />

            {/* LOCATION */}
            <p
              className="
                tracking-[0.25em] 
                text-xs 
                uppercase 
                text-zinc-500 
                text-center
              "
            >
              Buenos Aires · {year}
            </p>
          </div>

          {/* ============================================================= */}
          {/*     COLUMN 2 — LINKS                                         */}
          {/* ============================================================= */}
          <div className="flex flex-col items-center gap-7">

            {/* Title */}
            <p className="uppercase underline tracking-[0.22em] text-[11px] text-zinc-500">
              {myLang ? "Connect" : "Conectar"}
            </p>

            <div className="flex flex-col gap-4 text-sm tracking-wider">

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/andres-anania"
                target="_blank"
                className="
                  group relative overflow-hidden 
                  py-1
                "
              >
                <span className="relative z-10">LinkedIn</span>
                <div
                  className="
                    absolute inset-0 
                    bg-white/10
                    scale-x-0 group-hover:scale-x-100 
                    origin-left 
                    transition-transform duration-500
                  "
                />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/motionclinic.ba"
                target="_blank"
                className="
                  group relative overflow-hidden 
                  py-1
                "
              >
                <span className="relative z-10">Instagram</span>
                <div
                  className="
                    absolute inset-0 
                    bg-white/10
                    scale-x-0 group-hover:scale-x-100 
                    origin-left 
                    transition-transform duration-500
                  "
                />
              </a>
            </div>
          </div>

          {/* ============================================================= */}
          {/*     COLUMN 3 — CTA BUTTONS                                   */}
          {/* ============================================================= */}
          <div className="flex flex-col items-center md:items-end gap-7">

            {/* SUBTITLE */}
            <p className="underline uppercase tracking-[0.22em] text-[11px] text-zinc-500">
              {myLang ? "Get in Touch" : "Contacto"}
            </p>

            {/* CONTACT BUTTON */}
           <button
            onClick={handleClick}
            className="
              w-full md:w-[240px]
              py-5
              rounded-full
              border border-white/20
              hover:border-white/40
              transition duration-500
              relative overflow-hidden
              backdrop-blur-md
              group
              flex items-center justify-center
            "
          >
            <span className="relative z-10 flex items-center gap-3 text-lg tracking-wider text-center w-full justify-center">
              ✉️ {myLang ? "Contact" : "Contacto"}
            </span>

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>


         <button
  onClick={handleClick}
  className="
    w-full md:w-[240px]
     py-5
    rounded-full
    border border-white/20
    hover:border-white/40
    transition duration-500
    relative overflow-hidden
    backdrop-blur-md
    group
    flex items-center justify-center
  "
>
  <span className="relative z-10 flex items-center gap-3 text-lg tracking-wider text-center w-full justify-center">
    💬 Whatsapp
  </span>

  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</button>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-white/10 mt-24 mb-10"></div>

        {/* COPYRIGHT */}
        <p
          className="
            text-center 
            text-xs 
            tracking-[0.2em] 
            text-zinc-600
          "
        >
          © {year} MOTION CLINIC — ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
