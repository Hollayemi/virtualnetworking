'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { UserPlus, Send, Unlock, CalendarCheck2, Coins, LucideIcon } from 'lucide-react';
import HomeWrapper from '../components/wrapper';
import PageHero from '@/app/components/PageHero';
import { IMAGES } from '@/lib/images';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Step = { icon: LucideIcon; title: string; text: string };

const STEPS: Step[] = [
  {
    icon: UserPlus,
    title: 'Build your profile',
    text: 'Add your role, company, industry, and what you\u2019re actually trying to get out of the event — hiring, raising, partnering, or just meeting people.',
  },
  {
    icon: Send,
    title: 'Send a structured request',
    text: 'Browse attendees, filter by tier or intent, and send a connection request. VIPs behind the access gate cost credits — everyone else is free.',
  },
  {
    icon: Unlock,
    title: 'Get accepted, unlock messaging',
    text: 'The moment a request is accepted, chat opens up. No cold inbox, no guessing whether the other person even saw it.',
  },
  {
    icon: CalendarCheck2,
    title: 'Book a real meeting',
    text: 'Pick a slot inside the other person\u2019s open availability. A calendar invite goes out automatically — no five-message scheduling thread.',
  },
  {
    icon: Coins,
    title: 'Credits move, cashback lands',
    text: 'Spending credits to reach a VIP pays that VIP back in cashback credits. Everyone has a reason to say yes.',
  },
];

export default function HowItWorksPage() {
  return (
    <HomeWrapper>
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <PageHero
        eyebrow="How it Works"
        title={<>From profile to a booked meeting in five steps.</>}
        subtitle="No app-hopping, no cold DMs, no five-message scheduling threads. Here's the whole flow, start to finish."
        image={IMAGES.laptopHero}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="relative flex flex-col gap-10">
          {/* Connecting line */}
          <div className="absolute left-[27px] top-3 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#639781]/40 via-[#639781]/15 to-transparent sm:block" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-6 sm:gap-8"
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#639781]/25 bg-[#101B16] text-[#8FB8A4]">
                  <Icon className="h-6 w-6" />
                  <span
                    className="absolute -bottom-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-[#639781] text-[11px] font-bold text-[#0A100D]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>
                </span>
                <div className="rounded-2xl border border-white/[0.07] bg-[#101915] p-6">
                  <h3
                    className="text-[17px] font-semibold leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[36rem] text-[14px] leading-relaxed text-[#92A79C]">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting image + CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid gap-8 rounded-3xl border border-white/[0.08] bg-[#101B16] p-8 lg:grid-cols-2 lg:items-center lg:p-12"
        >
          <div>
            <h3
              className="text-[1.6rem] font-semibold leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Every step above runs the same way whether it’s your first event or your fiftieth.
            </h3>
            <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-[#92A79C]">
              Organizers plug in an attendee list once — CSV, webhook, or a shared link — and the flow above just
              works for everyone who joins.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 rounded-full bg-[#639781] px-6 py-3 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)]"
            >
              Create your event
            </motion.button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08]">
            <Image
              src={IMAGES.meetingTable}
              alt="People meeting around a conference table"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </main>
    </HomeWrapper>
  );
}
