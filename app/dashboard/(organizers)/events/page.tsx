'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Plus, CalendarRange, Share2, CalendarClock, ArrowRight } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { ProgressBar } from '@/app/dashboard/components/charts';
import { StatCard, SectionCard } from '@/app/dashboard/components/ui';
import { LoadingState, ErrorState, EmptyState } from '@/app/dashboard/components/state';
import { useListEventsQuery } from '@/redux/slices/organiser/events.slice';
import { ACCENT } from '@/lib/role-context';
import { formatDate } from '@/utils';

/**
 * app/dashboard/events/page.tsx
 * "My Events" — backed by useListEventsQuery. Each card links into its own
 * nested listing page at /dashboard/events/[slug], and "Create Event" lives
 * at the nested route /dashboard/events/new.
 *
 * NOTE: `.data?.items` below assumes Pagination<Event[]> shapes as
 * { items: Event[], total, page, pageSize }. Adjust that accessor if your
 * actual Pagination<T> type uses a different field name.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const STATUS_TONE: Record<string, 'sage' | 'gold' | 'neutral'> = { Live: 'sage', Upcoming: 'gold', Ended: 'neutral' };

function ticketTotals(ev: any) {
  const sold = ev.tiers?.reduce((sum: number, t: any) => sum + (t.sold ?? 0), 0) ?? 0;
  const total = ev.tiers?.reduce((sum: number, t: any) => sum + (t.capacity ?? 0), 0) ?? 0;
  return { sold, total: total || 1 };
}

export default function MyEventsPage() {
  const router = useRouter();
  const accent = ACCENT.organizer;

  const { data, isLoading, isError } = useListEventsQuery({});
  const events = data?.data?.data ?? [];

  console.log({events})

  const totalRegistrations = events.reduce((sum:any, ev:any) => sum + ticketTotals(ev).sold, 0);
  const liveCount = events.filter((ev: any) => ev.status === 'Live').length;
  const totalConnections = events.reduce((sum: number, ev: any) => sum + (ev.connections ?? 0), 0);

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            My Events
          </h2>
          <p className="mt-1 text-[13.5px] text-[#92A79C]">Every event you're running, live or upcoming.</p>
        </div>
        <Button icon={Plus} accent={accent.bg} className="text-[#0A100D]" onClick={() => router.push('/dashboard/events/new')}>
          Create event
        </Button>
      </div>

      {isLoading && <LoadingState label="Loading your events…" />}
      {isError && <ErrorState label="Couldn't load your events." />}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={CalendarRange} label="Total events" value={String(events.length)} accent={accent} />
            <StatCard icon={CalendarClock} label="Live now" value={String(liveCount)} accent={accent} />
            <StatCard icon={Share2} label="Total registrations" value={totalRegistrations.toLocaleString()} accent={accent} />
            <StatCard icon={Share2} label="Connections made" value={totalConnections.toLocaleString()} accent={accent} />
          </div>

          {events.length === 0 ? (
            <EmptyState label="No events yet — create your first one to get started." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {events.map((ev: any) => {
                const { sold, total } = ticketTotals(ev);
                const dateLabel =
                  ev.startDate === ev.endDate ? formatDate(ev.startDate) : `${formatDate(ev.startDate)} - ${formatDate(ev.endDate)}`;
                const locationLabel = ev.location?.type === 'virtual' ? 'Virtual' : ev.location?.city;
                const eventKey = ev.slug ?? ev.id;

                return (
                  <SectionCard key={ev.id} title={ev.name} action={<Pill tone={STATUS_TONE[ev.status] ?? 'neutral'}>{ev.status}</Pill>}>
                    <p className="text-[12.5px] text-[#7C8F85]">
                      {dateLabel} · {locationLabel}
                    </p>

                    <div className="mt-4">
                      <ProgressBar label="Tickets sold" value={sold} max={total} color={accent.bg} />
                    </div>

                    <Link href={`/dashboard/events/${eventKey}`} className="mt-4 block">
                      <Button variant="secondary" fullWidth icon={ArrowRight}>
                        View event listing
                      </Button>
                    </Link>
                  </SectionCard>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
