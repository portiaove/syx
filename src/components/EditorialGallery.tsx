"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const PATTERN = [
  { spanClass: "md:col-span-2", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 66vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-3", aspect: "aspect-[21/9]", sizes: "100vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-2", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 66vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-square", sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-square", sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-square", sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-3", aspect: "aspect-[21/9]", sizes: "100vw" },
  { spanClass: "md:col-span-2", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 66vw" },
  { spanClass: "md:col-span-1", aspect: "aspect-[4/3]",  sizes: "(max-width: 768px) 100vw, 33vw" },
  { spanClass: "md:col-span-3", aspect: "aspect-[16/9]", sizes: "100vw" },
];

export default function EditorialGallery({ images }: { images: string[] }) {
  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
        {images.map((src, i) => {
          const { spanClass, aspect, sizes } = PATTERN[i % PATTERN.length];
          return (
            <PhotoView key={i} src={src}>
              <div className={`relative ${aspect} ${spanClass} cursor-pointer overflow-hidden`}>
                <Image
                  src={src}
                  alt={`Estudio SYX ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes={sizes}
                />
              </div>
            </PhotoView>
          );
        })}
      </div>
    </PhotoProvider>
  );
}
