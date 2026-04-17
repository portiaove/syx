import { getExtrasContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface ProduccionData {
  headline: string;
  blocks: {
    [key: string]: {
      title: string;
      items: string[];
    };
  };
}

export const metadata = generateSEOMetadata(SEOPresets.produccion);

export default function Atrezzo() {
  const data = getExtrasContentData("produccion") as ProduccionData;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          Alquiler
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Producción
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Gestión integral del proyecto audiovisual, de la idea al producto final.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {Object.entries(data.blocks).map(([key, block]) => (
            <div key={key}>
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                {block.title}
              </h2>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href="/contacto"
          label="Consultar proyecto"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
