// Barrido fino de CRF a una resolución dada, para localizar el punto en el que
// el error por píxel empieza a notarse. Reutiliza los fotogramas de referencia
// que deja scripts/comparar-video.js.
const { execFileSync } = require("node:child_process");
const sharp = require("sharp");
const fs = require("node:fs");

const MASTER = "public/videos/SYXHOME_1.mp4";
const TMP = "tmp-video";
const FOTOGRAMAS = [30, 100, 170, 240];
const DURACION_TOTAL = 34.73;
const DURACION_MUESTRA = 10;

const ff = (args) =>
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8" });

const sacarFotograma = (video, n, destino) =>
  ff(["-i", video, "-vf", `select=eq(n\\,${n}),scale=1920:1080:flags=bicubic`, "-vframes", "1", destino]);

(async () => {
  const alto = Number(process.argv[2] || 1080);
  const crfs = process.argv.slice(3).map(Number);
  const ancho = Math.round((alto * 16) / 9 / 2) * 2;

  const refs = FOTOGRAMAS.map((n) => `${TMP}/ref_${n}.png`);
  for (const r of refs) {
    if (!fs.existsSync(r)) {
      console.error(`Falta ${r}. Ejecuta antes scripts/comparar-video.js`);
      process.exit(1);
    }
  }

  console.log(`  AV1 a ${ancho}x${alto}  (hoy en producción: webm VP9 720p = 6,4 MB)`);
  console.log("  " + "-".repeat(50));

  for (const crf of crfs) {
    const salida = `${TMP}/av1_${alto}_crf${crf}.webm`;
    ff(["-ss", "8", "-t", String(DURACION_MUESTRA), "-i", MASTER, "-vf", `scale=${ancho}:${alto}`,
        "-c:v", "libsvtav1", "-crf", String(crf), "-preset", "6", "-an", salida]);

    let suma = 0;
    for (const [i, n] of FOTOGRAMAS.entries()) {
      sacarFotograma(salida, n, `${TMP}/c.png`);
      const a = await sharp(refs[i]).removeAlpha().raw().toBuffer();
      const b = await sharp(`${TMP}/c.png`).removeAlpha().raw().toBuffer();
      let s = 0;
      for (let j = 0; j < a.length; j++) s += Math.abs(a[j] - b[j]);
      suma += s / a.length;
    }
    const err = suma / FOTOGRAMAS.length;
    const mb = (fs.statSync(salida).size / 1024 / 1024) * (DURACION_TOTAL / DURACION_MUESTRA);

    console.log(
      "  crf " + String(crf).padEnd(4) +
      mb.toFixed(1).padStart(6) + " MB   error " + err.toFixed(2) +
      "   " + (err < 1.5 ? "invisible" : err < 2.5 ? "muy bueno" : err < 4 ? "aceptable" : "se nota"),
    );
  }
})();
