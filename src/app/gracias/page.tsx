import { getContentData } from '@/lib/content';
import CTAButton from '@/components/CTAButton';

interface GraciasData {
  headline: string;
  message: string;
  cta_back_home: boolean;
  additional_info: string[];
}

export const metadata = {
  title: 'Gracias - SYX Estudio Madrid',
  description: 'Gracias por contactar con SYX Estudio. Hemos recibido tu mensaje y te responderemos lo antes posible.',
};

export default function Gracias() {
  const data = getContentData('gracias') as GraciasData;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-green-50 rounded-lg p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {data.headline}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {data.message}
          </p>

          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información adicional:</h2>
            <ul className="space-y-2 text-gray-600">
              {data.additional_info.map((info, index) => (
                <li key={index} className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {info}
                </li>
              ))}
            </ul>
          </div>

          {data.cta_back_home && (
            <CTAButton 
              href="/" 
              label="Volver al inicio"
              className="text-lg px-8 py-4"
            />
          )}
        </div>
      </div>
    </section>
  );
}