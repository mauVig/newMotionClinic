import React, { useRef, useEffect, useState } from 'react';
import Experience from './Experience.tsx';
import Objective from '../objetiveText/Objective.tsx';
import { motion, useTransform, useScroll, useMotionTemplate } from 'motion/react';
import { FaVolumeMute  } from 'react-icons/fa';

const WrapChangeBack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showMuteIcon, setShowMuteIcon] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const COLOR_CHANGE_START = 0.2; 
  const VIDEO_AUTOPLAY_THRESHOLD = 0.5; // Constante para controlar cuándo inicia el video

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const colorProgress = useTransform(
    scrollYProgress,
    [0, COLOR_CHANGE_START, 1],
    [0, 0, 1],
    { clamp: false }
  );

  // Transforma el progreso del scroll para cambiar el clipPath de 40% a 100%
  const clipPathRadius = useTransform(
    scrollYProgress,
    [0.70, 0.99],
    [10, 100],
    { clamp: true }
  );

  // Controla la opacidad del overlay violeta: de 0.9 a 0 cuando llega a 0.99
  const violetOpacity = useTransform(
    scrollYProgress,
    [0.80, 0.99],
    [0.9, 0],
    { clamp: true }
  );

  // Controla si el overlay bloquea clics: si opacidad = 0, NO bloquea clics
  const overlayPointerEvents = useTransform(
    violetOpacity,
    (opacity) => opacity === 0 ? 'none' : 'auto'
  );

  // Transforma el tamaño del h2 usando clamp() para responsividad
  const h2FontSize = useTransform(
    scrollYProgress,
    [0.70, 0.80],
    ['clamp(1.2rem, 3vw, 2rem)', 'clamp(3rem, 8vw, 4.5rem)'],
    { clamp: true }
  );

  // Transforma el color del h2: de #e8e8e8 a #131313
  const h2Color = useTransform(
    scrollYProgress,
    [0.60, 0.80],
    ['#e8e8e8', '#131313'],
    { clamp: true }
  );

  // Crea un template string reactivo para el clipPath
  const clipPath = useMotionTemplate`circle(${clipPathRadius}% at 50% 63%)`;

  // Efecto para controlar autoplay del video
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (videoRef.current && value >= VIDEO_AUTOPLAY_THRESHOLD) {
        videoRef.current.play().catch((error) => {
          console.log('Autoplay failed:', error);
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Efecto para controlar el mouse sobre el video - OPTIMIZADO
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Actualizar inmediatamente sin esperar re-render
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (showMuteIcon && window.innerWidth > 768) { // Solo en pantallas mayores a 768px
      // Usar passive listener para mejor performance
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [showMuteIcon]);

  const handleVideoMouseEnter = () => {
    setShowMuteIcon(true);
    // Obtener posición inicial inmediatamente
    document.addEventListener('mousemove', (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, { once: true });
  };

  const handleVideoMouseLeave = () => {
    setShowMuteIcon(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
    }
  };

  const calculateBackground = (progress: number): string => {
    const startR = 19;
    const startG = 19;
    const startB = 19;
    const endR = 255;
    const endG = 255;
    const endB = 255;

    const r = Math.round(startR + (endR - startR) * progress);
    const g = Math.round(startG + (endG - startG) * progress);
    const b = Math.round(startB + (endB - startB) * progress);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const backgroundColor = useTransform(colorProgress, (progress) => calculateBackground(progress));

  return (
    <motion.section
      ref={containerRef}
      className="relative"
      style={{ backgroundColor }}
    >
      <div className="absolute -top-[149px] left-0 right-0 h-[150px] bg-gradient-to-t from-backBlack -mb-1" />
        <Objective />
        <Experience />
        
        <motion.h1 
          className='font-bold text-center mt-28'
          style={{
            fontSize: h2FontSize,
            color: h2Color
          }}
        >
          DR ANDRES <br className='mid:hidden' /> ANANIA
        </motion.h1>

        <motion.div 
          className="pt-96 h-[100vh] w-full overflow-hidden relative z-20"
          style={{ 
            clipPath: clipPath
          }}
        > 
          <motion.div 
            className="absolute inset-0 bg-violet z-20" 
            style={{ 
              opacity: violetOpacity,
              pointerEvents: overlayPointerEvents
            }}
            id='video'
          />
          <motion.video  
            ref={videoRef}
            id="video-player"
            src="/video/AndresVideo.mp4"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover cursor-none"
            style={{
              zIndex: violetOpacity.get() === 0 ? 20 : 'auto',
              minWidth: '100vw',
              minHeight: '100vh'
            }}
            controls
            loop
            playsInline
            preload="metadata"
            muted={isMuted}
            onMouseEnter={handleVideoMouseEnter}
            onMouseLeave={handleVideoMouseLeave}
            onClick={handleVideoClick}
            
          />  
        </motion.div>

        {/* Cursor personalizado con ícono de mute - OPTIMIZADO */}
        {showMuteIcon && (
          <div
            className="fixed pointer-events-none z-50 bg-black/80 rounded-full p-3"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
              transition: 'none', // Eliminar transición para respuesta inmediata
              willChange: 'transform' // Optimización de rendering
            }}
          >
            <FaVolumeMute  
              className={`text-2xl text-purple ${
                isMuted ? 'text-red-500' : 'text-white'
              }`} 
            />
          </div>
        )}

        {/* Estilo mejorado para ocultar el cursor por defecto */}
        <style>{`
          .cursor-none:hover {
            cursor: none !important;
          }
          .custom-cursor {
            transition: opacity 0.3s ease;
            will-change: transform;
          }
        `}</style>

    </motion.section>
  );
};

export default WrapChangeBack;