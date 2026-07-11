'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { GitBranch, ShieldCheck, Coins, Plug, LineChart, Wallet, LucideIcon } from 'lucide-react';

/**
 * Goals.tsx
 * Drop into: components/Goals.tsx
 *
 * Deliberate color echo: ProblemStatement.tsx uses a warm amber/red tint for
 * "friction". This section answers each of those problems, so it returns to
 * sage + gold — the same resolution palette as Hero.tsx.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Goal = { icon: LucideIcon; title: string; text: string; accent: 'sage' | 'gold' };

const GOALS: Goal[] = [
  {
    icon: GitBranch,
    title: 'Structured networking',
    text: 'Replace random mingling with one clear path: request, accept, message, meet.',
    accent: 'sage',
  },
  {
    icon: ShieldCheck,
    title: 'Controlled VIP access',
    text: 'High-value attendees sit behind a gate — lower tiers earn or pay their way in.',
    accent: 'sage',
  },
  {
    icon: Coins,
    title: 'A credit & cashback economy',
    text: 'Every accepted request pays the VIP back, so saying yes is worth their time.',
    accent: 'gold',
  },
  {
    icon: Plug,
    title: 'Plug into what you run today',
    text: 'CSV upload, webhook, or a shared link — attendee data flows in without a migration.',
    accent: 'sage',
  },
  {
    icon: LineChart,
    title: 'Outcomes organizers can show',
    text: 'Connections, meetings, and engagement per event — numbers, not impressions.',
    accent: 'sage',
  },
  {
    icon: Wallet,
    title: 'A revenue engine, not just a feature',
    text: 'Credits, VIP passes, and sponsor tools turn networking into its own income line.',
    accent: 'gold',
  },
];

export default function Goals() {
  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden bg-[#0A100D] py-24 text-[#EAF2ED] lg:py-32`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#639781]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#639781]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Our goal
            </span>
          </div>

          <h2
            className="text-[2.2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.6rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Turn the room into a system
            <br />
            <span className="text-[#8FB8A4]">everyone benefits from.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[30rem] text-[15.5px] leading-relaxed text-[#92A79C]">
            Every piece below maps to a problem on the other side of this
            page — networking that’s structured, gated, incentivized, and
            measurable, from the first request to the last cashback credit.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((g, i) => {
            const Icon = g.icon;
            const isGold = g.accent === 'gold';
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl border p-6 transition-colors ${
                  isGold
                    ? 'border-[#D9B26B]/15 bg-[#151009]/40 hover:border-[#D9B26B]/35'
                    : 'border-white/[0.07] bg-[#101B16] hover:border-[#639781]/30'
                }`}
              >
                <span
                  className={`mb-5 grid h-11 w-11 place-items-center rounded-xl transition-colors ${
                    isGold
                      ? 'bg-[#D9B26B]/10 text-[#D9B26B] group-hover:bg-[#D9B26B]/[0.15]'
                      : 'bg-[#639781]/10 text-[#8FB8A4] group-hover:bg-[#639781]/[0.15]'
                  }`}
                >
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <h3
                  className="text-[15.5px] font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {g.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#92A79C]">{g.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
