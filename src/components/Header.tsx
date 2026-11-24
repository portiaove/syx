"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const { body, documentElement: html } = document;
    if (locked) {
      const prevBody = body.style.overflow;
      const prevHtml = html.style.overflow;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      return () => {
        body.style.overflow = prevBody;
        html.style.overflow = prevHtml;
      };
    }
  }, [locked]);
}

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

  useBodyScrollLock(isMenuOpen);

  // El menú se cierra cuando la navegación se confirma, no al pulsar. Cerrarlo
  // en el onClick lo hacía desaparecer antes de que la página cambiara, y el
  // hueco entre ambas cosas se notaba. Además así se cierra solo al volver
  // atrás con el navegador.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
          sobre fondo blanco. */}
      <header
        className={`z-[9999] fixed top-0 left-0 right-0 ${
          isHome ? "bg-transparent" : "bg-white"
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

      {/* Menú móvil */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed top-16 left-0 right-0 bottom-0 z-[9998] flex flex-col overflow-hidden ${
            isHome ? "bg-[#0f0e0f]" : "bg-white"
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
      )}
    </>
  );
}
