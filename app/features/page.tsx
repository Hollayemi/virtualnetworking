'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Sparkles, Share2, CalendarClock, MessageSquare, BarChart3, LucideIcon } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import HomeWrapper from '../components/wrapper';
import PageHero from '../components/PageHero';


const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Chip = string;

type Feature = {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  chips: Chip[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: 'ai-matchmaking',
    icon: Sparkles,
    tag: 'AI Matchmaking',
    title: 'Suggestions that actually know why you\u2019re here',
    description:
      'VirtualNet reads networking goals, industry, and role — not just a job title — to surface the handful of people at an event genuinely worth your ten minutes.',
    chips: ['Shared interests', 'Goal-based ranking', 'Updates in real time'],
    image: IMAGES.network,
    imageAlt: 'Abstract glowing network of connected nodes',
  },
  {
    id: 'networking',
    icon: Share2,
    tag: 'Networking',
    title: 'Browse the room before you\u2019ve left your seat',
    description:
      'Filter attendees by industry, role, company, or ticket tier, then send a structured connection request instead of hoping for a hallway collision.',
    chips: ['Filter by role & tier', 'Structured requests', 'No cold DMs'],
    image: IMAGES.talkingGroup,
    imageAlt: 'A group of people talking at an event',
    reverse: true,
  },
  {
    id: 'meetings',
    icon: CalendarClock,
    tag: 'Meetings',
    title: 'Booking time shouldn\u2019t take five messages',
    description:
      'Everyone sets their own availability windows. Once a request is accepted, the other person just picks an open slot — no back-and-forth, no double-booking.',
    chips: ['Open availability slots', 'One-tap booking', 'Calendar invites included'],
    image: IMAGES.meetingTable,
    imageAlt: 'People around a conference table',
  },
  {
    id: 'messaging',
    icon: MessageSquare,
    tag: 'Messaging',
    title: 'Chat unlocks the moment it\u2019s earned',
    description:
      'Messaging only opens after a connection is accepted, which keeps VIP inboxes free of cold pitches and makes every open thread worth actually reading.',
    chips: ['Gated by acceptance', 'Priority sends with credits', 'Clean, focused inbox'],
    image: IMAGES.laptopMessaging,
    imageAlt: 'Person using a laptop',
    reverse: true,
  },
  {
    id: 'event-analytics',
    icon: BarChart3,
    tag: 'Event Analytics',
    title: 'Prove the event worked, not just that people showed up',
    description:
      'Organizers get real numbers — connections sent and accepted, meetings booked, credits moved — so "great energy in the room" comes with a dashboard behind it.',
    chips: ['Connections & meetings', 'Sponsor-ready reporting', 'Per-event breakdown'],
    image: IMAGES.network,
    imageAlt: 'Abstract data network visualization',
  },
];

export default function FeaturesPage() {
  return (
    <HomeWrapper>
      <main
        className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <PageHero
          eyebrow="Features"
          title={<>Every feature is built around one job: making the next ten minutes worth it.</>}
          subtitle="From AI-ranked suggestions to a credit-backed meeting flow — here's what's actually running underneath VirtualNet."
          image={IMAGES.network}
        />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-24 lg:gap-32">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.section
                  key={f.id}
                  id={f.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={f.reverse ? 'lg:order-2' : ''}>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
                      <Icon className="h-3.5 w-3.5 text-[#8FB8A4]" />
                      <span
                        className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {f.tag}
                      </span>
                    </div>
                    <h2
                      className="text-[1.9rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.2rem]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {f.title}
                    </h2>
                    <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-[#92A79C]">{f.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {f.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-[#8FB8A4]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={f.reverse ? 'lg:order-1' : ''}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.08]">
                      <Image
                        src={f.image}
                        alt={f.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D]/50 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </main>
    </HomeWrapper>
  );
}
