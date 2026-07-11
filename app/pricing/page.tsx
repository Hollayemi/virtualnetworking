'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Check, Coins, Building2 } from 'lucide-react';
import PageHero from '@/app/components/PageHero';
import HomeWrapper from '../components/wrapper';
import { IMAGES } from '@/lib/images';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Regular',
    price: '$0',
    period: 'per attendee',
    description: 'Everything an attendee needs to network at a single event.',
    features: ['Attendee discovery & filters', 'Structured connection requests', 'Messaging after acceptance', 'Meeting scheduling'],
  },
  {
    name: 'Premium',
    price: '$19',
    period: 'per attendee / event',
    description: 'For attendees who want priority reach and a starting credit balance.',
    features: ['Everything in Regular', '50 starter credits', 'Priority message delivery', 'Verified profile badge'],
    highlighted: true,
  },
  {
    name: 'VIP Networking Pass',
    price: '$49',
    period: 'per attendee / event',
    description: 'Sit behind the access gate and earn cashback on every accepted request.',
    features: ['Everything in Premium', 'VIP access gate placement', 'Cashback on accepted requests', 'Post-event access included'],
  },
];

const ORGANIZER = {
  name: 'Organizer SaaS',
  price: 'From $299',
  period: 'per event',
  description: 'Run the whole networking layer on top of your existing registration platform.',
  features: [
    'CSV, webhook & link import',
    'Full networking analytics dashboard',
    'Sponsor visibility & lead tools',
    'Credit economy configuration',
  ],
};

export default function PricingPage() {
  return (
    <HomeWrapper>
      <main
        className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <PageHero
          eyebrow="Pricing"
          title={<>Pricing built around credits, not seat counts.</>}
          subtitle="Attendees pick a tier. Organizers pick a plan. Credits are what actually move between them."
          image={IMAGES.boardroom}
        />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {/* Attendee tiers */}
          <div className="mb-6 text-center">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#5F736A]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Attendee ticket tiers
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col rounded-3xl border p-8 ${plan.highlighted
                    ? 'border-[#639781]/50 bg-gradient-to-b from-[#639781]/[0.08] to-transparent'
                    : 'border-white/[0.08] bg-[#101915]'
                  }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#639781] px-3 py-1 text-[11px] font-semibold text-[#0A100D]">
                    Most popular
                  </span>
                )}
                <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-[2.4rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {plan.price}
                  </span>
                  <span className="text-[13px] text-[#5F736A]">{plan.period}</span>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[#92A79C]">{plan.description}</p>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-6">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#639781]/15 text-[#8FB8A4]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-[13.5px] text-[#C7D6CE]">{feat}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 rounded-full py-3 text-[13.5px] font-semibold ${plan.highlighted
                      ? 'bg-[#639781] text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)]'
                      : 'border border-white/15 text-[#EAF2ED]'
                    }`}
                >
                  Get started
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Credits explainer + organizer plan */}
          <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl border border-[#D9B26B]/20 bg-[#151009]/40 p-8"
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#D9B26B]/10 text-[#D9B26B]">
                <Coins className="h-[19px] w-[19px]" />
              </span>
              <h3 className="text-[17px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                How credits actually work
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#92A79C]">
                Credits are spent to reach VIPs, send priority messages, or unlock premium interactions. Every accepted
                VIP request pays a cashback credit back — roughly 1 credit back for every 3 spent — and leftover
                credits carry over to register for another event.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#101B16] p-8"
            >
              <div>
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#639781]/10 text-[#8FB8A4]">
                  <Building2 className="h-[19px] w-[19px]" />
                </span>
                <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {ORGANIZER.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[1.8rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {ORGANIZER.price}
                  </span>
                  <span className="text-[13px] text-[#5F736A]">{ORGANIZER.period}</span>
                </div>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#92A79C]">{ORGANIZER.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {ORGANIZER.features.map((f) => (
                  <span key={f} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-[#8FB8A4]">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </HomeWrapper>
  );
}
