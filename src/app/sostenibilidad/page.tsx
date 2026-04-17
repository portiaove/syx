import { getContentData } from "@/lib/content";
import CTAButton from "@/components/CTAButton";
import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

interface SostenibilidadData {
  net_zero_statement: string;
  initiatives: string[];
  ods: number[];
  pdf: {
    label: string;
    href: string;
  };
}

export const metadata = generateSEOMetadata(SEOPresets.sostenibilidad);

export default function Sostenibilidad() {
  const data = getContentData("sostenibilidad") as SostenibilidadData;

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
          SYX Estudio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6">
          NET ZERO
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          {data.net_zero_statement}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="divide-y divide-gray-100 mb-16">
          {data.initiatives.map((initiative, i) => (
            <div key={i} className="py-5">
              <span className="text-xl text-primary">{initiative}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
            ODS Comprometidos
          </p>
          <div className="flex flex-wrap gap-3">
            {data.ods.map((n) => (
              <span
                key={n}
                className="text-sm font-medium text-gray-500 border border-gray-200 px-3 py-1"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAButton
          href={data.pdf.href}
          label={data.pdf.label}
          variant="secondary"
          className="text-lg px-8 py-4"
        />
      </div>
    </div>
  );
}
