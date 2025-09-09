import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">SYX ESTUDIO</h3>
            <p className="text-gray-300 mb-4">
              Plató audiovisual en Madrid especializado en fotografía y vídeo
              con luz natural controlable.
            </p>
            <div className="text-gray-300">
              <p>C/ Vizconde de Arlessón, 21</p>
              <p>28018 Madrid</p>
              <p className="mt-2">666 849 365</p>
              <p>syxestudio@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/estudio"
                  className="text-gray-300 hover:text-white"
                >
                  Estudio
                </Link>
              </li>
              <li>
                <Link
                  href="/caracteristicas"
                  className="text-gray-300 hover:text-white"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-white"
                >
                  Nosotros
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
          <div className="flex flex-col md:flex-row justify-between items-center">
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
  );
}
