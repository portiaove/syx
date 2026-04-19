import { getContentData } from "@/lib/content";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import EstudioGallery from "@/components/EstudioGallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface CaracteristicasData {
  space: {
    total_m2: number;
    studio1_m2: number;
    office_m2: number;
    max_height_m: number;
  };
  location: {
    description: string;
  };
  entry_for_vehicles: boolean;
  installations: string[];
  cta: {
    label: string;
    href: string;
  };
}

export const metadata = generateSEOMetadata(SEOPresets.caracteristicas);

export default function Caracteristicas() {
  const data = getContentData("caracteristicas") as CaracteristicasData;

  const specs = [
    { label: "Superficie total", value: `${data.space.total_m2} m²` },
    { label: "Estudio", value: `${data.space.studio1_m2} m²` },
    { label: "Oficina", value: `${data.space.office_m2} m²` },
    { label: "Altura máxima", value: `${data.space.max_height_m} m` },
    { label: "Acceso vehículos", value: data.entry_for_vehicles ? "Sí" : "No" },
    { label: "Ubicación", value: data.location.description },
  ];

  return (
    <div>
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-2">
          Características
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Especificaciones técnicas e instalaciones del espacio.
        </p>
      </div>

      {/* Plano — móvil: vertical pantalla completa; desktop: rotada 90° para mostrar horizontal */}
      <div className="relative h-screen md:hidden">
        <Image
          src="/img/caracteristicas__msi___jpg.jpg"
          alt="Plano y características del estudio SYX"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="hidden md:block w-full overflow-hidden relative"
        style={{ height: "56.25vw" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/caracteristicas__msi___jpg.jpg"
          alt="Plano y características del estudio SYX"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "100vw",
            width: "auto",
            maxWidth: "none",
            transform: "translate(-50%, -50%) rotate(90deg)",
          }}
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

        {/* Instalaciones — centradas */}
        <div className="text-center mb-16">
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
