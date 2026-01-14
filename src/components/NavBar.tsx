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
  tab: "home" | "contact" | "blog";
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

  
  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;

    // El menú se inicializa cerrado por defecto
    gsap.set(menu, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    // Los links ya tienen su estado inicial en CSS (ocultos)

    isInitializedRef.current = true;
  }, []);

  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsMenuOpen((prev) => !prev);
    }
  }, [isAnimating]);

  const handleLinkClick = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación automática
    
    // Siempre cerrar el menú
    setIsMenuOpen(false);
    
    // Si es un hash link (para navegación en la misma página)
    if (href.startsWith('/#')) {
      // Verificar si estamos en la página principal
      const isOnHomePage = window.location.pathname === '/' || window.location.pathname === '';
      
      if (isOnHomePage) {
        // Ya estamos en la página principal, hacer scroll directo
        setTimeout(() => {
          if (href === '/#') {
            // Ir al inicio de la página
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // Buscar el elemento por ID
            const targetId = href.substring(2); // Quitar /#
            const target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              console.warn(`Elemento con ID "${targetId}" no encontrado`);
              // Fallback: ir al inicio si no encuentra el elemento
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }, 300);
      } else {
        // Estamos en otra página (como /contacto), navegar a la homepage con el hash
        setTimeout(() => {
          window.location.href = href; // Esto llevará a la página principal con el hash
        }, 300);
      }
    } else {
      // Para links externos como /contacto
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  }, []);

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
        { y: 80, opacity: 0, filter: "blur(12px)" },
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
         
          });
          setIsAnimating(false);
        },
      });

      tl.to(links, {
        y: 40,
        opacity: 0,
        // filter: "blur(8px)",
        // stagger: -0.08,
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

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

  
  useEffect(() => {
    if (loading || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
      
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4,
      }
    );
  }, [loading]);

  // 🔹 Manejar hash en la URL al cargar la página (funcionalidad restaurada)
  useEffect(() => {
    // Solo ejecutar en el cliente y si no estamos en loading
    if (typeof window === "undefined" || loading) return;
    
    // Verificar si estamos en la página principal y hay un hash
    const isOnHomePage = window.location.pathname === '/' || window.location.pathname === '';
    const hash = window.location.hash;
    
    if (isOnHomePage && hash && hash.startsWith('#')) {
      // Dar tiempo extra para que el loading termine completamente y todos los componentes se monten
      const timeoutId = setTimeout(() => {
        const targetId = hash.substring(1); // Quitar #
        const target = document.getElementById(targetId);
        
        if (target) {
          // Hacer scroll suave a la sección
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log(`✅ Scroll automático realizado a: ${targetId}`);
        } else {
          console.warn(`❌ Elemento con ID "${targetId}" no encontrado`);
          // Intentar de nuevo después de más tiempo
          setTimeout(() => {
            const retryTarget = document.getElementById(targetId);
            if (retryTarget) {
              retryTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
              console.log(`✅ Scroll automático (retry) realizado a: ${targetId}`);
            } else {
              console.error(`❌ Elemento "${targetId}" definitivamente no existe`);
            }
          }, 1500);
        }
      }, 2500); // 2.5 segundos para esperar el loading completo
      
      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  
  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-[999999] w-full transition-all duration-300 ${
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
          <div className="w-44 hidden sm:flex justify-start text-white magnetic">
            {tab === "home" && (
              <a
                href="/contacto"
                onClick={() => {
                  setTimeout(() => myFocus(), 700);
                }}
                className="
                  transition-all duration-700 
                  px-4 py-1 rounded-full 
                  bg-violet text-white
                  hover:bg-white hover:text-violet
                  hover:bg-white hover:text-black
                  z-[999999999999]
                "
              >
                {myLang ? "CONTACT" : "CONTACTO"}
              </a>
            )}
          </div>

  
          <div className="w-44 flex justify-center">
            <a href="#">
              <img
                src="/svg/logo.svg"
                alt="Logo"
                className="h-6 mid:h-8 transition-all"
              />
            </a>
          </div>


          <div className="w-44 flex justify-end items-center gap-6">

            <div
              className="flex gap-2 cursor-pointer text-violet"
              onClick={changeLanguage}
            >
              <span
                className={`px-1 transition-all ${
                  myLang ? "bg-violet text-white rounded" : ""
                }`}
              >
                EN
              </span>
              <span>|</span>
              <span
                className={`px-1 transition-all ${
                  !myLang ? "bg-violet text-white rounded" : ""
                }`}
              >
                ES
              </span>
            </div>

               
            <div
              onClick={toggleMenu}
              className={`cursor-pointer magnetic relative w-10 h-4 ${tab === 'contact' ? 'invisible' : ''}`}
            >
              <img
                src="/svg/hambur.svg"
                alt="Open menu"
                className={`magnetic absolute top-0 left-0 transition-all duration-300  ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100"
                }`}
              />
              <img
                src="/svg/hambur-close.svg"
                alt="Close menu"
                className={`absolute violet  top-0 left-0 transition-all duration-300  ${
                  isMenuOpen ? "opacity-100" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

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
        style={{

          background: "rgba(172, 172, 172, 0.82)",

          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
   
         boxShadow: "0 0 60px rgba(17, 17, 17, 0.45)",
        }}
      >

        <div className="absolute inset-0  z-0" />
        <div
          className="absolute inset-0 opacity-[0.08]  pointer-events-none z-10"
          // style={{ background: "url('/svg/grain.png')" }}
        />

        <div
          ref={linksRef}
          className="
            relative z-20 
            flex flex-col justify-center 
            h-full 
            px-10 md:px-28
             text-white     
            fill-white
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
                onClick={(e) => handleLinkClick(link.href, e)}
                className="
                  menu-link 
                  flex items-center 
                  gap-6 
                  text-3xl md:text-4xl 
                  font-light 
                  tracking-tight 
                  group leading-none
                  relative
                  opacity-0
                "
                style={{ transform: 'translateY(80px)', filter: 'blur(12px)' }}
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
