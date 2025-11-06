import { useEffect, useRef, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useStore } from "@/store/storeGlobal.ts";
import gsap from "gsap";

export const Loading = () => {
  const { loading, changeLoading } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const curtainRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (loading) {
      // 🕐 Espera 2 segundos y arranca animación de salida
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => {
            setIsVisible(false);
            changeLoading();
          },
        });

        // Logo se eleva y desvanece
        tl.to(logoRef.current, {
          y: -80,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
        });

        // Telón negro se levanta de abajo hacia arriba
        tl.to(
          curtainRef.current,
          {
            y: "-100%",
            duration: 1.6,
            ease: "power4.inOut",
          },
          "-=0.4"
        );
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Si ya se ocultó, no renderiza nada
  if (!isVisible) return null;

  return (
    <div
      ref={curtainRef}
      className="fixed top-0 left-0 w-full h-full bg-backBlack z-[9999] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Logo y dots, centrados */}
      <div ref={logoRef} className="flex flex-col items-center gap-6">
        <img
          src="/svg/logo.svg"
          alt="Logo de Motion Clinic"
          className="h-7 xs:h-10 mid:h-14 lx:h-20"
        />
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#5b5bc4"
          secondaryColor="#5b5bc4"
          radius="14.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    </div>
  );
};

export default Loading;
