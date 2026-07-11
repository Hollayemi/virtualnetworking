'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Share2, Clock, Inbox, MessageSquare, CalendarClock, Check, X, Sparkles } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SegmentedTabs } from '@/app/dashboard/components/ui/tabs';
import { StatCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';


const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tab = 'connections' | 'received' | 'sent';

type Person = { id: string; name: string; initials: string; role: string; intent: string; viaCredits?: boolean; connectedOn?: string };

const INITIAL_CONNECTIONS: Person[] = [
  { id: 'c1', name: 'Sana Malik', initials: 'SM', role: 'Founder · Cursive', intent: 'Fundraising', connectedOn: 'Jul 2' },
  { id: 'c2', name: 'Leo Fontaine', initials: 'LF', role: 'Sales · Vantage', intent: 'Partnership', connectedOn: 'Jun 28' },
  { id: 'c3', name: 'Ada Whitfield', initials: 'AW', role: 'Developer · Fieldstone', intent: 'Hiring', connectedOn: 'Jun 24' },
];

const INITIAL_RECEIVED: Person[] = [
  { id: 'r1', name: 'Priya Menon', initials: 'PM', role: 'Investor · Northbridge', intent: 'Fundraising', viaCredits: true },
  { id: 'r2', name: 'Ravi Patel', initials: 'RP', role: 'Job Seeker', intent: 'Hiring' },
  { id: 'r3', name: 'Kenji Sato', initials: 'KS', role: 'Recruiter · Sato & Partners', intent: 'Hiring', viaCredits: true },
];

const INITIAL_SENT: Person[] = [
  { id: 's1', name: 'Nia Okonjo', initials: 'NO', role: 'Investor · Delta Ventures', intent: 'Investment' },
  { id: 's2', name: 'Tomas Berg', initials: 'TB', role: 'Developer · Solstice Labs', intent: 'Partnership' },
];

function PersonRow({ person, children }: { person: Person; children: React.ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3">
        <Avatar initials={person.initials} />
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{person.name}</p>
          <p className="truncate text-[12px] text-[#7C8F85]">{person.role}</p>
        </div>
        <Pill tone="sage" className="hidden sm:inline-flex">
          {person.intent}
        </Pill>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </motion.div>
  );
}

export default function ConnectionsPage() {
  const [tab, setTab] = useState<Tab>('connections');
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [received, setReceived] = useState(INITIAL_RECEIVED);
  const [sent, setSent] = useState(INITIAL_SENT);
  const accent = ACCENT.attendee;

  const accept = (person: Person) => {
    setReceived((r) => r.filter((p) => p.id !== person.id));
    setConnections((c) => [{ ...person, connectedOn: 'Today' }, ...c]);
  };

  const decline = (id: string) => setReceived((r) => r.filter((p) => p.id !== id));
  const cancelSent = (id: string) => setSent((s) => s.filter((p) => p.id !== id));

  const acceptanceRate = Math.round((connections.length / (connections.length + sent.length)) * 100) || 0;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Connections
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Everything moving through your request pipeline, in one place.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Share2} label="Total connections" value={String(connections.length)} accent={accent} />
        <StatCard icon={Clock} label="Requests sent" value={String(sent.length)} accent={accent} />
        <StatCard icon={Inbox} label="Awaiting your reply" value={String(received.length)} accent={accent} />
        <StatCard icon={Check} label="Acceptance rate" value={`${acceptanceRate}%`} accent={accent} />
      </div>

      <SegmentedTabs
        className="max-w-md"
        value={tab}
        onChange={setTab}
        accent={accent.bg}
        options={[
          { value: 'connections', label: 'Connections' },
          { value: 'received', label: `Received${received.length ? ` (${received.length})` : ''}` },
          { value: 'sent', label: `Sent${sent.length ? ` (${sent.length})` : ''}` },
        ]}
      />

      <AnimatePresence mode="wait">
        {tab === 'connections' && (
          <motion.div key="connections" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
            {connections.length === 0 ? (
              <EmptyState text="No connections yet — head to Discover to send your first request." />
            ) : (
              connections.map((p) => (
                <PersonRow key={p.id} person={p}>
                  <span className="hidden text-[11.5px] text-[#5F736A] sm:inline">Connected {p.connectedOn}</span>
                  <Button variant="secondary" icon={MessageSquare}>
                    Message
                  </Button>
                  <Button icon={CalendarClock} accent={accent.bg}>
                    Schedule
                  </Button>
                </PersonRow>
              ))
            )}
          </motion.div>
        )}

        {tab === 'received' && (
          <motion.div key="received" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
            {received.length === 0 ? (
              <EmptyState text="You're all caught up — no pending requests." />
            ) : (
              received.map((p) => (
                <PersonRow key={p.id} person={p}>
                  {p.viaCredits && (
                    <Pill tone="gold">
                      <Sparkles className="h-3 w-3" />
                      +1 cr on accept
                    </Pill>
                  )}
                  <Button variant="secondary" icon={X} onClick={() => decline(p.id)}>
                    Decline
                  </Button>
                  <Button icon={Check} accent={accent.bg} onClick={() => accept(p)}>
                    Accept
                  </Button>
                </PersonRow>
              ))
            )}
          </motion.div>
        )}

        {tab === 'sent' && (
          <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
            {sent.length === 0 ? (
              <EmptyState text="Nothing pending — every request you've sent has been answered." />
            ) : (
              sent.map((p) => (
                <PersonRow key={p.id} person={p}>
                  <Pill>Pending</Pill>
                  <Button variant="danger" onClick={() => cancelSent(p.id)}>
                    Cancel
                  </Button>
                </PersonRow>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-10 text-center">
      <p className="text-[14px] text-[#92A79C]">{text}</p>
    </div>
  );
}
