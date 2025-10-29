import { useRef, useEffect } from "react";

const Gallery2: React.FC = () => {
  const imageRefs = useRef<HTMLDivElement[]>([]);
    
  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((imgDiv) => {
        if (!imgDiv) return;
        const rect = imgDiv.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        const opacity = isVisible ? 1 : 0;
        const scale = isVisible ? 1 : 0.85; 

        imgDiv.style.opacity = opacity.toString();
        imgDiv.style.transform = `scale(${scale})`; 
        imgDiv.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className=" px-6 gap-8 bg-backBlack flex flex-wrap justify-center items-center">
        {[...Array(6)].map((_, index) => (
            <div
                key={index}
                ref={el => {
                    if (el) imageRefs.current[index] = el;
                }}
                className="flex-shrink-0 flex justify-center items-center mb-8 opacity-0 w-full max-w-none sm:w-auto sm:max-w-sm"
            >
                <img
                    src={`/img/gallery/gallery${8 + index }.jpg`}
                    alt={`Galería ${8 + index }`}
                    className="w-full"
                />
            </div>
        ))}
    </section>

  );
};

export default Gallery2;