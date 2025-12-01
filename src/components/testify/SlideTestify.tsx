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
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const imagesWrapper = imagesWrapperRef.current;
    if (!container || !imagesWrapper) return;

    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!prevBtn || !nextBtn) return;

    const slides = SLIDES.map((s) => ({
      ...s,
      src: isMobile ? s.mobileSrc : s.desktopSrc,
    }));

    const ctx = gsap.context(() => {
      const titleEl = container.querySelector(".active-title");
      if (!titleEl) return;

      const split = new SplitText(titleEl, {
        type: "words",
        wordsClass: "word",
      });

      splitInstancesRef.current.push(split);

      gsap.set(".word", { opacity: 0, filter: "blur(40px)" });

      const animateTitle = () => {
        gsap.to(".word", {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.06,
        });
      };

      animateTitle();

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

      const goToIndex = (nextIndex: number, direction: "left" | "right") => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        const currentImgContainer = imagesWrapper.querySelector(".img:last-child");
        const currentImg =
          currentImgContainer?.querySelector("img") || null;

        const slide = slides[nextIndex];
        const { wrapper: newWrapper, img: newImg } = createImageContainer(slide.src);

        imagesWrapper.appendChild(newWrapper);

        const offset = window.innerWidth < 900 ? 100 : 400;

        gsap.set(newImg, { x: direction === "left" ? -offset : offset });

        gsap.to(newImg, {
          x: 0,
          duration: 1.3,
          ease: "hop",
        });

        if (currentImg) {
          gsap.to(currentImg, {
            x: direction === "left" ? offset : -offset,
            duration: 1.3,
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
            duration: 1.3,
            ease: "hop",
            onComplete: () => {
              const imgs = imagesWrapper.querySelectorAll(".img");
              if (imgs.length > 1) {
                for (let i = 0; i < imgs.length - 1; i++) imgs[i].remove();
              }
              isAnimatingRef.current = false;
            },
          }
        );

        const newTitle = slides[nextIndex].title;
        const titleEl = container.querySelector(".active-title");

        if (titleEl) {
          titleEl.innerHTML = newTitle;

          split.revert();
          const newSplit = new SplitText(titleEl, {
            type: "words",
            wordsClass: "word",
          });

          splitInstancesRef.current.push(newSplit);

          gsap.set(".word", { opacity: 0, filter: "blur(40px)" });

          animateTitle();
        }

        currentIndexRef.current = nextIndex;

        resetAutoplay();
      };

      const next = () => {
        const total = slides.length;
        const nextIndex = (currentIndexRef.current + 1) % total;
        goToIndex(nextIndex, "right");
      };

      const prev = () => {
        const total = slides.length;
        const nextIndex =
          (currentIndexRef.current - 1 + total) % total;
        goToIndex(nextIndex, "left");
      };

      prevBtn.addEventListener("click", prev);
      nextBtn.addEventListener("click", next);

      const startAutoplay = () => {
        autoplayRef.current = setInterval(() => {
          if (!isAnimatingRef.current) next();
        }, 4500);
      };

      const resetAutoplay = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        startAutoplay();
      };

      startAutoplay();
    }, containerRef);

    return () => {
      ctx.revert();
      splitInstancesRef.current.forEach((s) => s.revert());
      splitInstancesRef.current = [];
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="
        flex flex-col items-center
        relative w-full
        text-white
      "
    >
      <div
        className="
          relative
          w-full max-w-[950px]
          h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px]
          rounded-3xl overflow-hidden
        "
      >
        <div ref={imagesWrapperRef} className="absolute inset-0 images-wrapper" />
      </div>

      <div className="relative w-full max-w-[950px] mt-6">
        <h1
          className="
            active-title
            text-2xl sm:text-3xl md:text-4xl
            font-semibold
            tracking-tight
            leading-tight
          "
        >
          Robotic Precision in Motion
        </h1>
      </div>

      <div
        className="
          mt-6
          flex items-center justify-between
          w-full max-w-[950px]
        "
      >
        <div className="flex gap-4">
          <button
            ref={prevBtnRef}
            className="
              group w-10 h-10 rounded-full
              border border-white/20
              flex items-center justify-center
              bg-white/5 hover:bg-white/10
              transition-all
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 translate-x-[1px] group-hover:-translate-x-[1px] transition-transform"
            >
              <path
                d="M15 19l-7-7 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            ref={nextBtnRef}
            className="
              group w-10 h-10 rounded-full
              border border-white/20
              flex items-center justify-center
              bg-white/5 hover:bg-white/10
              transition-all
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 -translate-x-[1px] group-hover:translate-x-[1px] transition-transform"
            >
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">
          Motion Clinic · Gallery
        </p>
      </div>
    </section>
  );
};

export default SlideTestify;
