'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function ClickableImage({ 
  src, 
  alt, 
  className = "", 
  sizes,
  fill = false,
  width,
  height
}: ClickableImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div 
        className={`cursor-pointer ${className}`}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className="hover:opacity-90 transition-opacity duration-300"
          sizes={sizes}
        />
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
            >
              ×
            </button>
            <Image
              src={src}
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