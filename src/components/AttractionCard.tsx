import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Attraction } from '@/lib/types';
import type { Route } from '@/lib/router';

const FALLBACK =
  'https://images.pexels.com/photos/25950513/pexels-photo-25950513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function AttractionCard({
  a,
  navigate,
  variant = 'light',
}: {
  a: Attraction;
  navigate: (r: Route) => void;
  variant?: 'light' | 'dark';
}) {
  const dark = variant === 'dark';

  return (
    <button
      onClick={() => navigate({ name: 'attraction', slug: a.slug })}
      className={`group flex w-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-200/50 ${
        dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white ring-1 ring-ink-100'
      }`}
    >
      {/* Photo — always visible, with gradient placeholder behind */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-acacia-100 to-sand-200">
        <img
          src={a.image}
          alt={a.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback) return;
            img.dataset.fallback = '1';
            img.src = FALLBACK;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-700 backdrop-blur">
          <MapPin className="h-3 w-3" /> {a.region}
        </span>
      </div>

      {/* Text — always visible below the photo */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`font-display text-xl font-semibold leading-tight ${
            dark ? 'text-sand-50' : 'text-ink-900'
          }`}
        >
          {a.name}
        </h3>
        <p
          className={`mt-2 line-clamp-3 text-sm leading-relaxed ${
            dark ? 'text-sand-200' : 'text-ink-600'
          }`}
        >
          {a.tagline}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2.5 ${
            dark ? 'text-sunset-400' : 'text-sunset-600'
          }`}
        >
          Explore <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
