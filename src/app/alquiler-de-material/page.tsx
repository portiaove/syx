import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

export const metadata = generateSEOMetadata(SEOPresets.alquiler);

const categorias = [
  {
    title: "Iluminación",
    description: "Equipos PROFOTO y modificadores de luz profesional",
    href: "/iluminacion",
  },
  {
    title: "Atrezzo",
    description: "Producción audiovisual integral",
    href: "/atrezzo",
  },
  {
    title: "Fondos",
    description: "Fondos pintados a mano, hasta 5 m de ancho",
    href: "/fondos",
  },
];

export default function AlquilerDeMaterial() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          Alquiler
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Material profesional para tus proyectos audiovisuales.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-gray-100">
          {categorias.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex items-baseline justify-between py-8 hover:pl-4 transition-all duration-300"
            >
              <div>
                <span className="text-3xl md:text-4xl font-bold text-primary group-hover:text-cta transition-colors duration-300">
                  {cat.title}
                </span>
                <p className="text-gray-400 mt-1 text-sm">{cat.description}</p>
              </div>
              <span className="text-gray-300 group-hover:text-cta transition-colors duration-300 text-2xl">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href="/contacto"
          label="Consultar disponibilidad"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
