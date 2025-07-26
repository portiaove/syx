import { getLegalContentData } from '@/lib/content';

interface AvisoLegalData {
  owner: string;
  nif: string;
  address: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export const metadata = {
  title: 'Aviso Legal - SYX Estudio Madrid',
  description: 'Aviso legal de ARLESSON ESTUDIO SL. Información sobre propiedad intelectual y condiciones de uso del sitio web.',
};

export default function AvisoLegal() {
  const data = getLegalContentData('aviso-legal') as AvisoLegalData;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Aviso Legal
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Datos del titular</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Razón social:</strong> {data.owner}</p>
              <p><strong>NIF:</strong> {data.nif}</p>
              <p><strong>Domicilio:</strong> {data.address}</p>
            </div>
          </div>

          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}