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

const navLinks = [
  { href: "/el-estudio", label: "EL ESTUDIO" },
  { href: "/caracteristicas", label: "CARACTERÍSTICAS" },
  { href: "/contacto", label: "CONTACTO" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useBodyScrollLock(isMenuOpen);

  return (
    <>
      <header
        className={`z-[9999] ${
          isHome
            ? "fixed top-0 left-0 right-0 bg-transparent"
            : "bg-white relative"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
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
