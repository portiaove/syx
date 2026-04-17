import { getExtrasContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface AlquilerMaterialData {
  headline: string;
  equipment: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.alquiler);

export default function Iluminacion() {
  const data = getExtrasContentData("alquiler-material") as AlquilerMaterialData;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          Alquiler
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Iluminación
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Equipos PROFOTO de última generación con soporte técnico incluido.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="divide-y divide-gray-100">
          {data.equipment.map((item, i) => (
            <div key={i} className="py-5">
              <span className="text-xl text-primary">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href="/contacto"
          label="Solicitar presupuesto"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
