'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';

/**
 * PageHero.tsx
 * Drop into: components/PageHero.tsx
 *
 * Shared banner used at the top of every inner page (Features, Solutions,
 * How it Works, Pricing, Resources). Uses `bg-fixed` so the photo stays
 * pinned while the page scrolls past it — the parallax-lite effect you
 * asked for.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
}) {
  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} relative flex h-[52vh] min-h-[420px] items-end overflow-hidden bg-fixed bg-cover bg-center text-[#EAF2ED]`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark + brand-tinted overlay so text stays readable over any photo */}
      <div className="absolute inset-0 bg-[#0A100D]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/70 to-[#0A100D]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A100D]/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#639781]/35 bg-[#0A100D]/50 px-3.5 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#639781]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {eyebrow}
            </span>
          </div>

          <h1
            className="max-w-2xl text-[2.4rem] font-semibold leading-[1.1] tracking-tight sm:text-[3rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h1>

          <p className="mt-4 max-w-[32rem] text-[15px] leading-relaxed text-[#C7D6CE]" style={{ fontFamily: 'var(--font-body)' }}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
