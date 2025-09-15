import Link from "next/link";
import Image from "next/image";
import { getContentData } from "@/lib/content";

interface ContactoData {
  form_fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
  }>;
}

export default function Footer() {
  const data = getContentData('contacto') as ContactoData;

  return (
    <>
      {/* Logo and Contact Form Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Image
                src="/img/logo.png"
                alt="SYX Estudio Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-xl text-gray-600">
                Cuéntanos tu idea y te ayudamos a hacerla realidad
              </p>
            </div>
            
            <form action="/api/contact" method="POST" className="space-y-6">
              {data.form_fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && <span className="text-cta">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
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
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">SYX ESTUDIO</h3>
            <p className="text-gray-300 mb-4">
              Plató audiovisual en Madrid especializado en fotografía y vídeo
              con luz natural controlable.
            </p>
            <div className="text-gray-300">
              <a 
                href="https://maps.google.com/?q=C/ Vizconde de Arlessón, 21, 28018 Madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                C/ Vizconde de Arlessón, 21
              </a>
              <a 
                href="https://maps.google.com/?q=C/ Vizconde de Arlessón, 21, 28018 Madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                28018 Madrid
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=34666849365"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 hover:text-white transition-colors"
              >
                666 849 365
              </a>
              <a 
                href="mailto:syxestudio@gmail.com"
                className="block hover:text-white transition-colors"
              >
                syxestudio@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/el-estudio"
                  className="text-gray-300 hover:text-white"
                >
                  El Estudio
                </Link>
              </li>
              <li>
                <Link
                  href="/sostenibilidad"
                  className="text-gray-300 hover:text-white"
                >
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-gray-300 hover:text-white"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-gray-300 hover:text-white"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-gray-300 hover:text-white"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/declaracion-de-accesibilidad"
                  className="text-gray-300 hover:text-white"
                >
                  Declaración de Accesibilidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-300 text-sm">
              © 2025 ARLESSON ESTUDIO SL. Todos los derechos reservados.
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Desarrollado por <span className="text-white">aove</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
