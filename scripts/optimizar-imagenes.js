// Migración puntual de los ficheros de imagen del repositorio.
//
// No es un paso del build: a partir de ahora next/image genera las variantes
// por dispositivo bajo demanda. Esto solo arregla los originales, que son el
// master del que parte todo y lo que carga el lightbox.
//
// Los ajustes salen de medir el error real por píxel contra el original con
// scripts/comparar-calidad.js, en escala 0-255:
//
//   fondos PNG -> WebP q95   -84 % de peso, error medio 1,10 (invisible)
//
// Las fotos JPEG del estudio NO se tocan: ya están bien comprimidas y
// recodificarlas a WebP q95 daba ficheros MÁS grandes que el original.
const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const IMG = "public/img";
const log = (msg) => console.log("  " + msg);
const kb = (n) => Math.round(n / 1024) + " KB";

async function convertirFondos() {
  console.log("\nFONDOS: PNG -> WebP q95, con nombres descriptivos");
  const dir = path.join(IMG, "fondos");
  const pngs = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const renombrados = [];
  let antes = 0;
  let despues = 0;

  for (const [i, nombre] of pngs.entries()) {
    const origen = path.join(dir, nombre);
    const destino = `fondo-pintado-${String(i + 1).padStart(2, "0")}.webp`;
    const tamOrig = fs.statSync(origen).size;

    await sharp(origen).webp({ quality: 95 }).toFile(path.join(dir, destino));
    const tamNuevo = fs.statSync(path.join(dir, destino)).size;
    fs.unlinkSync(origen);

    antes += tamOrig;
    despues += tamNuevo;
    renombrados.push({ viejo: nombre, nuevo: destino });
    log(`${kb(tamOrig).padStart(8)} -> ${kb(tamNuevo).padStart(8)}   ${destino}`);
  }

  log(`total: ${kb(antes)} -> ${kb(despues)}  (-${Math.round((1 - despues / antes) * 100)} %)`);
  return renombrados;
}

async function imagenSocial(origen, destino, etiqueta) {
  const tamOrig = fs.statSync(origen).size;
  // Se lee a memoria antes de procesar: si se le pasa la ruta, sharp mantiene
  // el fichero abierto y Windows no deja escribir encima del mismo path.
  const buf = await sharp(fs.readFileSync(origen))
    // 1200x630 es lo que ya declaran los metadatos de Open Graph.
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    // Se queda en JPEG a propósito: varios scrapers sociales no leen AVIF ni WebP.
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, buf);
  log(`${kb(tamOrig).padStart(8)} -> ${kb(buf.length).padStart(8)}   ${etiqueta}`);
}

function borrar(rutas) {
  console.log("\nBORRADOS");
  let total = 0;
  for (const r of rutas) {
    if (!fs.existsSync(r)) { log(`(ya no existía) ${r}`); continue; }
    const t = fs.statSync(r).size;
    fs.unlinkSync(r);
    total += t;
    log(`${kb(t).padStart(8)}   ${r}`);
  }
  log(`liberados ${kb(total)}`);
}

(async () => {
  const renombrados = await convertirFondos();

  console.log("\nIMÁGENES SOCIALES: recortadas a los 1200x630 que ya declaraban");
  await imagenSocial(path.join(IMG, "main.jpg"), path.join(IMG, "main.jpg"), "main.jpg (home)");
  await imagenSocial(
    path.join(IMG, "estudio1", "_SX_5180-1__msi___jpg.jpg"),
    path.join(IMG, "og", "el-estudio.jpg"),
    "og/el-estudio.jpg (El Estudio)",
  );

  borrar([
    // Duplicados byte a byte de los que ya están en estudio1/
    path.join(IMG, "_SX_5180-1__msi___jpg.jpg"),
    path.join(IMG, "_SX_5184-1__msi___jpg.jpg"),
    // Restos de la web antigua, sin ninguna referencia en el código
    path.join(IMG, "11M-47__msi___jpg.jpg"),
    path.join(IMG, "11M-48__msi___jpg.jpg"),
    path.join(IMG, "caracteristicas__msi___jpg.jpg"),
  ]);

  // Las rutas de los fondos viven en el YAML de contenido. Se reconstruyen
  // desde los ficheros que hay en disco, no desde el renombrado de esta
  // ejecución, para que el script se pueda reanudar si falla a medias.
  console.log("\nREFERENCIAS ACTUALIZADAS");
  void renombrados;
  const yaml = "content/caracteristicas.yaml";
  const webps = fs
    .readdirSync(path.join(IMG, "fondos"))
    .filter((f) => f.endsWith(".webp"))
    .sort();

  let texto = fs.readFileSync(yaml, "utf8");
  let i = 0;
  texto = texto.replace(/\/img\/fondos\/[^"'\s]+/g, () => {
    const destino = `/img/fondos/${webps[i] ?? webps[webps.length - 1]}`;
    i++;
    return destino;
  });
  fs.writeFileSync(yaml, texto);
  log(`${i} rutas de fondos reescritas en ${yaml}`);
})();
