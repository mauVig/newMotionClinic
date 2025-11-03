// import { useEffect, useState, useRef, Fragment } from 'react';
// import { useStore } from "@/store/storeGlobal.ts";

// export const ShinyText = ({ disabled = false, speed = 500, className = '' }) => {
//   const { myLang } = useStore();
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Colores
//   const START_COLOR = '#6e6e6ea4'; // Color inicial (gris)
//   const END_COLOR = '#cfb1fb'; // Color final (morado claro)

//   // Obtener el texto completo según el idioma
//   const getFullText = () => {
//     if (myLang) {
//       return "Our goal is to help you regain your quality of life, we are here to help you continue doing what you love and keep trying to improve yourself. With years of experience and the most advanced techniques, we make sure that your surgery is a success and your recovery is as fast as possible.";
//     } else {
//       return "Nuestro objetivo es ayudarte a recuperar tu calidad de vida, estamos acá para que sigas haciendo lo que más te gusta y sigas intentando superarte. Con años de experiencia y las técnicas más avanzadas, nos aseguramos que tu cirugía sea un éxito y tu recuperación sea lo más rápida posible.";
//     }
//   };

//   const words = getFullText().split(' ');

//   useEffect(() => {
//     if (disabled) return;

//     const section = sectionRef.current;
//     if (!section) return;

//     const handleScroll = () => {
//       const rect = section.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       let textProgress = 0;
//       if (rect.top <= windowHeight * 0.7) {
//         textProgress = Math.min(
//           1,
//           (windowHeight * 0.7 - rect.top) / (windowHeight * 0.6)
//         );
//       }
      
//       setScrollProgress(Math.pow(textProgress, 0.9));
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [disabled]);

//   const getWordColor = (index:number) => {
//     if (disabled) return START_COLOR;

//     const wordProgress = Math.max(0, Math.min(1, (scrollProgress * (words.length + 5) - index) / 4));
    
//     if (wordProgress <= 0) return START_COLOR;
//     if (wordProgress >= 1) return END_COLOR;
    
//     // Interpolación de color
//     const startRGB = { r: 110, g: 110, b: 110 };
//     const endRGB = { r: 207, g: 177, b: 251 };
    
//     const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * wordProgress);
//     const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * wordProgress);
//     const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * wordProgress);
    
//     const alpha = 0.64 + (1 - 0.64) * wordProgress;
    
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   };

//   return (
//     <div
//       ref={sectionRef}
//       className={`text-[#6e6e6ea4] bg-clip-text inline-block ${className}`}
//     >
//       <p className="text-center block max-w-screen-lg text-xl sm:text-2xl lg:text-4xl">
//         {words.map((word, index) => (
//           <Fragment key={index}>
//             <span
//               className="transition-all duration-500 ease-out"
//               style={{ 
//                 color: getWordColor(index)
//               }}
//             >
//               {word}
//             </span>
//             {' '}
//           </Fragment>
//         ))}
//       </p>
//     </div>
//   );
// };

// export default ShinyText;