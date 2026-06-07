"use client";

import { useEffect, useState } from "react";

const images = [
  "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2FEid%2520ul%2520adha%2520main%2520banner%25201600x497%2520copy.jpg.jpeg&w=1280&q=50",
  "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FWeb%2520Banner%2Fprotein%2520bar%2520web%2520banner.jpeg&w=1280&q=50",
  "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2Fcentrum%2520adult%2520we%2520banner.jpg&w=1280&q=50",
  "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2Fcac%2520new%2520webb%2520banner.jpg&w=1280&q=50",
  "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2Fskin%2520care%2520home%2520page%2520web%2520banner.jpg&w=1280&q=50",
];

// [last, ...images, first]
const slides = [images[images.length - 1], ...images, images[0]];

export default function Carousel() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    // reached cloned first slide
    if (current === slides.length - 1) {
      setTransition(false);
      setCurrent(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }

    // reached cloned last slide
    if (current === 0) {
      setTransition(false);
      setCurrent(images.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex gap-4 ${
          transition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(calc(10vw - ${current * 82}vw))`,
        }}
      >
        {slides.map((src, index) => (
          <div key={index} className="w-[80vw] h-[50vh] shrink-0">
            <img
              src={src}
              alt=""
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
      >
        →
      </button>
    </div>
  );
}
