export const CONTACT = {
  email: 'deodatusmaliti@yahoo.co.uk',
  phone: '+255 686 997 270',
  phoneHref: 'tel:+255686997270',
  whatsapp: '+264 81 412 4900',
  whatsappHref: 'https://wa.me/264814124900',
  address: 'Arusha, Tanzania',
  name: 'Deodatus Maliti',
};

export function mailto(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
