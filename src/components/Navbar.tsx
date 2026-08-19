import { useEffect, useState } from 'react';
import { Compass, Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import type { Route } from '@/lib/router';
import { toHash } from '@/lib/router';

const links: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Attractions', route: { name: 'attractions' } },
  { label: 'Packages', route: { name: 'packages' } },
  { label: 'Customize', route: { name: 'customize' } },
  { label: 'Gallery', route: { name: 'gallery' } },
  { label: 'Safari Info', route: { name: 'safari-info' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
];

export default function Navbar({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = route.name === 'home';
  const solid = scrolled || !onHome || open;

  const go = (r: Route) => {
    setOpen(false);
    navigate(r);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-ink-900/95 text-sand-50 backdrop-blur shadow-lg shadow-ink-900/20' : 'bg-transparent text-white'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <button onClick={() => go({ name: 'home' })} className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sunset-500 text-white shadow-lg shadow-sunset-500/30 group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-xl font-semibold tracking-tight">Safari Tanzania</span>
            <span className={`text-[10px] uppercase tracking-[0.25em] ${solid ? 'text-sand-300' : 'text-white/70'}`}>
              Wild &amp; Authentic
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = route.name === l.route.name || (l.route.name === 'attractions' && route.name === 'attraction') || (l.route.name === 'packages' && route.name === 'package');
            return (
              <button
                key={l.label}
                onClick={() => go(l.route)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-sunset-400' : solid ? 'text-sand-100 hover:text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.label}
                {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-sunset-500" />}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+255686997270" className={`flex items-center gap-2 text-sm ${solid ? 'text-sand-200' : 'text-white/80'} hover:text-white`}>
            <Phone className="h-4 w-4" /> +255 686 997 270
          </a>
          <a href="https://wa.me/264814124900" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-acacia-400 hover:text-acacia-300">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button onClick={() => go({ name: 'booking' })} className="btn-accent">
            Book Now
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${solid ? 'text-sand-50' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ${open ? 'max-h-[640px]' : 'max-h-0'}`}>
        <div className="container-x bg-ink-900/98 pb-6 pt-2 text-sand-50">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.route)}
                className="rounded-xl px-4 py-3 text-left text-base font-medium text-sand-100 hover:bg-white/10"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <a href="tel:+255686997270" className="flex items-center gap-2 text-sm text-sand-200">
              <Phone className="h-4 w-4" /> +255 686 997 270
            </a>
            <a href="https://wa.me/264814124900" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-acacia-400">
              <MessageCircle className="h-4 w-4" /> WhatsApp +264 81 412 4900
            </a>
            <a href="mailto:deodatusmaliti@yahoo.co.uk" className="flex items-center gap-2 text-sm text-sand-200">
              <Mail className="h-4 w-4" /> deodatusmaliti@yahoo.co.uk
            </a>
            <button onClick={() => go({ name: 'booking' })} className="btn-accent w-full">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
