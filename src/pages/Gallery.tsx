import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { Route } from '@/lib/router';
import Reveal from '@/components/Reveal';

type Shot = { src: string; caption: string; description: string; cat: string };

const shots: Shot[] = [
  { src: 'https://images.pexels.com/photos/4404524/pexels-photo-4404524.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Serengeti game drive at golden hour', description: 'A 4x4 rolls across the endless plains as the sun dips, casting long shadows behind grazing zebras.', cat: 'Safari' },
  { src: 'https://images.pexels.com/photos/13129167/pexels-photo-13129167.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'African elephant up close', description: 'A mature bull elephant pauses beside the track in Tarangire, ears spread wide in the morning light.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/31121292/pexels-photo-31121292.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Mount Kilimanjaro at dawn', description: 'The snow-capped summit of Uhuru Peak catches the first light above the clouds at 5,895 metres.', cat: 'Kilimanjaro' },
  { src: 'https://images.pexels.com/photos/34777333/pexels-photo-34777333.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Zanzibar turquoise waters', description: 'A wooden dhow drifts over the coral-fringed lagoon off Nungwi, where the Indian Ocean turns translucent blue.', cat: 'Zanzibar' },
  { src: 'https://images.pexels.com/photos/17893990/pexels-photo-17893990.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Lion pride on the plains', description: 'A pride of lions rests in the tall grass of the Serengeti, cubs tumbling between the adults after a night hunt.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/28830598/pexels-photo-28830598.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Hot air balloon over the Serengeti', description: 'A balloon floats silently above the migration at sunrise — the most magical way to see the plains unfold.', cat: 'Safari' },
  { src: 'https://images.pexels.com/photos/4995594/pexels-photo-4995594.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Stone Town harbor, Zanzibar', description: 'Fishing dhows anchor in the historic Stone Town harbor as the call to prayer echoes across the coral-stone town.', cat: 'Zanzibar' },
  { src: 'https://images.pexels.com/photos/20847562/pexels-photo-20847562.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Ngorongoro Crater wildlife', description: 'Zebras and antelopes graze side by side on the crater floor, a 260 km² natural amphitheatre teeming with life.', cat: 'Safari' },
  { src: 'https://images.pexels.com/photos/12592433/pexels-photo-12592433.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Maasai cultural visit', description: 'A Maasai elder welcomes guests to his boma on the Ngorongoro highlands, sharing songs and stories of the land.', cat: 'Culture' },
  { src: 'https://images.pexels.com/photos/19986850/pexels-photo-19986850.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Zebras beneath baobab trees', description: 'A herd of zebras shelters under the broad branches of an ancient baobab in Tarangire National Park.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/8723105/pexels-photo-8723105.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Dhow off the Zanzibar coast', description: 'A traditional wooden dhow sails the trade winds off the Zanzibar archipelago at midday.', cat: 'Zanzibar' },
  { src: 'https://images.pexels.com/photos/9185432/pexels-photo-9185432.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Elephants and zebras in the Serengeti', description: 'Elephants and zebras share a waterhole in the western corridor as the migration herds pass through.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/36469138/pexels-photo-36469138.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Acacia-dotted Serengeti road', description: 'A dirt track winds past lone acacia trees across the Serengeti savanna under a vast East African sky.', cat: 'Safari' },
  { src: 'https://images.pexels.com/photos/12573131/pexels-photo-12573131.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Flamingos at Lake Manyara', description: 'A ribbon of pink flamingos lines the alkaline shore of Lake Manyara beneath the Rift Valley escarpment.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/15373903/pexels-photo-15373903.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Elephant drinking, Tarangire', description: 'A young elephant draws water from a shrinking pool in Tarangire during the height of the dry season.', cat: 'Wildlife' },
  { src: 'https://images.pexels.com/photos/14408604/pexels-photo-14408604.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000', caption: 'Beachfront villa, Zanzibar', description: 'A thatched villa opens directly onto the white sand and warm turquoise water of a Zanzibar beach.', cat: 'Zanzibar' },
];

const cats = ['All', 'Safari', 'Wildlife', 'Kilimanjaro', 'Zanzibar', 'Culture'];

export default function Gallery({ navigate }: { navigate: (r: Route) => void }) {
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = cat === 'All' ? shots : shots.filter((s) => s.cat === cat);

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <img
          src="https://images.pexels.com/photos/9185432/pexels-photo-9185432.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
          alt="Gallery"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/50" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <Camera className="h-4 w-4" /> Gallery
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">Moments from the wild</h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-200">A glimpse of what awaits — captured by our guides and guests across Tanzania.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-b border-ink-100 bg-sand-50/90 backdrop-blur">
        <div className="container-x flex flex-wrap gap-2 py-4">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c ? 'bg-ink-900 text-sand-50' : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry-ish grid */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <Reveal key={s.src} delay={(i % 6) * 60}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group block w-full overflow-hidden rounded-2xl bg-white text-left ring-1 ring-ink-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-200/50"
                >
                  <div className="relative overflow-hidden">
                    <img src={s.src} alt={s.caption} loading="lazy" className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-700 backdrop-blur">{s.cat}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-display text-base font-semibold text-ink-900">{s.caption}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.description}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-4 animate-fade-in" onClick={close}>
          <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={close} aria-label="close">
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].caption} className="max-h-[68vh] w-full rounded-2xl object-contain" />
            <figcaption className="mt-4 px-4 text-center text-white">
              <p className="text-xs uppercase tracking-wide text-sunset-400">{filtered[lightbox].cat}</p>
              <p className="mt-1 text-lg font-semibold">{filtered[lightbox].caption}</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-sand-200">{filtered[lightbox].description}</p>
            </figcaption>
          </figure>
          <button
            className="absolute right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="next"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
