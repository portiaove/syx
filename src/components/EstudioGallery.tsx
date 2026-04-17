"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function EstudioGallery({ images }: { images: string[] }) {
  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {images.map((src, i) => (
          <PhotoView key={i} src={src}>
            <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
              <Image
                src={src}
                alt={`Estudio SYX ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
