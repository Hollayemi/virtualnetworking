'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft, MapPin, Video, Users, Share2, CalendarClock, ImageOff, Megaphone } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { ProgressBar } from '@/app/dashboard/components/charts';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { LoadingState, ErrorState } from '@/app/dashboard/components/state';
import { useGetEventDetailQuery, usePublishEventMutation } from '@/redux/slices/organiser/events.slice';
import { useGetEventAnalyticsQuery } from '@/redux/slices/organiser/analytics.slice';
import { ACCENT } from '@/lib/role-context';
import { formatDate } from '@/utils';


const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const STATUS_TONE: Record<string, 'sage' | 'gold' | 'neutral'> = { Live: 'sage', Upcoming: 'gold', Ended: 'neutral' };

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const accent = ACCENT.organizer;

  const { data, isLoading, isError } = useGetEventDetailQuery(params.id);
  const [publishEvent, { isLoading: publishing }] = usePublishEventMutation()
  const event = data?.data as any;

  const { data: analyticsData } = useGetEventAnalyticsQuery(params.id, { skip: !event });
  const analytics = analyticsData?.data;

  const handlePublish = async () => {
    await publishEvent(event.slug)
  }

  if (isLoading) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <LoadingState label="Loading event…" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>

        <Link href="/dashboard/events" className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          My Events

        </Link>

        <ErrorState label="This event doesn't exist, or you don't have access to it." />
      </div>
    );
  }

  const tiers = event.tiers ?? [];
  const sold = tiers.reduce((sum: number, t: any) => sum + (t.sold ?? 0), 0);
  const total = tiers.reduce((sum: number, t: any) => sum + (t.capacity ?? 0), 0) || 1;
  const dateLabel =
    event.startDate === event.endDate ? formatDate(event.startDate) : `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <div className="flex flex-col gap-4 mb-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/dashboard/events" className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
            <ArrowLeft className="h-3.5 w-3.5" />
            My Events
          </Link>

          {event.status === "draft" && <Button icon={Megaphone} accent={accent.bg} className="text-[#0A100D] " onClick={handlePublish}>
            Publish
          </Button>}
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-[#D9B26B]/15 to-[#0D1712] sm:h-52">
            {event.bannerUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={event.bannerUrl} alt={event.name} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <ImageOff className="h-8 w-8 text-[#5F736A]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <Pill tone={STATUS_TONE[event.status] ?? 'neutral'}>{event.status}</Pill>
              <h2 className="mt-2 text-[1.6rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {event.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-[#92A79C]">
          <span className="flex items-center gap-1.5">
            <CalendarClock className="h-4 w-4 text-[#8FB8A4]" />
            {dateLabel}
          </span>
          <span className="flex items-center gap-1.5">
            {event.location?.type === 'virtual' ? <Video className="h-4 w-4 text-[#8FB8A4]" /> : <MapPin className="h-4 w-4 text-[#8FB8A4]" />}
            {event.location?.type === 'virtual' ? event.location?.link : `${event.location?.address ?? ''}, ${event.location?.city ?? ''}`}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#92A79C]">{event.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Tickets sold" value={`${sold}/${total}`} accent={accent} />
        <StatCard icon={Share2} label="Connections made" value={(analytics?.connections ?? 0).toLocaleString()} accent={accent} />
        <StatCard icon={CalendarClock} label="Meetings booked" value={(analytics?.meetings ?? 0).toLocaleString()} accent={accent} />
        <StatCard icon={Users} label="Ticket tiers" value={String(tiers.length)} accent={accent} />
      </div>

      <SectionCard
        title="Ticket tiers"
        action={
          <Link href={`/dashboard/events/${params.id}/attendees?event=${params.id}`}>
            <Button variant="secondary">View attendees</Button>
          </Link>
        }
      >
        <div className="flex flex-col gap-3">
          {tiers.map((tier: any) => (
            <div key={tier.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span className="text-[13.5px] font-medium text-[#EAF2ED]">{tier.label}</span>
                  <span className="text-[12.5px] text-[#5F736A]">{tier.price === 0 ? 'Free' : `$${tier.price}`}</span>
                </div>
                <span className="text-[12px] text-[#7C8F85]">
                  {tier.sold ?? 0}/{tier.capacity ?? '∞'} sold
                </span>
              </div>
              {tier.description && <p className="mb-2 text-[12.5px] text-[#7C8F85]">{tier.description}</p>}
              {tier.capacity ? <ProgressBar label="" value={tier.sold ?? 0} max={tier.capacity} color={tier.color ?? accent.bg} suffix=" " /> : null}
            </div>
          ))}
        </div>
      </SectionCard>

      {event.customFields?.length > 0 && (
        <SectionCard title="Custom registration fields">
          <div className="flex flex-col gap-2.5">
            {event.customFields.map((f: any) => (
              <div key={f.fieldKey} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] px-3.5 py-2.5">
                <div>
                  <p className="text-[13px] text-[#EAF2ED]">{f.label}</p>
                  {f.options && <p className="text-[11.5px] text-[#7C8F85]">{f.options.join(', ')}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Pill>{f.type}</Pill>
                  {f.isRequired && <Pill tone="gold">Required</Pill>}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
