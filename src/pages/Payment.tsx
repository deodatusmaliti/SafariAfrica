import { useEffect, useState } from 'react';
import {
  CreditCard,
  Building2,
  Smartphone,
  Check,
  ArrowRight,
  AlertCircle,
  Loader2,
  Copy,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import type { Route } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import { paymentMethods, type PaymentMethod } from '@/lib/payments';
import { CONTACT, mailto } from '@/lib/contact';
import Reveal from '@/components/Reveal';

export default function Payment({ ref, navigate }: { ref: string; navigate: (r: Route) => void }) {
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [recorded, setRecorded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('bookings')
      .select('*')
      .eq('reference', ref)
      .maybeSingle()
      .then(({ data, error }) => {
        setLoading(false);
        if (!error && data) setBooking(data);
      });
  }, [ref]);

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const recordPayment = async () => {
    if (!booking || !method) return;
    setSaving(true);
    const amount = Math.max(1, Math.round(booking.total_usd * 0.3)); // 30% deposit
    await supabase.from('payments').insert({
      booking_id: booking.id,
      method: method.id,
      amount_usd: amount,
      reference_note: booking.reference,
      status: 'initiated',
    });
    await supabase.from('bookings').update({ payment_method: method.id, status: 'pending_payment' }).eq('id', booking.id);
    setSaving(false);
    setRecorded(true);
  };

  if (loading) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-sunset-500" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-x pt-28 pb-20">
        <div className="mx-auto max-w-xl card p-8 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-sunset-500" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900">Booking not found</h1>
          <p className="mt-2 text-ink-600">We couldn't find a booking with reference <strong>{ref}</strong>.</p>
          <button onClick={() => navigate({ name: 'contact' })} className="btn-primary mt-6">Contact us</button>
        </div>
      </div>
    );
  }

  const deposit = Math.max(1, Math.round(booking.total_usd * 0.3));
  const icons: Record<string, any> = { bank: Building2, mobile: Smartphone, card: CreditCard };

  if (recorded && method) {
    return (
      <div className="container-x pt-28 pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl card overflow-hidden">
            <div className="bg-acacia-600 p-8 text-center text-white">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20">
                <Check className="h-8 w-8" />
              </span>
              <h1 className="mt-5 font-display text-3xl font-semibold">Payment instructions sent</h1>
              <p className="mt-2 text-acacia-50">We've recorded your {method.label} payment intent for booking {booking.reference}.</p>
            </div>
            <div className="p-8">
              <div className="rounded-xl bg-sand-100 p-5 text-center">
                <p className="text-sm text-ink-500">Deposit due to confirm (30%)</p>
                <p className="font-display text-3xl font-semibold text-ink-900">${deposit.toLocaleString()}</p>
                <p className="mt-1 text-xs text-ink-400">Balance of ${(booking.total_usd - deposit).toLocaleString()} due 14 days before travel</p>
              </div>

              {method.kind !== 'card' && (
                <div className="mt-6">
                  <h3 className="font-display text-lg font-semibold text-ink-900">{method.label} details</h3>
                  <dl className="mt-3 divide-y divide-ink-100 rounded-xl bg-white p-4 ring-1 ring-ink-100">
                    {method.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-4 py-2.5">
                        <dt className="text-sm text-ink-500">{d.label}</dt>
                        <dd className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                          {d.value}
                          <button onClick={() => copy(d.value, d.label)} className="text-ink-400 hover:text-sunset-500" aria-label="copy">
                            {copied === d.label ? <Check className="h-3.5 w-3.5 text-acacia-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {method.note && <p className="mt-3 text-sm text-ink-600">{method.note}</p>}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={mailto(
                    `Payment confirmation — ${booking.reference}`,
                    `Hi, I have made a ${method.label} payment for booking ${booking.reference}. Total: $${booking.total_usd}. Deposit: $${deposit}.`,
                  )}
                  className="btn-accent flex-1"
                >
                  Email payment proof <ArrowRight className="h-4 w-4" />
                </a>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost flex-1">
                  <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                </a>
              </div>
              <button onClick={() => navigate({ name: 'home' })} className="mt-4 w-full text-center text-sm text-ink-500 hover:text-ink-900">
                Back to home
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 to-sky-900" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <ShieldCheck className="h-4 w-4" /> Secure payment
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Pay for your safari</h1>
          <p className="mt-3 max-w-xl text-sand-200">Booking reference <span className="font-mono font-semibold text-sunset-400">{ref}</span> · Choose how you'd like to pay.</p>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-3">
                {(['bank', 'mobile', 'card'] as const).map((kind) => {
                  const Icon = icons[kind];
                  const label = kind === 'bank' ? 'Bank Transfer' : kind === 'mobile' ? 'Mobile Money' : 'Card Payment';
                  return (
                    <div key={kind} className="rounded-2xl bg-white p-5 ring-1 ring-ink-100">
                      <Icon className="h-6 w-6 text-sunset-500" />
                      <p className="mt-2 font-semibold text-ink-900">{label}</p>
                      <p className="mt-1 text-xs text-ink-500">
                        {kind === 'bank' ? 'SWIFT & local banks' : kind === 'mobile' ? 'M-Pesa, Tigo, Airtel' : 'Visa, Mastercard, Amex'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <div className="space-y-3">
              {paymentMethods.map((m, i) => {
                const Icon = icons[m.kind];
                const active = method?.id === m.id;
                return (
                  <Reveal key={m.id} delay={i * 50}>
                    <button
                      onClick={() => setMethod(m)}
                      className={`flex w-full items-center gap-4 rounded-2xl p-5 text-left ring-2 transition ${
                        active ? 'ring-sunset-500 bg-white' : 'ring-transparent bg-white hover:ring-ink-200'
                      }`}
                    >
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${active ? 'bg-sunset-500 text-white' : 'bg-sand-100 text-ink-600'}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink-900">{m.label}</p>
                        <p className="mt-0.5 text-sm text-ink-500 line-clamp-1">{m.description}</p>
                      </div>
                      <ChevronRight className={`h-5 w-5 shrink-0 transition ${active ? 'text-sunset-500' : 'text-ink-300'}`} />
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {method && (
              <Reveal>
                <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-100">
                  <h3 className="font-display text-xl font-semibold text-ink-900">{method.label}</h3>
                  <p className="mt-2 text-sm text-ink-600">{method.description}</p>

                  {method.id === 'card' ? (
                    <div className="mt-5 rounded-xl bg-sky-50 p-5 ring-1 ring-sky-100">
                      <p className="text-sm text-ink-700">
                        Secure online card checkout is powered by Stripe. Once you confirm below, our team will email you a secure payment link to the address on your booking within a few hours.
                      </p>
                      <p className="mt-2 text-xs text-ink-500">Card details are never stored on our servers. Stripe is PCI-DSS Level 1 certified.</p>
                    </div>
                  ) : (
                    <dl className="mt-4 divide-y divide-ink-100 rounded-xl bg-sand-50 p-4">
                      {method.details.map((d) => (
                        <div key={d.label} className="flex items-center justify-between gap-4 py-2.5">
                          <dt className="text-sm text-ink-500">{d.label}</dt>
                          <dd className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                            {d.value}
                            <button onClick={() => copy(d.value, d.label)} className="text-ink-400 hover:text-sunset-500" aria-label="copy">
                              {copied === d.label ? <Check className="h-3.5 w-3.5 text-acacia-600" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {method.note && <p className="mt-3 text-sm text-ink-600">{method.note}</p>}
                </div>
              </Reveal>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Reveal delay={120}>
              <div className="card sticky top-28 overflow-hidden">
                <div className="bg-ink-900 p-6 text-white">
                  <p className="text-xs uppercase tracking-wide text-sand-300">Booking summary</p>
                  <p className="mt-1 font-mono text-lg text-sunset-400">{booking.reference}</p>
                </div>
                <div className="p-6">
                  <Row label="Traveler" value={booking.traveler_name} />
                  <Row label="Trip" value={booking.type === 'custom' ? 'Custom safari' : 'Package'} />
                  <Row label="Travelers" value={`${booking.adults} adults${booking.children ? `, ${booking.children} children` : ''}`} />
                  <Row label="Accommodation" value={booking.accommodation} />
                  {booking.start_date && <Row label="Start date" value={booking.start_date} />}
                  <div className="mt-3 flex items-center justify-between border-t-2 border-ink-100 pt-4">
                    <span className="text-sm font-medium text-ink-700">Total</span>
                    <span className="font-display text-2xl font-semibold text-ink-900">${booking.total_usd.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-acacia-50 p-3">
                    <span className="text-sm font-medium text-acacia-800">Deposit (30%)</span>
                    <span className="font-display text-lg font-semibold text-acacia-800">${deposit.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={recordPayment}
                    disabled={!method || saving}
                    className="btn-accent mt-5 w-full disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    {saving ? 'Saving...' : 'I will pay this way'}
                  </button>
                  {!method && <p className="mt-3 text-center text-xs text-ink-400">Select a payment method above</p>}
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost mt-3 w-full">
                    <MessageCircle className="h-4 w-4" /> Pay via WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-2.5 text-sm last:border-0">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}
