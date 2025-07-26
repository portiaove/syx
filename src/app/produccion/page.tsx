import { getExtrasContentData } from '@/lib/content';
import CTAButton from '@/components/CTAButton';
import ContactBlock from '@/components/ContactBlock';
import { generateSEOMetadata, SEOPresets } from '@/components/SEOHead';

interface ProduccionData {
  headline: string;
  blocks: {
    planificacion: {
      title: string;
      items: string[];
    };
    produccion_set: {
      title: string;
      items: string[];
    };
    postproduccion: {
      title: string;
      items: string[];
    };
    logistica: {
      title: string;
      items: string[];
    };
  };
  benefits: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.produccion);

export default function Produccion() {
  const data = getExtrasContentData('produccion') as ProduccionData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde la idea hasta el producto final, gestionamos cada aspecto de tu proyecto audiovisual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {Object.entries(data.blocks).map(([key, block]) => (
              <div key={key} className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold text-primary mb-6">{block.title}</h2>
                <ul className="space-y-3">
                  {block.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">
              ¿Por qué elegir nuestro servicio de producción?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-accent rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <CTAButton 
              href="/contacto" 
              label="Consultar proyecto"
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}