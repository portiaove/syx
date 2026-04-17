import { getExtrasContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import EstudioGallery from "@/components/EstudioGallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface FondosData {
  headline: string;
  gallery: string[];
  types: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.fondos);

export default function Fondos() {
  const data = getExtrasContentData("fondos") as FondosData;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          Alquiler
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Fondos
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Pintados a mano, hasta 5 m de ancho. Texturas y colores únicos.
        </p>
      </div>

      <EstudioGallery images={data.gallery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-4 mb-12">
          {data.types.map((type, i) => (
            <span
              key={i}
              className="text-sm text-gray-400 tracking-wide border border-gray-200 px-3 py-1"
            >
              {type}
            </span>
          ))}
        </div>
        <CTAButton
          href="/contacto"
          label="Consultar disponibilidad"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
