'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { UserRound, CalendarRange, Megaphone, Users2, LucideIcon } from 'lucide-react';
import PageHero from '@/app/components/PageHero';
import HomeWrapper from '../components/wrapper';
import { IMAGES } from '@/lib/images';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Solution = {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  chips: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const SOLUTIONS: Solution[] = [
  {
    id: 'for-attendees',
    icon: UserRound,
    tag: 'For Attendees',
    title: 'Skip the small talk, find your people',
    description:
      'Set your networking goals once — hiring, raising, job hunting, partnering — and let VirtualNet point you at the attendees who actually match, VIPs included.',
    chips: ['Founders', 'Investors', 'Recruiters', 'Job seekers'],
    image: IMAGES.conferencePeople,
    imageAlt: 'People talking inside a conference hall',
  },
  {
    id: 'for-event-organizers',
    icon: CalendarRange,
    tag: 'For Event Organizers',
    title: 'Turn your attendee list into a networking layer',
    description:
      'Import attendees by CSV, webhook, or a shared link — no registration migration. Ticket tiers become networking tiers automatically.',
    chips: ['CSV / webhook import', 'Works with your ticketing', 'Live analytics dashboard'],
    image: IMAGES.meetingTable,
    imageAlt: 'Event organizers reviewing plans around a table',
    reverse: true,
  },
  {
    id: 'for-sponsors',
    icon: Megaphone,
    tag: 'For Sponsors',
    title: 'Leads, not just booth traffic',
    description:
      'Get priority visibility, direct access to attendees who match your target profile, and a real meeting-scheduling flow instead of a stack of scanned badges.',
    chips: ['Priority visibility', 'Qualified lead access', 'Built-in meeting booking'],
    image: IMAGES.lobbyCrowd,
    imageAlt: 'Crowd of people in a busy event lobby',
  },
  {
    id: 'for-communities',
    icon: Users2,
    tag: 'For Communities',
    title: 'Keep the connections going after the badge comes off',
    description:
      'Post-event networking stays open on a limited free window, with a paid extension for communities that want the room to keep talking indefinitely.',
    chips: ['Post-event access window', 'Paid extension available', 'Member-only spaces'],
    image: IMAGES.gathering,
    imageAlt: 'A group of people gathering and talking outdoors',
    reverse: true,
  },
];

export default function SolutionsPage() {
  return (
    <HomeWrapper>
      <main
        className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <PageHero
          eyebrow="Solutions"
          title={<>One networking layer, built differently for whoever’s using it.</>}
          subtitle="Attendees, organizers, sponsors, and communities all get a version of VirtualNet shaped around what they actually need from an event."
          image={IMAGES.crowd}
        />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-24 lg:gap-32">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={s.reverse ? 'lg:order-2' : ''}>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
                      <Icon className="h-3.5 w-3.5 text-[#8FB8A4]" />
                      <span
                        className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h2
                      className="text-[1.9rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.2rem]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-[#92A79C]">{s.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-[#8FB8A4]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={s.reverse ? 'lg:order-1' : ''}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.08]">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
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
