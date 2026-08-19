import { useEffect, useState } from 'react';
import { SlidersHorizontal, Compass, ArrowRight } from 'lucide-react';
import type { Route } from '@/lib/router';
import type { Package } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import PackageCard, { PackageCardSkeleton } from '@/components/PackageCard';
import Reveal from '@/components/Reveal';
import { useBooking } from '@/lib/bookingContext';

export default function Packages({ navigate }: { navigate: (r: Route) => void }) {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [region, setRegion] = useState('All');
  const { startPackageDraft } = useBooking();

  useEffect(() => {
    supabase.from('packages').select('*').order('featured', { ascending: false }).order('price_usd').then(({ data }) => setPackages(data ?? []));
  }, []);

  const regions = ['All', ...Array.from(new Set((packages ?? []).map((p) => p.region)))];
  const filtered = (packages ?? []).filter((p) => region === 'All' || p.region === region);

  const onBook = (pkg: Package) => {
    startPackageDraft(pkg);
    navigate({ name: 'booking' });
  };

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <img
          src="https://images.pexels.com/photos/28708299/pexels-photo-28708299.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
          alt="Safari"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/50" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <Compass className="h-4 w-4" /> Safari packages
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">All-inclusive tour packages</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Hand-crafted itineraries with park fees, lodging, guides and transfers included. Pick one as-is, or customize it into something uniquely yours.
          </p>
        </div>
      </section>

      {/* Customize banner */}
      <section className="bg-sand-100">
        <div className="container-x py-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-gradient-to-r from-acacia-700 to-acacia-900 p-7 text-sand-50 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15">
                  <SlidersHorizontal className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">Want something tailored?</h3>
                  <p className="mt-1 text-sm text-sand-200">Build a custom safari — choose your destinations, days, comfort level and add-ons.</p>
                </div>
              </div>
              <button onClick={() => navigate({ name: 'customize' })} className="btn bg-white text-acacia-800 hover:bg-sand-100">
                Customize a trip <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-b border-ink-100 bg-sand-50/90 backdrop-blur">
        <div className="container-x flex flex-wrap gap-2 py-4">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                region === r ? 'bg-ink-900 text-sand-50' : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {!packages
              ? Array.from({ length: 6 }).map((_, i) => <PackageCardSkeleton key={i} />)
              : filtered.map((p, i) => (
                  <Reveal key={p.id} delay={i * 60}>
                    <PackageCard pkg={p} navigate={navigate} onBook={onBook} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
