import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Booking } from '@/lib/types';
import { generateReference } from '@/lib/payments';

export type DraftBooking = Booking & { packageName?: string };

type BookingContextType = {
  draft: DraftBooking | null;
  lastRef: string | null;
  setDraft: (b: DraftBooking | null) => void;
  startPackageDraft: (pkg: { id: string; title: string; price_usd: number; duration_days: number }) => DraftBooking;
  startCustomDraft: (data: Partial<DraftBooking>) => DraftBooking;
  confirm: (saved: DraftBooking) => void;
};

const Ctx = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<DraftBooking | null>(null);
  const [lastRef, setLastRef] = useState<string | null>(null);

  const startPackageDraft: BookingContextType['startPackageDraft'] = (pkg) => {
    const d: DraftBooking = {
      reference: generateReference(),
      type: 'package',
      package_id: pkg.id,
      packageName: pkg.title,
      traveler_name: '',
      email: '',
      phone: '',
      country: '',
      adults: 2,
      children: 0,
      start_date: null,
      end_date: null,
      accommodation: 'Comfort',
      add_ons: [],
      custom_destinations: [],
      total_usd: pkg.price_usd,
      payment_method: undefined,
    };
    setDraft(d);
    return d;
  };

  const startCustomDraft: BookingContextType['startCustomDraft'] = (data) => {
    const d: DraftBooking = {
      reference: generateReference(),
      type: 'custom',
      package_id: null,
      packageName: 'Custom Safari',
      traveler_name: '',
      email: '',
      phone: '',
      country: '',
      adults: 2,
      children: 0,
      start_date: null,
      end_date: null,
      accommodation: 'Comfort',
      add_ons: [],
      custom_destinations: [],
      total_usd: 0,
      ...data,
    };
    setDraft(d);
    return d;
  };

  const confirm: BookingContextType['confirm'] = (saved) => {
    setDraft(saved);
    setLastRef(saved.reference);
  };

  return (
    <Ctx.Provider value={{ draft, lastRef, setDraft, startPackageDraft, startCustomDraft, confirm }}>
      {children}
    </Ctx.Provider>
  );
}

export function useBooking() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useBooking must be used within BookingProvider');
  return c;
}
