import { getContentData } from "@/lib/content";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";
import {
  PHONE_1_DISPLAY,
  PHONE_2_DISPLAY,
  WHATSAPP_URL_1,
  WHATSAPP_URL_2,
} from "@/lib/phone";

interface ContactoData {
  heading: string;
  address: string;
  email: string;
  hours: string;
  form_fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
  }>;
}

interface NosotrosData {
  description: string;
  highlights: { label: string; value: string }[];
}

export const metadata = generateSEOMetadata(SEOPresets.contacto);

export default function Contacto() {
  const data = getContentData("contacto") as ContactoData;
  const nosotros = getContentData("nosotros") as NosotrosData;

  return (
    <div>
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-2">
          Contacto
        </h1>
      </div>

      {/* Bloque sobre el espacio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {nosotros.description}
            </p>
            <p className="text-sm text-gray-400 tracking-wide">
              C/ Vizconde de Arlessón, 21, 28018 Madrid
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nosotros.highlights.map((h, i) => (
              <div key={i}>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-1">
                  {h.label}
                </p>
                <p className="text-lg font-bold text-primary">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa Google Maps en blanco y negro */}
      <div className="w-full h-[400px] md:h-[500px]" style={{ filter: "grayscale(100%)" }}>
        <iframe
          src="https://maps.google.com/maps?q=C%2F+Vizconde+de+Arless%C3%B3n%2C+21%2C+28018+Madrid&output=embed&hl=es"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación SYX Estudio"
        />
      </div>

      {/* Contacto e info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info de contacto */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
              Información
            </p>
            <div className="divide-y divide-gray-100">
              <div className="py-5 flex justify-between items-baseline">
                <span className="text-sm text-gray-400 tracking-wide">Dirección</span>
                <span className="text-lg text-primary text-right max-w-xs">{data.address}</span>
              </div>
              <div className="py-5 flex justify-between items-baseline">
                <span className="text-sm text-gray-400 tracking-wide">Horario</span>
                <span className="text-lg text-primary">{data.hours}</span>
              </div>
              <div className="py-5 flex justify-between items-baseline">
                <span className="text-sm text-gray-400 tracking-wide">Email</span>
                <a href={`mailto:${data.email}`} className="text-lg text-primary hover:text-cta transition-colors">
                  {data.email}
                </a>
              </div>
              <div className="py-5 flex justify-between items-center">
                <span className="text-sm text-gray-400 tracking-wide">Teléfono</span>
                <div className="text-right">
                  <a href={WHATSAPP_URL_1} target="_blank" rel="noopener noreferrer" className="block text-lg text-primary hover:text-cta transition-colors">
                    {PHONE_1_DISPLAY}
                  </a>
                  <a href={WHATSAPP_URL_2} target="_blank" rel="noopener noreferrer" className="block text-lg text-primary hover:text-cta transition-colors">
                    {PHONE_2_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="py-5 flex justify-between items-center">
                <span className="text-sm text-gray-400 tracking-wide">WhatsApp</span>
                <a
                  href={WHATSAPP_URL_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-primary hover:text-cta transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Enviar mensaje
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
              Escríbenos
            </p>
            <form action="/api/contact" method="POST" className="space-y-6">
              {data.form_fields?.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.label}{" "}
                    {field.required && <span className="text-cta">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-cta text-primary py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors font-medium"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
