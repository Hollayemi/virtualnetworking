'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Layers, Coins, LineChart } from 'lucide-react';

/**
 * About.tsx
 * Drop into: components/About.tsx
 *
 * Shares the design system established in Hero.tsx:
 *   --sage #639781   --sage-light #8FB8A4   --gold #D9B26B
 *   --bg-deep #0A100D   --bg-panel #101B16   --ink #EAF2ED   --muted #92A79C
 *
 * If Hero.tsx is already loading these fonts in the same page, Next.js will
 * dedupe the font requests at build time — no extra network cost.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const PRINCIPLES = [
  {
    icon: Layers,
    title: 'Layered, not replaced',
    text: 'VirtualNet sits on top of the registration platform you already use. Import a list, drop in a link, or connect a webhook — nobody re-registers.',
  },
  {
    icon: Coins,
    title: 'Built for value exchange',
    text: 'Attention from a VIP is worth something. Credits and cashback make that exchange explicit instead of leaving it to whoever asks nicest.',
  },
  {
    icon: LineChart,
    title: 'Outcomes over vibes',
    text: 'Organizers stop guessing whether networking "went well." Connections, meetings, and engagement are numbers you can show a sponsor.',
  },
];

export default function About() {
  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden bg-[#0A100D] py-10 text-[#EAF2ED] lg:py-32`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[#639781]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — framing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#639781]" />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                About us
              </span>
            </div>

            <h2
              className="text-[2.2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.6rem]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We build the networking layer
              <br />
              <span className="text-[#8FB8A4]">events forget to ship.</span>
            </h2>

            <p className="mt-6 max-w-[28rem] text-[15.5px] leading-relaxed text-[#92A79C]">
              Most event platforms stop at ticketing. VirtualNet starts where they leave off —
              turning an attendee list into a structured, monetizable networking layer,
              without asking anyone to abandon the tools they already run their event on.
            </p>
          </motion.div>

          {/* Right — principle cards */}
          <div className="flex flex-col gap-4">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#101B16] p-5 transition-colors hover:border-[#639781]/30"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#639781]/10 text-[#8FB8A4] transition-colors group-hover:bg-[#639781]/15">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#92A79C]">{p.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
