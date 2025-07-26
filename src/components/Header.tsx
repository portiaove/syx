"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExtrasOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExtrasLinkClick = () => {
    setIsExtrasOpen(false);
  };

  return (
    <header className="bg-white shadow-sm ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              SYX ESTUDIO
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* <Link
                href="/"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                INICIO
              </Link> */}
              <Link
                href="/estudio-1"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                ESTUDIO 1
              </Link>
              <Link
                href="/caracteristicas"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                CARACTERÍSTICAS
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsExtrasOpen(!isExtrasOpen)}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium flex items-center"
                >
                  EXTRAS
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleExtrasLinkClick}
                      >
                        Alquiler de Material
                      </Link>
                      <Link
                        href="/produccion"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleExtrasLinkClick}
                      >
                        Producción
                      </Link>
                      <Link
                        href="/fondos-de-fotografia"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
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

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                INICIO
              </Link>
              <Link
                href="/estudio-1"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                ESTUDIO 1
              </Link>
              <Link
                href="/caracteristicas"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                CARACTERÍSTICAS
              </Link>
              <Link
                href="/alquiler-de-material"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                Alquiler de Material
              </Link>
              <Link
                href="/produccion"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                Producción
              </Link>
              <Link
                href="/fondos-de-fotografia"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                Fondos de Fotografía
              </Link>
              <Link
                href="/nosotros"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
              >
                NOSOTROS
              </Link>
              <Link
                href="/contacto"
                className="block px-3 py-2 text-base font-medium bg-cta text-primary rounded hover:bg-yellow-600 mx-3 text-center mt-5"
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
