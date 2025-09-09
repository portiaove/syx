'use client';

import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface GalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export default function Gallery({ images, alt = "Imagen de galería", className = "" }: GalleryProps) {
  return (
    <PhotoProvider>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <PhotoView key={index} src={image}>
            <div className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}