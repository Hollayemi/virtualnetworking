'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft, Mail, Share2, CalendarClock, TrendingUp, MessageSquare } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { LoadingState, ErrorState } from '@/app/dashboard/components/state';
import { useGetAttendeeDetailQuery } from '@/redux/slices/organiser/attendees.slice';
import { ACCENT } from '@/lib/role-context';
import { getInitials } from '@/utils';

/**
 * app/dashboard/attendees/[id]/page.tsx
 * Backed by useGetAttendeeDetailQuery.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TIER_TONE: Record<string, 'sage' | 'gold' | 'neutral'> = { Regular: 'neutral', Premium: 'sage', VIP: 'gold' };

export default function AttendeeDetailPage() {
  const params = useParams<{ id: string }>();
  const accent = ACCENT.organizer;

  const { data, isLoading, isError } = useGetAttendeeDetailQuery(params.id);
  const attendee = data?.data as any;

  if (isLoading) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <LoadingState label="Loading attendee…" />
      </div>
    );
  }

  if (isError || !attendee) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <Link href="/dashboard/attendees" className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Attendees
        </Link>
        <ErrorState label="This attendee doesn't exist, or isn't part of your events." />
      </div>
    );
  }

  const sent = attendee.connectionsSent ?? 0;
  const accepted = attendee.connectionsAccepted ?? 0;
  const acceptanceRate = sent ? Math.round((accepted / sent) * 100) : 0;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <Link href="/dashboard/attendees" className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Attendees
        </Link>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#0D1712] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={getInitials(attendee.name ?? '')} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[1.4rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {attendee.name}
                </h2>
                <Pill tone={TIER_TONE[attendee.tier] ?? 'neutral'}>{attendee.tier}</Pill>
              </div>
              <p className="mt-0.5 text-[13px] text-[#92A79C]">
                {attendee.role} · {attendee.company}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#5F736A]">
                <Mail className="h-3.5 w-3.5" />
                {attendee.email}
              </p>
            </div>
          </div>
          <Button variant="secondary" icon={MessageSquare}>
            Message attendee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Share2} label="Requests sent" value={String(sent)} accent={accent} />
        <StatCard icon={TrendingUp} label="Acceptance rate" value={`${acceptanceRate}%`} accent={accent} />
        <StatCard icon={CalendarClock} label="Meetings booked" value={String(attendee.meetingsCount ?? 0)} accent={accent} />
        <StatCard icon={Share2} label="Connections" value={String(accepted)} accent={accent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="About">
          <p className="text-[13.5px] leading-relaxed text-[#C7D6CE]">{attendee.bio || 'No bio provided.'}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {attendee.industry && <Pill>{attendee.industry}</Pill>}
            {(attendee.interests ?? []).map((i: string) => (
              <Pill key={i}>{i}</Pill>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Event details">
          <div className="flex flex-col divide-y divide-white/[0.06]">
            <DetailRow label="Registered for" value={attendee.eventName ?? '—'} />
            <DetailRow label="Joined" value={attendee.joinedAt ? new Date(attendee.joinedAt).toLocaleDateString() : '—'} />
            <DetailRow label="Ticket tier" value={attendee.tier} />
            <DetailRow label="Networking goal" value={attendee.networkingGoal ?? '—'} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-[12.5px] text-[#7C8F85]">{label}</span>
      <span className="text-[13px] font-medium text-[#EAF2ED]">{value}</span>
    </div>
  );
}
