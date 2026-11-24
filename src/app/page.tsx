import { generateSEOMetadata, SEOPresets } from "@/components/SEOHead";

export const metadata = generateSEOMetadata(SEOPresets.home);

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        // Se pinta al instante mientras el vídeo llega. Sin póster la portada
        // está en negro hasta que aterrizan los primeros fotogramas.
        poster="/img/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* AV1 primero: a igualdad de calidad pesa la mitad que el VP9 que
            había, y permite servir 1080p por menos de lo que costaba 720p.
            La cadena de codec es obligatoria: declarando solo "video/webm" un
            navegador con WebM pero sin decodificador AV1 elegiría esta fuente
            y se quedaría en negro en lugar de pasar al mp4. */}
        <source
          media="(min-width: 1280px)"
          src="/videos/hero-1080.webm"
          type='video/webm; codecs="av01.0.08M.08"'
        />
        <source
          media="(min-width: 768px)"
          src="/videos/hero-720.webm"
          type='video/webm; codecs="av01.0.05M.08"'
        />
        <source src="/videos/hero-480.webm" type='video/webm; codecs="av01.0.04M.08"' />

        {/* Alternativa en H.264 para Safari y cualquier navegador sin AV1. */}
        <source media="(min-width: 768px)" src="/videos/hero-720.mp4" type="video/mp4" />
        <source src="/videos/hero-480.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-cta text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase drop-shadow-2xl">
          syx estudio
        </h1>
      </div>
    </div>
  );
}
