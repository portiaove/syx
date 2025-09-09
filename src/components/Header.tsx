"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const { body, documentElement: html } = document;
    if (locked) {
      const prevBody = body.style.overflow;
      const prevHtml = html.style.overflow;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden"; // ayuda en iOS
      return () => {
        body.style.overflow = prevBody;
        html.style.overflow = prevHtml;
      };
    }
  }, [locked]);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);

  // refs para accesibilidad/foco
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isMenuOpen);

  // Cerrar dropdown "EXTRAS" si clicas fuera (versión escritorio)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExtrasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExtrasLinkClick = () => setIsExtrasOpen(false);
  const handleMobileLinkClick = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              SYX ESTUDIO
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/estudio-1"
                className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium"
              >
                ESTUDIO 1
              </Link>
              <Link
                href="/caracteristicas"
                className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium"
              >
                CARACTERÍSTICAS
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsExtrasOpen((v) => !v)}
                  className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium flex items-center cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={isExtrasOpen}
                >
                  EXTRAS
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isExtrasOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        href="/alquiler-de-material"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Alquiler de Material
                      </Link>
                      <Link
                        href="/produccion"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Producción
                      </Link>
                      <Link
                        href="/fondos-de-fotografia"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Fondos de Fotografía
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/nosotros"
                className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium"
              >
                NOSOTROS
              </Link>
              <Link
                href="/contacto"
                className="bg-cta text-primary px-4 py-2 text-sm font-medium rounded hover:bg-yellow-600"
              >
                RESERVA
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 hover:text-primary p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* --- OVERLAY MÓVIL A PANTALLA COMPLETA --- */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="
              fixed inset-0 z-[9999] bg-white
              h-[100vh] h-[100svh] h-[100dvh] w-full
              overflow-y-auto overscroll-contain
            "
            // padding con safe areas iOS
            style={{
              paddingTop: "max(16px, env(safe-area-inset-top))",
              paddingRight: "max(16px, env(safe-area-inset-right))",
              paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              paddingLeft: "max(16px, env(safe-area-inset-left))",
            }}
          >
            {/* Barra superior dentro del overlay */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Link
                href="/"
                id="mobile-menu-title"
                className="text-lg font-semibold text-gray-900"
                onClick={handleMobileLinkClick}
              >
                SYX ESTUDIO
              </Link>
              <button
                ref={closeButtonRef}
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Cerrar menú"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Links del menú */}
            <div className="px-2 pt-2 pb-6 space-y-1">
              <Link
                href="/"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                INICIO
              </Link>
              <Link
                href="/estudio-1"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                ESTUDIO 1
              </Link>
              <Link
                href="/caracteristicas"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                CARACTERÍSTICAS
              </Link>
              <Link
                href="/alquiler-de-material"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                Alquiler de Material
              </Link>
              <Link
                href="/produccion"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                Producción
              </Link>
              <Link
                href="/fondos-de-fotografia"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                Fondos de Fotografía
              </Link>
              <Link
                href="/nosotros"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                NOSOTROS
              </Link>
              <Link
                href="/contacto"
                className="mt-3 block px-3 py-3 text-base font-medium bg-cta text-primary rounded hover:bg-yellow-600 mx-1 text-center mt-2"
                onClick={handleMobileLinkClick}
              >
                RESERVA
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
