"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import "@/style/globalStyle.css";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create(
  "hop",
  "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

export const SlideTestify = () => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);
  const splitInstances = useRef<SplitText[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    textRefs.current.forEach((el) => {
      if (!el) return;
      const split = new SplitText(el, { type: "words", wordsClass: "word" });
      splitInstances.current.push(split);
      gsap.set(el.querySelectorAll(".word"), { opacity: 0, filter: "blur(30px)" });
    });
  }, []);

  const handleSlideChange = (swiper: any) => {
    const index = swiper.realIndex;
    const words = textRefs.current[index]?.querySelectorAll(".word");
    if (!words) return;

    gsap.to(".word", {
      opacity: 0,
      filter: "blur(50px)",
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(words, {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.05,
      duration: 1.5,
      ease: "hop",
    });
  };

  const slides = [
    { title: "Feast of Color", img: "/carousel/slide-img-1.jpg" },
    { title: "The Matador", img: "/carousel/slide-img-2.jpg" },
    { title: "Final Plea", img: "/carousel/slide-img-3.jpg" },
    { title: "Old Philosopher", img: "/carousel/slide-img-4.jpg" },
    { title: "Evening Waltz", img: "/carousel/slide-img-5.jpg" },
  ];

  return (
    <div className="relative overflow-hidden">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        effect={"fade"}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[100vh] flex items-center justify-center bg-black text-white overflow-hidden">
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute w-full h-full object-cover brightness-75"
              />
              <h1
                ref={(el) => (textRefs.current[i] = el!)}
                className="relative z-10 text-5xl font-semibold max-w-2xl text-center px-4 leading-tight"
              >
                {slide.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev-custom swiper-button-prev"></div>
        <div className="swiper-button-next-custom swiper-button-next"></div>
      </Swiper>

      <style>{`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          color: #fff;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          position: absolute;
          top: 50%;
          z-index: 10;
          transition: opacity 0.3s ease;
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          opacity: 0.7;
        }
        .swiper-button-prev-custom { left: 30px; }
        .swiper-button-next-custom { right: 30px; }
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          font-size: 50px;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          width: 10px; height: 10px; margin: 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: white;
          width: 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SlideTestify;
