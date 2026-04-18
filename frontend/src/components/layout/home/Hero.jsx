import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const images = [
    "/s1.jpeg",
    "/s2.jpg",
    "/s3.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Auto-slide every 5.5 seconds (between 5 and 6 seconds as requested)
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5500);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[300px] md:h-[500px] bg-gray-200 overflow-hidden group rounded-lg shadow-md mt-2">
      {/* Slides */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img 
              src={image} 
              alt={`Plaza Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 p-3 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 p-3 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
