import { useEffect, useState } from 'react';
import { Calendar, Users, MapPin, Check, ArrowRight, AlertCircle, Loader2, Ticket, Mail, ExternalLink } from 'lucide-react';
import type { Route } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import { useBooking, type DraftBooking } from '@/lib/bookingContext';
import { sendNotification } from '@/lib/notifications';
import Reveal from '@/components/Reveal';

export default function Booking({ refParam, navigate }: { refParam?: string; navigate: (r: Route) => void }) {
  const { draft, confirm, setDraft } = useBooking();
  const [found, setFound] = useState<DraftBooking | null>(null);
  const [loadingLookup, setLoadingLookup] = useState(false);

  // If arriving with ?ref=, look up an existing booking
  useEffect(() => {
    if (!refParam) return;
    setLoadingLookup(true);
    supabase
      .from('bookings')
      .select('*')
      .eq('reference', refParam)
      .maybeSingle()
      .then(({ data }) => {
        setLoadingLookup(false);
        if (data) setFound(data as DraftBooking);
      });
  }, [refParam]);

  const [form, setForm] = useState({
    traveler_name: '',
    email: '',
    phone: '',
    country: '',
    adults: draft?.adults ?? 2,
    children: draft?.children ?? 0,
    start_date: '',
    accommodation: draft?.accommodation ?? 'Comfort',
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  const [savedRef, setSavedRef] = useState<string | null>(null);
  const [mailtoLink, setMailtoLink] = useState('');

  useEffect(() => {
    if (draft) {
      setForm((f) => ({ ...f, adults: draft.adults, children: draft.children, accommodation: draft.accommodation }));
    }
  }, [draft]);

  const update = (k: keyof typeof form, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const nothingToBook = !draft && !found && !refParam;

  if (loadingLookup) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-sunset-500" />
      </div>
    );
  }

  // Found booking by ref — show summary + pay
  if (found) {
    return (
      <div className="container-x pt-28 pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl card p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-acacia-50 text-acacia-600">
              <Ticket className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">Booking {found.reference}</h1>
            <p className="mt-2 text-ink-600">{found.traveler_name} · {found.email}</p>
            <div className="mt-6 rounded-xl bg-sand-100 p-5 text-left">
              <Row label="Trip" value={found.type === 'custom' ? `Custom safari (${found.custom_destinations?.length ?? 0} destinations)` : (found as any).packageName ?? 'Package'} />
              <Row label="Travelers" value={`${found.adults} adults${found.children ? `, ${found.children} children` : ''}`} />
              <Row label="Accommodation" value={found.accommodation} />
              <Row label="Status" value={found.status ?? 'pending'} />
              <Row label="Total" value={`$${found.total_usd.toLocaleString()}`} />
            </div>
            <button onClick={() => navigate({ name: 'payment', ref: found.reference })} className="btn-accent mt-6 w-full">
              Continue to payment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  if (nothingToBook) {
    return (
      <div className="container-x pt-28 pb-20">
        <Reveal>
          <div className="mx-auto max-w-xl card p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sand-100 text-ink-500">
              <AlertCircle className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">No trip selected yet</h1>
            <p className="mt-2 text-ink-600">Pick a package or build a custom itinerary first, then come back to complete your booking.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate({ name: 'packages' })} className="btn-accent">Browse packages</button>
              <button onClick={() => navigate({ name: 'customize' })} className="btn-ghost">Build a custom trip</button>
            </div>
            <p className="mt-6 text-xs text-ink-400">Already booked? <button className="underline" onClick={() => navigate({ name: 'contact' })}>Contact us</button> with your booking reference.</p>
          </div>
        </Reveal>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setStatus('saving');
    setError('');

    const payload = {
      reference: draft.reference,
      type: draft.type,
      package_id: draft.package_id ?? null,
      traveler_name: form.traveler_name,
      email: form.email,
      phone: form.phone || null,
      country: form.country || null,
      adults: Number(form.adults) || 1,
      children: Number(form.children) || 0,
      start_date: form.start_date || null,
      end_date: form.start_date ? null : null,
      accommodation: form.accommodation,
      add_ons: draft.add_ons ?? [],
      custom_destinations: draft.custom_destinations ?? [],
      total_usd: draft.total_usd,
      status: 'pending',
      payment_method: null,
    };

    const { data, error: insertError } = await supabase.from('bookings').insert(payload).select().single();

    if (insertError || !data) {
      setStatus('error');
      setError(insertError?.message ?? 'Could not save your booking. Please try again.');
      return;
    }
    const saved = { ...data, packageName: draft.packageName } as DraftBooking;
    confirm(saved);
    setSavedRef(saved.reference);

    // Send email notification to deodatusmaliti@yahoo.co.uk
    const result = await sendNotification({
      type: 'booking',
      reference: saved.reference,
      traveler_name: form.traveler_name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      packageName: draft.packageName,
      adults: Number(form.adults) || 1,
      children: Number(form.children) || 0,
      start_date: form.start_date,
      accommodation: form.accommodation,
      custom_destinations: draft.custom_destinations,
      add_ons: draft.add_ons,
      total_usd: draft.total_usd,
    });
    setMailtoLink(result.mailtoLink);

    setStatus('saved');
  };

  if (status === 'saved' && savedRef) {
    return (
      <div className="container-x pt-28 pb-20">
        <Reveal>
          <div className="mx-auto max-w-xl card p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-acacia-50 text-acacia-600 animate-fade-in">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900">Booking confirmed!</h1>
            <p className="mt-2 text-ink-600">
              We've saved your trip. Your booking reference is
            </p>
            <p className="mt-3 inline-block rounded-xl bg-ink-900 px-6 py-3 font-display text-2xl font-semibold tracking-wider text-sunset-400">
              {savedRef}
            </p>
            <p className="mt-4 text-sm text-ink-500">
              A small deposit secures your dates. Choose how you'd like to pay — bank transfer, mobile money, or card.
            </p>
            {mailtoLink && (
              <div className="mt-5 rounded-xl bg-sky-50 p-4 text-left ring-1 ring-sky-100">
                <p className="text-sm font-semibold text-sky-800">Email us your booking details</p>
                <p className="mt-1 text-xs text-ink-600">
                  Click below to send your booking details to our inbox — it's pre-filled and ready to go.
                </p>
                <a href={mailtoLink} className="btn-primary mt-3 w-full">
                  <Mail className="h-4 w-4" /> Send via my email app <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
            <button onClick={() => navigate({ name: 'payment', ref: savedRef })} className="btn-accent mt-7 w-full">
              Continue to payment <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate({ name: 'home' })} className="mt-3 text-sm text-ink-500 hover:text-ink-900">
              Back to home
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 to-acacia-900" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <Ticket className="h-4 w-4" /> Booking
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Complete your booking</h1>
          <p className="mt-3 max-w-xl text-sand-200">Just a few details and your spot is reserved. We'll send a confirmation by email.</p>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={submit} className="lg:col-span-2 space-y-8">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Traveler details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input className="input" required value={form.traveler_name} onChange={(e) => update('traveler_name', e.target.value)} placeholder="Jane Doe" />
                </Field>
                <Field label="Email" required>
                  <input className="input" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@email.com" />
                </Field>
                <Field label="Phone">
                  <input className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 555 000 1234" />
                </Field>
                <Field label="Country">
                  <input className="input" value={form.country} onChange={(e) => update('country', e.target.value)} placeholder="United States" />
                </Field>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Trip details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Preferred start date" required>
                  <input type="date" className="input" required value={form.start_date} min={new Date().toISOString().split('T')[0]} onChange={(e) => update('start_date', e.target.value)} />
                </Field>
                <Field label="Accommodation">
                  <select className="input" value={form.accommodation} onChange={(e) => update('accommodation', e.target.value)}>
                    {['Camping', 'Comfort', 'Luxury'].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Adults">
                  <input type="number" min={1} max={20} className="input" value={form.adults} onChange={(e) => update('adults', e.target.value)} />
                </Field>
                <Field label="Children">
                  <input type="number" min={0} max={10} className="input" value={form.children} onChange={(e) => update('children', e.target.value)} />
                </Field>
              </div>
            </Reveal>

            {error && (
              <div className="flex items-start gap-3 rounded-xl bg-error-500/10 p-4 text-sm text-error-500 ring-1 ring-error-500/20">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={status === 'saving'} className="btn-accent disabled:opacity-60">
                {status === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {status === 'saving' ? 'Saving...' : 'Confirm booking'}
              </button>
              <button type="button" onClick={() => navigate({ name: 'packages' })} className="btn-ghost">
                Back
              </button>
            </div>
          </form>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Reveal delay={120}>
              <div className="card sticky top-28 overflow-hidden">
                {draft?.packageName && (
                  <div className="bg-ink-900 p-6 text-white">
                    <p className="text-xs uppercase tracking-wide text-sand-300">Your trip</p>
                    <p className="mt-1 font-display text-xl font-semibold">{draft.packageName}</p>
                  </div>
                )}
                <div className="p-6">
                  <Row label="Booking ref" value={draft?.reference ?? '—'} />
                  <Row label="Type" value={draft?.type === 'custom' ? 'Custom safari' : 'Fixed package'} />
                  {draft?.custom_destinations && draft.custom_destinations.length > 0 && (
                    <div className="border-b border-ink-100 py-2.5">
                      <p className="text-sm text-ink-500">Destinations</p>
                      <ul className="mt-1 space-y-1">
                        {draft.custom_destinations.map((d) => (
                          <li key={d} className="flex items-center gap-1.5 text-sm font-medium text-ink-800">
                            <MapPin className="h-3 w-3 text-sunset-500" /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Row label="Adults" value={`${form.adults}`} icon={<Users className="h-3.5 w-3.5" />} />
                  <Row label="Children" value={`${form.children}`} icon={<Users className="h-3.5 w-3.5" />} />
                  <Row label="Start date" value={form.start_date || '—'} icon={<Calendar className="h-3.5 w-3.5" />} />
                  <Row label="Comfort" value={form.accommodation} />
                  {draft?.add_ons && draft.add_ons.length > 0 && (
                    <div className="border-b border-ink-100 py-2.5">
                      <p className="text-sm text-ink-500">Add-ons</p>
                      <p className="text-sm font-medium text-ink-800">{draft.add_ons.join(', ')}</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t-2 border-ink-100 pt-4">
                    <span className="text-sm font-medium text-ink-700">Estimated total</span>
                    <span className="font-display text-2xl font-semibold text-ink-900">${(draft?.total_usd ?? 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-sunset-500"> *</span>}</span>
      {children}
    </label>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-2.5 text-sm last:border-0">
      <span className="flex items-center gap-1.5 text-ink-500">{icon}{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}
