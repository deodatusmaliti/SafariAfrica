import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check, Loader2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import type { Route } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import { CONTACT } from '@/lib/contact';
import { sendNotification } from '@/lib/notifications';
import Reveal from '@/components/Reveal';

const subjects = [
  'General inquiry',
  'Booking a safari',
  'Custom trip request',
  'Payment question',
  'Kilimanjaro climb',
  'Zanzibar & beach',
  'Group / corporate travel',
];

export default function Contact({ navigate }: { navigate: (r: Route) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: subjects[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setError('');

    // Save to database
    const { error: err } = await supabase.from('inquiries').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message,
      status: 'new',
    });
    if (err) {
      setStatus('error');
      setError(err.message);
      return;
    }

    // Send email notification to deodatusmaliti@yahoo.co.uk
    const result = await sendNotification({
      type: 'inquiry',
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });

    setMailtoLink(result.mailtoLink);
    setStatus('saved');
  };

  if (status === 'saved') {
    return (
      <div className="container-x pt-28 pb-20">
        <Reveal>
          <div className="mx-auto max-w-xl card p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-acacia-50 text-acacia-600">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">Message sent</h1>
            <p className="mt-2 text-ink-600">Thank you, {form.name.split(' ')[0]}. We've received your message and will reply to {form.email} within 24 hours.</p>

            {mailtoLink && (
              <div className="mt-6 rounded-xl bg-sky-50 p-5 text-left ring-1 ring-sky-100">
                <p className="text-sm font-semibold text-sky-800">Send your message via email</p>
                <p className="mt-1 text-sm text-ink-600">
                  To make sure your message reaches us, click below to send it through your email app — it's pre-filled and ready to go.
                </p>
                <a href={mailtoLink} className="btn-primary mt-4 w-full">
                  <Mail className="h-4 w-4" /> Send via my email app <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate({ name: 'home' })} className="btn-primary">Back to home</button>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-acacia-900 to-ink-900" />
        <div className="container-x relative">
          <span className="eyebrow text-sunset-300">
            <Mail className="h-4 w-4" /> Get in touch
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl">Let's plan your safari</h1>
          <p className="mt-5 max-w-xl text-lg text-sand-200">
            Questions, custom requests, or ready to book? Reach out any way you like — we usually reply within a few hours.
          </p>
        </div>
      </section>

      <section className="section bg-sand-50">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={submit} className="lg:col-span-2">
            <Reveal>
              <div className="card p-7">
                <h2 className="font-display text-2xl font-semibold text-ink-900">Send us a message</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input className="input" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Email" required>
                    <input className="input" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@email.com" />
                  </Field>
                  <Field label="Phone">
                    <input className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 555 000 1234" />
                  </Field>
                  <Field label="Subject">
                    <select className="input" value={form.subject} onChange={(e) => update('subject', e.target.value)}>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="mt-5">
                  <Field label="Message" required>
                    <textarea className="input min-h-[140px] resize-y" required value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your dream safari — dates, group size, interests..." />
                  </Field>
                </div>

                {error && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-error-500/10 p-4 text-sm text-error-500 ring-1 ring-error-500/20">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                  </div>
                )}

                <button type="submit" disabled={status === 'saving'} className="btn-accent mt-6 disabled:opacity-60">
                  {status === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === 'saving' ? 'Sending...' : 'Send message'}
                </button>

                <p className="mt-4 text-xs text-ink-400">
                  Your message goes directly to {CONTACT.email}. Prefer instant chat? Use WhatsApp {CONTACT.whatsapp}.
                </p>
              </div>
            </Reveal>
          </form>

          {/* Contact details */}
          <div className="lg:col-span-1 space-y-5">
            <Reveal>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="card card-hover block p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-acacia-50 text-acacia-600">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">WhatsApp</h3>
                <p className="mt-1 text-sm text-ink-600">Fastest response — chat with {CONTACT.name} directly.</p>
                <p className="mt-2 font-semibold text-acacia-700">{CONTACT.whatsapp}</p>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a href={CONTACT.phoneHref} className="card card-hover block p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sunset-50 text-sunset-600">
                  <Phone className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">Call us</h3>
                <p className="mt-1 text-sm text-ink-600">Mon – Sat, 7am – 8pm EAT</p>
                <p className="mt-2 font-semibold text-ink-900">{CONTACT.phone}</p>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <a href={`mailto:${CONTACT.email}`} className="card card-hover block p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky-50 text-sky-600">
                  <Mail className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">Email</h3>
                <p className="mt-1 text-sm text-ink-600">For itineraries, quotes &amp; confirmations.</p>
                <p className="mt-2 font-semibold text-ink-900">{CONTACT.email}</p>
              </a>
            </Reveal>

            <Reveal delay={240}>
              <div className="card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-100 text-ink-600">
                  <MapPin className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">Office</h3>
                <p className="mt-1 text-sm text-ink-600">{CONTACT.address}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-ink-400">
                  <Clock className="h-3.5 w-3.5" /> GMT+3 (East Africa Time)
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-sunset-500"> *</span>}</span>
      {children}
    </label>
  );
}
