"use client";

import { useState, useRef, useEffect } from "react";
import BestsellersCard from "./bestsellersCard";
import Image from "next/image";

type Slide = {
  id: number;
  coverURL: string;
  rating: number;
  author: Array<{ name: string; pictureURL: string }>;
};

const slides: Slide[] = [
  {
    id: 1,
    coverURL: "/sample/home-bestsellers/placeholder-0.png",
    rating: 4.5,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 2,
    coverURL: "/sample/home-bestsellers/placeholder-1.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 3,
    coverURL: "/sample/home-bestsellers/placeholder-2.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 4,
    coverURL: "/sample/home-bestsellers/placeholder-3.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 5,
    coverURL: "/sample/home-bestsellers/placeholder-4.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 6,
    coverURL: "/sample/home-bestsellers/placeholder-0.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },

  {
    id: 7,
    coverURL: "/sample/home-bestsellers/placeholder-1.png",
    rating: 4,

    author: [
      {
        name: "گابریل گارسیا مارکز",
        pictureURL: "/sample/home-bestsellers/picture.png",
      },
    ],
  },
];

export default function BestsellersSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeSlide = containerRef.current.querySelector(
        `[data-active="true"]`
      ) as HTMLDivElement;

      if (activeSlide) {
        const height = activeSlide.offsetHeight;
        containerRef.current.style.height = `${height}px`;
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl">
      <div className="flex items-center justify-center">
        <button
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 bg-white z-50 absolute my-auto top-1/2 bottom-1/2 -right-7 mr-5 sm:mr-0"
          onClick={handlePrev}
        >
          <Image
            src={"/icon/arrow-right.svg"}
            alt={"arrow-right"}
            width={24}
            height={24}
          />
        </button>

        <div
          ref={containerRef}
          className="relative w-full flex justify-center items-center transition-all duration-500 overflow-x-clip"
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isLeft1 =
              index === (activeIndex - 1 + slides.length) % slides.length;
            const isLeft2 =
              index === (activeIndex - 2 + slides.length) % slides.length;
            const isRight1 = index === (activeIndex + 1) % slides.length;
            const isRight2 = index === (activeIndex + 2) % slides.length;

            let className =
              "absolute transition-all duration-500 transform flex flex-col items-center origin-center ";
            if (isActive) {
              className += "scale-100 hover:scale-110 z-20 translate-x-0";
            } else if (isLeft1) {
              className +=
                "scale-90 -translate-x-[34%] sm:-translate-x-[45%] z-10 ";
            } else if (isLeft2) {
              className +=
                "scale-75 -translate-x-[67%] sm:-translate-x-[85%] z-0 opacity-80 ";
            } else if (isRight1) {
              className +=
                "scale-90 translate-x-[50%] sm:translate-x-[60%] z-10 ";
            } else if (isRight2) {
              className +=
                "scale-75 translate-x-[80%] sm:translate-x-[100%] z-0 opacity-80";
            } else {
              className += "scale-50 opacity-0 z-0";
            }

            return (
              <BestsellersCard
                {...slide}
                customClass={className}
                isActive={isActive}
                key={slide.id}
              />
            );
          })}
        </div>

        <button
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 bg-white z-50 absolute my-auto top-1/2 bottom-1/2 -left-7 ml-5 sm:ml-0"
          onClick={handleNext}
        >
          <Image
            src={"/icon/arrow-left.svg"}
            alt={"arrow-left"}
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
