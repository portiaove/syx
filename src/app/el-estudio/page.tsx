import { getContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import ClickableImage from "@/components/ClickableImage";
import Gallery from "@/components/Gallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface CaracteristicasData {
  location: {
    description: string;
  };
  space: {
    total_m2: number;
    studio1_m2: number;
    max_height_m: number;
  };
  entry_for_vehicles: boolean;
  installations: string[];
  sustainability: string[];
  cta: {
    label: string;
    href: string;
  };
}

interface EstudioData {
  summary: string;
  gallery: string[];
  features: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.estudio1);

export default function ElEstudio() {
  const caracteristicasData = getContentData("caracteristicas") as CaracteristicasData;
  const estudioData = getContentData("estudio") as EstudioData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              El Estudio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todo lo que nuestro estudio puede ofrecerte
            </p>
          </div>

          {/* CARACTERÍSTICAS SECTION */}
          {/* Mobile: Ubicación y Especificaciones primero */}
          <div className="lg:hidden mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Ubicación y Acceso
              </h2>
              <p className="text-gray-600 mb-6">{caracteristicasData.location.description}</p>

              <h3 className="text-xl font-semibold text-primary mb-4">
                Especificaciones del Espacio
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Superficie total:</span>
                  <span className="font-semibold">
                    {caracteristicasData.space.total_m2} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudio:</span>
                  <span className="font-semibold">
                    {caracteristicasData.space.studio1_m2} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Altura máxima:</span>
                  <span className="font-semibold">
                    {caracteristicasData.space.max_height_m} m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entrada de vehículos:</span>
                  <span className="font-semibold">
                    {caracteristicasData.entry_for_vehicles ? "Sí" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Imagen características en mobile */}
            <div className="relative h-80 mb-8 rounded-lg overflow-hidden bg-gray-50">
              <ClickableImage
                src="/img/caracteristicas__msi___jpg.jpg"
                alt="Características del estudio"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Resto del contenido características en mobile */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Instalaciones
              </h2>
              <ul className="space-y-3 mb-8">
                {caracteristicasData.installations.map((installation, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-gray-700">{installation}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">
                Sostenibilidad
              </h2>
              <ul className="space-y-3 mb-12">
                {caracteristicasData.sustainability.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: Layout características con imagen a la derecha */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contenido a la izquierda (2 columnas) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Ubicación y Acceso
                </h2>
                <p className="text-gray-600 mb-6">
                  {caracteristicasData.location.description}
                </p>

                <h3 className="text-xl font-semibold text-primary mb-4">
                  Especificaciones del Espacio
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Superficie total:</span>
                    <span className="font-semibold">
                      {caracteristicasData.space.total_m2} m²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estudio:</span>
                    <span className="font-semibold">
                      {caracteristicasData.space.studio1_m2} m²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Altura máxima:</span>
                    <span className="font-semibold">
                      {caracteristicasData.space.max_height_m} m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrada de vehículos:</span>
                    <span className="font-semibold">
                      {caracteristicasData.entry_for_vehicles ? "Sí" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Instalaciones
                </h2>
                <ul className="space-y-3 mb-8">
                  {caracteristicasData.installations.map((installation, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-gray-700">{installation}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-primary mb-6">
                  Sostenibilidad
                </h2>
                <ul className="space-y-3">
                  {caracteristicasData.sustainability.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Imagen características a la derecha (1 columna) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative h-96 rounded-lg overflow-hidden bg-gray-50">
                  <ClickableImage
                    src="/img/caracteristicas__msi___jpg.jpg"
                    alt="Características del estudio"
                    fill
                    className="object-contain"
                    sizes="33vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEPARADOR VISUAL */}
          <div className="border-b border-gray-200 mb-16"></div>

          {/* ESTUDIO SECTION */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Galería del Estudio
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {estudioData.summary}
            </p>
          </div>

          <Gallery images={estudioData.gallery} alt="Estudio" className="mb-16" />

          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {estudioData.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              href={caracteristicasData.cta.href}
              label={caracteristicasData.cta.label}
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>
    </>
  );
}