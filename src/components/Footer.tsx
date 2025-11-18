import React from 'react';
import { useStore } from "@/store/storeGlobal.ts";

interface FooterProps {
  contacto?: 'yes' | 'no';
}

const Footer: React.FC<FooterProps> = ({ contacto = "no" }) => {
  const { myLang, myFocus } = useStore();
  const year = new Date().getFullYear();

  const handleClick = () => {
    if (contacto === "no") {
      window.location.href = '/contacto';
    } else {
      myFocus();
    }
  };

  return (
    <footer className="relative z-50 overflow-hidden bg-white text-white py-24 lg:py-32">
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/90 to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-12 gap-12 lg:gap-20">
        {/* Logo */}
        <div className="col-span-12 md:col-span-4 flex items-center">
          <img 
            src='/svg/logo.svg' 
            alt="Motion Clinic" 
            className="w-[260px] md:w-[320px] hover:opacity-80 transition-opacity duration-500"
          />
        </div>

        {/* Year + Location */}
        <div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-center">
          <div className="font-medium tracking-widest text-zinc-500 uppercase text-sm">
            <span>Buenos Aires</span>
            <span className="mx-4 text-zinc-700">·</span>
            <span>{year}</span>
          </div>
        </div>

        {/* Socials */}
        <div className="col-span-12 md:col-span-4 flex gap-12 justify-center md:justify-end text-sm">
          <a
            href="https://www.linkedin.com/in/andres-anania"
            target="_blank"
            rel="noopener noreferrer"
            className="relative magnetic overflow-hidden group"
          >
            <span className="relative z-10 tracking-wider">LinkedIn</span>
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
          <a
            href="https://www.instagram.com/motionclinic.ba"
            target="_blank"
            rel="noopener noreferrer"
            className="relative magnetic overflow-hidden group"
          >
            <span className="relative z-10 tracking-wider">Instagram</span>
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </div>

    
        <div className="col-span-12 lg:col-span-8 xl:col-span-6 flex flex-col gap-5">
      
          <button
            onClick={handleClick}
            className="magnetic group relative w-full lg:w-auto px-12 py-6 border border-white/20 rounded-full overflow-hidden
                       bg-white/0 hover:bg-white/5 backdrop-blur-xl
                       transition-all duration-700 hover:border-white/60"
          >
            <span className="magnetic relative z-10 flex items-center justify-center gap-4 text-lg font-medium tracking-wider">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"/>
                <path d="M3 5L12 14L21 5"/>
              </svg>
              {myLang ? 'Contact' : 'Contacto'}
            </span>

            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-1000 origin-center rounded-full" />
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-1000" />
          </button>

          {/* Botón WhatsApp */}
          <a
            href="https://api.whatsapp.com/send?phone=5491139266548&text=Hola%20doctor"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic group relative w-full lg:w-auto px-12 py-6 border border-emerald-500/30 rounded-full overflow-hidden
                       bg-emerald-500/5 hover:bg-emerald-500/10 backdrop-blur-xl
                       transition-all duration-700 hover:border-emerald-400/60"
          >
            <span className="magnetic relative z-10 flex items-center justify-center gap-4 text-lg font-medium tracking-wider text-emerald-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.438 0 .03 5.418.03 11.987c0 2.085.545 4.119 1.582 5.904L0 24l6.304-1.654c1.737.967 3.71 1.479 5.683 1.479 6.562 0 11.91-5.348 11.91-11.937.002-3.187-1.276-6.182-3.59-8.429"/>
              </svg>
              WhatsApp
            </span>

            {/* Glow verde magnético */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-emerald-500/20 scale-0 group-hover:scale-150 transition-transform duration-1000 origin-center rounded-full blur-xl" />
            </div>
          </a>
        </div>
      </div>

      {/* Línea sutil al final */}
      <div className="mt-24 border-t border-white/10" />
      <p className="text-center text-xs text-zinc-600 pt-8 tracking-widest">
        © {year} MOTION CLINIC. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;