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

export const metadata = generateSEOMetadata(SEOPresets.contacto);

export default function Contacto() {
  const data = getContentData("contacto") as ContactoData;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {data.heading}
          </h1>
          <p className="text-xl text-gray-600">
            Estamos aquí para ayudarte con tu próximo proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">
              Información de contacto
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Dirección
                </h3>
                <p className="text-gray-600">{data.address}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Teléfonos
                </h3>
                <p className="text-gray-600">
                  <a
                    href={WHATSAPP_URL_1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cta"
                  >
                    {PHONE_1_DISPLAY}
                  </a>
                </p>
                <p className="text-gray-600">
                  <a
                    href={WHATSAPP_URL_2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cta"
                  >
                    {PHONE_2_DISPLAY}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  <a href={`mailto:${data.email}`} className="hover:text-cta">
                    {data.email}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  WhatsApp
                </h3>
                <a
                  href={WHATSAPP_URL_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Enviar mensaje
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Horario
                </h3>
                <p className="text-gray-600">{data.hours}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">
              Envíanos un mensaje
            </h2>

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
    </section>
  );
}
