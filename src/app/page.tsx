import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

export const metadata = generateSEOMetadata(SEOPresets.home);

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/SYXHOME_web.webm" type="video/webm" />
        <source src="/videos/SYXHOME_web.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase drop-shadow-2xl" style={{ color: "#ffff00" }}>
          syx estudio
        </h1>
      </div>
    </div>
  );
}
