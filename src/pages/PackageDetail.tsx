import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, MapPin, Gauge, Check, X, ArrowRight, Users, Calendar } from 'lucide-react';
import type { Route } from '@/lib/router';
import type { Package } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { useBooking } from '@/lib/bookingContext';
import Reveal from '@/components/Reveal';

export default function PackageDetail({ slug, navigate }: { slug: string; navigate: (r: Route) => void }) {
  const [pkg, setPkg] = useState<Package | null | undefined>(undefined);
  const [activeImg, setActiveImg] = useState(0);
  const { startPackageDraft } = useBooking();

  useEffect(() => {
    supabase.from('packages').select('*').eq('slug', slug).maybeSingle().then(({ data }) => {
      setPkg(data ?? null);
      setActiveImg(0);
    });
  }, [slug]);

  if (pkg === undefined) {
    return <div className="container-x pt-32 pb-20"><div className="h-96 animate-pulse rounded-3xl bg-ink-100" /></div>;
  }
  if (pkg === null) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Package not found</h1>
        <button onClick={() => navigate({ name: 'packages' })} className="btn-primary mt-6">Back to packages</button>
      </div>
    );
  }

  const gallery = [pkg.image_url, ...pkg.gallery];

  const onBook = () => {
    startPackageDraft(pkg);
    navigate({ name: 'booking' });
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-x pt-8">
        <button onClick={() => navigate({ name: 'packages' })} className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> All packages
        </button>
      </div>

      {/* Gallery + summary */}
      <section className="section bg-sand-50">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl">
                <img src={gallery[activeImg]} alt={pkg.title} className="h-[420px] w-full object-cover sm:h-[520px]" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
                    {pkg.duration_days} days
                  </span>
                  <span className="rounded-full bg-sunset-500 px-3 py-1 text-xs font-semibold text-white">{pkg.difficulty}</span>
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`overflow-hidden rounded-xl ring-2 transition ${activeImg === i ? 'ring-sunset-500' : 'ring-transparent hover:ring-ink-200'}`}
                    >
                      <img src={g} alt="" className="h-20 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={80}>
              <p className="eyebrow">
                <MapPin className="h-4 w-4" /> {pkg.region}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">{pkg.title}</h1>
              <p className="mt-3 text-lg text-ink-600">{pkg.subtitle}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: 'Duration', value: `${pkg.duration_days} days` },
                  { icon: Gauge, label: 'Difficulty', value: pkg.difficulty },
                  { icon: MapPin, label: 'Region', value: pkg.region },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white p-4 text-center ring-1 ring-ink-100">
                    <s.icon className="mx-auto h-5 w-5 text-sunset-500" />
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-ink-400">{s.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-ink-900">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-ink-900 p-6 text-white">
                <p className="text-xs uppercase tracking-wide text-sand-300">From</p>
                <p className="font-display text-4xl font-semibold text-sunset-400">${pkg.price_usd.toLocaleString()}</p>
                <p className="text-sm text-sand-300">per person · all-inclusive</p>
                <button onClick={onBook} className="btn-accent mt-5 w-full">
                  Book this trip <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate({ name: 'customize' })} className="mt-3 w-full text-center text-sm text-sand-200 hover:text-white">
                  Customize this itinerary instead →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section bg-sand-100">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-ink-900">Trip overview</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">{pkg.description}</p>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="mt-10 font-display text-2xl font-semibold text-ink-900">Tour highlights</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-ink-100">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-acacia-50 text-acacia-600">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-ink-700">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-acacia-50 p-6 ring-1 ring-acacia-100">
                  <h4 className="font-display text-lg font-semibold text-acacia-800">What's included</h4>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-acacia-900">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-acacia-600" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-sand-100 p-6 ring-1 ring-sand-200">
                  <h4 className="font-display text-lg font-semibold text-ink-800">Not included</h4>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.excludes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-ink-600">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-error-500" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <Reveal delay={120}>
              <div className="card sticky top-28 p-6">
                <h3 className="font-display text-xl font-semibold text-ink-900">Ready to go?</h3>
                <div className="mt-4 space-y-3 text-sm text-ink-600">
                  <p className="flex items-center gap-2"><Users className="h-4 w-4 text-sunset-500" /> Small groups, max 7 per vehicle</p>
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-sunset-500" /> Flexible start dates year-round</p>
                  <p className="flex items-center gap-2"><Check className="h-4 w-4 text-sunset-500" /> Free date changes up to 30 days out</p>
                </div>
                <button onClick={onBook} className="btn-accent mt-6 w-full">Book now <ArrowRight className="h-4 w-4" /></button>
                <button onClick={() => navigate({ name: 'contact' })} className="btn-ghost mt-3 w-full">Ask a question</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
