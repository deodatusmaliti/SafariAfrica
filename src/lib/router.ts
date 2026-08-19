import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'attractions' }
  | { name: 'attraction'; slug: string }
  | { name: 'packages' }
  | { name: 'package'; slug: string }
  | { name: 'customize' }
  | { name: 'booking'; ref?: string }
  | { name: 'payment'; ref: string }
  | { name: 'gallery' }
  | { name: 'safari-info' }
  | { name: 'about' }
  | { name: 'contact'};

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) return { name: 'home' };
  const [path, query] = clean.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query ?? '');
  switch (parts[0]) {
    case 'attractions':
      return parts[1] ? { name: 'attraction', slug: parts[1] } : { name: 'attractions' };
    case 'packages':
      return parts[1] ? { name: 'package', slug: parts[1] } : { name: 'packages' };
    case 'customize':
      return { name: 'customize' };
    case 'booking':
      return { name: 'booking', ref: params.get('ref') ?? undefined };
    case 'payment': {
      const ref = params.get('ref') ?? '';
      return { name: 'payment', ref };
    }
    case 'gallery':
      return { name: 'gallery' };
    case 'safari-info':
      return { name: 'safari-info' };
    case 'about':
      return { name: 'about' };
    case 'contact':
      return { name: 'contact' };
    default:
      return { name: 'home' };
  }
}

export function toHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'attractions':
      return '#/attractions';
    case 'attraction':
      return `#/attractions/${route.slug}`;
    case 'packages':
      return '#/packages';
    case 'package':
      return `#/packages/${route.slug}`;
    case 'customize':
      return '#/customize';
    case 'booking':
      return route.ref ? `#/booking?ref=${route.ref}` : '#/booking';
    case 'payment':
      return `#/payment?ref=${route.ref}`;
    case 'gallery':
      return '#/gallery';
    case 'safari-info':
      return '#/safari-info';
    case 'about':
      return '#/about';
    case 'contact':
      return '#/contact';
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    window.location.hash = toHash(r);
  }, []);

  return { route, navigate };
}
