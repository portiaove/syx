'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export default function Gallery({ images, alt = "Imagen de galería", className = "" }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt={alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}