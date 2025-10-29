import React, { useState, useEffect, useRef } from 'react';
import { skillsData, type Skill } from '@/data/GlobalData';
import { useStore } from '@/store/storeGlobal';

const Skills: React.FC = () => {
  const [viewStates, setViewStates] = useState<{ [key: string]: boolean }>({});
  const [flashStates, setFlashStates] = useState<{ [key: string]: boolean }>({});
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const { myLang } = useStore();

  const toggleView = (skillTitle: string) => {
    setViewStates(prev => ({
      ...prev,
      [skillTitle]: !prev[skillTitle]
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const title = entry.target.getAttribute('data-title');
          if (!title) return;

          if (entry.isIntersecting) {
            setFlashStates(prev => ({ ...prev, [title]: true }));

            setTimeout(() => {
              setFlashStates(prev => ({ ...prev, [title]: false }));
            }, 1400);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px',
        threshold: [0.8]
      }
    );

    titleRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const h2Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (h2Ref.current) {
      h2Observer.observe(h2Ref.current);
    }

    return () => {
      if (h2Ref.current) {
        h2Observer.unobserve(h2Ref.current);
      }
      h2Observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-backBlack text-[#666666] px-6 pb-36 relative z-10" id='skills'>
      <div className='max-w-screen-2xl mx-auto'>
        <h2 ref={h2Ref} className='text-4xl mid:text-6xl xsm:text-7xl mb-32 pt-32 text-violet font-bold fade-element -ml-1'>{ myLang ? 'Skills':'Tratamientos' }</h2>
        {skillsData.map((skill:Skill, i) => (
          <div
            className={`mt-8 hover:cursor-pointer pt-8 group ${
              i !== 0 ? 'border-t-[.5px] border-[#666666]' : ''
            }`}
            key={i}
          >
            <div className='flex justify-between items-center' onClick={() => toggleView(typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title)}>
              <h3
                ref={el => { titleRefs.current[i] = el; }}
                data-title={typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title}
                className={`
                  text-lg mid:text-4xl
                  font-bold
                  cursor-pointer
                  group-hover:text-grey
                  transition-all
                  duration-300
                  ${flashStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'text-[#e8e8e8] font-bold' : ''}
                  ${viewStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'text-[#e8e8e8]' : 'text-[#666666] hover:text-purple'}
                `}
              >
                {typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title}
              </h3>
              <div className={`
                relative p-4 xs:p-6 rounded-full border-2 transition-all duration-500 h-4 w-4
                ${flashStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'border-[#e8e8e8]' : ''}
                ${viewStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'border-[#e8e8e8]' : 'border-[#666666] group-hover:border-grey'}
              `}>
                <div
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-[2px]
                    -translate-y-1/2
                    w-[10px]
                    h-[2px]
                    transition-all
                    duration-500
                    origin-[100%_50%]
                    ${flashStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'bg-[#e8e8e8]' : ''}
                    ${viewStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title]
                      ? 'rotate-45 bg-[#e8e8e8] opacity-70'
                      : '-rotate-45 bg-[#666666] group-hover:bg-grey'
                    }
                  `}
                />
                <div
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-[8px]
                    -translate-y-1/2
                    w-[12px]
                    h-[2px]
                    transition-all
                    duration-500
                    origin-[0%_50%]
                    ${flashStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'bg-[#e8e8e8]' : ''}
                    ${viewStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title]
                      ? '-rotate-45 bg-[#e8e8e8] -translate-x-2 opacity-70'
                      : 'rotate-45 bg-[#666666] group-hover:bg-grey'
                    }
                  `}
                />
              </div>
            </div>
            <div
              className={`
                transition-all duration-1000 ease-in-out
                overflow-hidden text-grey flex justify-start
                ${viewStates[typeof skill.title === 'object' ? (myLang ? skill.title.en : skill.title.es) : skill.title] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="mt-4 w-full flex flex-col xl:flex-row justify-start  gap-4">
                <img src={skill.img} className='xl:w-1/3 w-full object-contain max-h-96 xl:max-h-fit' alt={myLang ? skill.description.en : skill.description.es} />
                <div className='flex items-center xl:w-1/2 w-full'>
                  <p
                    className="leading-6 md:leading-8 text-sm mid:text-xl xl:pl-8 w-full mt-4 mb-8"
                    dangerouslySetInnerHTML={{ __html: typeof skill.description === 'object' ? (myLang ? skill.description.en : skill.description.es) : skill.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .fade-element {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 0.8s ease-out;
        }
        .fade-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
};

export default Skills;