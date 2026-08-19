export type Package = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration_days: number;
  price_usd: number;
  difficulty: string;
  region: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  image_url: string;
  gallery: string[];
  featured: boolean;
};

export type Booking = {
  id?: string;
  reference: string;
  type: 'package' | 'custom';
  package_id?: string | null;
  traveler_name: string;
  email: string;
  phone?: string;
  country?: string;
  adults: number;
  children: number;
  start_date?: string | null;
  end_date?: string | null;
  accommodation: string;
  add_ons: string[];
  custom_destinations: string[];
  total_usd: number;
  status?: string;
  payment_method?: string;
};

export type Inquiry = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  rating: number;
  trip: string;
  message: string;
  avatar_url?: string;
};

export type Attraction = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  facts: { label: string; value: string }[];
  highlights: string[];
  bestTime: string;
};
