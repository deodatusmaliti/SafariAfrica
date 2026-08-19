import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import type { Route } from '@/lib/router';
import { attractions } from '@/lib/attractions';
import AttractionCard from '@/components/AttractionCard';

export default function Attractions({ navigate }: { navigate: (r: Route) => void }) {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('All');

  const regions = ['All', ...Array.from(new Set(attractions.map((a) => a.region)))];
  const filtered = attractions.filter((a) => {
    const matchesQ =
      !q ||
      a.name.toLowerCase().includes(q.toLowerCase()) ||
      a.tagline.toLowerCase().includes(q.toLowerCase()) ||
      a.description.toLowerCase().includes(q.toLowerCase());
    const matchesR = region === 'All' || a.region === region;
    return matchesQ && matchesR;
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <img
          src="https://images.pexels.com/photos/25950513/pexels-photo-25950513.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
          alt="Tanzania landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/50" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <MapPin className="h-4 w-4" /> Discover Tanzania
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">
            Tourist attractions &amp; national parks
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">
            Twelve of Tanzania's most treasured places — from the Serengeti plains to the coral coast of Zanzibar and the chimpanzee forests of Mahale.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-b border-ink-100 bg-sand-50/90 backdrop-blur">
        <div className="container-x flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search attractions..."
              className="input !pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>
      </section>

      {/* Grid — no Reveal wrapper, cards always visible */}
      <section className="section bg-sand-50">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-ink-500">No attractions match your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <AttractionCard key={a.slug} a={a} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
