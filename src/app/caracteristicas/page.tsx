import { getContentData } from "@/lib/content";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import EstudioGallery from "@/components/EstudioGallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface CaracteristicasData {
  space: {
    total_m2: number;
    studio1_m2: number;
    max_height_m: number;
  };
  location: {
    description: string;
  };
  entry_for_vehicles: boolean;
  installations: string[];
  sustainability: string[];
  cta: {
    label: string;
    href: string;
  };
}

export const metadata = generateSEOMetadata(SEOPresets.estudio1);

export default function Caracteristicas() {
  const data = getContentData("caracteristicas") as CaracteristicasData;

  const specs = [
    { label: "Superficie total", value: `${data.space.total_m2} m²` },
    { label: "Estudio", value: `${data.space.studio1_m2} m²` },
    { label: "Altura máxima", value: `${data.space.max_height_m} m` },
    { label: "Acceso vehículos", value: data.entry_for_vehicles ? "Sí" : "No" },
    { label: "Ubicación", value: data.location.description },
  ];

  return (
    <div className="pt-16">
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Características
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Especificaciones técnicas e instalaciones del espacio.
        </p>
      </div>

      {/* Plano / imagen técnica */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-gray-50">
        <Image
          src="/img/caracteristicas__msi___jpg.jpg"
          alt="Plano y características del estudio SYX"
          width={1600}
          height={900}
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>

      {/* Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="divide-y divide-gray-100 mb-16">
          {specs.map((spec, i) => (
            <div key={i} className="flex justify-between items-baseline py-5">
              <span className="text-sm text-gray-400 tracking-wide">
                {spec.label}
              </span>
              <span className="text-xl font-medium text-primary">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Instalaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Instalaciones
            </p>
            <div className="space-y-3">
              {data.installations.map((item, i) => (
                <p key={i} className="text-xl text-primary">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Sostenibilidad
            </p>
            <div className="space-y-3">
              {data.sustainability.map((item, i) => (
                <p key={i} className="text-xl text-primary">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Galería extra del espacio */}
      <EstudioGallery
        images={[
          "/img/estudio1/_SX_4150-1__msi___jpg.jpg",
          "/img/estudio1/_SX_5258-1__msi___jpg.jpg",
          "/img/estudio1/_SX_5248-1__msi___jpg.jpg",
          "/img/estudio1/_SX_4127-1__msi___jpg.jpg",
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href={data.cta.href}
          label={data.cta.label}
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
