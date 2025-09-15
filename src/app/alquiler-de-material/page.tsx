import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

export const metadata = generateSEOMetadata(SEOPresets.alquiler);

export default function AlquilerDeMaterial() {
  const servicios = [
    {
      title: "Iluminación",
      description: "Equipos de iluminación profesional PROFOTO y material técnico",
      href: "/iluminacion",
      image: "/img/equipment-placeholder.jpg"
    },
    {
      title: "Atrezzo",
      description: "Servicios de producción audiovisual integral",
      href: "/atrezzo", 
      image: "/img/production-placeholder.jpg"
    },
    {
      title: "Fondos",
      description: "Fondos únicos pintados a mano para tus sesiones",
      href: "/fondos",
      image: "/img/fondos-placeholder.jpg"
    }
  ];

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Alquiler de Material
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todos nuestros servicios adicionales para tus proyectos audiovisuales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {servicios.map((servicio, index) => (
              <Link
                key={index}
                href={servicio.href}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="relative h-48 bg-gray-100">
                    {/* Placeholder para imagen - puedes reemplazar con imágenes reales */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                      <span className="text-accent font-semibold text-lg">{servicio.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-cta transition-colors">
                      {servicio.title}
                    </h3>
                    <p className="text-gray-600">
                      {servicio.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <CTAButton
              href="/contacto"
              label="Consultar disponibilidad"
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>
    </>
  );
}