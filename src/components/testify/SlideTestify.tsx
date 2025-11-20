"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import "@/style/globalStyle.css";

gsap.registerPlugin(SplitText, CustomEase);

CustomEase.create(
  "hop",
  "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

const SLIDES = [
  {
    title: "Robotic Precision in Motion",
    desktopSrc: "/img/cubeSlide/cube1.webp",
    mobileSrc: "/img/cubeSlide/cube1-cell.webp",
  },
  {
    title: "Designed Around Your Recovery",
    desktopSrc: "/img/cubeSlide/cube2.webp",
    mobileSrc: "/img/cubeSlide/cube2-cell.webp",
  },
  {
    title: "Inside the Motion Clinic Suite",
    desktopSrc: "/img/cubeSlide/cube3.webp",
    mobileSrc: "/img/cubeSlide/cube3-cell.webp",
  },
  {
    title: "Every Angle Under Control",
    desktopSrc: "/img/cubeSlide/cube4.webp",
    mobileSrc: "/img/cubeSlide/cube4-cell.webp",
  },
  {
    title: "Real Patients. Real Movement.",
    desktopSrc: "/img/cubeSlide/testify.webp",
    mobileSrc: "/img/cubeSlide/testify-cell.webp",
  },
];

export const SlideTestify: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const splitInstancesRef = useRef<SplitText[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const imagesWrapper = imagesWrapperRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!container || !imagesWrapper || !prevBtn || !nextBtn) return;

    const slides = SLIDES.map((s) => ({
      ...s,
      src: isMobile ? s.mobileSrc : s.desktopSrc,
    }));

    const ctx = gsap.context(() => {
      const titleContainers =
        Array.from(container.querySelectorAll(".slide-title-container"));

      splitInstancesRef.current.forEach((s) => s.revert());
      splitInstancesRef.current = [];

      titleContainers.forEach((slideEl) => {
        const titleEl = slideEl.querySelector(".title");
        if (!titleEl) return;

        const split = new SplitText(titleEl, {
          type: "words",
          wordsClass: "word",
        });

        splitInstancesRef.current.push(split);
      });

      const allWords = container.querySelectorAll(".word");
      gsap.set(allWords, { opacity: 0, filter: "blur(50px)" });

      const showWordsForIndex = (index: number) => {
        const all = container.querySelectorAll(".word");
        gsap.to(all, {
          opacity: 0,
          filter: "blur(60px)",
          duration: 1.2,
          ease: "power2.out",
        });

        const words =
          titleContainers[index]?.querySelectorAll(".word") || [];

        gsap.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.06,
        });

        titleContainers.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === index ? 1 : 0.25,
            duration: 0.8,
          });
        });
      };

      showWordsForIndex(0);

      const createImageContainer = (src: string) => {
        const wrapper = document.createElement("div");
        wrapper.className =
          "img absolute inset-0 will-change-transform overflow-hidden";

        const img = document.createElement("img");
        img.src = src;
        img.className = "w-full h-full object-cover";

        wrapper.appendChild(img);
        return { wrapper, img };
      };

      const first = createImageContainer(slides[0].src);
      imagesWrapper.appendChild(first.wrapper);

      gsap.set(first.wrapper, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });

      const getSlideOffset = () =>
        window.innerWidth < 1000 ? 100 : 500;

      const goToIndex = (nextIndex: number, direction: "left" | "right") => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        const currentImgContainer =
          imagesWrapper.querySelector(".img:last-child");
        const currentImg =
          currentImgContainer?.querySelector("img") || null;

        const slide = slides[nextIndex];
        const { wrapper: newWrapper, img: newImg } =
          createImageContainer(slide.src);

        imagesWrapper.appendChild(newWrapper);

        const offset = getSlideOffset();

        gsap.set(newImg, {
          x: direction === "left" ? -offset : offset,
        });

        gsap.to(newImg, {
          x: 0,
          duration: 1.5,
          ease: "hop",
        });

        if (currentImg) {
          gsap.to(currentImg, {
            x: direction === "left" ? offset : -offset,
            duration: 1.5,
            ease: "hop",
          });
        }

        gsap.fromTo(
          newWrapper,
          {
            clipPath:
              direction === "left"
                ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
            onComplete: () => {
              const imgs =
                imagesWrapper.querySelectorAll(".img");
              if (imgs.length > 1) {
                for (let i = 0; i < imgs.length - 1; i++) {
                  imgs[i].remove();
                }
              }
              isAnimatingRef.current = false;
            },
          }
        );

        showWordsForIndex(nextIndex);
        currentIndexRef.current = nextIndex;
      };

      const handleNext = () => {
        const total = slides.length;
        const nextIndex = (currentIndexRef.current + 1) % total;
        goToIndex(nextIndex, "right");
      };

      const handlePrev = () => {
        const total = slides.length;
        const nextIndex =
          (currentIndexRef.current - 1 + total) % total;
        goToIndex(nextIndex, "left");
      };

      prevBtn.addEventListener("click", handlePrev);
      nextBtn.addEventListener("click", handleNext);

      return () => {
        prevBtn.removeEventListener("click", handlePrev);
        nextBtn.removeEventListener("click", handleNext);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      splitInstancesRef.current.forEach((s) => s.revert());
      splitInstancesRef.current = [];
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="
        motion-carousel
        relative w-full
        bg-[#050509] 
        text-white
        flex flex-col 
        px-6 py-16 md:px-10
        overflow-hidden
      "
    >
      {/* IMAGEN */}
      <div
        className="
          relative w-full
          h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px]
          rounded-3xl overflow-hidden
          border border-white/8
          bg-[#050509]
        "
      >
        <div ref={imagesWrapperRef} className="absolute inset-0 images-wrapper" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* TITULOS */}
      <div className="mt-10 space-y-3">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="slide-title-container transition-opacity duration-500"
          >
            <h1
              className="
                title
                text-2xl sm:text-3xl md:text-4xl
                font-semibold tracking-tight
                leading-tight
              "
            >
              {slide.title}
            </h1>
          </div>
        ))}
      </div>

      {/* CONTROLES */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            ref={prevBtnRef}
            className="
              group relative w-10 h-10 rounded-full
              border border-white/20
              flex items-center justify-center
              bg-white/5 hover:bg-white/10
              overflow-hidden
              transition-all duration-300
            "
            aria-label="Previous slide"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 translate-x-[1px] group-hover:-translate-x-[1px] transition-transform duration-300"
            >
              <path
                d="M15 19l-7-7 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextBtnRef}
            className="
              group relative w-10 h-10 rounded-full
              border border-white/20
              flex items-center justify-center
              bg-white/5 hover:bg-white/10
              overflow-hidden
              transition-all duration-300
            "
            aria-label="Next slide"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 -translate-x-[1px] group-hover:translate-x-[1px] transition-transform duration-300"
            >
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-white/50">
          Motion Clinic · Gallery
        </p>
      </div>

      <style>{`
        .motion-carousel .slide-title-container {
          opacity: 0.25;
        }

        .motion-carousel .slide-title-container:first-child {
          opacity: 1;
        }

        .motion-carousel .img img {
          filter: url("#blur-matrix");
        }

        @supports not (filter: url("#blur-matrix")) {
          .motion-carousel .img img {
            filter: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SlideTestify;
