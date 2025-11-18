"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  type FC,
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
  const [isAnimating, setIsAnimating] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);

  // ========================================================
  // CUSTOM EASING
  // ========================================================
  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  // ========================================================
  // INITIAL MENU STATE
  // ========================================================
  useEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;
    const links = menu.querySelectorAll(".menu-link");

    gsap.set(menu, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.set(links, {
      y: 80,
      opacity: 0,
      filter: "blur(12px)",
    });

    isInitializedRef.current = true;
  }, []);

  // ========================================================
  // TOGGLE MENU
  // ========================================================
  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsMenuOpen((prev) => !prev);
    }
  }, [isAnimating]);

  // ========================================================
  // OPEN/CLOSE ANIMATION
  // ========================================================
  const animateMenu = useCallback((open: boolean) => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const links = menu.querySelectorAll(".menu-link");

    setIsAnimating(true);

    if (open) {
      gsap.set(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });

      const tl = gsap.timeline({
        onStart: () => (menu.style.pointerEvents = "all"),
        onComplete: () => setIsAnimating(false),
      });

      tl.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.15,
        ease: "hop",
      }).fromTo(
        links,
        { y: 60, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.55"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(links, {
            y: 80,
            opacity: 0,
            filter: "blur(12px)",
          });
          setIsAnimating(false);
        },
      });

      tl.to(links, {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        stagger: -0.08,
        duration: 0.35,
      }).to(
        menu,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=0.2"
      );
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) animateMenu(isMenuOpen);
  }, [isMenuOpen, animateMenu]);

  // ========================================================
  // BLOCK PAGE SCROLL WHEN MENU OPEN
  // ========================================================
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  // ========================================================
  // SCRAMBLE LOTTERY ON HOVER
  // ========================================================
  useEffect(() => {
    const container = menuRef.current;
    if (!container) return;

    const texts = container.querySelectorAll(".menu-text");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    texts.forEach((el: any) => {
      const original = el.textContent;

      const scramble = () => {
        let i = 0;
        const interval = setInterval(() => {
          el.textContent = original
            .split("")
            .map((_, idx) =>
              idx < i ? original[idx] : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("");

          i += 0.5;
          if (i >= original.length) clearInterval(interval);
        }, 25);
      };

      el.parentElement?.parentElement?.addEventListener("mouseenter", scramble);
    });
  }, []);

  // ========================================================
  // UNDERLINE ANIMATION WITH GSAP
  // ========================================================
  useEffect(() => {
    const container = menuRef.current;
    if (!container) return;

    const underlines = container.querySelectorAll(".underline-anim");

    underlines.forEach((ul) => {
      const parent = ul.closest(".menu-link");

      parent?.addEventListener("mouseenter", () => {
        gsap.to(ul, {
          scaleX: 1,
          duration: 0.35,
          ease: "power3.out",
        });
      });

      parent?.addEventListener("mouseleave", () => {
        gsap.to(ul, {
          scaleX: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
      });
    });
  }, []);

  // ========================================================
  // ICON PARALLAX ON HOVER
  // ========================================================
  useEffect(() => {
    const container = menuRef.current;
    if (!container) return;

    const links = container.querySelectorAll(".menu-link");

    links.forEach((link: any) => {
      const icon = link.querySelector(".menu-icon");

      link.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;

        gsap.to(icon, {
          x,
          y,
          duration: 0.4,
          ease: "power3.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    });
  }, []);

  // ========================================================
  // HEADER INTRO
  // ========================================================
  useEffect(() => {
    if (loading || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4,
      }
    );
  }, [loading]);

  // ========================================================
  // RETURN JSX
  // ========================================================
  return (
    <>
      {/* ===================================================== */}
      {/* ========================= HEADER ===================== */}
      {/* ===================================================== */}

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
          {/* CONTACT BTN LEFT */}
          <div className="w-44 hidden sm:flex justify-start text-white magnetic">
            {tab === "home" && (
              <a
                href="/contacto"
                onClick={() => {
                  toggleMenu();
                  setTimeout(() => myFocus(), 700);
                }}
                className="
                  transition-all duration-700 
                  px-4 py-1 rounded-full 
                  bg-violet text-black
                  hover:bg-black hover:text-white
                "
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

          {/* LANGUAGE + MENU */}
          <div className="w-44 flex justify-end items-center gap-6">
            {/* Language */}
            <div
              className="flex gap-2 cursor-pointer text-violet"
              onClick={changeLanguage}
            >
              <span
                className={`px-1 transition-all ${
                  myLang ? "bg-violet text-black rounded" : ""
                }`}
              >
                EN
              </span>
              <span>|</span>
              <span
                className={`px-1 transition-all ${
                  !myLang ? "bg-violet text-black rounded" : ""
                }`}
              >
                ES
              </span>
            </div>

            {/* Burger / Close */}
            <div
              onClick={toggleMenu}
              className="cursor-pointer relative w-10 h-4"
            >
              <img
                src="/svg/hambur.svg"
                alt="Open menu"
                className={`absolute top-0 left-0 transition-all duration-300 filter-violet ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100"
                }`}
              />
              <img
                src="/svg/hambur-close.svg"
                alt="Close menu"
                className={`absolute top-0 left-0 transition-all duration-300 filter-violet ${
                  isMenuOpen ? "opacity-100" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* ====================== AWWARDS MENU ===================== */}
      {/* ========================================================= */}

      <div
        ref={menuRef}
        className="
          fixed top-0 left-0 
          w-screen h-screen 
          z-[9999] 
          overflow-hidden
          pointer-events-none
          flex flex-col
        "
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* White Layer */}
        <div className="absolute inset-0 bg-white z-0" />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none z-10"
          style={{ background: "url('/svg/grain.png')" }}
        />

        {/* Close Button + Contact */}
        <div className="absolute top-0 right-0 z-30 flex items-center gap-6 p-6">
          <a
            href="/contacto"
            onClick={() => {
              toggleMenu();
              setTimeout(() => myFocus(), 700);
            }}
            className="
              text-sm md:text-base font-medium 
              px-4 py-2 rounded-full
              bg-black text-white 
              hover:bg-neutral-800
              transition-all duration-300
            "
          >
            {myLang ? "CONTACT" : "CONTACTO"}
          </a>

          {/* Close icon */}
          <div
            onClick={toggleMenu}
            className="cursor-pointer group w-8 h-8 flex items-center justify-center"
          >
            <div className="relative w-6 h-6">
              <span className="absolute left-0 top-1/2 w-6 h-[2px] bg-black rotate-45 group-hover:rotate-90 transition-all duration-300"></span>
              <span className="absolute left-0 top-1/2 w-6 h-[2px] bg-black -rotate-45 group-hover:-rotate-90 transition-all duration-300"></span>
            </div>
          </div>
        </div>

        {/* MENU CONTENT */}
        <div
          ref={linksRef}
          className="
            relative z-20 
            flex flex-col justify-center 
            h-full 
            px-10 md:px-28
            will-change-transform will-change-opacity
          "
        >
          <div className="space-y-8 md:space-y-12">

            {[
              { href: "/#", icon: <House strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Home" : "Inicio" },
              { href: "/#experience", icon: <BriefcaseBusiness strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Experience" : "Experiencia" },
              { href: "/#video", icon: <Video strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Watch Video" : "Ver Video" },
              { href: "/#skills", icon: <Hammer strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Skills" : "Tratamientos" },
              { href: "/#studio", icon: <MapPin strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Location" : "Ubicación" },
              { href: "/contacto", icon: <Mail strokeWidth={1} className="menu-icon" size={38} />, label: myLang ? "Contact" : "Contacto" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className="
                  menu-link 
                  flex items-center 
                  gap-6 
                  text-3xl md:text-4xl 
                  font-light 
                  tracking-tight 
                  group leading-none
                  relative
                "
              >
                <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 menu-icon">
                  {link.icon}
                </span>

                <span className="relative overflow-visible">
                  <span className="menu-text inline-block">
                    {link.label}
                  </span>
                  <span
                    className="
                      absolute left-0 bottom-[-6px] 
                      w-full h-[2px] 
                      bg-black 
                      scale-x-0 
                      origin-left 
                      underline-anim
                    "
                  ></span>
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
