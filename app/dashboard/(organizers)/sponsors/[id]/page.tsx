'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft, Mail, Users, TrendingUp, Megaphone } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { ProgressBar } from '@/app/dashboard/components/charts';
import { LoadingState, ErrorState } from '@/app/dashboard/components/state';
import { useGetSponsorDetailQuery } from '@/redux/slices/organiser/sponsors.slice';
import { ACCENT } from '@/lib/role-context';
import { getInitials } from '@/utils';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TIER_TONE: Record<string, 'gold' | 'sage' | 'neutral'> = { Platinum: 'gold', Gold: 'sage', Silver: 'neutral' };

export default function SponsorDetailPage() {
  const params = useParams<{ id: string }>();
  const accent = ACCENT.organizer;

  const { data, isLoading, isError } = useGetSponsorDetailQuery(params.id);
  const sponsor = data?.data as any;

  if (isLoading) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <LoadingState label="Loading sponsor…" />
      </div>
    );
  }

  if (isError || !sponsor) {
    return (
      <div className={`${display.variable} ${body.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <Link href="/dashboard/sponsors" className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Sponsors
        </Link>
        <ErrorState label="This sponsor doesn't exist, or isn't part of your events." />
      </div>
    );
  }

  const leads = sponsor.leadsDelivered ?? 0;
  const visits = sponsor.boothVisits ?? 0;
  const conversionRate = visits ? Math.round((leads / visits) * 100) : 0;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <Link href="/dashboard/sponsors" className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Sponsors
        </Link>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#0D1712] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={getInitials(sponsor.name ?? '')} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[1.4rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {sponsor.name}
                </h2>
                <Pill tone={TIER_TONE[sponsor.tier] ?? 'neutral'}>{sponsor.tier}</Pill>
                <Pill tone={sponsor.status === 'Active' ? 'sage' : 'neutral'}>{sponsor.status}</Pill>
              </div>
              <p className="mt-1 text-[13px] text-[#92A79C]">{sponsor.eventName}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#5F736A]">
                <Mail className="h-3.5 w-3.5" />
                {sponsor.contactEmail}
              </p>
            </div>
          </div>
          <Button variant="secondary">Edit sponsor</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Leads delivered" value={String(leads)} accent={accent} />
        <StatCard icon={TrendingUp} label="Booth visits" value={String(visits)} accent={accent} />
        <StatCard icon={Megaphone} label="Conversion rate" value={`${conversionRate}%`} accent={accent} />
        <StatCard icon={Megaphone} label="Tier" value={sponsor.tier} accent={accent} />
      </div>

      <SectionCard title="Lead pipeline">
        <div className="flex flex-col gap-4">
          <ProgressBar label="Booth visits → leads" value={leads} max={visits || 1} color={accent.bg} />
          <p className="text-[12.5px] text-[#7C8F85]">
            {leads} of {visits} booth visitors converted into a qualified lead this event.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
