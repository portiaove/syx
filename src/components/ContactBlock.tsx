import { PHONE_1_DISPLAY, PHONE_2_DISPLAY, WHATSAPP_URL_1 } from "@/lib/phone";

interface ContactBlockProps {
  className?: string;
}

export default function ContactBlock({ className = "" }: ContactBlockProps) {
  return (
    <div className={`bg-gray-50 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            ¿Listo para reservar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600">{PHONE_1_DISPLAY}</p>
              <p className="text-gray-600">{PHONE_2_DISPLAY}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">syxestudio@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <a 
                href={WHATSAPP_URL_1}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                Enviar mensaje
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">C/ Vizconde de Arlessón, 21, 28018 Madrid</p>
            <p className="text-gray-600 mb-8">Lunes - Sábado 08:00 - 20:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}