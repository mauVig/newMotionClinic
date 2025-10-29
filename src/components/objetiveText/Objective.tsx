import React, { useEffect, useState } from 'react';
import ShinyText from './ShinyText.tsx';

const Objective:React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const text = `DO IT AGAIN.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('reveal-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  return (
    <section className=" text-grey flex items-center px-6 py-36" id="reveal-section">
      <div className="flex flex-col items-center justify-center w-full ">
        <ShinyText disabled={false} speed={3} /> 
        <div className="text-5xl xs:text-6xl md:text-8xl text-purple mt-48 overflow-hidden truncate">
          {text.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="inline-block transition-all duration-300 ease-out h-36 font-bold reddit-sans-text"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50%)',
                transitionDelay: isVisible ? `${index * 90}ms` : '0ms',
                transitionProperty: 'transform, opacity'
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objective;