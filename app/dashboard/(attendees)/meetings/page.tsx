'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Video, MapPin, CalendarClock, RotateCcw, X, Star } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SegmentedTabs } from '@/app/dashboard/components/ui/tabs';
import { ChipMultiSelect } from '@/app/dashboard/components/ui/select';
import { SectionCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';

/**
 * app/dashboard/meetings/page.tsx
 * Upcoming/Past meeting list plus a lightweight availability editor (PRD
 * 6.6 — attendees set open slots, others book inside them). Reschedule/
 * Cancel are local-state only here.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tab = 'upcoming' | 'past';
type Meeting = {
  id: string;
  name: string;
  initials: string;
  topic: string;
  time: string;
  mode: 'video' | 'in-person';
  location: string;
};

const UPCOMING: Meeting[] = [
  { id: 'm1', name: 'Sana Malik', initials: 'SM', topic: 'Seed round intro', time: 'Today · 2:30 PM', mode: 'video', location: 'VirtualNet video room' },
  { id: 'm2', name: 'Leo Fontaine', initials: 'LF', topic: 'Partnership scoping', time: 'Today · 4:00 PM', mode: 'in-person', location: 'Networking Lounge, Table 4' },
  { id: 'm3', name: 'Ada Whitfield', initials: 'AW', topic: 'Hiring pipeline chat', time: 'Tomorrow · 10:00 AM', mode: 'video', location: 'VirtualNet video room' },
];

const PAST: Meeting[] = [
  { id: 'p1', name: 'Diego Alvarez', initials: 'DA', topic: 'Product feedback', time: 'Jun 28 · 1:00 PM', mode: 'video', location: 'VirtualNet video room' },
  { id: 'p2', name: 'Nia Okonjo', initials: 'NO', topic: 'Portfolio intro', time: 'Jun 24 · 11:30 AM', mode: 'in-person', location: 'Main hall' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MeetingsPage() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [upcoming, setUpcoming] = useState(UPCOMING);
  const [openDays, setOpenDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu']);
  const accent = ACCENT.attendee;

  const cancel = (id: string) => setUpcoming((m) => m.filter((x) => x.id !== id));

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Meetings
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Booked time with your connections, and when you're open for more.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <SegmentedTabs
            className="max-w-xs"
            value={tab}
            onChange={setTab}
            accent={accent.bg}
            options={[
              { value: 'upcoming', label: `Upcoming${upcoming.length ? ` (${upcoming.length})` : ''}` },
              { value: 'past', label: 'Past' },
            ]}
          />

          <AnimatePresence mode="wait">
            {tab === 'upcoming' && (
              <motion.div key="upcoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                {upcoming.length === 0 ? (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-10 text-center">
                    <p className="text-[14px] text-[#92A79C]">No meetings booked yet — accept a connection to get started.</p>
                  </div>
                ) : (
                  upcoming.map((m) => (
                    <motion.div
                      key={m.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex flex-1 items-center gap-3">
                        <Avatar initials={m.initials} />
                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{m.name}</p>
                          <p className="truncate text-[12px] text-[#7C8F85]">{m.topic}</p>
                        </div>
                        <Pill tone="sage" className="hidden sm:inline-flex">
                          {m.mode === 'video' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {m.location}
                        </Pill>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-medium text-[#8FB8A4]">{m.time}</span>
                        <Button variant="secondary" icon={RotateCcw}>
                          Reschedule
                        </Button>
                        <Button variant="danger" icon={X} onClick={() => cancel(m.id)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {tab === 'past' && (
              <motion.div key="past" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                {PAST.map((m) => (
                  <div key={m.id} className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-3">
                      <Avatar initials={m.initials} />
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{m.name}</p>
                        <p className="truncate text-[12px] text-[#7C8F85]">{m.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill>Completed</Pill>
                      <span className="text-[11.5px] text-[#5F736A]">{m.time}</span>
                      <Button variant="secondary" icon={Star}>
                        Feedback
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <SectionCard title="Your availability">
          <p className="mb-4 text-[12.5px] leading-relaxed text-[#7C8F85]">
            Others can only book meetings inside the days you mark as open.
          </p>
          <ChipMultiSelect label="Open days" options={DAYS} values={openDays} onChange={setOpenDays} accent={accent.bg} />
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <CalendarClock className="h-4 w-4 text-[#8FB8A4]" />
            <p className="text-[12.5px] text-[#92A79C]">10:00 AM – 5:00 PM on open days</p>
          </div>
          <Button variant="secondary" fullWidth className="mt-4">
            Edit time windows
          </Button>
        </SectionCard>
      </div>
    </div>
  );
}
