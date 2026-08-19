import { CONTACT } from './contact';

// Web3Forms public access key — get yours FREE at https://web3forms.com
// Just enter your email on their site and they'll generate one instantly.
// Paste it below (between the quotes) to enable automatic email delivery.
const WEB3FORMS_ACCESS_KEY = 'f4e6d71b-09e2-45db-ae97-26bc6d9f3204';

export type InquiryPayload = {
  type?: 'inquiry' | 'booking';
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  // booking fields
  reference?: string;
  traveler_name?: string;
  country?: string;
  adults?: number;
  children?: number;
  start_date?: string;
  accommodation?: string;
  packageName?: string;
  custom_destinations?: string[];
  add_ons?: string[];
  total_usd?: number;
};

function buildSubject(data: InquiryPayload): string {
  if (data.type === 'booking') {
    return `New Booking — ${data.reference} — ${data.traveler_name}`;
  }
  return `New Inquiry — ${data.subject} — ${data.name}`;
}

function buildTextBody(data: InquiryPayload): string {
  if (data.type === 'booking') {
    return [
      'New Safari Booking',
      `Reference: ${data.reference}`,
      `Traveler: ${data.traveler_name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || '—'}`,
      `Country: ${data.country || '—'}`,
      `Trip: ${data.packageName || 'Custom safari'}`,
      `Adults: ${data.adults} | Children: ${data.children}`,
      `Start date: ${data.start_date || '—'}`,
      `Accommodation: ${data.accommodation}`,
      `Destinations: ${(data.custom_destinations || []).join(', ') || '—'}`,
      `Add-ons: ${(data.add_ons || []).join(', ') || '—'}`,
      `Total: $${data.total_usd}`,
    ].join('\n');
  }
  return [
    'New Website Inquiry',
    `From: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Subject: ${data.subject}`,
    '',
    `Message:`,
    data.message || '',
  ].join('\n');
}

function buildHtmlBody(data: InquiryPayload): string {
  if (data.type === 'booking') {
    return `
      <h2>New Safari Booking</h2>
      <p><strong>Reference:</strong> ${data.reference}</p>
      <p><strong>Traveler:</strong> ${data.traveler_name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || '—'}</p>
      <p><strong>Country:</strong> ${data.country || '—'}</p>
      <p><strong>Trip:</strong> ${data.packageName || 'Custom safari'}</p>
      <p><strong>Adults:</strong> ${data.adults} | <strong>Children:</strong> ${data.children}</p>
      <p><strong>Start date:</strong> ${data.start_date || '—'}</p>
      <p><strong>Accommodation:</strong> ${data.accommodation}</p>
      <p><strong>Destinations:</strong> ${(data.custom_destinations || []).join(', ') || '—'}</p>
      <p><strong>Add-ons:</strong> ${(data.add_ons || []).join(', ') || '—'}</p>
      <p><strong>Total (USD):</strong> $${data.total_usd}</p>
      <hr /><p style="color:#888">Reply to the traveler at ${data.email}</p>
    `;
  }
  const safeMessage = (data.message || '').replace(/\n/g, '<br>');
  return `
    <h2>New Website Inquiry</h2>
    <p><strong>From:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || '—'}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <hr /><p><strong>Message:</strong></p><p>${safeMessage}</p>
    <hr /><p style="color:#888">Reply to the sender at ${data.email}</p>
  `;
}

function buildMailtoLink(data: InquiryPayload): string {
  const subject = buildSubject(data);
  const body = buildTextBody(data);
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends a notification email to the site owner (deodatusmaliti@yahoo.co.uk).
 *
 * If a Web3Forms access key is set above, emails are sent automatically via
 * the Web3Forms free API — no server, no signup cost, delivers straight to
 * the inbox.
 *
 * If no key is configured yet, falls back to a mailto: link so the visitor
 * can send via their own email app with everything pre-filled.
 */
export async function sendNotification(
  data: InquiryPayload,
): Promise<{ emailSent: boolean; mailtoLink: string; reason?: string }> {
  const mailtoLink = buildMailtoLink(data);

  if (WEB3FORMS_ACCESS_KEY) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: buildSubject(data),
          from_name: 'Safari Tanzania Website',
          to: CONTACT.email,
          replyto: data.email || CONTACT.email,
          html: buildHtmlBody(data),
          text: buildTextBody(data),
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        return { emailSent: true, mailtoLink };
      }
      return { emailSent: false, mailtoLink, reason: result.message || 'Email API error' };
    } catch {
      // Network error — fall through to mailto fallback.
    }
  }

  return { emailSent: false, mailtoLink, reason: 'no_email_service' };
}
