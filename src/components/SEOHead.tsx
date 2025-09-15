import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  locale?: string;
  siteName?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = "/img/main.jpg",
  url = "https://syxestudio.es",
  type = "website",
  locale = "es_ES",
  siteName = "SYX Estudio - Plató Audiovisual Madrid",
}: SEOProps): Metadata {
  const fullTitle = title.includes("SYX Estudio")
    ? title
    : `${title} - SYX Estudio Madrid`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://syxestudio.es${image}`;

  const defaultKeywords = [
    "estudio fotografico madrid",
    "plato audiovisual",
    "alquiler estudio madrid",
    "estudio video madrid",
    "vallecas",
    "luz natural",
    "profoto",
    "shooting madrid",
    "rodaje madrid",
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),
    authors: [{ name: "SYX Estudio" }],
    creator: "SYX Estudio",
    publisher: "SYX Estudio",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName,
      locale,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: "@syxestudio",
      site: "@syxestudio",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=yes",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#322f32",
      "theme-color": "#322f32",
    },
  };
}

// SEO presets for common pages
export const SEOPresets = {
  home: {
    title: "SYX Estudio - Plató Audiovisual en Madrid, Vallecas",
    description:
      "Estudio de fotografía y vídeo en Madrid con 322m², luz natural controlable, material PROFOTO y acceso para vehículos. ¡Reserva tu sesión!",
    keywords: [
      "estudio fotografico vallecas",
      "luz natural madrid",
      "estudio net zero",
      "camerino madrid",
      "acceso vehiculos",
    ],
    url: "https://syxestudio.es",
  },
  estudio1: {
    title: "El Estudio - Instalaciones y Galería - SYX Estudio Madrid",
    description:
      "Descubre nuestro estudio audiovisual de 322 m² en Vallecas, Madrid. Características técnicas, instalaciones PROFOTO y galería completa.",
    keywords: [
      "estudio audiovisual madrid",
      "322 metros cuadrados",
      "7 metros altura",
      "instalaciones profoto",
      "fondos pintados",
      "camerino profesional",
      "cocina estudio",
      "pmr accesible",
      "energia renovable",
      "sostenible",
    ],
    url: "https://syxestudio.es/el-estudio/",
    image: "/img/_SX_5180-1__msi___jpg.jpg",
  },
  produccion: {
    title: "Servicios de Producción - Fotografía, Vídeo y Eventos",
    description:
      "Servicios completos de producción audiovisual: shootings de fotografía, rodajes de vídeo y eventos corporativos en nuestro estudio de Madrid.",
    keywords: [
      "produccion audiovisual",
      "shootings profesionales",
      "rodajes madrid",
      "eventos corporativos",
      "direccion creativa",
    ],
    url: "https://syxestudio.es/produccion/",
  },
  alquiler: {
    title: "Alquiler de Material Audiovisual - Equipos Profesionales",
    description:
      "Alquiler de material audiovisual profesional: cámaras, iluminación PROFOTO, trípodes y equipos técnicos para tus proyectos.",
    keywords: [
      "alquiler material audiovisual",
      "camaras profesionales",
      "iluminacion profoto",
      "tripodes",
      "equipos tecnicos",
    ],
    url: "https://syxestudio.es/alquiler-de-material/",
  },
  fondos: {
    title: "Fondos de Fotografía - Colores y Texturas Profesionales",
    description:
      "Amplia selección de fondos pintados profesionales para fotografía: colores sólidos, texturas y acabados especiales para tus proyectos.",
    keywords: [
      "fondos pintados",
      "fondos fotografia",
      "colores solidos",
      "texturas profesionales",
      "cyclorama",
    ],
    url: "https://syxestudio.es/fondos-de-fotografia/",
  },
  contacto: {
    title: "Contacto y Reservas - SYX Estudio Madrid",
    description:
      "Contacta con SYX Estudio para reservar tu sesión. Teléfono: 666 849 365. C/ Vizconde de Arlessón, 21, Madrid.",
    keywords: [
      "reservas estudio madrid",
      "contacto syx estudio",
      "telefono reservas",
      "direccion estudio",
    ],
    url: "https://syxestudio.es/contacto/",
  },
  nosotros: {
    title: "Nosotros - Quiénes Somos | SYX Estudio",
    description:
      "Conoce el equipo de SYX Estudio, profesionales especializados en fotografía y vídeo con años de experiencia en producción audiovisual.",
    keywords: [
      "equipo syx estudio",
      "fotografos profesionales",
      "experiencia audiovisual",
      "equipo creativo",
    ],
    url: "https://syxestudio.es/nosotros/",
  },
  sostenibilidad: {
    title: "Sostenibilidad - Estudio NET ZERO con Energía Renovable",
    description:
      "SYX Estudio es un estudio NET ZERO que funciona con energía 100% renovable gracias a nuestras placas fotovoltaicas.",
    keywords: [
      "estudio net zero",
      "energia renovable",
      "placas fotovoltaicas",
      "sostenibilidad",
      "estudio ecologico",
    ],
    url: "https://syxestudio.es/sostenibilidad/",
  },
};
