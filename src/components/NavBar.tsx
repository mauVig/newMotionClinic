"use client";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type FC,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useStore } from "@/store/storeGlobal.ts";
import useScrollDirection from "@/hooks/navHook.ts";
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

const NavBar: FC<NavBarProps> = ({ tab }) => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { changeLanguage, myLang, myFocus, loading } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  // --- inicialización
  useEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;
    const links = menu.querySelectorAll(".menu-link");

    gsap.set(menu, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set(links, { y: 50, opacity: 0 });

    isInitializedRef.current = true;
  }, []);

  // --- animación open/close
  const animateMenu = useCallback(
    (open: boolean) => {
      if (!menuRef.current) return;
      const menu = menuRef.current;
      const links = menu.querySelectorAll(".menu-link");

      setIsAnimating(true);

      if (open) {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setIsAnimating(false),
        });

        tl.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.3,
          ease: "hop",
          onStart: () => (menu.style.pointerEvents = "all"),
        }).to(
          links,
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.4"
        );
      } else {
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            menu.style.pointerEvents = "none";
            gsap.set(menu, {
              clipPath:
                "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(links, { y: 50, opacity: 0 });
            setIsAnimating(false);
          },
        });
        tl.to(links, { y: 20, opacity: 0, stagger: -0.08, duration: 0.4 }).to(
          menu,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "-=0.2"
        );
      }
    },
    []
  );

  useEffect(() => {
    if (isInitializedRef.current) animateMenu(isMenuOpen);
  }, [isMenuOpen, animateMenu]);

  // --- funciones varias
  const toggleMenu = useCallback(() => {
    if (!isAnimating) setIsMenuOpen((prev) => !prev);
  }, [isAnimating]);

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

  // --- entrada header
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
          delay: 0.5,
        }
      );
    }
  }, [loading]);

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrollDirection === "down" && !isMenuOpen
            ? "-translate-y-[105%]"
            : "translate-y-0"
        }`}
      >
        <div
          className={`flex justify-between items-center px-4 py-2 transition-all duration-300 ${
            !isAtTop ? "backdrop-blur-sm bg-black/10" : ""
          }`}
        >
          <div className="w-44 hidden sm:flex justify-start">
            {tab === "home" && (
              <a
                href="/contacto"
                onClick={lestsTalk}
                className={`transition-all duration-1000 px-4 py-1 rounded-full ${
                  !isMenuOpen
                    ? "bg-violet text-grey hover:bg-grey hover:text-violet"
                    : "bg-grey text-violet hover:bg-violet hover:text-grey"
                }`}
              >
                {myLang ? "CONTACT" : "CONTACTO"}
              </a>
            )}
          </div>

          {/* LOGO */}
          <div className="w-44 flex justify-center">
            <a href="#">
              <img
                src="/svg/logo.svg"
                alt="Logo"
                className="h-6 mid:h-8 transition-all"
              />
            </a>
          </div>

          {/* LANGUAGE + MENU ICON */}
          <div className="w-44 flex justify-end items-center gap-6">
            <div
              className="flex gap-2 cursor-pointer text-violet"
              onClick={setLanguage}
            >
              <span
                className={`px-1 transition-all ${
                  lang ? "bg-violet text-black rounded" : ""
                }`}
              >
                EN
              </span>
              <span>|</span>
              <span
                className={`px-1 transition-all ${
                  !lang ? "bg-violet text-black rounded" : ""
                }`}
              >
                ES
              </span>
            </div>

            <div
              onClick={toggleMenu}
              className="cursor-pointer relative w-10 h-4"
            >
              <img
                src="/svg/hambur.svg"
                alt="Abrir menú"
                className={`absolute top-0 left-0 transition-all duration-300 filter-violet ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100"
                }`}
              />
              <img
                src="/svg/hambur-close.svg"
                alt="Cerrar menú"
                className={`absolute top-0 left-0 transition-all duration-300 filter-violet ${
                  isMenuOpen ? "opacity-100" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 z-40 h-screen w-full bg-[#0a0a0a] text-violet overflow-hidden pointer-events-none"
      >
        {/* BG VIDEO */}
        <div className="absolute inset-0 video-wrapper">
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        {/* MENU CONTENT */}
        <div
          ref={linksRef}
          className="relative z-10 flex flex-col items-end justify-end h-full p-8 md:p-20 text-right"
        >
          <div className="space-y-6 text-4xl md:text-6xl font-light">
            {[
              { href: "/#", icon: <House />, label: myLang ? "Home" : "Inicio" },
              {
                href: "/#experience",
                icon: <BriefcaseBusiness />,
                label: myLang ? "Experience" : "Experiencia",
              },
              {
                href: "/#video",
                icon: <Video />,
                label: myLang ? "Watch video" : "Ver video",
              },
              {
                href: "/#skills",
                icon: <Hammer />,
                label: myLang ? "Skills" : "Tratamientos",
              },
              {
                href: "/#studio",
                icon: <MapPin />,
                label: myLang ? "Location" : "Ubicación",
              },
              {
                href: "/contacto",
                icon: <Mail />,
                label: myLang ? "Contact" : "Contacto",
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={toggleMenu}
                className="menu-link block hover:text-white transition-all duration-300 relative group"
              >
                <span className="inline-flex items-center gap-4 text-violet group-hover:drop-shadow-[0_0_12px_#5B25D4]">
                  <span className="w-6 h-6 md:w-8 md:h-8">{link.icon}</span>
                  <span>{link.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
