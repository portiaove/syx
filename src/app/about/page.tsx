import { getContentData } from "@/lib/content";
import Link from "next/link";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface EstudioData {
  headline: string;
  address: string;
  district: string;
  description: string;
  highlights: { label: string; value: string }[];
  maps_url: string;
}

export const metadata = generateSEOMetadata(SEOPresets.home);

export default function About() {
  const data = getContentData("nosotros") as EstudioData;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          El espacio
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">{data.headline}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-600 leading-relaxed text-lg mb-10">
              {data.description}
            </p>
            <Link
              href={data.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-primary transition-colors"
            >
              {data.address} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data.highlights.map((h, i) => (
              <div key={i}>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
                  {h.label}
                </p>
                <p className="text-xl font-bold text-primary">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
