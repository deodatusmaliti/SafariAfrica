import { ArrowLeft, MapPin, CalendarDays, Check, ArrowRight, Info } from 'lucide-react';
import type { Route } from '@/lib/router';
import { attractions } from '@/lib/attractions';
import { useBooking } from '@/lib/bookingContext';


export default function AttractionDetail({ slug, navigate }: { slug: string; navigate: (r: Route) => void }) {
  const a = attractions.find((x) => x.slug === slug);
  const { startCustomDraft } = useBooking();

  if (!a) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Attraction not found</h1>
        <button onClick={() => navigate({ name: 'attractions' })} className="btn-primary mt-6">
          Back to attractions
        </button>
      </div>
    );
  }

  const related = attractions.filter((x) => x.region === a.region && x.slug !== a.slug).slice(0, 3);

  const planWithThis = () => {
    startCustomDraft({ custom_destinations: [a.name], total_usd: 0 });
    navigate({ name: 'customize' });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <img
          src={a.image.replace('w=940', 'w=1920')}
          alt={a.name}
          onError={(e) => { const img = e.currentTarget; if (img.dataset.fb) return; img.dataset.fb = '1'; img.src = 'https://images.pexels.com/photos/25950513/pexels-photo-25950513.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920'; }}
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-ink-900/20" />
        <div className="container-x relative pb-12 text-white">
          <button onClick={() => navigate({ name: 'attractions' })} className="mb-5 inline-flex items-center gap-2 text-sm text-sand-200 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All attractions
          </button>
          <p className="eyebrow text-sunset-300">
            <MapPin className="h-4 w-4" /> {a.region}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">{a.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-sand-100">{a.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <section className="section bg-sand-50">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-ink-900">About this destination</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-700">{a.description}</p>

            <h3 className="mt-10 font-display text-2xl font-semibold text-ink-900">Highlights</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {a.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-ink-100">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-acacia-50 text-acacia-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-ink-700">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-start gap-4 rounded-2xl bg-sky-50 p-6 ring-1 ring-sky-100">
              <CalendarDays className="mt-0.5 h-6 w-6 shrink-0 text-sky-600" />
              <div>
                <h4 className="font-semibold text-ink-900">Best time to visit</h4>
                <p className="mt-1 text-sm text-ink-600">{a.bestTime}</p>
              </div>
            </div>
          </div>

          {/* Facts sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-28 p-6">
              <h3 className="font-display text-xl font-semibold text-ink-900">Quick facts</h3>
              <dl className="mt-4 divide-y divide-ink-100">
                {a.facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-ink-500">{f.label}</dt>
                    <dd className="text-sm font-semibold text-ink-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={planWithThis} className="btn-accent mt-6 w-full">
                Plan a trip here <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate({ name: 'contact' })} className="btn-ghost mt-3 w-full">
                Ask a question
              </button>
              <p className="mt-4 flex items-start gap-2 text-xs text-ink-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                We'll include this destination in a custom itinerary built around your dates and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-ink-900 text-sand-100">
          <div className="container-x">
            <h2 className="font-display text-3xl font-semibold text-sand-50">More in {a.region}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => navigate({ name: 'attraction', slug: r.slug })}
                  className="group relative h-64 overflow-hidden rounded-2xl text-left"
                >
                  <img src={r.image} alt={r.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs uppercase tracking-wide text-sunset-300">{r.region}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{r.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
