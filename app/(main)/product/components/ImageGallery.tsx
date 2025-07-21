"use client";
import { useState } from "react";
import Image from "next/image";
export default function ImageGallery({ images }: { images: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const setImage = (index: number) => setCurrentIndex(index);

  return (
    <div className="flex-1 flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((image, i) => (
          <Image
            src={`http://localhost:3001/uploads/${image}`} // replace with your thumbnails
            key={i}
            alt={`Shoe thumbnail ${i}`}
            height={24}
            width={24}
            onClick={() => setImage(i)}
            className="w-16 h-16 rounded-lg cursor-pointer object-cover border border-gray-200 hover:border-black"
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative bg-white rounded-lg shadow-md w-[400px] h-[400px] flex items-center justify-center">
        <Image
          src={`http://localhost:3001/uploads/${images[currentIndex]}`} // replace with your thumbnails
          alt={`product-pic`}
          height={200}
          width={200}
          className="rounded-lg cursor-pointer object-cover border border-gray-200 hover:border-black"
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </div>
  );
}
