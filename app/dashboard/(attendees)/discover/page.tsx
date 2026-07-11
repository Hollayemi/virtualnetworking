'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Search, Sparkles, Check, SlidersHorizontal } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard } from '@/app/dashboard/components/ui';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tier = 'Regular' | 'Premium' | 'VIP';
type ConnectionState = 'none' | 'pending' | 'connected';

type Attendee = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  industry: string;
  tier: Tier;
  interests: string[];
  matchReason?: string;
};

const ATTENDEES: Attendee[] = [
  { id: '1', name: 'Priya Menon', initials: 'PM', role: 'Investor', company: 'Northbridge Capital', industry: 'Fintech', tier: 'VIP', interests: ['Fundraising', 'Investing'], matchReason: 'Shares your interest in Fundraising' },
  { id: '2', name: 'Diego Alvarez', initials: 'DA', role: 'Founder', company: 'Loopwork', industry: 'SaaS', tier: 'Premium', interests: ['Partnerships', 'Product'], matchReason: 'Also tagged Partnership as a goal' },
  { id: '3', name: 'Kenji Sato', initials: 'KS', role: 'Recruiter', company: 'Sato & Partners', industry: 'Web3 / Crypto', tier: 'VIP', interests: ['Hiring', 'Community Building'] },
  { id: '4', name: 'Ada Whitfield', initials: 'AW', role: 'Developer', company: 'Fieldstone', industry: 'Technology', tier: 'Regular', interests: ['Open Source', 'AI & Machine Learning'] },
  { id: '5', name: 'Leo Fontaine', initials: 'LF', role: 'Sales Professional', company: 'Vantage', industry: 'Marketing', tier: 'Premium', interests: ['Sales', 'Growth Marketing'] },
  { id: '6', name: 'Sana Malik', initials: 'SM', role: 'Founder', company: 'Cursive', industry: 'Fintech', tier: 'VIP', interests: ['Fundraising', 'Design'] },
  { id: '7', name: 'Ravi Patel', initials: 'RP', role: 'Job Seeker', company: '—', industry: 'Technology', tier: 'Regular', interests: ['Career Growth', 'Hiring'] },
  { id: '8', name: 'Nia Okonjo', initials: 'NO', role: 'Investor', company: 'Delta Ventures', industry: 'Healthcare', tier: 'Premium', interests: ['Investing', 'Mentorship'] },
  { id: '9', name: 'Tomas Berg', initials: 'TB', role: 'Developer', company: 'Solstice Labs', industry: 'Web3 / Crypto', tier: 'Regular', interests: ['Open Source', 'Web3'] },
];

const INDUSTRIES = ['All industries', 'Fintech', 'Technology', 'Web3 / Crypto', 'SaaS', 'Marketing', 'Healthcare'];
const ROLES = ['All roles', 'Founder', 'Investor', 'Recruiter', 'Developer', 'Job Seeker', 'Sales Professional'];
const TIERS: Array<'All tiers' | Tier> = ['All tiers', 'Regular', 'Premium', 'VIP'];

const TIER_TONE: Record<Tier, 'sage' | 'gold' | 'neutral'> = { Regular: 'neutral', Premium: 'sage', VIP: 'gold' };
const TIER_COST: Record<Tier, number> = { Regular: 0, Premium: 0, VIP: 3 };

const selectClass =
  'rounded-xl border border-white/[0.08] bg-[#0D1712] px-3.5 py-2.5 text-[13px] text-[#C7D6CE] outline-none focus:border-[#639781]/50';

function ConnectButton({ tier, state, onConnect }: { tier: Tier; state: ConnectionState; onConnect: () => void }) {
  const cost = TIER_COST[tier];
  if (state === 'connected') {
    return (
      <Button variant="secondary" icon={Check} disabled className="!opacity-100">
        Connected
      </Button>
    );
  }
  if (state === 'pending') {
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

function AttendeeCard({ attendee, state, onConnect, highlighted }: { attendee: Attendee; state: ConnectionState; onConnect: () => void; highlighted?: boolean }) {
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
        <Pill tone={TIER_TONE[attendee.tier]}>{attendee.tier}</Pill>
      </div>

      {attendee.matchReason && (
        <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-[#8FB8A4]">
          <Sparkles className="h-3 w-3" />
          {attendee.matchReason}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Pill>{attendee.industry}</Pill>
        {attendee.interests.slice(0, 2).map((i) => (
          <Pill key={i}>{i}</Pill>
        ))}
      </div>

      <div className="mt-5">
        <ConnectButton tier={attendee.tier} state={state} onConnect={onConnect} />
      </div>
    </motion.div>
  );
}

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [role, setRole] = useState(ROLES[0]);
  const [tier, setTier] = useState<typeof TIERS[number]>(TIERS[0]);
  const [connections, setConnections] = useState<Record<string, ConnectionState>>({});

  const handleConnect = (id: string) => {
    setConnections((c) => ({ ...c, [id]: 'pending' }));
    setTimeout(() => {
      setConnections((c) => ({ ...c, [id]: 'connected' }));
    }, 1100);
  };

  const suggested = useMemo(() => ATTENDEES.filter((a) => a.matchReason), []);

  const filtered = useMemo(() => {
    return ATTENDEES.filter((a) => {
      const matchesSearch =
        !search.trim() ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry = industry === 'All industries' || a.industry === industry;
      const matchesRole = role === 'All roles' || a.role === role;
      const matchesTier = tier === 'All tiers' || a.tier === tier;
      return matchesSearch && matchesIndustry && matchesRole && matchesTier;
    });
  }, [search, industry, role, tier]);

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Discover attendees
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Browse who's at Fintech Summit 2026 and send a structured request.</p>
      </div>

      {/* Search + filters */}
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
            {INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={selectClass}>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={tier} onChange={(e) => setTier(e.target.value as typeof TIERS[number])} className={selectClass}>
            {TIERS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* AI suggested */}
      {suggested.length > 0 && (
        <SectionCard title="Suggested for you" action={<Pill tone="sage"><Sparkles className="h-3 w-3" />AI matched</Pill>}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((a) => (
              <AttendeeCard
                key={a.id}
                attendee={a}
                state={connections[a.id] ?? 'none'}
                onConnect={() => handleConnect(a.id)}
                highlighted
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Directory */}
      <div>
        <p className="mb-3 text-[12.5px] text-[#5F736A]">
          {filtered.length} attendee{filtered.length === 1 ? '' : 's'}
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-10 text-center">
            <p className="text-[14px] text-[#92A79C]">No attendees match those filters yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AttendeeCard key={a.id} attendee={a} state={connections[a.id] ?? 'none'} onConnect={() => handleConnect(a.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
