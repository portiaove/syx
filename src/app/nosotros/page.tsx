import { getContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import ContactBlock from "@/components/ContactBlock";
import Image from "next/image";

interface NosotrosData {
  headline: string;
  people: Array<{
    name: string;
    role: string;
    bio: string;
    img: string;
  }>;
  experience: {
    years: string;
    exhibitions: string[];
    publications: string[];
  };
  external_link: {
    label: string;
    href: string;
  };
}

export const metadata = {
  title: "Nosotros - SYX Estudio Madrid",
  description:
    "Conoce a Ximena Garrigues y Sergio Moya, creadores audiovisuales con más de 20 años de experiencia en fotografía y vídeo.",
};

export default function Nosotros() {
  const data = getContentData("nosotros") as NosotrosData;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de {data.experience.years} años creando contenido audiovisual
              de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {data.people.map((person, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {person.name}
                  </h2>
                  <h3 className="text-lg text-accent font-semibold mb-4">
                    {person.role}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Exposiciones
                </h3>
                <ul className="space-y-2">
                  {data.experience.exhibitions.map((exhibition, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-gray-700">{exhibition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Publicaciones
                </h3>
                <ul className="space-y-2">
                  {data.experience.publications.map((publication, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-gray-700">{publication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              href={data.external_link.href}
              label={data.external_link.label}
              variant="secondary"
              className="text-lg px-8 py-4 mr-4"
            />
            <CTAButton
              href="/contacto"
              label="Trabajemos juntos"
              className="text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
