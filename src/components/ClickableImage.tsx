'use client';

import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

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
  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <div className={`cursor-pointer ${className}`}>
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
      </PhotoView>
    </PhotoProvider>
  );
}