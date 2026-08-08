// ============================================================================
// ESSE.KZ STORE CONFIGURATION
// Centralized configuration file for contact details and WhatsApp integration.
// ============================================================================

export const STORE_CONFIG = {
  name: 'ESSE.KZ',
  fullName: 'ESSE.KZ — Коммерческое холодильное оборудование',
  description: 'Профессиональные холодильные витрины для кафе, ресторанов, супермаркетов и пекарен в Казахстане.',
  
  // PRIMARY WHATSAPP NUMBER (Used across the entire application)
  // Format: Country code without '+' or spaces, e.g., '77071234567' or '77710001122'
  whatsappNumber: '77071234567',
  
  // Phone numbers displayed on website
  phonePrimary: '+7 (707) 123-45-67',
  phoneSecondary: '+7 (727) 345-67-89',
  
  // Contact details
  email: 'info@esse.kz',
  address: 'г. Алматы, пр. Райымбека, 212A / г. Астана, ул. Бейбитшилик, 14',
  workingHours: 'Пн–Пт: 09:00 – 18:00, Сб: 10:00 – 15:00, Вс: Выходной',
  
  // Social & Map links
  mapLink: 'https://2gis.kz',
};

/**
 * Helper to construct a WhatsApp link with a custom pre-filled message.
 * @param message Custom message string
 * @returns Full WhatsApp web/app URL
 */
export function getWhatsAppLink(message?: string): string {
  const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  if (!message) {
    return `https://wa.me/${cleanNumber}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a pre-filled WhatsApp message for inquiring about a specific product.
 */
export function getProductWhatsAppLink(productName: string, modelCode: string, priceText?: string): string {
  const msg = `Здравствуйте! Меня интересует ${productName} (Модель: ${modelCode}). Подскажите, пожалуйста, актуальную цену, наличие и условия доставки.`;
  return getWhatsAppLink(msg);
}

/**
 * Generates a pre-filled WhatsApp message for general price/consultation inquiry.
 */
export function getConsultationWhatsAppLink(topic?: string): string {
  const msg = topic 
    ? `Здравствуйте! Нужна консультация по вопросу: ${topic}. Подберите оборудование для моего бизнеса.`
    : `Здравствуйте! Подберите, пожалуйста, холодильное оборудование для моего бизнеса. Нужна консультация.`;
  return getWhatsAppLink(msg);
}
