import { Compass, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Send, MessageCircle } from 'lucide-react';
import type { Route } from '@/lib/router';

const cols: { title: string; links: { label: string; route: Route }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Attractions', route: { name: 'attractions' } },
      { label: 'Tour Packages', route: { name: 'packages' } },
      { label: 'Customize Your Trip', route: { name: 'customize' } },
      { label: 'Gallery', route: { name: 'gallery' } },
      { label: 'Safari Info', route: { name: 'safari-info' } },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', route: { name: 'about' } },
      { label: 'Contact', route: { name: 'contact' } },
      { label: 'Book a Trip', route: { name: 'booking' } },
      { label: 'Make a Payment', route: { name: 'booking' } },
    ],
  },
];

export default function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="relative mt-auto bg-ink-900 text-sand-200">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sunset-500 text-white">
                <Compass className="h-6 w-6" />
              </span>
              <span className="font-display text-xl font-semibold text-sand-50">Safari Tanzania</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sand-300">
              Crafting authentic Tanzanian safaris since 2009. Family-run, locally owned, and committed to conservation and community.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sand-100 transition hover:bg-sunset-500 hover:text-white"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base font-semibold text-sand-50">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button onClick={() => navigate(l.route)} className="text-sand-300 transition hover:text-sunset-400">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-base font-semibold text-sand-50">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sunset-400" />
                <span>Saroa Street, Arusha, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sunset-400" />
                <a href="tel:+255686997270" className="hover:text-sunset-400">+255 686 997 270</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sunset-400" />
                <a href="mailto:deodatusmaliti@yahoo.co.uk" className="hover:text-sunset-400">deodatusmaliti@yahoo.co.uk</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-acacia-400" />
                <a href="https://wa.me/264814124900" target="_blank" rel="noreferrer" className="hover:text-acacia-300">WhatsApp +264 81 412 4900</a>
              </li>
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ name: 'contact' });
              }}
              className="mt-5 flex items-center gap-2 rounded-full bg-white/10 p-1.5"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent px-3 text-sm text-sand-50 placeholder:text-sand-400 focus:outline-none"
              />
              <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sunset-500 text-white" aria-label="subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-sand-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Safari Tanzania Ltd. All rights reserved. TALA License No. TA/0249.</p>
          <p>Designed in Arusha, made for the wild.</p>
        </div>
      </div>
    </footer>
  );
}
