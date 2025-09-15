import { getExtrasContentData } from '@/lib/content';
import CTAButton from '@/components/CTAButton';
import { generateSEOMetadata, SEOPresets } from '@/components/SEOHead';

interface AlquilerMaterialData {
  headline: string;
  paragraphs: string[];
  benefits: string[];
  equipment: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.alquiler);

export default function AlquilerMaterial() {
  const data = getExtrasContentData('alquiler-material') as AlquilerMaterialData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="space-y-6 mb-8">
                {data.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beneficios</h2>
              <ul className="space-y-3">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipos Disponibles</h2>
              <ul className="space-y-4">
                {data.equipment.map((item, index) => (
                  <li key={index} className="flex items-center p-3 bg-white rounded border">
                    <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <CTAButton 
                  href="/contacto" 
                  label="Solicitar presupuesto"
                  className="w-full text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}