import { getContentData } from '@/lib/content';
import CTAButton from '@/components/CTAButton';
import { generateSEOMetadata, SEOPresets } from '@/components/SEOHead';

interface SostenibilidadData {
  headline: string;
  net_zero_statement: string;
  initiatives: string[];
  ods: number[];
  certifications: string[];
  pdf: {
    label: string;
    href: string;
  };
}

export const metadata = generateSEOMetadata(SEOPresets.sostenibilidad);

export default function Sostenibilidad() {
  const data = getContentData('sostenibilidad') as SostenibilidadData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {data.net_zero_statement}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Nuestras iniciativas</h2>
              <div className="space-y-6">
                {data.initiatives.map((initiative, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 text-lg">{initiative}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Certificaciones</h2>
              <div className="space-y-4 mb-8">
                {data.certifications.map((certification, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <span className="text-green-800 font-medium">{certification}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">ODS Comprometidos</h2>
              <div className="grid grid-cols-4 gap-3">
                {data.ods.map((ods) => (
                  <div key={ods} className="bg-blue-100 text-blue-800 text-center py-2 rounded font-semibold">
                    ODS {ods}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Más información sobre nuestro compromiso
            </h2>
            <p className="text-gray-600 mb-6">
              Descarga nuestro Green Book para conocer en detalle todas nuestras prácticas sostenibles
            </p>
            <CTAButton 
              href={data.pdf.href} 
              label={data.pdf.label}
              variant="secondary"
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>

    </>
  );
}