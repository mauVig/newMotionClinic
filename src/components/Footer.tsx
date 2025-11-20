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
    <footer className="relative z-50 overflow-hidden text-blacke py-24 lg:py-32">

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/90 to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-12 gap-12 lg:gap-20">
 
        <div className="col-span-12 md:col-span-4 flex items-center">
          <img 
            src='/svg/logo.svg' 
            alt="Motion Clinic" 
            className="w-[260px] md:w-[320px] transition-opacity duration-500"
          />
        </div>

  
        <div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-center">
          <div className="font-medium tracking-widest text-zinc-500 uppercase text-sm">
            <span>Buenos Aires</span>
            <span className="mx-4 text-zinc-700">·</span>
            <span>{year}</span>
          </div>
        </div>

 
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
                       bg-white/0 
                       transition-all duration-700 "
          >
            <span className="magnetic relative z-10 flex items-center justify-center gap-4 text-lg font-medium tracking-wider">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"/>
                <path d="M3 5L12 14L21 5"/>
              </svg>
              {myLang ? 'Contact' : 'Contacto'}
            </span>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500">
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-1000 origin-center rounded-full" />
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-1000" />
          </button>

      
           <button
            onClick={handleClick}
             href="https://api.whatsapp.com/send?phone=5491139266548&text=Hola%20doctor"
            className="magnetic group relative w-full lg:w-auto px-12 py-6 border border-white/20 rounded-full overflow-hidden
                       bg-white/0 hover:bg-white/5 backdrop-blur-xl
                       transition-all duration-700 hover:border-white/60"
          >
            <span className="magnetic relative z-10 flex items-center justify-center gap-4 text-lg font-medium tracking-wider">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"/>
                <path d="M3 5L12 14L21 5"/>
              </svg>
              {myLang ? 'Whatsapp' : 'Whatsapp'}
            </span>

            <div className="pointer-events-none absolute inset-0 opacity-0  transition-opacity duration-500">
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-1000 origin-center rounded-full" />
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 blur-xl transition duration-1000" />
          </button>
        </div>
      </div>

      <div className="mt-24 border-t border-white/10" />
      <p className="text-center text-xs text-zinc-600 pt-8 tracking-widest">
        © {year} MOTION CLINIC. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;