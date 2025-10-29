import React, { useRef, useEffect } from 'react';
import { useStore } from '@/store/storeGlobal.ts';

export const ClinicTestify = () => {
  const { myLang } = useStore();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobil = window.innerWidth < 768;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleRef.current?.classList.add('slide-in');
          } else {
            titleRef.current?.classList.remove('slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id='studio' className="bg-[#cccccc] w-full relative text-black flex justify-center items-center py-6">
      <div className="w-full px-6">
        <h2 ref={titleRef} className="pb-4 slide-element">
          <span  className="text-sm mid:text-xl font-medium ">
            Motion Clinic
          </span>
          <br />
          <span className="text-4xl mid:text-6xl font-bold -ml-[3.5px]">
            {myLang ? 'Location' : 'Ubicación'}
          </span>
        </h2>
        <iframe className='w-[90vw] h-[600px] lx:w-[100%] lx:h-[800px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.5261873764753!2d-58.43667917068962!3d-34.56555015989195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b97072cbb1%3A0xfec53bcc88faa676!2sMaure%201608%2C%20C1426CUD%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757915667649!5m2!1ses-419!2sar" style={{border:0}} loading="lazy"></iframe>
        <a href='https://www.google.com/maps/place/Maure+1608,+C1426CUD+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.5655502,-58.4366792,17z/data=!4m6!3m5!1s0x95bcb5b97072cbb1:0xfec53bcc88faa676!8m2!3d-34.5660671!4d-58.4352093!16s%2Fg%2F11vcbm_kj0?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D' target='_blank' className="flex items-center gap-4 pt-4">
          <img src="/img/locationIcon.svg" className="w-8" alt="Logo location" />
          <p className="block font-medium w-44">LA IMPRENTA <br /> Maure 1608, Piso 2. </p>
        </a>
      </div>
      <style>{`
        .slide-element {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 0.8s ease-out;
        }
        .slide-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
      

    </section>
  );
};

export default ClinicTestify;