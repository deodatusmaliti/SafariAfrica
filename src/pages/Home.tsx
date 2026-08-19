import { useEffect, useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Camera,
  ArrowRight,
  MapPin,
  Star,
  Award,
  Plane,
  TreePalm,
  Mountain,
} from 'lucide-react';
import type { Route } from '@/lib/router';
import type { Package, Testimonial } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { attractions } from '@/lib/attractions';
import Reveal from '@/components/Reveal';
import PackageCard, { PackageCardSkeleton } from '@/components/PackageCard';
import AttractionCard from '@/components/AttractionCard';
import Stars from '@/components/Stars';
import { useBooking } from '@/lib/bookingContext';

export default function Home({ navigate }: { navigate: (r: Route) => void }) {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { startPackageDraft } = useBooking();

  useEffect(() => {
    supabase
      .from('packages')
      .select('*')
      .order('featured', { ascending: false })
      .then(({ data }) => setPackages(data ?? []));
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setTestimonials(data ?? []));
  }, []);

  const onBook = (pkg: Package) => {
    startPackageDraft(pkg);
    navigate({ name: 'booking' });
  };

  const stats = [
    { value: '15+', label: 'Years guiding' },
    { value: '8,400+', label: 'Happy travelers' },
    { value: '22', label: 'National parks' },
    { value: '4.9★', label: 'Average rating' },
  ];

  const values = [
    { icon: ShieldCheck, title: 'Safe & insured', text: 'Fully licensed, bonded, and covered by Flying Doctors evacuation.' },
    { icon: Leaf, title: 'Conservation first', text: 'A share of every trip funds anti-poaching and habitat programs.' },
    { icon: HeartHandshake, title: 'Local & family-run', text: 'Tanzanian owned, Maasai & Swahili crew, fair wages and real community benefit.' },
    { icon: Camera, title: 'Expert guides', text: 'Silver-level guides who find the moments most travelers miss.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4404524/pexels-photo-4404524.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="Serengeti safari"
            className="h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/40 to-ink-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 to-transparent" />
        </div>

        <div className="container-x relative z-10 pt-28 pb-16 text-white">
          <div className="max-w-3xl">
            <span className="eyebrow text-sunset-300 animate-fade-up">
              <Compass className="h-4 w-4" /> Tanzania · Est. 2009
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] drop-shadow-sm animate-fade-up sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
              Where the wild
              <br />
              <span className="text-sunset-400">still roams free.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100 animate-fade-up" style={{ animationDelay: '160ms' }}>
              Bespoke safaris across Serengeti, Ngorongoro, Kilimanjaro and Zanzibar — designed by Tanzanians who call this land home. The migration, the summit, the beaches, your way.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '240ms' }}>
              <button onClick={() => navigate({ name: 'packages' })} className="btn-accent !px-7 !py-4 text-base">
                Browse Safari Packages <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => navigate({ name: 'customize' })} className="btn-outline-light !px-7 !py-4 text-base">
                Build a Custom Trip
              </button>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-sunset-400">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-sand-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container-x pb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sand-300">
              <span className="h-px w-10 bg-sand-300/60" /> Scroll to explore
            </div>
          </div>
        </div>
      </section>

      {/* INTRO / VALUE PROPS */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">
              <Award className="h-4 w-4" /> Why travel with us
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              Not just a safari. A Tanzanian story, told by the people who live it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              We were born here. We know which side of the crater the rhino sleeps on, where the migration crosses in July, and which beach hut has the best chapati. Every itinerary is hand-crafted, every guide is family.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-acacia-50 text-acacia-600">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ATTRACTIONS PREVIEW */}
      <section className="section bg-ink-900 text-sand-100">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow text-sunset-400">
                <MapPin className="h-4 w-4" /> Iconic destinations
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold text-sand-50 sm:text-5xl">
                Tanzania's most extraordinary places
              </h2>
              <p className="mt-4 text-lg text-sand-300">
                From the great migration to the summit of Kilimanjaro and the spice-scented alleys of Zanzibar.
              </p>
            </div>
            <button onClick={() => navigate({ name: 'attractions' })} className="btn-ghost !bg-white/10 !text-sand-50 !border-white/20 hover:!bg-white hover:!text-ink-900">
              All attractions <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.slice(0, 6).map((a) => (
              <AttractionCard key={a.slug} a={a} navigate={navigate} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="section bg-sand-100">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <Compass className="h-4 w-4" /> Curated packages
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
                Trips ready to book today
              </h2>
              <p className="mt-4 text-lg text-ink-600">
                Tried-and-true itineraries with everything included — or customize any of them into something uniquely yours.
              </p>
            </div>
            <button onClick={() => navigate({ name: 'packages' })} className="btn-ghost">
              View all packages <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {!packages
              ? Array.from({ length: 3 }).map((_, i) => <PackageCardSkeleton key={i} />)
              : packages
                  .filter((p) => p.featured)
                  .slice(0, 3)
                  .map((p, i) => (
                    <Reveal key={p.id} delay={i * 80}>
                      <PackageCard pkg={p} navigate={navigate} onBook={onBook} />
                    </Reveal>
                  ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TRIO */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: Mountain, title: 'Climb Kilimanjaro', text: 'Summit the roof of Africa on the scenic Machame route.', img: 'https://images.pexels.com/photos/31144648/pexels-photo-31144648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', route: { name: 'package', slug: 'kilimanjaro-summit-trek' } as Route },
              { icon: Compass, title: 'Serengeti Safari', text: 'Game drives among the great migration and big cats.', img: 'https://images.pexels.com/photos/36469138/pexels-photo-36469138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', route: { name: 'package', slug: 'serengeti-migration-express' } as Route },
              { icon: TreePalm, title: 'Zanzibar Beaches', text: 'Unwind on turquoise water after your safari.', img: 'https://images.pexels.com/photos/14408604/pexels-photo-14408604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', route: { name: 'package', slug: 'zanzibar-beach-escape' } as Route },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <button
                  onClick={() => navigate(c.route)}
                  className="group relative block h-80 w-full overflow-hidden rounded-3xl text-left"
                >
                  <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                    <c.icon className="h-9 w-9 text-sunset-400" />
                    <h3 className="mt-3 font-display text-2xl font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm text-sand-200">{c.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Discover <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-acacia-900 text-sand-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-grain" />
        <div className="container-x relative">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-acacia-200">
              <Star className="h-4 w-4" /> Traveler stories
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-sand-50 sm:text-5xl">
              Loved by explorers from 40+ countries
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/10" />
                ))
              : testimonials.map((t, i) => (
                  <Reveal key={t.id} delay={i * 90}>
                    <figure className="flex h-full flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                      <Stars value={t.rating} className="text-sunset-400" />
                      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-sand-100">
                        “{t.message}”
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        <img
                          src={t.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`}
                          alt={t.name}
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-sunset-400/50"
                        />
                        <div>
                          <p className="font-semibold text-sand-50">{t.name}</p>
                          <p className="text-xs text-sand-300">{t.trip} · {t.country}</p>
                        </div>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-sand-100">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-16 text-center text-white sm:px-16 sm:py-20">
              <img
                src="https://images.pexels.com/photos/28830598/pexels-photo-28830598.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/40" />
              <div className="relative">
                <Plane className="mx-auto h-10 w-10 text-sunset-400" />
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
                  Your Tanzanian adventure starts with a conversation
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-sand-200">
                  Tell us your dream and we'll craft the itinerary. No deposits, no pressure — just real expertise.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate({ name: 'customize' })} className="btn-accent !px-7 !py-4 text-base">
                    Build my trip <ArrowRight className="h-5 w-5" />
                  </button>
                  <button onClick={() => navigate({ name: 'contact' })} className="btn-outline-light !px-7 !py-4 text-base">
                    Talk to a specialist
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
