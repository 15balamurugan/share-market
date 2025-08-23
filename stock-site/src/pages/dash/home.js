import React, { useState, useEffect } from "react";
import img1 from "../../asset/carousal-1.jpg";
import img2 from "../../asset/carousal-2.jpg";
import img3 from "../../asset/carousal-3.jpg";
import img4 from "../../asset/carousal-4.jpg";

const images = [img1, img2, img3, img4];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 sec

    return () => clearInterval(interval); // cleanup
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full min-h-[500px] max-w-6xl mx-auto mt-10">
      {/* Carousel Image */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="w-full h-[500px] object-cover transition-all duration-700"
        />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
