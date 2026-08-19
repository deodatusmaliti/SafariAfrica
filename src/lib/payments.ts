export type PaymentMethod = {
  id: string;
  label: string;
  description: string;
  kind: 'bank' | 'mobile' | 'card';
  details: { label: string; value: string }[];
  note?: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank-transfer',
    label: 'Bank Transfer (SWIFT)',
    description: 'International or local wire transfer directly to our company account. A booking is held for 72 hours while payment clears.',
    kind: 'bank',
    details: [
      { label: 'Account name', value: 'Safari Tanzania Ltd.' },
      { label: 'Bank', value: 'CRDB Bank Tanzania' },
      { label: 'Branch', value: 'Arusha CBD' },
      { label: 'Account number', value: '0150 2055 2300' },
      { label: 'SWIFT / BIC', value: 'CORUTZTZ' },
      { label: 'IBAN', value: 'TZ48 1010 0000 0150 2055 2300' },
      { label: 'Currency', value: 'USD' },
    ],
    note: 'Use your booking reference as the transfer reference. Email the transfer slip to deodatusmaliti@yahoo.co.uk to confirm.',
  },
  {
    id: 'ncba-bank',
    label: 'NCBA Bank (Tanzania)',
    description: 'Local deposit or transfer via NCBA Bank for guests already in Tanzania.',
    kind: 'bank',
    details: [
      { label: 'Account name', value: 'Safari Tanzania Ltd.' },
      { label: 'Bank', value: 'NCBA Bank Tanzania' },
      { label: 'Branch', value: 'Arusha' },
      { label: 'Account number', value: '0442 1100 8855' },
      { label: 'Branch code', value: '044' },
      { label: 'Currency', value: 'TZS / USD' },
    ],
    note: 'For in-country deposits, quote your booking reference at the counter.',
  },
  {
    id: 'mpesa',
    label: 'M-Pesa (Tanzania)',
    description: 'Pay instantly via M-Pesa paybill. Fast, secure, and available 24/7 for Tanzanian and Kenyan guests.',
    kind: 'mobile',
    details: [
      { label: 'Provider', value: 'Vodacom M-Pesa' },
      { label: 'Business number', value: '884400' },
      { label: 'Paybill / Lipa', value: '884400' },
      { label: 'Account', value: 'Your booking reference' },
      { label: 'Currency', value: 'TZS' },
    ],
    note: 'Use your booking reference as the M-Pesa account number. You will receive an SMS confirmation instantly.',
  },
  {
    id: 'tigopesa',
    label: 'Tigo Pesa',
    description: 'Mobile money payment via Tigo Pesa for guests on the Tigo network.',
    kind: 'mobile',
    details: [
      { label: 'Provider', value: 'Tigo Pesa' },
      { label: 'Business number', value: '0713 552 990' },
      { label: 'Account', value: 'Your booking reference' },
      { label: 'Currency', value: 'TZS' },
    ],
    note: 'Enter your booking reference as the reference. Confirmation is automatic.',
  },
  {
    id: 'airtelmoney',
    label: 'Airtel Money',
    description: 'Pay with Airtel Money directly to our merchant wallet.',
    kind: 'mobile',
    details: [
      { label: 'Provider', value: 'Airtel Money' },
      { label: 'Business name', value: 'Safari Tanzania' },
      { label: 'Wallet number', value: '0784 110 220' },
      { label: 'Account', value: 'Your booking reference' },
      { label: 'Currency', value: 'TZS' },
    ],
    note: 'Use your booking reference. You will receive an SMS receipt.',
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Pay securely online with Visa, Mastercard or Amex via our secure checkout. Recommended for international guests.',
    kind: 'card',
    details: [
      { label: 'Cards', value: 'Visa, Mastercard, Amex' },
      { label: 'Processor', value: 'Stripe secure checkout' },
      { label: 'Currency', value: 'USD' },
      { label: 'Surcharge', value: 'None' },
    ],
    note: 'You will be redirected to a secure hosted checkout. Your card details are never stored on our servers.',
  },
];

// Pricing engine for custom packages
export const accommodationRates: Record<string, number> = {
  Camping: 180,
  Comfort: 320,
  Luxury: 520,
};

export const destinationBasePrices: Record<string, number> = {
  'Serengeti National Park': 520,
  'Ngorongoro Crater': 410,
  'Mount Kilimanjaro': 680,
  'Tarangire National Park': 280,
  'Lake Manyara National Park': 240,
  'Selous Game Reserve': 560,
  'Ruaha National Park': 540,
  'Zanzibar Archipelago': 380,
  'Stone Town': 220,
  'Lake Victoria': 300,
  'Mahale Mountains': 760,
  'Arusha National Park': 200,
};

export const addOnPrices: Record<string, number> = {
  'Hot air balloon safari': 590,
  'Maasai village visit': 60,
  'Night game drive': 120,
  'Bush dinner under the stars': 180,
  'Private guide & vehicle': 320,
  'Photography guide': 240,
  'Zanzibar spice tour': 45,
  'Scenic flight over the crater': 280,
};

export const allAddOns = Object.keys(addOnPrices);

export const allAccommodations = Object.keys(accommodationRates);

export function customQuote(opts: {
  destinations: string[];
  days: number;
  adults: number;
  children: number;
  accommodation: string;
  addOns: string[];
}): number {
  const perDay = accommodationRates[opts.accommodation] ?? 320;
  let dest = 0;
  opts.destinations.forEach((d) => {
    dest += destinationBasePrices[d] ?? 300;
  });
  const destTotal = opts.destinations.length ? dest : 600;
  let adds = 0;
  opts.addOns.forEach((a) => {
    adds += addOnPrices[a] ?? 0;
  });
  const childMultiplier = 0.7;
  const headcount = opts.adults + opts.children * childMultiplier;
  const base = perDay * opts.days * Math.max(headcount, 1);
  const destPerPerson = destTotal * Math.max(headcount, 1);
  return Math.round(base + destPerPerson + adds * Math.max(opts.adults, 1));
}

export function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `STZ-${s}`;
}
