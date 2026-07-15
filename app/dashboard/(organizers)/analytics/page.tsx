'use client';

import { useEffect, useState } from 'react';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Users, Share2, CalendarClock, Coins } from 'lucide-react';
import { StatCard, SectionCard } from '@/app/dashboard/components/ui';
import { MiniBarChart, ProgressBar } from '@/app/dashboard/components/charts';
import { LoadingState, ErrorState } from '@/app/dashboard/components/state';
import { useListEventsQuery } from '@/redux/slices/organiser/events.slice';
import { useGetEventAnalyticsQuery } from '@/redux/slices/organiser/analytics.slice';
import { ACCENT } from '@/lib/role-context';
import { formatCurrency } from '@/utils';

/**
 * app/dashboard/analytics/page.tsx
 * Event selector backed by useListEventsQuery; everything below it backed
 * by useGetEventAnalyticsQuery for the selected event.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export default function AnalyticsPage() {
  const accent = ACCENT.organizer;

  const { data: eventsData, isLoading: eventsLoading } = useListEventsQuery({});
  const events = eventsData?.data?.items ?? [];

  const [eventId, setEventId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!eventId && events.length > 0) setEventId(events[0].id);
  }, [events, eventId]);

  const { data, isLoading, isError } = useGetEventAnalyticsQuery(eventId as string, { skip: !eventId });
  const analytics = data?.data;

  const maxGoal = analytics?.topNetworkingGoals?.length
    ? Math.max(...analytics.topNetworkingGoals.map((g:any) => g.count))
    : 1;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Analytics
          </h2>
          <p className="mt-1 text-[13.5px] text-[#92A79C]">Networking outcomes, not just attendance numbers.</p>
        </div>
        <select
          value={eventId ?? ''}
          onChange={(e) => setEventId(e.target.value)}
          disabled={eventsLoading || events.length === 0}
          className="rounded-xl border border-white/[0.08] bg-[#0D1712] px-3.5 py-2.5 text-[13px] text-[#C7D6CE] outline-none focus:border-[#639781]/50"
        >
          {events.map((e: any) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      {(isLoading || eventsLoading) && <LoadingState label="Loading analytics…" />}
      {isError && <ErrorState label="Couldn't load analytics for this event." />}

      {!isLoading && !eventsLoading && !isError && analytics && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Users} label="Registrations" value={`${analytics.registrationsSold}/${analytics.registrationsTotal}`} accent={accent} />
            <StatCard icon={Share2} label="Connections made" value={analytics.connections.toLocaleString()} accent={accent} />
            <StatCard icon={CalendarClock} label="Meetings booked" value={analytics.meetings.toLocaleString()} accent={accent} />
            <StatCard icon={Coins} label="Credit revenue" value={formatCurrency(analytics.creditRevenue)} accent={accent} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Registrations trend">
              <MiniBarChart data={analytics.registrationsTrend} color={accent.bg} />
            </SectionCard>
            <SectionCard title="Connections trend">
              <MiniBarChart data={analytics.connectionsTrend} color="#D9B26B" />
            </SectionCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Tickets by tier">
              <div className="flex flex-col gap-4">
                {analytics.tierBreakdown.map((t:any) => (
                  <ProgressBar key={t.label} label={t.label} value={t.sold} max={t.capacity || t.sold || 1} color={t.color ?? accent.bg} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Top networking goals">
              <div className="flex flex-col gap-4">
                {analytics.topNetworkingGoals.map((g:any) => (
                  <ProgressBar key={g.label} label={g.label} value={g.count} max={maxGoal} color={accent.bg} suffix={String(g.count)} />
                ))}
              </div>
            </SectionCard>
          </div>
        </>
      )}
    </div>
  );
}
