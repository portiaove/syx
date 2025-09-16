// Números de teléfono desde variables de entorno
export const PHONE_1 = process.env.NEXT_PUBLIC_PHONE_1 || "xxxxxxxxx";
export const PHONE_2 = process.env.NEXT_PUBLIC_PHONE_2 || "xxxxxxxxx";

// Formatear número para mostrar (separado de 3 en 3)
export function formatPhoneDisplay(phone: string): string {
  // Asume formato 9 dígitos: XXX XXX XXX
  if (phone.length === 9) {
    return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)}`;
  }
  return phone;
}

// Generar URL de WhatsApp
export function getWhatsAppUrl(phone: string): string {
  return `https://api.whatsapp.com/send?phone=34${phone}`;
}

// Números formateados para mostrar
export const PHONE_1_DISPLAY = formatPhoneDisplay(PHONE_1);
export const PHONE_2_DISPLAY = formatPhoneDisplay(PHONE_2);

// URLs de WhatsApp
export const WHATSAPP_URL_1 = getWhatsAppUrl(PHONE_1);
export const WHATSAPP_URL_2 = getWhatsAppUrl(PHONE_2);
