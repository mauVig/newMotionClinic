import { useEffect, useRef, useState, type FC } from "react";
import gsap from "gsap";
import useScrollDirection from "@/hooks/navHook.ts";
import { useStore } from "@/store/storeGlobal.ts";
import {
  BriefcaseBusiness,
  Hammer,
  House,
  Mail,
  MapPin,
  Video,
} from "lucide-react";

interface NavBarProps {
  tab: "home" | "contact";
}

export const NavBar: FC<NavBarProps> = ({ tab }) => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { changeLanguage, myLang, myFocus, loading } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const setLanguage = () => {
    setLang(!lang);
    changeLanguage();
  };

  const lestsTalk = () => {
    if (isMenuOpen) toggleMenu();

    let count = 0;
    const time = setTimeout(() => {
      myFocus();
      if (count === 1) clearTimeout(time);
    }, 1000);
  };

  // --- Animación de entrada del header (desde arriba)
  useEffect(() => {
    if (!loading && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5, // sincronizado con el telón
        }
      );
    }
  }, [loading]);

  // --- Animación del sidebar (abrir/cerrar)
  useEffect(() => {
    if (menuRef.current && listRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const items = listRef.current.querySelectorAll("li");

      if (isMenuOpen) {
        tl.fromTo(
          menuRef.current,
          { x: "105%" },
          { x: "0%", duration: 0.8, ease: "power4.out" }
        ).fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          "-=0.3"
        );
      } else {
        tl.to(items, { y: 20, opacity: 0, duration: 0.3, stagger: -0.05 }).to(
          menuRef.current,
          { x: "105%", duration: 0.6, ease: "power4.in" },
          "-=0.2"
        );
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full opacity-0 transition-all duration-300 ${
          scrollDirection === "down" && !isMenuOpen
            ? "-translate-y-[105%]"
            : "translate-y-0"
        }`}
      >
        <div
          className={`flex justify-between items-center p-2 transition-all duration-300 ${
            !isAtTop ? "backdrop-blur-sm" : ""
          }`}
        >
          {/* LEFT BUTTON */}
          <div className="w-44 hidden sm:flex justify-start">
            {tab === "home" && (
              <a
                href="/contacto"
                onClick={lestsTalk}
                className={`transition-all duration-1000 
                  ${
                    !isMenuOpen
                      ? "hover:bg-grey hover:text-violet"
                      : "hover:bg-violet hover:text-grey"
                  }
                  ${!isMenuOpen ? "bg-violet" : "bg-grey"}
                  ${isMenuOpen ? "text-violet" : "text-grey"}
                  px-4 py-1 rounded-full`}
              >
                {myLang ? "CONTACT" : "CONTACTO"}
              </a>
            )}

            {tab === "contact" && (
              <a
                href="/"
                onClick={lestsTalk}
                className={`transition-all duration-1000 flex gap-2 items-center text-grey hover:text-violet
                  ${
                    !isMenuOpen
                      ? "hover:bg-grey hover:text-violet"
                      : "hover:bg-violet hover:text-grey"
                  }
                  ${!isMenuOpen ? "bg-violet" : "bg-grey"}
                  ${isMenuOpen ? "text-violet" : "text-grey"}
                  px-4 py-1 rounded-full`}
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  viewBox="0 0 472.615 472.615"
                >
                  <path d="M167.158,117.315l-0.001-77.375L0,193.619l167.157,153.679v-68.555c200.338,0.004,299.435,153.932,299.435,153.932 c3.951-19.967,6.023-40.609,6.023-61.736C472.615,196.295,341.8,117.315,167.158,117.315z" />
                </svg>
                <span>{myLang ? "HOME" : "INICIO"}</span>
              </a>
            )}
          </div>

          {/* LOGO */}
          <div className="w-44 flex mid:justify-center">
            <a href="#">
              <img
                src="/svg/logo.svg"
                alt="Logo de Motion clinic"
                className="h-5 xs:h-6 mid:h-8"
              />
            </a>
          </div>

          {/* LANGUAGE + MENU ICON */}
          <div className="w-44 flex justify-end">
            <div
              className="text-base mid:text-lg text-grey flex gap-2 mr-8 items-center cursor-pointer"
              onClick={setLanguage}
            >
              <span
                className={`transition-all duration-500 px-1 rounded-lg select-none
                  ${
                    isMenuOpen && lang
                      ? "relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:rounded-lg before:bg-grey"
                      : ""
                  }
                  ${!isMenuOpen && lang ? "bg-violet" : "text-grey"}`}
              >
                EN
              </span>
              <span className="select-none">|</span>
              <span
                className={`transition-all duration-500 px-1 rounded-lg select-none
                  ${
                    isMenuOpen && !lang
                      ? "relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:rounded-lg before:bg-grey"
                      : ""
                  }
                  ${!isMenuOpen && !lang ? "bg-violet" : "text-grey"}`}
              >
                ES
              </span>
            </div>

            {/* MENU BUTTON */}
            <div
              onClick={toggleMenu}
              className="cursor-pointer relative w-12 mid:w-16 h-4 select-none"
            >
              <img
                src="/svg/hambur.svg"
                alt="Abrir menú"
                className={`absolute top-0 left-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              />
              <img
                src="/svg/hambur-close.svg"
                alt="Cerrar menú"
                className={`absolute top-0 left-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR / NAV */}
      <nav
        ref={menuRef}
        className="fixed top-0 right-0 z-40 h-screen w-full md:w-auto bg-violet flex justify-start items-center translate-x-[105%]"
      >
        <div className="relative">
          <ul
            ref={listRef}
            className="w-full text-4xl xs:text-[2.8rem] mid:text-[3.6rem] mid:leading-[3.3rem] sm:text-6xl inline-block py-1 pl-4 pr-14 font-medium text-grey"
          >
            <li>
              <a
                href="/#"
                onClick={toggleMenu}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <House className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Home" : "Inicio"}
              </a>
            </li>
            <li>
              <a
                href="/#experience"
                onClick={toggleMenu}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <BriefcaseBusiness className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Experience" : "Experiencia"}
              </a>
            </li>
            <li>
              <a
                href="/#video"
                onClick={toggleMenu}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <Video className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Watch video" : "Ver video"}
              </a>
            </li>
            <li>
              <a
                href="/#skills"
                onClick={toggleMenu}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <Hammer className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Skills" : "Tratamientos"}
              </a>
            </li>
            <li>
              <a
                href="/#studio"
                onClick={toggleMenu}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <MapPin className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Location" : "Ubicación"}
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                onClick={lestsTalk}
                className="flex items-baseline gap-x-8 hover:text-backBlack"
              >
                <Mail className="w-6 h-6 xs:w-12 xs:h-12" />
                {myLang ? "Contact" : "Contacto"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
