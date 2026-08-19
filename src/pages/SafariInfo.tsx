import {
  CalendarDays,
  Plane,
  ShieldPlus,
  Backpack,
  CreditCard,
  HandHeart,
  Sun,
  CloudRain,
  ThermometerSun,
  MapPinned,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { Route } from '@/lib/router';
import Reveal from '@/components/Reveal';

const seasons = [
  {
    icon: Sun,
    label: 'Dry Season (Jun–Oct)',
    text: 'The classic safari window. Grass is short, animals gather at water sources, and the Great Migration river crossings happen in the Serengeti. Expect dusty roads, clear skies, and cool mornings.',
  },
  {
    icon: CloudRain,
    label: 'Green Season (Nov–May)',
    text: 'Lush landscapes, fewer crowds, and lower rates. January–February is calving season in the southern Serengeti — thousands of wildebeest births and predator action. Short afternoon showers rarely disrupt game drives.',
  },
  {
    icon: ThermometerSun,
    label: 'Best for Climbing',
    text: 'Kilimanjaro is best tackled June–October or January–February. Avoid the long rains in April–May when trails are slippery and visibility drops.',
  },
];

const packing = [
  'Neutral-colored clothing (khaki, olive, brown) — avoid bright whites and dark blues that attract tsetse flies',
  'Layers: warm fleece or jacket for dawn game drives (it can drop to 10°C / 50°F), breathable shirts for midday',
  'Sturdy closed-toe walking shoes or light hiking boots',
  'Wide-brimmed hat, sunglasses, and SPF 30+ sunscreen',
  'Insect repellent with DEET for evenings',
  'Binoculars (8x42 or 10x42) — the single biggest upgrade to your safari experience',
  'Camera with a 200mm+ telephoto lens for wildlife photography',
  'Universal power adapter (Tanzania uses Type D and Type G sockets, 230V)',
  'Reusable water bottle (at least 1L) — most lodges offer free refills',
  'Small daypack for game-drive essentials',
];

const healthVisa = [
  {
    icon: ShieldPlus,
    title: 'Visa & Entry',
    items: [
      'Most nationalities need a tourist visa — apply online via the Tanzania e-Visa portal before arrival, or get a visa on arrival at major airports (USD 50 cash for most countries, USD 100 for US citizens).',
      'Passport must be valid for at least 6 months beyond your entry date with one blank page.',
      'Yellow fever vaccination certificate is required if arriving from a yellow-fever-endemic country.',
    ],
  },
  {
    icon: HandHeart,
    title: 'Health',
    items: [
      'Antimalarial medication is strongly recommended — consult your travel clinic 4–6 weeks before departure.',
      'Routine vaccinations should be up to date (MMR, DPT, polio). Consider hepatitis A and typhoid for rural areas.',
      'Drink only bottled or filtered water — avoid tap water and ice in remote lodges.',
      'AMREF Flying Doctors evacuation is included on all our packages for peace of mind.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Money & Park Fees',
    items: [
      'Tanzanian Shilling (TZS) is the local currency, but USD is widely accepted in tourist areas. Bring crisp bills dated 2013 or newer.',
      'ATMs are available in Arusha, Moshi, and Zanzibar Town — carry enough cash for remote lodges.',
      'National park entrance fees are included in all our package quotes (Serengeti/Ngorongoro USD 60/person/day, Tarangire/Lake Manyara USD 60/person/day).',
      'Tipping guideline: USD 15–20 per day for your guide, USD 10–15 per day for camp crew.',
    ],
  },
];

const etiquette = [
  'Always ask before photographing people — some Maasai communities require a small fee or prefer not to be photographed.',
  'Dress modestly in villages and Zanzibar (shoulders and knees covered) — Tanzania is predominantly Muslim on the coast.',
  'Never feed or touch wild animals, and keep noise to a minimum on game drives.',
  'Greet with "Jambo!" and a smile — Swahili is the national language, and a few words go a long way.',
  'Remove shoes before entering homes or mosques.',
  'Bargaining is expected at markets, but keep it respectful — a fair price for both sides.',
];

export default function SafariInfo({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img
          src="https://images.pexels.com/photos/36469138/pexels-photo-36469138.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
          alt="Serengeti landscape"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-ink-900/20" />
        <div className="container-x relative pb-16 text-white">
          <span className="eyebrow text-sunset-300">
            <Info className="h-4 w-4" /> Plan your trip
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">
            Safari Tanzania travel guide
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sand-100">
            Everything you need to know before you go — when to visit, what to pack, visa and health requirements, park fees, and cultural tips to travel like a local.
          </p>
        </div>
      </section>

      {/* Best time to visit */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <CalendarDays className="h-4 w-4" /> When to go
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              Best time to visit Tanzania
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Tanzania is a year-round destination, but the experience changes with the seasons. Here's what to expect.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {seasons.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="card card-hover h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-acacia-50 text-acacia-600">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{s.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packing list */}
      <section className="section bg-sand-100">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <span className="eyebrow">
              <Backpack className="h-4 w-4" /> What to bring
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              The essential packing list
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Pack light but smart. Soft-sided duffel bags are best for small charter flights (15 kg limit including carry-on). Here's what we recommend.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/4404518/pexels-photo-4404518.jpeg?auto=compress&cs=tinysrgb&h=500&w=800"
                alt="Safari jeep in the savanna"
                className="h-72 w-full object-cover ring-1 ring-ink-100"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-3">
              {packing.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sunset-50 text-xs font-semibold text-sunset-600">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Visa, Health, Money */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <Plane className="h-4 w-4" /> Before you fly
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              Visas, health &amp; money
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {healthVisa.map((block, i) => (
              <Reveal key={block.title} delay={i * 80}>
                <div className="card h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-sunset-50 text-sunset-600">
                    <block.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">{block.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acacia-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural etiquette */}
      <section className="section bg-ink-900 text-sand-100">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow text-sunset-300">
              <HandHeart className="h-4 w-4" /> Travel like a local
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              Cultural etiquette &amp; tips
            </h2>
            <p className="mt-4 text-lg text-sand-200">
              Tanzanians are warm and welcoming. A little cultural awareness makes your trip richer and your connections deeper.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/20847562/pexels-photo-20847562.jpeg?auto=compress&cs=tinysrgb&h=500&w=800"
                alt="Wildlife in Ngorongoro Crater"
                className="h-72 w-full object-cover ring-1 ring-white/10"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-3">
              {etiquette.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sunset-500/20 text-xs font-semibold text-sunset-300">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-sand-200">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-sand-100">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-acacia-800 px-8 py-16 text-center text-sand-50 sm:px-16">
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.pexels.com/photos/4404524/pexels-photo-4404524.jpeg?auto=compress&cs=tinysrgb&h=650&w=1920" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative">
                <MapPinned className="mx-auto h-10 w-10 text-sunset-400" />
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
                  Ready to start planning?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-sand-200">
                  We handle every detail — permits, transfers, lodges, and guides. All you do is show up.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate({ name: 'customize' })} className="btn-accent !px-7 !py-4 text-base">
                    Build my trip <ArrowRight className="h-5 w-5" />
                  </button>
                  <button onClick={() => navigate({ name: 'packages' })} className="btn bg-white text-acacia-800 hover:bg-sand-100 !px-7 !py-4 text-base">
                    Browse packages
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
