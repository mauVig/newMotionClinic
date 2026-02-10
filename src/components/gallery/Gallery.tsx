import React, { useEffect, useRef } from 'react';

export const Gallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLDivElement[]>([]);

    const imageClasses = [
        "w-full object-contain translate-y-32",
        "w-full object-contain translate-y-72",
        "w-full object-contain translate-y-56",
        "w-full object-contain translate-y-32",
        "w-full object-contain translate-y-72",
        "w-full object-contain translate-y-60",
        "w-full object-contain translate-y-48"
    ];

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        const sectionWidth = section.scrollWidth;
        const viewportHeight = window.innerHeight;
        const scrollableWidth = sectionWidth - window.innerWidth;
        container.style.height = `${scrollableWidth}px`;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const { top } = containerRect;

            if (top <= 0) {
                const progress = Math.abs(top) / (scrollableWidth - viewportHeight);
                const scrollAmount = Math.min(progress * scrollableWidth, scrollableWidth);
                section.scrollLeft = scrollAmount;
            }

            // Handle fade and scale effects
            imageRefs.current.forEach((imgDiv) => {
                if (!imgDiv) return;
                const rect = imgDiv.getBoundingClientRect();
                const isVisible = rect.left < window.innerWidth && rect.right > 0;
                const opacity = isVisible ? 1 : 0;
                const scale = isVisible ? 1 : 0.85; 

                imgDiv.style.opacity = opacity.toString();
                imgDiv.style.transform = `scale(${scale})`; 
                imgDiv.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative bg-backBlack" ref={containerRef}>
            <div
                ref={sectionRef}
                className="sticky top-0 overflow-x-hidden h-[800px]"
            >
                <section className="inline-flex px-6 gap-8">
                    {[...Array(7)].map((_, index) => (
                        <div
                            key={index}
                            ref={el => {
                                if (el) imageRefs.current[index] = el;
                            }}
                            className="w-[400px] flex-shrink-0 opacity-0"
                        >
                            <img
                                src={`/img/gallery/gallery${index + 1}.webp`}
                                alt={`Galería ${index + 1}`}
                                className={imageClasses[index % 7]}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Gallery;