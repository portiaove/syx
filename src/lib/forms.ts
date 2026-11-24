// Web3Forms recibe el formulario de contacto y reenvía el mensaje por email.
// Hace falta un servicio externo porque el sitio se publica como export
// estático (next.config.ts, output: "export") y por tanto no hay servidor
// propio que pueda hablar SMTP.
//
// La access key acaba visible en el HTML a propósito: identifica el buzón de
// destino, no autoriza nada más que enviar a este mismo formulario.
//
// Aun así se lee SIN el prefijo NEXT_PUBLIC_, porque no es necesario: esta
// página es un componente de servidor y se pre-renderiza en el build, de modo
// que la variable se resuelve ahí. Así la clave no entra en el bundle de
// JavaScript del cliente y Vercel no la marca como valor expuesto.
//
// Ojo: si algún día se importa este módulo desde un componente con
// "use client", el valor llegará vacío y el formulario caerá al bloque de
// email y WhatsApp. Es un fallo visible, no silencioso, que es lo que queremos.
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY ?? "";

// Sin clave, el formulario enviaría al vacío. Preferimos no pintarlo y
// ofrecer email y WhatsApp antes que perder el contacto en silencio.
export const isContactFormEnabled = WEB3FORMS_KEY.length > 0;

export const CONTACT_REDIRECT_URL = "https://syxestudio.es/gracias/";

export const CONTACT_SUBJECT = "Nueva solicitud desde syxestudio.es";
