// app/dashboard/page.tsx (Overview - updated to use hooks)
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import {
  Share2,
  CalendarClock,
  Wallet,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Coins,
  Users,
  CalendarRange,
  BarChart3,
  Megaphone,
  Plus,
  Upload,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';
import { useRole, ACCENT } from '@/lib/role-context';
import { useGetCurrentEventQuery } from '@/redux/slices';
import {
  useGetConnectionsStatsQuery,
  useGetPendingCountQuery,
} from '@/redux/slices';
import { useGetWalletBalanceQuery } from '@/redux/slices';
import { useGetUpcomingMeetingsQuery } from '@/redux/slices';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Accent = (typeof ACCENT)[keyof typeof ACCENT];

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  accent: Accent;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: accent.soft, color: accent.text }}>
          <Icon className="h-[17px] w-[17px]" />
        </span>
        {delta && (
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-[#8FB8A4]">
            <TrendingUp className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-[1.7rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        {value}
      </p>
      <p className="mt-1 text-[12.5px] text-[#7C8F85]">{label}</p>
    </div>
  );
}

function SectionCard({
  title,
  action,
  children,
  className = '',
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-[#0D1712] p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14.5px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-24 items-end gap-1.5">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${Math.max((v / max) * 100, 4)}%` }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-t-md"
          style={{ backgroundColor: color, opacity: 0.35 + (v / max) * 0.65 }}
        />
      ))}
    </div>
  );
}

const fadeVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ─── Attendee overview ──────────────────────────────────────────────────────────

function AttendeeOverview() {
  const { data: currentEvent } = useGetCurrentEventQuery();
  const eventId = currentEvent?.data?._id;

  const { data: statsData } = useGetConnectionsStatsQuery({ eventId });
  const { data: pendingData } = useGetPendingCountQuery({ eventId });
  const { data: balanceData } = useGetWalletBalanceQuery({ eventId });
  const { data: meetingsData } = useGetUpcomingMeetingsQuery({ eventId, limit: 3 });

  const stats = statsData?.data;
  const pendingCount = pendingData?.data?.count || 0;
  const balance = balanceData?.data?.balance || 0;
  const meetings = meetingsData?.data || [];

  const accent = ACCENT.attendee;

  // Mock data for suggested and ledger (would come from real APIs)
  const SUGGESTED = [
    { name: 'Priya Menon', role: 'Investor · Fintech', shared: 'Shares your interest in Fundraising', initials: 'PM' },
    { name: 'Diego Alvarez', role: 'Founder · DevTools', shared: 'Also tagged Partnership as a goal', initials: 'DA' },
    { name: 'Kenji Sato', role: 'Recruiter · Web3', shared: 'Shares your interest in Hiring', initials: 'KS' },
  ];

  const LEDGER = [
    { text: 'Request accepted by Kenji Sato (VIP)', delta: '-3 cr', kind: 'debit' as const },
    { text: 'Cashback from Ada Whitfield', delta: '+1 cr', kind: 'credit' as const },
    { text: 'Meeting booked with Sana Malik', delta: 'Confirmed', kind: 'credit' as const },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome back
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">
          {currentEvent?.data?.name || 'Fintech Summit 2026'} is live — here's where your networking stands right now.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Share2} label="Connections sent" value={String(stats?.sent || 0)} delta="+6 this week" accent={accent} />
        <StatCard icon={Sparkles} label="Requests accepted" value={String(stats?.accepted || 0)} delta="+3 this week" accent={accent} />
        <StatCard icon={CalendarClock} label="Meetings booked" value={String(meetings.length)} accent={accent} />
        <StatCard icon={Wallet} label="Credit balance" value={`${balance} cr`} accent={accent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Suggested for you"
          action={
            <a href="/dashboard/discover" className="flex items-center gap-1 text-[12.5px] font-medium text-[#8FB8A4]">
              See all
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          }
          className="lg:col-span-2"
        >
          <div className="flex flex-col gap-3">
            {SUGGESTED.map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[12px] font-semibold">
                  {p.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{p.name}</p>
                  <p className="truncate text-[12px] text-[#7C8F85]">{p.role}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-[#639781]/25 bg-[#639781]/[0.08] px-2.5 py-1 text-[11px] text-[#8FB8A4] sm:block">
                  {p.shared}
                </span>
                <button className="shrink-0 rounded-full bg-[#639781] px-3.5 py-1.5 text-[12px] font-semibold text-[#0A100D]">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Wallet">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#D9B26B]/10 text-[#D9B26B]">
              <Coins className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-[1.4rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {balance} credits
              </p>
              <p className="text-[11.5px] text-[#7C8F85]">{balanceData?.data?.earnedThisMonth || 0} cr earned in cashback</p>
            </div>
          </div>
          <a href="/dashboard/wallet">
            <button className="mt-4 w-full rounded-full border border-white/10 py-2.5 text-[13px] font-medium text-[#EAF2ED] hover:border-white/25">
              Buy more credits
            </button>
          </a>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Upcoming meetings">
          <div className="flex flex-col gap-3">
            {meetings.length === 0 ? (
              <p className="py-4 text-center text-[#5F736A]">No upcoming meetings</p>
            ) : (
              meetings.map((m) => {
                const person = m.organizer || m.participant;
                return (
                  <div key={m._id} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[11.5px] font-semibold">
                      {person?.initials || '??'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{person?.name || 'Unknown'}</p>
                      <p className="truncate text-[12px] text-[#7C8F85]">{m.topic}</p>
                    </div>
                    <span className="shrink-0 text-[11.5px] font-medium text-[#8FB8A4]">
                      {new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </SectionCard>

        <SectionCard title="Live ledger">
          <div className="flex flex-col gap-2.5">
            {LEDGER.map((l, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5">
                <span className="text-[13px] text-[#C7D6CE]">{l.text}</span>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                    l.kind === 'credit' ? 'bg-[#639781]/15 text-[#8FB8A4]' : 'bg-[#D9B26B]/10 text-[#D9B26B]'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {l.delta}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Organizer overview ─────────────────────────────────────────────────────────

const REGISTRATIONS_TREND = [12, 18, 14, 22, 30, 26, 34, 40, 38, 44, 50, 47];

function OrganizerOverview() {
  const { data: currentEvent } = useGetCurrentEventQuery();
  const accent = ACCENT.organizer;

  // Mock events data (would come from real API)
  const EVENTS = [
    { name: 'Fintech Summit 2026', date: 'Jul 14 – 16', sold: '842 / 1,000', status: 'Live' },
    { name: 'Founders Roundtable', date: 'Aug 2', sold: '120 / 150', status: 'Upcoming' },
    { name: 'DevTools Meetup', date: 'Aug 20', sold: '58 / 200', status: 'Upcoming' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome back
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">
          Here's how {currentEvent?.data?.organiserId?.organisationName || 'Summit Collective'}'s events are performing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Total registrations" value="1,342" delta="+8.4%" accent={accent} />
        <StatCard icon={Share2} label="Connections made" value="3,910" delta="+12%" accent={accent} />
        <StatCard icon={CalendarClock} label="Meetings scheduled" value="682" delta="+5%" accent={accent} />
        <StatCard icon={Coins} label="Revenue from credits" value="$18,240" delta="+9%" accent={accent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Registrations, last 12 days"
          action={<span className="text-[11.5px] text-[#7C8F85]">{currentEvent?.data?.name || 'Fintech Summit 2026'}</span>}
          className="lg:col-span-2"
        >
          <MiniBarChart data={REGISTRATIONS_TREND} color={accent.bg} />
        </SectionCard>

        <SectionCard title="Quick actions">
          <div className="flex flex-col gap-2.5">
            <button className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-3.5 py-3 text-left text-[13px] font-medium text-[#EAF2ED] hover:border-white/20">
              <Plus className="h-4 w-4 text-[#E3C08A]" />
              Create new event
            </button>
            <button className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-3.5 py-3 text-left text-[13px] font-medium text-[#EAF2ED] hover:border-white/20">
              <Upload className="h-4 w-4 text-[#E3C08A]" />
              Import attendees
            </button>
            <button className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-3.5 py-3 text-left text-[13px] font-medium text-[#EAF2ED] hover:border-white/20">
              <BarChart3 className="h-4 w-4 text-[#E3C08A]" />
              View full analytics
            </button>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Your events"
          action={
            <a href="/dashboard/events" className="flex items-center gap-1 text-[12.5px] font-medium text-[#E3C08A]">
              See all
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          }
        >
          <div className="flex flex-col gap-3">
            {EVENTS.map((ev) => (
              <div key={ev.name} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#D9B26B]/10 text-[#D9B26B]">
                  <CalendarRange className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{ev.name}</p>
                  <p className="truncate text-[12px] text-[#7C8F85]">
                    {ev.date} · {ev.sold} tickets
                    // app/dashboard/page.tsx (continued)
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    ev.status === 'Live' ? 'bg-[#639781]/15 text-[#8FB8A4]' : 'bg-white/[0.06] text-[#92A79C]'
                  }`}
                >
                  {ev.status}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Sponsor snapshot">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#D9B26B]/10 text-[#D9B26B]">
                <Megaphone className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[1.3rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                6
              </p>
              <p className="text-[11.5px] text-[#7C8F85]">Active sponsors</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#639781]/10 text-[#8FB8A4]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[1.3rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                214
              </p>
              <p className="text-[11.5px] text-[#7C8F85]">Qualified leads delivered</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const { role } = useRole();

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {role === 'attendee' ? <AttendeeOverview /> : <OrganizerOverview />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}