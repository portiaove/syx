// Genera la escalera de vídeo de portada desde el master de 1080p.
//
// Los CRF salen de medir el error por píxel contra el master con
// scripts/afinar-crf.js. A 1080p el error apenas se mueve entre CRF 40 (1,48)
// y CRF 52 (1,85) mientras el tamaño cae a la mitad, así que compensa bajar.
//
// AV1 es el formato principal: a igualdad de calidad pesa la mitad que el VP9
// que había. H.264 se mantiene como alternativa para Safari y cualquier
// navegador sin decodificador AV1.
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const MASTER = "public/videos/SYXHOME_1.mp4";
const DESTINO = "public/videos";

const VARIANTES = [
  { nombre: "hero-1080.webm", alto: 1080, args: ["-c:v", "libsvtav1", "-crf", "46", "-preset", "5"] },
  { nombre: "hero-720.webm", alto: 720, args: ["-c:v", "libsvtav1", "-crf", "42", "-preset", "5"] },
  { nombre: "hero-480.webm", alto: 480, args: ["-c:v", "libsvtav1", "-crf", "44", "-preset", "5"] },
  { nombre: "hero-720.mp4", alto: 720, args: ["-c:v", "libx264", "-crf", "28", "-preset", "slow", "-profile:v", "high", "-movflags", "+faststart"] },
  { nombre: "hero-480.mp4", alto: 480, args: ["-c:v", "libx264", "-crf", "28", "-preset", "slow", "-profile:v", "high", "-movflags", "+faststart"] },
];

const ff = (args) =>
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8" });

const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1) + " MB";

(async () => {
  console.log("VARIANTES DE VÍDEO");
  for (const v of VARIANTES) {
    const ancho = Math.round((v.alto * 16) / 9 / 2) * 2;
    const salida = path.join(DESTINO, v.nombre);
    // -an: el vídeo va en mute por diseño, la pista de audio solo sumaría bytes.
    ff(["-i", MASTER, "-vf", `scale=${ancho}:${v.alto}`, ...v.args, "-an", salida]);
    console.log(`  ${v.nombre.padEnd(18)} ${ancho}x${v.alto}`.padEnd(40) + mb(salida).padStart(9));
  }

  // El póster se pinta al instante mientras el vídeo todavía está llegando.
  // Hoy no hay ninguno: hasta que no llegan los primeros fotogramas no se ve
  // nada. Es la mejora más grande en carga percibida.
  console.log("\nPÓSTER");
  const poster = path.join("public", "img", "hero-poster.jpg");
  ff(["-ss", "2", "-i", MASTER, "-vframes", "1", "-vf", "scale=1920:1080", "-q:v", "6", poster]);
  console.log(`  ${path.basename(poster).padEnd(18)} 1920x1080`.padEnd(40) + mb(poster).padStart(9));

  // La cadena de <source> necesita el codec exacto: si se declara solo
  // "video/webm", un navegador con WebM pero sin AV1 elegiría esta fuente y se
  // quedaría en negro en vez de pasar al mp4.
  console.log("\nCADENA DE CODEC PARA EL <source>");
  for (const v of VARIANTES.filter((x) => x.nombre.endsWith(".webm"))) {
    const datos = execFileSync("ffprobe", [
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=profile,level",
      "-of", "default=noprint_wrappers=1:nokey=1",
      path.join(DESTINO, v.nombre),
    ], { encoding: "utf8" }).trim().split(/\s+/);
    console.log(`  ${v.nombre.padEnd(18)} profile=${datos[0]} level=${datos[1]}`);
  }
})();
