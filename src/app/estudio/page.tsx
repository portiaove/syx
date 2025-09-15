import { getContentData } from "@/lib/content";
import Gallery from "@/components/Gallery";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface Estudio1Data {
  summary: string;
  gallery: string[];
  features: string[];
}

export const metadata = generateSEOMetadata(SEOPresets.estudio1);

export default function Estudio1() {
  const data = getContentData("estudio") as Estudio1Data;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Estudio
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {data.summary}
            </p>
          </div>

          <Gallery images={data.gallery} alt="Estudio" className="mb-16" />

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
