'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Search, Lock, Shuffle, BarChart3, TrendingDown, LucideIcon } from 'lucide-react';

/**
 * ProblemStatement.tsx
 * Drop into: components/ProblemStatement.tsx
 *
 * Cards use a warm, muted "friction" tint (amber/red at low opacity) as a
 * deliberate color signal: this section is the tension the product resolves.
 * The Goals section mirrors this in sage/gold to signal resolution.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Problem = { icon: LucideIcon; title: string; text: string };

const PROBLEMS: Problem[] = [
  {
    icon: Search,
    title: 'Finding the right person is guesswork',
    text: 'Attendees wander the floor hoping to bump into someone relevant — there\u2019s no way to filter by role, industry, or intent.',
  },
  {
    icon: Lock,
    title: 'VIPs are unreachable',
    text: 'Founders and investors get flooded with requests, so they either ignore everyone or stop showing up on the app at all.',
  },
  {
    icon: Shuffle,
    title: 'Connections are left to chance',
    text: 'Without any structure, whether you meet someone valuable depends on who happened to be standing near the coffee line.',
  },
  {
    icon: BarChart3,
    title: 'Organizers fly blind',
    text: 'There\u2019s no way to see whether attendees actually connected, met, or got anything out of the event once it ends.',
  },
  {
    icon: TrendingDown,
    title: 'Sponsors can\u2019t prove ROI',
    text: 'Booth traffic and badge scans don\u2019t translate into qualified leads, which makes sponsorship renewals a hard sell.',
  },
];

export default function ProblemStatement() {
  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden bg-[#0A100D] py-10 text-[#EAF2ED] lg:py-32`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9756B]/25 bg-[#D9756B]/[0.06] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9756B]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#E0A093]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              The problem
            </span>
          </div>

          <h2
            className="text-[2.2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.6rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Everyone shows up to network.
            <br />
            <span className="text-[#92A79C]">Almost nobody does.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[30rem] text-[15.5px] leading-relaxed text-[#92A79C]">
            Conferences are full of the right people in the wrong system —
            one with no structure, no access control, and no way to tell if
            it worked.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            const spanLast = PROBLEMS.length % 3 !== 0 && i === PROBLEMS.length - 1;
            const baseCard =
              'group relative rounded-2xl border border-white/[0.07] bg-[#101915] p-6 transition-colors hover:border-[#D9756B]/25';
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={spanLast ? `${baseCard} sm:col-span-2 lg:col-span-1` : baseCard}
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#D9756B]/10 text-[#E0A093] transition-colors group-hover:bg-[#D9756B]/[0.15]">
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <h3
                  className="text-[15.5px] font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#7C8F85]">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
