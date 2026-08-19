import { useState } from 'react';
import { SlidersHorizontal, MapPin, Check, ArrowRight, Minus, Plus, Sparkles, Wallet } from 'lucide-react';
import type { Route } from '@/lib/router';
import { attractions } from '@/lib/attractions';
import {
  accommodationRates,
  allAccommodations,
  allAddOns,
  addOnPrices,
  customQuote,
} from '@/lib/payments';
import { useBooking } from '@/lib/bookingContext';
import Reveal from '@/components/Reveal';

export default function Customize({ navigate }: { navigate: (r: Route) => void }) {
  const { startCustomDraft } = useBooking();
  const [destinations, setDestinations] = useState<string[]>([]);
  const [days, setDays] = useState(7);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [accommodation, setAccommodation] = useState('Comfort');
  const [addOns, setAddOns] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const total = customQuote({ destinations, days, adults, children, accommodation, addOns });

  const proceed = () => {
    startCustomDraft({
      custom_destinations: destinations,
      accommodation,
      add_ons: addOns,
      adults,
      children,
      total_usd: total,
    });
    navigate({ name: 'booking' });
  };

  const accTiers: { name: string; desc: string }[] = [
    { name: 'Camping', desc: 'Tented camps, shared facilities — the closest to the wild.' },
    { name: 'Comfort', desc: 'Permanent tented lodges with en-suite bathrooms and full board.' },
    { name: 'Luxury', desc: 'Premium lodges and suites with decks, pools and fine dining.' },
  ];

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <img
          src="https://images.pexels.com/photos/20179673/pexels-photo-20179673.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
          alt="Custom safari"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/50" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <SlidersHorizontal className="h-4 w-4" /> Custom trip builder
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">Build your own safari</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Choose where to go, how long, your comfort level and the extras you want. We'll calculate an honest, all-inclusive quote instantly.
          </p>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* Builder */}
          <div className="space-y-10 lg:col-span-2">
            {/* Destinations */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-sm font-bold text-sand-50">1</span>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Pick your destinations</h2>
              </div>
              <p className="mt-2 text-sm text-ink-500">Select one or more — we'll route the most efficient loop.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {attractions.map((a) => {
                  const active = destinations.includes(a.name);
                  return (
                    <button
                      key={a.slug}
                      onClick={() => toggle(destinations, setDestinations, a.name)}
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-3 text-left ring-2 transition ${
                        active ? 'ring-sunset-500 bg-white' : 'ring-transparent bg-white hover:ring-ink-200'
                      }`}
                    >
                      <img
                        src={a.image}
                        alt={a.name}
                        onError={(e) => { const img = e.currentTarget; if (img.dataset.fb) return; img.dataset.fb = '1'; img.src = 'https://images.pexels.com/photos/25950513/pexels-photo-25950513.jpeg?auto=compress&cs=tinysrgb&h=200&w=200'; }}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-400">
                          <MapPin className="h-3 w-3" /> {a.region}
                        </p>
                        <p className="truncate font-semibold text-ink-900">{a.name}</p>
                      </div>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${active ? 'border-sunset-500 bg-sunset-500 text-white' : 'border-ink-200 text-transparent group-hover:border-ink-400'}`}>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Duration + travelers */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-sm font-bold text-sand-50">2</span>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Duration &amp; travelers</h2>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <Stepper label="Days" value={days} min={2} max={21} onChange={setDays} />
                <Stepper label="Adults" value={adults} min={1} max={12} onChange={setAdults} />
                <Stepper label="Children" value={children} min={0} max={8} onChange={setChildren} />
              </div>
            </Reveal>

            {/* Accommodation */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-sm font-bold text-sand-50">3</span>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Comfort level</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {accTiers.map((t) => {
                  const active = accommodation === t.name;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setAccommodation(t.name)}
                      className={`rounded-2xl p-5 text-left ring-2 transition ${active ? 'ring-sunset-500 bg-white' : 'ring-transparent bg-white hover:ring-ink-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-display text-lg font-semibold text-ink-900">{t.name}</p>
                        <p className="text-sm font-semibold text-ink-500">${accommodationRates[t.name]}/day</p>
                      </div>
                      <p className="mt-2 text-sm text-ink-600">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Add-ons */}
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-sm font-bold text-sand-50">4</span>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Add-on experiences</h2>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {allAddOns.map((a) => {
                  const active = addOns.includes(a);
                  return (
                    <button
                      key={a}
                      onClick={() => toggle(addOns, setAddOns, a)}
                      className={`flex items-center justify-between rounded-xl p-4 ring-2 transition ${active ? 'ring-sunset-500 bg-white' : 'ring-transparent bg-white hover:ring-ink-200'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${active ? 'border-sunset-500 bg-sunset-500 text-white' : 'border-ink-200 text-transparent'}`}>
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm font-medium text-ink-800">{a}</span>
                      </span>
                      <span className="text-sm font-semibold text-ink-500">+${addOnPrices[a]}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Sticky quote */}
          <div className="lg:col-span-1">
            <Reveal delay={120}>
              <div className="card sticky top-28 overflow-hidden">
                <div className="bg-ink-900 p-6 text-white">
                  <p className="flex items-center gap-2 text-sm text-sand-300">
                    <Sparkles className="h-4 w-4 text-sunset-400" /> Your live quote
                  </p>
                  <p className="mt-2 font-display text-4xl font-semibold text-sunset-400">${total.toLocaleString()}</p>
                  <p className="text-sm text-sand-300">estimated total · all-inclusive</p>
                </div>
                <div className="p-6">
                  <SummaryRow label="Destinations" value={`${destinations.length || 0} selected`} />
                  <SummaryRow label="Duration" value={`${days} days`} />
                  <SummaryRow label="Travelers" value={`${adults} adults${children ? `, ${children} children` : ''}`} />
                  <SummaryRow label="Comfort" value={accommodation} />
                  <SummaryRow label="Add-ons" value={`${addOns.length || 0} extras`} />
                  {destinations.length === 0 && (
                    <p className="mt-4 rounded-lg bg-sand-100 p-3 text-xs text-ink-500">
                      Pick at least one destination to get a meaningful quote. We'll finalize exact pricing with you before payment.
                    </p>
                  )}
                  <button
                    onClick={proceed}
                    disabled={destinations.length === 0}
                    className="btn-accent mt-6 w-full disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    Continue to booking <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-400">
                    <Wallet className="h-3.5 w-3.5" /> No payment until you confirm
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-100">
      <p className="text-sm font-medium text-ink-700">{label}</p>
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-ink-700 hover:bg-sand-200"
          aria-label={`decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-display text-3xl font-semibold text-ink-900">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-ink-700 hover:bg-sand-200"
          aria-label={`increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-2.5 text-sm last:border-0">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}
