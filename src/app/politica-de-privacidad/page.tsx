import { getLegalContentData } from '@/lib/content';

interface PoliticaPrivacidadData {
  headline: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export const metadata = {
  title: 'Política de Privacidad - SYX Estudio Madrid',
  description: 'Política de privacidad de ARLESSON ESTUDIO SL. Información sobre el tratamiento de datos personales.',
};

export default function PoliticaPrivacidad() {
  const data = getLegalContentData('politica-privacidad') as PoliticaPrivacidadData;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.headline}
          </h1>
          <p className="text-xl text-gray-600">
            Información sobre el tratamiento de sus datos personales
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Contacto para ejercer derechos</h3>
              <p className="text-blue-800">
                Para ejercer sus derechos puede contactar con nosotros en: syxestudio@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}