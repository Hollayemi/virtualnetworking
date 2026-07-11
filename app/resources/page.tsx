'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { FileText, LifeBuoy, HelpCircle, ArrowUpRight, ChevronDown, LucideIcon } from 'lucide-react';
import PageHero from '@/app/components/PageHero';
import HomeWrapper from '../components/wrapper';
import { IMAGES } from '@/lib/images';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const POSTS = [
  { title: 'Why cold DMs kill conference networking', tag: 'Playbook', read: '6 min' },
  { title: 'How VIP cashback changes who says yes', tag: 'Product', read: '4 min' },
  { title: 'A CSV import checklist for organizers', tag: 'Guides', read: '3 min' },
];

const HELP_TOPICS = [
  { icon: FileText, title: 'Getting started', text: 'Set up your profile and send your first connection request.' },
  { icon: LifeBuoy, title: 'For organizers', text: 'Import attendees and configure your credit economy.' },
  { icon: HelpCircle, title: 'Billing & credits', text: 'How credits, cashback, and VIP passes are charged.' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do credits and cashback actually work?',
    a: 'Credits are spent to send requests to VIP attendees, unlock priority messages, or access premium features. When a VIP accepts a lower-tier request, they receive a cashback credit — roughly 1 credit back for every 3 spent, though organizers can adjust the ratio per event.',
  },
  {
    q: 'Do I need to migrate off my current registration platform?',
    a: 'No. VirtualNet layers on top of whatever you already use — import attendees via CSV, connect a webhook, or share a networking access link after registration closes.',
  },
  {
    q: 'What happens to unused credits after an event ends?',
    a: 'Leftover credits carry over and can be used to register for another event, unlock networking boosts, or purchase premium features on the platform.',
  },
  {
    q: 'Can attendees network after the event is over?',
    a: 'Yes — post-event networking stays open for a limited period by default, with a paid upgrade available to keep it open indefinitely.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101915]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[14.5px] font-medium text-[#EAF2ED]" style={{ fontFamily: 'var(--font-display)' }}>
          {q}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#8FB8A4] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#92A79C]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <HomeWrapper>
      <main
        className={`${display.variable} ${body.variable} ${mono.variable} bg-[#0A100D] text-[#EAF2ED]`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <PageHero
          eyebrow="Resources"
          title={<>Guides, docs, and answers — in one place.</>}
          subtitle="Everything you need to run, join, or sponsor an event on VirtualNet."
          image={IMAGES.laptopResources}
        />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {/* Blog */}
          <section id="blog" className="scroll-mt-28">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#8FB8A4]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                    Blog
                  </span>
                </div>
                <h2 className="text-[1.9rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Product updates & networking playbooks
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/[0.08]">
                <Image src={IMAGES.laptopTyping} alt="Person typing on a laptop" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {POSTS[0].tag} · {POSTS[0].read}
                  </span>
                  <h3 className="mt-2 max-w-sm text-[19px] font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                    {POSTS[0].title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {POSTS.slice(1).map((post) => (
                  <a
                    key={post.title}
                    href="#"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#101915] p-5 transition-colors hover:border-[#639781]/30"
                  >
                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#5F736A]" style={{ fontFamily: 'var(--font-mono)' }}>
                        {post.tag} · {post.read}
                      </span>
                      <h3 className="mt-1.5 text-[15px] font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {post.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#8FB8A4] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Help Center */}
          <section id="help-center" className="mt-28 scroll-mt-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
              <LifeBuoy className="h-3.5 w-3.5 text-[#8FB8A4]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                Help Center
              </span>
            </div>
            <h2 className="mb-10 text-[1.9rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Guides for organizers, sponsors, and attendees
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {HELP_TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <a
                    key={topic.title}
                    href="#"
                    className="group rounded-2xl border border-white/[0.08] bg-[#101915] p-6 transition-colors hover:border-[#639781]/30"
                  >
                    <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#639781]/10 text-[#8FB8A4]">
                      <Icon className="h-[19px] w-[19px]" />
                    </span>
                    <h3 className="text-[15px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#92A79C]">{topic.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-[#8FB8A4]">
                      Read more
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mt-28 scroll-mt-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#639781]/30 bg-[#639781]/[0.07] px-3.5 py-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#8FB8A4]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FB8A4]" style={{ fontFamily: 'var(--font-mono)' }}>
                FAQs
              </span>
            </div>
            <h2 className="mb-10 text-[1.9rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Quick answers on credits, VIP access, and pricing
            </h2>

            <div className="flex flex-col gap-3">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </HomeWrapper>
  );
}
