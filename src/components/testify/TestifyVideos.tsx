import React, { useEffect, useRef, useState, Fragment } from "react";
import { useStore } from '@/store/storeGlobal.ts';

export const TestifyVideos: React.FC = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const { myLang } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Colores para el efecto shiny
  const START_COLOR = '#6e6e6ea4'; // Color inicial (gris)
  const END_COLOR = '#cfb1fb'; // Color final (morado claro)

  // Obtener las palabras según el idioma
  const words = (myLang ? "Stories that Inspire us" : "Conocé las historias que nos mueven").split(' ');

  useEffect(() => {
    const section = h2Ref.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let textProgress = 0;
      if (rect.top <= windowHeight * 0.7) {
        textProgress = Math.min(
          1,
          (windowHeight * 0.7 - rect.top) / (windowHeight * 0.6)
        );
      }
      
      setScrollProgress(Math.pow(textProgress, 0.9));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWordColor = (word: string, index: number) => {

    // Todas las palabras siguen el mismo patrón de color
    const wordProgress = Math.max(0, Math.min(1, (scrollProgress * (words.length + 5) - index) / 4));
    
    if (wordProgress <= 0) return START_COLOR;
    if (wordProgress >= 1) return END_COLOR;
    
    // Interpolación de color del gris inicial al violeta final
    const startRGB = { r: 110, g: 110, b: 110 };
    const endRGB = { r: 207 , g: 177 ,b: 251 }; // #5b5bc4
    
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * wordProgress);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * wordProgress);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * wordProgress);
    
    const alpha = 0.64 + (1 - 0.64) * wordProgress;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section className="bg-backBlack p-4 relative z-10" id='testifyVideos'>
      <div className="max-w-screen-2xl mx-auto xl:flex justify-between items-end mb-16 mt-8">
        <h2
          ref={h2Ref}
          className="text-4xl mid:text-7xl text-violet font-bold"
        >
          <span>
            {words.slice(0, 2).map((word, index) => (
              <Fragment key={index}>
                <span
                  className="transition-all duration-500 ease-out"
                  style={{ color: getWordColor(word, index) }}
                >
                  {word}
                </span>
                {index < 1 && ' '}
              </Fragment>
            ))}
            <br />
            {words.slice(2, 4).map((word, index) => (
              <Fragment key={index + 2}>
                <span
                  className="transition-all duration-500 ease-out"
                  style={{ color: getWordColor(word, index + 2) }}
                >
                  {word}
                </span>
                {index < 1 && ' '}
              </Fragment>
            ))}
            <br />
            <span>
              {words.slice(4).map((word, index) => (
                <Fragment key={index + 4}>
                  <span
                    className="transition-all duration-500 ease-out"
                    style={{ color: getWordColor(word, index + 4) }}
                  >
                    {word}
                  </span>
                  {index < words.slice(4).length - 1 && ' '}
                </Fragment>
              ))}
            </span>
          </span>
        </h2>
        <a href="https://www.youtube.com/@Motion.Clinic" target="_blank" className="flex justify-start xl:justify-end group mt-16 text-[.60rem] xs:text-xs mid:text-base">
          <button
            type='submit'
            className='border-2 border-violet text-grey py-1 px-8 rounded-l-3xl group-hover:rounded-r-full group-hover:rounded-l-full transition-all duration-1000'
          >
            Mirá todas nuestras historias acá
          </button>
          <div className='h-full ml-0.5'>
            <div className='bg-violet flex justify-center items-center rounded-r-3xl group-hover:rounded-r-full group-hover:rounded-l-full p-3 transition-all duration-1000'>
              <img src='/svg/rightArrow-07.svg' alt='Arrow' className='h-4 w-4' />
            </div>
          </div>
        </a>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-4">
        <iframe
          src="https://www.youtube.com/embed/omRTk4AG_yE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full xl:w-1/2 h-[700px]"
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/JhfeY0h7D9M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full xl:w-1/2 h-[700px]"
        ></iframe>
      </div>
    </section>
  );
};

export default TestifyVideos;