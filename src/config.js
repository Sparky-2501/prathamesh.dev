/**
 * EmailJS settings for the contact form.
 * These three values are PUBLIC by design (they are visible in any EmailJS site).
 * Protect them in the EmailJS dashboard: Account -> Security -> allow only your domain.
 *
 * To override without editing code, create a .env file (see .env.example).
 */
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_z4l8mba",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_q9c0g1n",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "BRuiUU2MUm8U6SiQg",
};
