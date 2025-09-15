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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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
    <header className="bg-white shadow-sm relative z-[9999]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              3x2 = SYX
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/el-estudio"
                className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium"
              >
                EL ESTUDIO
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsExtrasOpen((v) => !v)}
                  className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium flex items-center cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={isExtrasOpen}
                >
                  ALQUILER DE MATERIAL
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
                        href="/iluminacion"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Iluminación
                      </Link>
                      <Link
                        href="/atrezzo"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Atrezzo
                      </Link>
                      <Link
                        href="/fondos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-cta hover:bg-yellow-50"
                        onClick={handleExtrasLinkClick}
                      >
                        Fondos
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/sostenibilidad"
                className="text-gray-700 hover:text-cta px-3 py-2 text-sm font-medium"
              >
                SOSTENIBILIDAD
              </Link>
              <Link
                href="/contacto"
                className="bg-cta text-primary px-4 py-2 text-sm font-medium rounded hover:bg-yellow-600"
              >
                CONTÁCTANOS
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              ref={isMenuOpen ? closeButtonRef : menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        {/* --- OVERLAY MÓVIL A PANTALLA COMPLETA --- */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="
              fixed top-16 left-0 right-0 bottom-0 z-[9998] bg-white
      flex flex-col overflow-hidden overscroll-contain
            "
            style={{
              paddingTop: "max(16px, env(safe-area-inset-top))",
              paddingRight: "max(16px, env(safe-area-inset-right))",
              paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              paddingLeft: "max(16px, env(safe-area-inset-left))",
            }}
          >
            <div className="px-4 pt-4 pb-6 space-y-1 overflow-y-auto min-h-0">
              <Link
                href="/"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                INICIO
              </Link>
              <Link
                href="/el-estudio"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                EL ESTUDIO
              </Link>
              <Link
                href="/alquiler-de-material"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                ALQUILER DE MATERIAL
              </Link>
              <Link
                href="/iluminacion"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                ILUMINACIÓN
              </Link>
              <Link
                href="/atrezzo"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                ATREZZO
              </Link>
              <Link
                href="/fondos"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                FONDOS
              </Link>
              <Link
                href="/sostenibilidad"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary"
                onClick={handleMobileLinkClick}
              >
                SOSTENIBILIDAD
              </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-6">
              <Link
                href="/contacto"
                className="block w-full max-w-sm px-3 py-3 text-base font-medium bg-cta text-primary rounded text-center hover:bg-yellow-600"
                onClick={handleMobileLinkClick}
              >
                CONTÁCTANOS
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
