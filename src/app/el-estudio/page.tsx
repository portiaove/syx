import { getContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import EditorialGallery from "@/components/EditorialGallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface EstudioData {
  summary: string;
  gallery: string[];
}

interface CaracteristicasData {
  space: {
    total_m2: number;
    max_height_m: number;
  };
  cta: {
    label: string;
    href: string;
  };
}

export const metadata = generateSEOMetadata(SEOPresets.estudio1);

export default function ElEstudio() {
  const estudio = getContentData("estudio") as EstudioData;
  const caract = getContentData("caracteristicas") as CaracteristicasData;

  const specs = [
    `${caract.space.total_m2} m²`,
    `${caract.space.max_height_m} m altura`,
    "Luz natural controlable",
    "Acceso vehículos",
    "Vallecas, Madrid",
    "Responsable con el medio ambiente",
    "Adaptado a movilidad reducida",
  ];

  return (
    <div>
      {/* Cabecera mínima */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-2">
          El Estudio
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          {estudio.summary}
        </p>
      </div>

      {/* Galería editorial a ancho completo */}
      <EditorialGallery images={estudio.gallery} />

      {/* Specs y CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-12">
          {specs.map((spec, i) => (
            <span key={i} className="text-sm text-gray-400 tracking-wide">
              {spec}
            </span>
          ))}
        </div>
        <CTAButton
          href={caract.cta.href}
          label={caract.cta.label}
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
