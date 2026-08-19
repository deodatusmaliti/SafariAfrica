import { Clock, MapPin, ArrowRight, Gauge } from 'lucide-react';
import type { Package } from '@/lib/types';
import type { Route } from '@/lib/router';

export default function PackageCard({
  pkg,
  navigate,
  onBook,
}: {
  pkg: Package;
  navigate: (r: Route) => void;
  onBook: (pkg: Package) => void;
}) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative h-60 overflow-hidden">
        <img
          src={pkg.image_url}
          alt={pkg.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
          {pkg.duration_days} days
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-sunset-500 px-3 py-1 text-xs font-semibold text-white">
          {pkg.difficulty}
        </span>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-sand-200">
            <MapPin className="h-3.5 w-3.5" /> {pkg.region}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{pkg.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-ink-600 line-clamp-2">{pkg.subtitle}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="rounded-full bg-acacia-50 px-2.5 py-1 text-[11px] font-medium text-acacia-700">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-400">From</p>
            <p className="font-display text-2xl font-semibold text-ink-900">
              ${pkg.price_usd.toLocaleString()}
              <span className="ml-1 text-xs font-normal text-ink-400">/ person</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ name: 'package', slug: pkg.slug })}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-700 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              aria-label="View details"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onBook(pkg)} className="btn-accent !px-5 !py-2.5 text-xs">
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="h-60 animate-pulse bg-ink-100" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 animate-pulse rounded bg-ink-100" />
        <div className="h-3 w-full animate-pulse rounded bg-ink-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-100" />
      </div>
    </div>
  );
}
