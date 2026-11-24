"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useOverlay } from "@/lib/overlay";

// Con trailingSlash: true la ruta real de cada página lleva barra final. Sin
// ella el router no encuentra el payload de navegación y Next se rinde a una
// recarga completa del documento, que es lo que daba la sensación de
// trompicones al pulsar el menú.
const navLinks = [
  { href: "/el-estudio/", label: "EL ESTUDIO" },
  { href: "/caracteristicas/", label: "CARACTERÍSTICAS" },
  { href: "/contacto/", label: "CONTACTO" },
];

const withTrailingSlash = (path: string) =>
  path.endsWith("/") ? path : `${path}/`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // El menú es una capa como el visor: bloquea el scroll de la página mientras
  // está abierto y vive en el historial, de modo que el gesto de atrás lo
  // cierra en vez de sacarte de la página. Ver src/lib/overlay.ts.
  useOverlay(isMenuOpen, closeMenu);

  // El menú se cierra cuando la navegación se confirma, no al pulsar. Cerrarlo
  // en el onClick lo hacía desaparecer antes de que la página cambiara, y el
  // hueco entre ambas cosas se notaba.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const alPulsarTecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setIsMenuOpen(false);
    };

    // El panel solo se pinta en móvil. Si la ventana cruza a escritorio con el
    // menú abierto, desaparecería de la vista dejando el estado en abierto y
    // la página sin scroll, sin nada visible que cerrar.
    const escritorio = window.matchMedia("(min-width: 768px)");
    const alCambiarElAncho = () => {
      if (escritorio.matches) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", alPulsarTecla);
    escritorio.addEventListener("change", alCambiarElAncho);
    return () => {
      window.removeEventListener("keydown", alPulsarTecla);
      escritorio.removeEventListener("change", alCambiarElAncho);
    };
  }, [isMenuOpen]);

  // Pulsar el enlace de la página en la que ya estás no cambia el pathname, de
  // modo que el efecto no salta y ese caso hay que cerrarlo a mano.
  const closeIfCurrentRoute = (href: string) => {
    if (withTrailingSlash(href) === withTrailingSlash(pathname)) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* La cabecera va fixed en todas las páginas: si alterna entre fixed y
          relative según la ruta, cambia de modo de posicionamiento en cada
          navegación. En la home flota sobre el vídeo y en el resto se apoya
          sobre fondo blanco.

          El z-index es bajo a propósito. La cabecera es parte de la página, no
          una capa por encima de todo: estaba en 9999 y se colaba sobre el
          visor de fotos, que la librería monta en 2000. Desde ahí se podía
          abrir el menú encima de una foto a pantalla completa. */}
      <header
        className={`z-50 fixed top-0 left-0 right-0 transition-colors duration-200 motion-reduce:transition-none ${
          isHome
            ? isMenuOpen
              ? "bg-[#0f0e0f]"
              : "bg-transparent"
            : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={() => closeIfCurrentRoute("/")}
                className={`text-2xl font-bold ${
                  isHome ? "text-white" : "text-primary"
                }`}
              >
                3x2 = SYX
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isHome
                      ? "text-white/90 hover:text-cta"
                      : "text-gray-700 hover:text-cta"
                  } px-3 py-2 text-sm font-medium`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Botón hamburguesa móvil */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  isHome
                    ? "text-white hover:text-cta"
                    : "text-gray-700 hover:text-primary"
                } p-2`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* La home arranca con un hero a pantalla completa por debajo de la
          cabecera; el resto de páginas necesitan que se les reserve el hueco. */}
      {!isHome && <div className="h-16" aria-hidden="true" />}

      {/* Menú móvil. Se pinta siempre y se oculta con clases en lugar de
          montarse y desmontarse: así tiene transición también al cerrarse.
          visibility entra en la transición para que la salida se vea entera y
          para que, una vez oculto, los enlaces queden fuera del tabulador.

          Se anima translate y no transform: Tailwind 4 aplica el
          desplazamiento con la propiedad translate, de modo que nombrar
          transform en la lista dejaba el deslizamiento sin animar. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 flex flex-col overflow-hidden transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${
          isHome ? "bg-[#0f0e0f]" : "bg-white"
        } ${
          isMenuOpen
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-1 pointer-events-none"
        }`}
        style={{
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="px-4 pt-4 pb-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={isMenuOpen ? undefined : -1}
              className={`block px-3 py-3 text-base font-medium ${
                isHome
                  ? "text-white hover:text-cta"
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={() => closeIfCurrentRoute(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
