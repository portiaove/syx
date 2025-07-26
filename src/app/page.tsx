import { getContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import ContactBlock from "@/components/ContactBlock";
import Image from "next/image";
import Link from "next/link";

interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    cta: {
      label: string;
      href: string;
    };
  };
  benefits: string[];
  use_cases: string[];
}

export default function Home() {
  const data = getContentData("home") as HomeData;

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/img/main.jpg')`,
        }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            {data.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg">
            {data.hero.subtitle}
          </p>
          <CTAButton
            href={data.hero.cta.href}
            label={data.hero.cta.label}
            variant="cta"
            className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">
              ¿Por qué elegir SYX Estudio?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Nuestras instalaciones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un espacio único diseñado para dar vida a tus proyectos
              audiovisuales
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link href="/estudio-1" className="block">
              <div className="relative h-96 rounded-lg overflow-hidden border-2 border-transparent hover:border-cta transition-all duration-300">
                <Image
                  src="/img/_SX_5180-1__msi___jpg.jpg"
                  alt="Estudio SYX - Espacio principal"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-2">Espacio principal</h3>
                  <p className="text-sm opacity-90">
                    Amplio estudio con luz natural controlable
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/caracteristicas" className="block">
              <div className="relative h-96 rounded-lg overflow-hidden border-2 border-transparent hover:border-cta transition-all duration-300">
                <Image
                  src="/img/_SX_5184-1__msi___jpg.jpg"
                  alt="Estudio SYX - Zona de trabajo"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-2">Zona de trabajo</h3>
                  <p className="text-sm opacity-90">
                    Equipamiento profesional PROFOTO
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Servicios que ofrecemos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.use_cases.map((useCase, index) => {
              const getHref = (service: string) => {
                if (service.includes('fotografía') || service.includes('vídeo') || service.includes('Eventos')) {
                  return '/produccion';
                }
                if (service.includes('Alquiler')) {
                  return '/alquiler-de-material';
                }
                return '/produccion';
              };
              
              return (
                <Link key={index} href={getHref(useCase)} className="block h-full">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200 hover:border-cta transition-all duration-300 h-full flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-primary">
                      {useCase}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <CTAButton
              href="/estudio-1"
              label="Conoce nuestro Estudio 1"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
