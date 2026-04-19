"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function EditorialGallery({ images }: { images: string[] }) {
  const imgs = images;

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">

        {/* Fila 1: grande (2/3) + pequeña (1/3) */}
        {imgs[0] && (
          <PhotoView src={imgs[0]}>
            <div className="relative md:col-span-2 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[0]} alt="Estudio SYX 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
            </div>
          </PhotoView>
        )}
        {imgs[1] && (
          <PhotoView src={imgs[1]}>
            <div className="relative md:col-span-1 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[1]} alt="Estudio SYX 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 2: panorámica full width */}
        {imgs[2] && (
          <PhotoView src={imgs[2]}>
            <div className="relative md:col-span-3 aspect-[21/9] cursor-pointer overflow-hidden">
              <Image src={imgs[2]} alt="Estudio SYX 3" fill className="object-cover" sizes="100vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 3: pequeña (1/3) + grande (2/3) */}
        {imgs[3] && (
          <PhotoView src={imgs[3]}>
            <div className="relative md:col-span-1 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[3]} alt="Estudio SYX 4" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}
        {imgs[4] && (
          <PhotoView src={imgs[4]}>
            <div className="relative md:col-span-2 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[4]} alt="Estudio SYX 5" fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 4: tres cuadradas */}
        {imgs[5] && (
          <PhotoView src={imgs[5]}>
            <div className="relative md:col-span-1 aspect-square cursor-pointer overflow-hidden">
              <Image src={imgs[5]} alt="Estudio SYX 6" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}
        {imgs[6] && (
          <PhotoView src={imgs[6]}>
            <div className="relative md:col-span-1 aspect-square cursor-pointer overflow-hidden">
              <Image src={imgs[6]} alt="Estudio SYX 7" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}
        {imgs[7] && (
          <PhotoView src={imgs[7]}>
            <div className="relative md:col-span-1 aspect-square cursor-pointer overflow-hidden">
              <Image src={imgs[7]} alt="Estudio SYX 8" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 5: panorámica full width */}
        {imgs[8] && (
          <PhotoView src={imgs[8]}>
            <div className="relative md:col-span-3 aspect-[21/9] cursor-pointer overflow-hidden">
              <Image src={imgs[8]} alt="Estudio SYX 9" fill className="object-cover" sizes="100vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 6: grande (2/3) + pequeña (1/3) */}
        {imgs[9] && (
          <PhotoView src={imgs[9]}>
            <div className="relative md:col-span-2 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[9]} alt="Estudio SYX 10" fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
            </div>
          </PhotoView>
        )}
        {imgs[10] && (
          <PhotoView src={imgs[10]}>
            <div className="relative md:col-span-1 aspect-[4/3] cursor-pointer overflow-hidden">
              <Image src={imgs[10]} alt="Estudio SYX 11" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </PhotoView>
        )}

        {/* Fila 7: última imagen full width */}
        {imgs[11] && (
          <PhotoView src={imgs[11]}>
            <div className="relative md:col-span-3 aspect-[16/9] cursor-pointer overflow-hidden">
              <Image src={imgs[11]} alt="Estudio SYX 12" fill className="object-cover" sizes="100vw" />
            </div>
          </PhotoView>
        )}

      </div>
    </PhotoProvider>
  );
}
