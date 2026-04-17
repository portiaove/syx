import { getExtrasContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import EstudioGallery from "@/components/EstudioGallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface AlquilerData {
  equipment: string[];
}

interface ProduccionData {
  blocks: {
    [key: string]: {
      title: string;
      items: string[];
    };
  };
}

interface FondosData {
  gallery: string[];
  types: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.alquiler);

export default function Servicios() {
  const alquiler = getExtrasContentData("alquiler-material") as AlquilerData;
  const produccion = getExtrasContentData("produccion") as ProduccionData;
  const fondos = getExtrasContentData("fondos") as FondosData;

  return (
    <div className="pt-16">
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Servicios
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Iluminación profesional, producción integral y fondos pintados a mano.
        </p>
      </div>

      {/* Iluminación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
          Iluminación
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="divide-y divide-gray-100">
            {alquiler.equipment.map((item, i) => (
              <div key={i} className="py-4">
                <span className="text-xl text-primary">{item}</span>
              </div>
            ))}
          </div>
          <EstudioGallery
            images={[
              "/img/estudio1/_SX_5253-1__msi___jpg.jpg",
              "/img/estudio1/_SX_5254-1__msi___jpg.jpg",
            ]}
          />
        </div>
      </div>

      {/* Producción */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
            Producción
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {Object.entries(produccion.blocks).map(([key, block]) => (
              <div key={key}>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                  {block.title}
                </h3>
                <div className="space-y-2">
                  {block.items.map((item, i) => (
                    <p key={i} className="text-xl text-primary">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fondos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
          Fondos pintados
        </p>
      </div>
      <EstudioGallery images={fondos.gallery} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-wrap gap-3">
          {fondos.types.map((type, i) => (
            <span
              key={i}
              className="text-sm text-gray-400 border border-gray-200 px-3 py-1"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href="/contacto"
          label="¡Claro que Syx!"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
