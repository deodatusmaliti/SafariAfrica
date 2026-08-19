import {
  Compass,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Award,
  Users,
  TreePalm,
  MapPin,
  ArrowRight,
  Mountain,
} from 'lucide-react';
import type { Route } from '@/lib/router';
import Reveal from '@/components/Reveal';
import { CONTACT } from '@/lib/contact';

export default function About({ navigate }: { navigate: (r: Route) => void }) {
  const stats = [
    { value: '15+', label: 'Years guiding' },
    { value: '8,400+', label: 'Happy travelers' },
    { value: '22', label: 'Parks visited' },
    { value: '40+', label: 'Countries served' },
  ];

  const values = [
    { icon: Leaf, title: 'Conservation first', text: 'A share of every trip funds anti-poaching units, habitat restoration, and community wildlife corridors.' },
    { icon: HeartHandshake, title: 'Community rooted', text: 'We employ Maasai and Swahili crew at fair wages, support village schools, and source locally.' },
    { icon: ShieldCheck, title: 'Safe & insured', text: 'Fully licensed by TALA, bonded, and covered by AMREF Flying Doctors emergency evacuation.' },
    { icon: Award, title: 'Expert guides', text: 'Silver-level certified guides who find the moments most travelers miss.' },
  ];

  const team = [
    { name: 'Deodatus Maliti', role: 'Founder & Operations Manager', img: 'https://images.pexels.com/photos/16241905/pexels-photo-16241905.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    { name: 'James Maliti', role: 'Head Guide', img: 'https://images.pexels.com/photos/33767740/pexels-photo-33767740.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    { name: 'Patrick Kessy', role: 'Guide & Driver', img: 'https://images.pexels.com/photos/33767739/pexels-photo-33767739.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    { name: 'Suzan Maliti', role: 'Zanzibar and Arusha Specialist', img: 'https://images.pexels.com/photos/37079375/pexels-photo-37079375.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <img
          src="https://images.pexels.com/photos/36702542/pexels-photo-36702542.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
          alt="Safari"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-ink-900/20" />
        <div className="container-x relative pb-16 text-white">
          <span className="eyebrow text-sunset-300">
            <Compass className="h-4 w-4" /> Our story
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">
            Born in Tanzania, shaped by the wild
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-100">
            Safari Tanzania began in 2009 with one Land Cruiser, a deep love of the bush, and a promise: to show travelers the real Tanzania, the way a local friend would.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-sand-50">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <MapPin className="h-4 w-4" /> The journey
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900">From one guide to a family of explorers</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
              <p>
                Our founder, Deodatus Maliti, grew up on the edge of the Serengeti, herding cattle with his grandfather and learning to read animal tracks before he could read books. He started guiding formally in 2004 and founded Safari Tanzania five years later.
              </p>
              <p>
                Today we're a team of 24 — guides, mountain crew, cooks, drivers and office staff — all Tanzanian, all passionate about sharing this land. We've taken over 8,400 travelers into the wild, from first-time safari-goers to seasoned mountaineers.
              </p>
              <p>
                We believe a safari should change you. Not just the photos, but the feeling of sitting by a fire under a sky so full of stars it feels close enough to touch. That's what we deliver, every single trip.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.pexels.com/photos/14074141/pexels-photo-14074141.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
                'https://images.pexels.com/photos/5574045/pexels-photo-5574045.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
                'https://images.pexels.com/photos/12592433/pexels-photo-12592433.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
                'https://images.pexels.com/photos/8723118/pexels-photo-8723118.jpeg?auto=compress&cs=tinysrgb&h=500&w=400',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className={`rounded-2xl object-cover ring-1 ring-ink-100 ${i % 2 ? 'mt-8' : ''} h-56 w-full`} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-display text-4xl font-semibold text-sunset-400 sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-sand-300">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sand-100">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <HeartHandshake className="h-4 w-4" /> What we stand for
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">More than a business — a responsibility</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Team */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <Users className="h-4 w-4" /> The people
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">Meet your guides</h2>
            <p className="mt-4 text-lg text-ink-600">The heart of Safari Tanzania — the people who'll turn your trip into a story you'll tell for years.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="card card-hover overflow-hidden text-center">
                  <img src={m.img} alt={m.name} className="h-64 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink-900">{m.name}</h3>
                    <p className="mt-1 text-sm text-sunset-600">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-sand-100">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-acacia-800 px-8 py-16 text-center text-sand-50 sm:px-16">
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.pexels.com/photos/5574041/pexels-photo-5574041.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative">
                <Mountain className="mx-auto h-10 w-10 text-sunset-400" />
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
                  Ready to meet Tanzania?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-sand-200">
                  Talk to {CONTACT.name} and the team. We'll design something unforgettable together.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate({ name: 'customize' })} className="btn-accent !px-7 !py-4 text-base">
                    Build my trip <ArrowRight className="h-5 w-5" />
                  </button>
                  <button onClick={() => navigate({ name: 'contact' })} className="btn bg-white text-acacia-800 hover:bg-sand-100 !px-7 !py-4 text-base">
                    Contact us
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
