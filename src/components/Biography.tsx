import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store/storeGlobal';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards, Autoplay } from 'swiper/modules';
import { cardsBiografy } from '@/data/GlobalData';

const Biography: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const perfectSurgeryRef = useRef<HTMLDivElement>(null);
  const { myLang } = useStore();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Colores para el efecto shiny
  const START_COLOR = '#6e6e6ea4';
  const END_COLOR = '#cfb1fb';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('fade-element') || entry.target.classList.contains('line-fade')) {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              entry.target.classList.remove('fade-out');
            } else {
              entry.target.classList.remove('fade-in');
              entry.target.classList.add('fade-out');
            }
          }
          if (entry.target.classList.contains('cards-container')) {
            if (entry.isIntersecting) {
              setTimeout(() => setIsCardVisible(true), 100);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      const fadeElements = sectionRef.current.querySelectorAll('.fade-element, .line-fade');
      const cardsContainer = sectionRef.current.querySelector('.mySwiper');
      
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
      
      if (cardsContainer) {
        cardsContainer.classList.add('cards-container');
        observer.observe(cardsContainer);
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = perfectSurgeryRef.current;
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

  const getWordColor = (index: number, totalWords: number) => {
    const wordProgress = Math.max(0, Math.min(1, (scrollProgress * (totalWords + 5) - index) / 4));
    
    if (wordProgress <= 0) return START_COLOR;
    if (wordProgress >= 1) return END_COLOR;
    
    const startRGB = { r: 110, g: 110, b: 110 };
    const endRGB = { r: 207, g: 177, b: 251 };
    
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * wordProgress);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * wordProgress);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * wordProgress);
    
    const alpha = 0.64 + (1 - 0.64) * wordProgress;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section ref={sectionRef} className="w-full relative px-6 py-24 overflow-hidden z-30" style={{ backgroundColor: '#131313', color: '#e8e8e8'}}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="pb-32 xl:grid xl:grid-cols-2 relative">
          <div className="fade-element">
            <span 
              className="block transform -translate-y-4 translate-x-1"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)' }}
            >
              {myLang ? 'BIOGRAPHY' : 'BIOGRAFIA'}
            </span>
            <h1 
              className="font-bold"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Andrés Anania
            </h1>
          </div>
          
          <div>
            <main>
              <div className=" mt-8 2xl:mt-0 xl:px-6 leading-5 text-xs">
                <div className="gap-6  mb-16 items-start fade-element">
                  <Swiper
                    effect={'cards'}
                    grabCursor={true}
                     autoplay={{
                       delay: 8500,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[EffectCards]}
                    className="mySwiper cards-container"
                  >
                  {cardsBiografy.map((card) => {
                    
                    return (
                      <SwiperSlide 
                        key={card.id}
                      >
                        <div className="animated-card border-2 border-purple/70 bg-backBlack/90 text-grey rounded-lg shadow-md  overflow-hidden h-fit xs:h-[23rem] xsm:h-72">
                          <div className="gap-4">

                            <div className="flex items-center justify-center mb-4 gap-x-4 bg-violet relative p-3 mid:py-3">
                              <div 
                                className="flex-shrink-0 p-3 rounded-lg icon-container transition-transform duration-500 mid:absolute left-0" 
                                style={{ backgroundColor: 'rgba(91, 91, 196, 0.1)' }}
                              >
                                <card.icon className="w-12 h-12 " />
                              </div>
                                <h2 
                                  className="font-semibold title-animation py-2 leading-7 fade-element" 
                                  style={{ 
                                    fontSize: 'clamp(1.25rem, 4.4vw, 2.1rem)',
                                    transform: `translateX(${isCardVisible ? '0px' : '-20px'})`,
                                    opacity: isCardVisible ? 1 : 0,
                                    transition: `all 0.6s ease .3s`,
                                  }}
                                >
                                  {myLang ? card.titleEn : card.titleEs}
                                </h2>
                            </div>

                                <p 
                                  className="p-6 text-center leading-7" 
                                  style={{ 
                                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                    transform: `translateY(${isCardVisible ? '0px' : '20px'})`,
                                    opacity: isCardVisible ? 1 : 0,
                                    transition: `all 0.6s ease .5s`
                                  }}
                                >
                                  <span dangerouslySetInnerHTML={{ __html: myLang ? card.contentEn : card.contentEs }} />
                                </p>
                          </div>
                        </div>
                        </SwiperSlide>
                    );
                  })}
                </Swiper>
                </div>
              </div>
            </main>
            
            <div className="grid gap-y-4 grid-cols-2 mid:grid-cols-3 sm:gap-y-0 sm:grid-cols-5 mt-8 fade-element text-gl leading-5">
              <a href='https://aaot.org.ar/' target='_blank' rel='noreferrer' className='flex flex-col items-center text-center transition-all duration-700 hover:scale-125'>
                <img src="svg/acreditaciones-05.svg" className='h-28 block mx-auto' alt="aaot" />
                <p className="whitespace-pre-line">{myLang ? 'Certified \n Member' : 'Miembro \n Certificado'}</p>
              </a>
              <a href='https://acaro.org.ar/' target='_blank' rel='noreferrer' className='flex flex-col items-center text-center transition-all duration-700 hover:scale-125 '>
                <img src="svg/acreditaciones-04.svg" className='h-28 block mx-auto' alt="acaro" />
                <p className="whitespace-pre-line">{myLang ? 'Full\n Member' : 'Miembro \nTitular'}</p>
              </a>
              <a href='https://aofoundation.org/' target='_blank' rel='noreferrer' className='flex flex-col items-center text-center transition-all duration-700 hover:scale-125 '>
                <img src="svg/acreditaciones-03.svg" className='h-28 block mx-auto' alt="aofoundation" />
                <p className="whitespace-pre-line">{myLang ? 'Certified\n Member' : 'Miembro\n Certificado'}</p>
              </a>
              <a href='https://aaos.org/' target='_blank' rel='noreferrer' className='flex flex-col items-center text-center transition-all duration-700 hover:scale-125 '>
                <img src="svg/acreditaciones-01.svg" className='h-28 block mx-auto' alt="aaos" />
                <p className="whitespace-pre-line">{myLang ? 'International\n Surgeon Member' : 'Cirujano Ortopedista\n Internacional'}</p>
              </a>
              <a href='https://cartilage.org/' target='_blank' rel='noreferrer' className='flex flex-col items-center text-center transition-all duration-700 hover:scale-125 '>
                <img src="svg/acreditaciones-02.svg" className='h-28 block mx-auto' alt="cartilage" />
                <p className="whitespace-pre-line">{myLang ? 'International \n Member' : 'Miembro\n Internacional'}</p>
              </a>
            </div>
          </div>
          
          <div className="line-fade absolute bottom-0 -left-6 h-[0.5px]" style={{ 
            backgroundColor: '#e8e8e8',
            width: 'calc(100% + 3rem)'
          }}></div>
        </div>
        
        <div ref={perfectSurgeryRef} className="pt-8 xl:grid xl:grid-cols-2">
          <div className="fade-element">
            <h2 className="font-bold" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              {(() => {
                const titleText = myLang ? "The Perfect Surgery" : "La Cirugía Perfecta";
                const words = titleText.split(' ');
                const breakIndex = myLang ? 2 : 2; // Break after "The Perfect" or "La Cirugía"
                
                return (
                  <>
                    {words.slice(0, breakIndex).map((word, index) => (
                      <span key={index}>
                        <span
                          className="transition-all duration-500 ease-out"
                          style={{ color: getWordColor(index, words.length) }}
                        >
                          {word}
                        </span>
                        {index < breakIndex - 1 && ' '}
                      </span>
                    ))}
                    <br />
                    {words.slice(breakIndex).map((word, index) => (
                      <span key={index + breakIndex}>
                        <span
                          className="transition-all duration-500 ease-out"
                          style={{ color: getWordColor(index + breakIndex, words.length) }}
                        >
                          {word}
                        </span>
                        {index < words.slice(breakIndex).length - 1 && ' '}
                      </span>
                    ))}
                  </>
                );
              })()}
            </h2>
          </div>
          <p className="ml-4 mt-8 fade-element" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            {(() => {
              const paragraphText = myLang ? 
                "Introducing The Smart Joint: A revolution in joint replacement surgery. With Stryker's robotic arm, MAKO SmartRobotics™, every hip and knee replacement is precisely tailored to each patient's individual needs, ensuring maximum range of motion and safety. Through data analysis and advanced robotics, with The Smart Joint, we restore natural movement, minimize complications, and set a new standard with life-changing results. This is the future of joint replacement: personalized, precise, and perfected." : 
                "Te presentamos The Smart Joint: Una revolución en las cirugias de reemplazos articulares. Con el Brazo Robótico de Stryker, MAKO SmartRobotics™, cada reemplazo de cadera y rodilla se adapta de manera precisa a las necesidades individuales de cada paciente, asegurando el máximo rango de movimiento y seguridad. Aprovechando el análisis de datos y la robótica avanzada, a través de Smart Joint restauramos el movimiento natural minimizando las complicaciones, estableciendo un nuevo estándar con resultados que cambiarán tu vida. Este es el futuro de los Reemplazos Articulares: personalizado, preciso y perfeccionado.";
              
              const words = paragraphText.split(' ');
              
              return words.map((word, index) => (
                <span key={index}>
                  <span
                    className="transition-all duration-500 ease-out"
                    style={{ color: getWordColor(index, words.length) }}
                  >
                    {word}
                  </span>
                  {index < words.length - 1 && ' '}
                </span>
              ));
            })()}
          </p>
        </div>
      </div>

      <style>{`
        .fade-element {
          opacity: 0;
          transform: translateX(-100px);
          transition-duration: .3s;
          transition: all .3s ease-out;
        }
        .line-fade {
          opacity: 0;
          transform: scale(0);
          transform-origin: left;
          transition: all .3s ease-out;
        }
        .fade-in {
          opacity: 1;
          transform: translateX(  0);
        }
        .line-fade.fade-in {
          opacity: 1;
          transform: scale(1);
        }
        .fade-out {
          opacity: 0;
          transform: translateX(-100px);
        }
        .line-fade.fade-out {
          opacity: 0;
          transform: scale(0);
        }


      `}</style>
    </section>
  );
};

export default Biography;