'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Search, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard } from '@/app/dashboard/components/ui';
import {
  useDiscoverAttendeesQuery,
  useGetSuggestedAttendeesQuery,
  useConnectFromDiscoverMutation,
  useGetDiscoverFiltersQuery,
} from '@/redux/slices';
import { useGetCurrentEventQuery } from '@/redux/slices';
import { toast } from 'sonner';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tier = 'Regular' | 'Premium' | 'VIP';
type ConnectionState = 'none' | 'pending' | 'connected';

const TIER_TONE: Record<Tier, 'sage' | 'gold' | 'neutral'> = { Regular: 'neutral', Premium: 'sage', VIP: 'gold' };
const TIER_COST: Record<Tier, number> = { Regular: 0, Premium: 0, VIP: 3 };

const selectClass =
  'rounded-xl border border-white/[0.08] bg-[#0D1712] px-3.5 py-2.5 text-[13px] text-[#C7D6CE] outline-none focus:border-[#639781]/50';

function ConnectButton({ tier, state, onConnect, isLoading }: { tier: Tier; state: ConnectionState; onConnect: () => void; isLoading: boolean }) {
  const cost = TIER_COST[tier];
  if (state === 'connected') {
    return (
      <Button variant="secondary" icon={Check} disabled className="!opacity-100">
        Connected
      </Button>
    );
  }
  if (state === 'pending' || isLoading) {
    return (
      <Button variant="secondary" loading disabled>
        Sending
      </Button>
    );
  }
  return (
    <Button onClick={onConnect} accent={tier === 'VIP' ? '#D9B26B' : '#639781'} className={tier === 'VIP' ? 'text-[#0A100D]' : undefined}>
      {cost > 0 ? `Connect · ${cost} cr` : 'Connect'}
    </Button>
  );
}

function AttendeeCard({ attendee, state, onConnect, highlighted, isLoading }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-5 ${highlighted ? 'border-[#639781]/35 bg-[#639781]/[0.05]' : 'border-white/[0.07] bg-[#0D1712]'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar initials={attendee.initials} size="lg" />
          <div>
            <p className="text-[14.5px] font-medium text-[#EAF2ED]">{attendee.name}</p>
            <p className="text-[12.5px] text-[#7C8F85]">
              {attendee.role} · {attendee.company}
            </p>
          </div>
        </div>
        <Pill tone={TIER_TONE[attendee.tier as Tier]}>{attendee.tier}</Pill>
      </div>

      {attendee.matchReason && (
        <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-[#8FB8A4]">
          <Sparkles className="h-3 w-3" />
          {attendee.matchReason}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Pill>{attendee.industry}</Pill>
        {attendee.interests?.slice(0, 2).map((i: string) => (
          <Pill key={i}>{i}</Pill>
        ))}
      </div>

      <div className="mt-5">
        <ConnectButton tier={attendee.tier} state={state} onConnect={onConnect} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}

export default function DiscoverPage() {
  const { data: currentEvent } = useGetCurrentEventQuery();
  const eventId = currentEvent?.data?._id;

  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All industries');
  const [role, setRole] = useState('All roles');
  const [tier, setTier] = useState<'All tiers' | Tier>('All tiers');
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const { data: filtersData } = useGetDiscoverFiltersQuery({ eventId });
  const { data: suggestedData } = useGetSuggestedAttendeesQuery({ eventId, limit: 6 });
  const { data: attendeesData, refetch } = useDiscoverAttendeesQuery({
    search,
    industry,
    role,
    tier: tier === 'All tiers' ? 'all' : tier,
    eventId,
  });
  const [connectMutation] = useConnectFromDiscoverMutation();

  const suggested = suggestedData?.data || [];
  const attendees = attendeesData?.data?.items || [];
  const industries = filtersData?.data?.industries || ['All industries', 'Technology', 'Fintech', 'Web3 / Crypto', 'SaaS', 'Marketing', 'Healthcare'];
  const roles = filtersData?.data?.roles || ['All roles', 'Founder', 'Investor', 'Recruiter', 'Developer', 'Job Seeker', 'Sales Professional'];
  const tiers = ['All tiers', 'Regular', 'Premium', 'VIP'] as const;

  const handleConnect = async (attendeeId: string, intent: string = 'Just exploring') => {
    if (!eventId) {
      toast.error('No active event found');
      return;
    }
    setConnectingId(attendeeId);
    try {
      await connectMutation({ userId: attendeeId, eventId, intent }).unwrap();
      toast.success('Connection request sent!');
      refetch();
    } catch (error) {
      toast.error('Failed to send connection request');
    } finally {
      setConnectingId(null);
    }
  };

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Discover attendees
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Browse who's at {currentEvent?.data?.name || 'the event'} and send a structured request.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F736A]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or company"
            className="w-full rounded-xl border border-white/[0.08] bg-[#0D1712] py-3 pl-11 pr-4 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none focus:border-[#639781]/50"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#5F736A]" />
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectClass}>
            {industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={selectClass}>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={tier} onChange={(e) => setTier(e.target.value as typeof tiers[number])} className={selectClass}>
            {tiers.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {suggested.length > 0 && (
        <SectionCard title="Suggested for you" action={<Pill tone="sage"><Sparkles className="h-3 w-3" />AI matched</Pill>}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((a) => (
              <AttendeeCard
                key={a._id}
                attendee={a}
                state={a.connectionStatus || 'none'}
                onConnect={() => handleConnect(a._id, a.matchReason?.split(' ').pop() || 'Just exploring')}
                highlighted
                isLoading={connectingId === a._id}
              />
            ))}
          </div>
        </SectionCard>
      )}

      <div>
        <p className="mb-3 text-[12.5px] text-[#5F736A]">
          {attendeesData?.data?.total || 0} attendee{attendeesData?.data?.total !== 1 ? 's' : ''}
        </p>
        {attendees.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-10 text-center">
            <p className="text-[14px] text-[#92A79C]">No attendees match those filters yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attendees.map((a) => (
              <AttendeeCard
                key={a._id}
                attendee={a}
                state={a.connectionStatus || 'none'}
                onConnect={() => handleConnect(a._id)}
                isLoading={connectingId === a._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}