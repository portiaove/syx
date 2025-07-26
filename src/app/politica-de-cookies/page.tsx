import { getLegalContentData } from '@/lib/content';

interface PoliticaCookiesData {
  headline: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export const metadata = {
  title: 'Política de Cookies - SYX Estudio Madrid',
  description: 'Política de cookies de SYX Estudio. Información sobre el uso de cookies en nuestro sitio web.',
};

export default function PoliticaCookies() {
  const data = getLegalContentData('politica-cookies') as PoliticaCookiesData;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.headline}
          </h1>
          <p className="text-xl text-gray-600">
            Información sobre el uso de cookies en nuestro sitio web
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
            <div className="bg-amber-50 p-4 rounded">
              <h3 className="font-semibold text-amber-900 mb-2">Gestión de cookies</h3>
              <p className="text-amber-800 text-sm">
                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar 
                al funcionamiento del sitio web. Consulte la ayuda de su navegador para más información.
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