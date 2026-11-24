import { getContentData } from "@/lib/content";
import { PHONE_1, PHONE_2 } from "@/lib/phone";

// El JSON-LD se construye a partir de los mismos YAML que pintan las páginas.
// Es deliberado: un dato estructurado que afirme algo que no está visible en la
// web es cloaking, y además se desincroniza en cuanto alguien edita el YAML.
//
// Por eso aquí NO hay precios: no están publicados todavía. En cuanto exista la
// página de tarifas, se añade priceRange y una oferta por tipo de jornada.

const SITE = "https://syxestudio.es";

// Coordenadas del número 21 de la calle, geocodificadas con OpenStreetMap.
const GEO = { latitude: 40.3835248, longitude: -3.6662837 };

interface CaracteristicasData {
  space: { total_m2: number; studio1_m2: number; office_m2: number; max_height_m: number };
  entry_for_vehicles: boolean;
  installations: string[];
  equipment: string[];
  backdrops: { description: string };
}

interface ContactoData {
  address: string;
  email: string;
}

interface NosotrosData {
  description: string;
}

// phone.ts cae a "xxxxxxxxx" si falta la variable de entorno; no queremos
// publicar eso como teléfono.
function toE164(phone: string): string | null {
  return /^\d{9}$/.test(phone) ? `+34${phone}` : null;
}

export function buildEstudioJsonLd() {
  const caract = getContentData("caracteristicas") as CaracteristicasData;
  const contacto = getContentData("contacto") as ContactoData;
  const nosotros = getContentData("nosotros") as NosotrosData;

  const phones = [toE164(PHONE_1), toE164(PHONE_2)].filter(
    (p): p is string => p !== null,
  );

  const amenities = [
    ...caract.installations,
    ...caract.equipment,
    "Luz natural controlable",
    ...(caract.entry_for_vehicles ? ["Acceso para vehículos"] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#estudio`,
    name: "SYX Estudio",
    url: `${SITE}/`,
    description: nosotros.description.trim(),
    image: `${SITE}/img/main.jpg`,
    logo: `${SITE}/img/logos/logo-color.png`,
    email: contacto.email,
    ...(phones.length > 0 ? { telephone: phones[0] } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Vizconde de Arlessón, 21",
      addressLocality: "Madrid",
      addressRegion: "Comunidad de Madrid",
      postalCode: "28018",
      addressCountry: "ES",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: `https://www.openstreetmap.org/?mlat=${GEO.latitude}&mlon=${GEO.longitude}`,
    areaServed: { "@type": "City", name: "Madrid" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    contactPoint: phones.map((telephone, i) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: i === 0 ? "reservas" : "producción",
      areaServed: "ES",
      availableLanguage: ["es", "en"],
    })),
    // Hechos extraíbles uno a uno. Esto es lo que distingue un schema rico
    // en atributos de uno genérico, que rinde peor que no poner nada.
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Superficie total",
        value: caract.space.total_m2,
        unitCode: "MTK",
      },
      {
        "@type": "PropertyValue",
        name: "Superficie del estudio",
        value: caract.space.studio1_m2,
        unitCode: "MTK",
      },
      {
        "@type": "PropertyValue",
        name: "Superficie de oficina",
        value: caract.space.office_m2,
        unitCode: "MTK",
      },
      {
        "@type": "PropertyValue",
        name: "Altura libre máxima",
        value: caract.space.max_height_m,
        unitCode: "MTR",
      },
      {
        "@type": "PropertyValue",
        name: "Acceso de vehículos",
        value: caract.entry_for_vehicles ? "Sí, hasta furgoneta" : "No",
      },
      {
        "@type": "PropertyValue",
        name: "Fondos",
        value: caract.backdrops.description,
      },
    ],
    amenityFeature: amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    // TODO: cuando se fusionen las dos fichas de Madrid Film Office, dejar
    // aquí solo la URL superviviente.
    sameAs: [
      "https://www.instagram.com/syxestudio/",
      "https://www.facebook.com/profile.php?id=61565833525180",
      "https://madridfilmoffice.com/en/location/syx-estudio/",
    ],
  };
}
