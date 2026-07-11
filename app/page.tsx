// page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import {
  ArrowUpRight, ShieldCheck, Sparkles, Users2,
  Layers, Coins, LineChart, GitBranch, Lock,
  Search, Shuffle, BarChart3, TrendingDown, Plug, Wallet,
  LucideIcon
} from 'lucide-react';
import HomeWrapper from './components/wrapper';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

// --- Types ---
type LedgerEntry = {
  id: number;
  who: string;
  action: string;
  delta: string;
  kind: 'debit' | 'credit';
};

type Goal = { icon: LucideIcon; title: string; text: string; accent: 'sage' | 'gold' };
type Problem = { icon: LucideIcon; title: string; text: string };

// --- Data ---
const LEDGER: LedgerEntry[] = [
  { id: 1, who: 'Amara → Kenji (VIP)', action: 'Connection accepted', delta: '-3 cr', kind: 'debit' },
  { id: 2, who: 'Kenji', action: 'Cashback for accepting', delta: '+1 cr', kind: 'credit' },
  { id: 3, who: 'Priya', action: 'Meeting booked · Fintech mixer', delta: 'Confirmed', kind: 'credit' },
  { id: 4, who: 'Diego → Sana (VIP)', action: 'Priority message unlocked', delta: '-2 cr', kind: 'debit' },
  { id: 5, who: 'Leaderboard', action: 'Top networker this hour', delta: '+5 cr', kind: 'credit' },
];

const NODES: { x: number; y: number }[] = [
  { x: 40, y: 54 }, { x: 130, y: 26 }, { x: 226, y: 66 }, { x: 300, y: 30 },
  { x: 60, y: 140 }, { x: 168, y: 128 }, { x: 262, y: 158 }, { x: 330, y: 120 },
  { x: 108, y: 220 }, { x: 210, y: 244 }, { x: 300, y: 224 },
  { x: 50, y: 296 }, { x: 158, y: 316 }, { x: 268, y: 300 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6], [5, 6], [6, 7],
  [4, 8], [5, 9], [6, 10], [8, 9], [9, 10], [8, 11], [9, 12], [10, 13],
  [12, 13], [2, 7], [5, 8],
];

const PRINCIPLES = [
  {
    icon: Layers,
    title: 'Layered, not replaced',
    text: 'VirturalNet sits on top of the registration platform you already use. Import a list, drop in a link, or connect a webhook — nobody re-registers.',
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

const PROBLEMS: Problem[] = [
  {
    icon: Search,
    title: 'Finding the right person is guesswork',
    text: 'Attendees wander the floor hoping to bump into someone relevant — there\'s no way to filter by role, industry, or intent.',
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
    text: 'There\'s no way to see whether attendees actually connected, met, or got anything out of the event once it ends.',
  },
  {
    icon: TrendingDown,
    title: 'Sponsors can\'t prove ROI',
    text: 'Booth traffic and badge scans don\'t translate into qualified leads, which makes sponsorship renewals a hard sell.',
  },
];

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

// --- Motion variants ---
const columnVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [ledgerStart, setLedgerStart] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setLedgerStart((i) => (i + 1) % LEDGER.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const visibleLedger = [0, 1, 2].map((offset) => LEDGER[(ledgerStart + offset) % LEDGER.length]);

  const floatAnim = reduceMotion
    ? {}
    : { y: [0, -8, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <HomeWrapper>
      <div className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative overflow-hidden bg-[#0A100D]">
          {/* Ambient background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#639781]/25 blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#D9B26B]/10 blur-[130px]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #EAF2ED 1px, transparent 1px), linear-gradient(to bottom, #EAF2ED 1px, transparent 1px)',
                backgroundSize: '64px 64px',
              }}
            />
          </div>
          {/* Hero content */}
          <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:px-10 lg:pb-32 lg:pt-16">
            {/* Left column */}
            <motion.div variants={columnVariants} initial="hidden" animate="show">
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#639781]" />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Structured networking · Web3 events
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-[3.4rem] lg:text-[3.75rem]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Every connection here
                <br />
                is <span className="text-[#8FB8A4]">worth something.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-6 max-w-[30rem] text-[16px] leading-relaxed text-[#92A79C]">
                Skip the badge-scan small talk. Send structured connection requests, unlock
                verified VIPs, and earn cashback credits every time someone books time with you.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-[#639781] px-7 py-3.5 text-[14.5px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.35)]"
                >
                  Create your event
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  className="group flex items-center gap-1.5 rounded-full md:px-2 py-3.5 text-[14.5px] font-medium text-[#EAF2ED]"
                >
                  See how it works
                  <ArrowUpRight className="h-4 w-4 text-[#8FB8A4] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-14">
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#5F736A]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Built for
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Founders', 'Investors', 'Recruiters', 'Sponsors'].map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-[#EAF2ED]/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-[#92A79C]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right column — signature visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative mx-auto h-[460px] w-full max-w-[420px] lg:mx-0 lg:ml-auto"
            >
              <div className="absolute inset-0 rounded-[28px] border border-[#639781]/15 bg-gradient-to-br from-[#101B16] to-[#0A100D]" />

              {/* Node graph */}
              <svg viewBox="0 0 380 350" className="absolute inset-0 h-full w-full opacity-90">
                {EDGES.map(([a, b], i) => (
                  <motion.line
                    key={`edge-${i}`}
                    x1={NODES[a].x}
                    y1={NODES[a].y}
                    x2={NODES[b].x}
                    y2={NODES[b].y}
                    stroke="#639781"
                    strokeWidth={1}
                    strokeOpacity={0.22}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.4 + i * 0.03, ease: 'easeOut' }}
                  />
                ))}
                {NODES.map((n, i) => (
                  <motion.circle
                    key={`node-${i}`}
                    cx={n.x}
                    cy={n.y}
                    r={i % 4 === 0 ? 4.5 : 3}
                    fill={i % 4 === 0 ? '#8FB8A4' : '#639781'}
                    initial={{ opacity: 0.3 }}
                    animate={
                      reduceMotion
                        ? { opacity: 0.7 }
                        : { opacity: [0.35, 0.9, 0.35] }
                    }
                    transition={{ duration: 3, repeat: Infinity, delay: (i * 0.18) % 2, ease: 'easeInOut' }}
                  />
                ))}
              </svg>

              {/* Floating badge — VIP */}
              <motion.div
                animate={floatAnim}
                className="absolute left-4 top-6 flex items-center gap-2 rounded-xl border border-[#EAF2ED]/10 bg-[#0A100D]/80 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#8FB8A4]" />
                <span className="text-[11.5px] font-medium text-[#EAF2ED]">VIP access gate</span>
              </motion.div>

              {/* Floating badge — cashback */}
              <motion.div
                animate={
                  reduceMotion
                    ? {}
                    : { y: [0, -8, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } }
                }
                className="absolute right-4 top-24 flex items-center gap-2 rounded-xl border border-[#D9B26B]/25 bg-[#0A100D]/80 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#D9B26B]" />
                <span className="text-[11.5px] font-medium text-[#EAF2ED]">3 credits → 1 cashback</span>
              </motion.div>

              {/* Live ledger card */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[#EAF2ED]/10 bg-[#0D1712]/90 p-4 shadow-2xl shadow-black/50 backdrop-blur">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#5F736A]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Live ledger
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="relative h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-[#639781]" />
                      {!reduceMotion && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-[#639781]"
                          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                    </span>
                    <span className="text-[10.5px] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                      live
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {visibleLedger.map((entry) => (
                      <motion.div
                        key={entry.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium text-[#EAF2ED]">{entry.who}</p>
                          <p className="truncate text-[11px] text-[#5F736A]">{entry.action}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${entry.kind === 'credit'
                            ? 'bg-[#639781]/15 text-[#8FB8A4]'
                            : 'bg-[#D9B26B]/10 text-[#D9B26B]'
                            }`}
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {entry.delta}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Small verified chip */}
              <motion.div
                animate={
                  reduceMotion
                    ? {}
                    : { y: [0, -6, 0], transition: { duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } }
                }
                className="absolute -left-3 bottom-32 flex items-center gap-1.5 rounded-full border border-[#EAF2ED]/10 bg-[#0A100D]/85 px-3 py-1.5 shadow-lg shadow-black/40 backdrop-blur"
              >
                <Users2 className="h-3 w-3 text-[#8FB8A4]" />
                <span className="text-[10.5px] font-medium text-[#EAF2ED]">Verified profile</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== SECTIONS WITH BACKGROUND IMAGE ==================== */}
        <div className="relative bg-[#0A100D]">
          {/* Background image - covers all sections below hero */}
          <img
            src="/images/connbg4.png"
            className="absolute opacity-2 object-cover top-0 left-0 w-full h-full"
            alt=""
          />

          <div className="relative z-10 opacity-97">

            {/* ===== ABOUT SECTION ===== */}
            <section className="relative overflow-hidden py-10 ">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[#639781]/10 blur-[140px]" />
              </div>

              <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                  {/* Left */}
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
                      Most event platforms stop at ticketing. VirturalNet starts where they leave off —
                      turning an attendee list into a structured, monetizable networking layer,
                      without asking anyone to abandon the tools they already run their event on.
                    </p>
                  </motion.div>

                  {/* Right — cards */}
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

            {/* ===== PROBLEM STATEMENT SECTION ===== */}
            <section className="relative overflow-hidden py-10">
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

            {/* ===== GOALS SECTION ===== */}
            <section className="relative overflow-hidden py-24">
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
                    page — networking that's structured, gated, incentivized, and
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
                        className={`group relative rounded-2xl border p-6 transition-colors ${isGold
                            ? 'border-[#D9B26B]/15 bg-[#151009]/40 hover:border-[#D9B26B]/35'
                            : 'border-white/[0.07] bg-[#101B16] hover:border-[#639781]/30'
                          }`}
                      >
                        <span
                          className={`mb-5 grid h-11 w-11 place-items-center rounded-xl transition-colors ${isGold
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

          </div>
        </div>

      </div>
    </HomeWrapper>
  );
}