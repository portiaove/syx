import Image from "next/image";

const logos = [
  {
    src: "/img/logos/funded-by-eu.png",
    alt: "Financiado por la Unión Europea",
    width: 1280,
    height: 311,
  },
  {
    src: "/img/logos/logo-color.png",
    alt: "SYX Estudio",
    width: 1280,
    height: 720,
  },
  {
    src: "/img/logos/comunidad-madrid.jpg",
    alt: "Comunidad de Madrid",
    width: 850,
    height: 450,
  },
];

export default function LogosFooter() {
  return (
    <section className="border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-16 w-auto object-contain md:h-20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
