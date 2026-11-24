import { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

const BASE = "https://syxestudio.es";

// Rutas que existen pero no deben indexarse.
const EXCLUDE = new Set(["gracias"]);

const PRIORITY: Record<string, number> = {
  "": 1.0,
  "el-estudio": 0.9,
  caracteristicas: 0.8,
  contacto: 0.8,
};

// Se lee del disco en lugar de mantener la lista a mano: así el sitemap
// no puede volver a quedar apuntando a rutas que ya no existen.
function discoverRoutes(): string[] {
  const appDir = join(process.cwd(), "src", "app");

  const dirs = readdirSync(appDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("_") && !name.startsWith("(") && !EXCLUDE.has(name))
    .filter((name) => {
      try {
        return statSync(join(appDir, name, "page.tsx")).isFile();
      } catch {
        return false;
      }
    })
    .sort();

  return ["", ...dirs];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return discoverRoutes().map((route) => ({
    // trailingSlash: true está activo, así que la URL canónica lleva barra final.
    url: route === "" ? `${BASE}/` : `${BASE}/${route}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[route] ?? 0.3,
  }));
}
