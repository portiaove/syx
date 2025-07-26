import { getLegalContentData } from '@/lib/content';

interface DeclaracionAccesibilidadData {
  headline: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export const metadata = {
  title: 'Declaración de Accesibilidad - SYX Estudio Madrid',
  description: 'Declaración de accesibilidad de SYX Estudio conforme al Real Decreto 1112/2018.',
};

export default function DeclaracionAccesibilidad() {
  const data = getLegalContentData('declaracion-accesibilidad') as DeclaracionAccesibilidadData;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.headline}
          </h1>
          <p className="text-xl text-gray-600">
            Información sobre la accesibilidad de nuestro sitio web
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
              <h3 className="font-semibold text-blue-900 mb-2">Mejora continua</h3>
              <p className="text-blue-800 text-sm">
                Trabajamos continuamente para mejorar la accesibilidad de nuestro sitio web. 
                Si encuentra algún problema de accesibilidad, por favor contáctenos para que podamos solucionarlo.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Fecha de preparación: {new Date(2024, 0, 1).toLocaleDateString('es-ES')}<br />
              Última revisión: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}