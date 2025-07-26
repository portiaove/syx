'use client';

import Image from 'next/image';
import React, { useState, useCallback } from 'react';

interface GalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export default function Gallery({ images, alt = "Imagen de galería", className = "" }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
    }
  }, [selectedImageIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  }, [selectedImageIndex, images.length]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowLeft') {
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        } else if (e.key === 'Escape') {
          setSelectedImageIndex(null);
        }
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, goToPrevious, goToNext]);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            onClick={() => setSelectedImageIndex(index)}
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

      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImageIndex(null);
            }
          }}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ‹
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ›
              </button>
            )}

            <Image
              src={images[selectedImageIndex]}
              alt={`${alt} ${selectedImageIndex + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}