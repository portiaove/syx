import { getExtrasContentData } from '@/lib/content';
import Gallery from '@/components/Gallery';
import CTAButton from '@/components/CTAButton';
import { generateSEOMetadata, SEOPresets } from '@/components/SEOHead';

interface FondosData {
  headline: string;
  features: string[];
  gallery: string[];
  types: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.fondos);

export default function FondosFotografia() {
  const data = getExtrasContentData('fondos') as FondosData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fondos únicos pintados a mano que elevarán tus sesiones fotográficas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Características</h2>
              <ul className="space-y-4 mb-8">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">Tipos disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.types.map((type, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="text-gray-700 font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Galería de fondos</h2>
              <Gallery 
                images={data.gallery} 
                alt="Fondos de fotografía"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">
              ¿Interesado en nuestros fondos?
            </h2>
            <p className="text-gray-600 mb-6">
              Consulta disponibilidad y precios para tu próxima sesión
            </p>
            <CTAButton 
              href="/contacto" 
              label="Consultar disponibilidad"
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>

    </>
  );
}