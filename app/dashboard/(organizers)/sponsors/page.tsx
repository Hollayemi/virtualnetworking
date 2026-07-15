'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Plus, Megaphone, Users, TrendingUp, ChevronRight, AlertTriangle } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { TextInput } from '@/app/dashboard/components/ui/input';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { LoadingState, ErrorState, EmptyState } from '@/app/dashboard/components/state';
import { useListSponsorsQuery, useInviteSponsorMutation } from '@/redux/slices/organiser/sponsors.slice';
import { ACCENT } from '@/lib/role-context';
import { getInitials } from '@/utils';

/**
 * app/dashboard/sponsors/page.tsx
 * Backed by useListSponsorsQuery. "Invite sponsor" uses
 * useInviteSponsorMutation and relies on the mutation's invalidatesTags to
 * refresh the list — no local mock state.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TIER_TONE: Record<string, 'gold' | 'sage' | 'neutral'> = { Platinum: 'gold', Gold: 'sage', Silver: 'neutral' };

export default function SponsorsPage() {
  const accent = ACCENT.organizer;
  const { data, isLoading, isError } = useListSponsorsQuery();
  const sponsors = data?.data?.data ?? [];

  const [inviteSponsor, { isLoading: inviting }] = useInviteSponsorMutation();
  const [showInvite, setShowInvite] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteError, setInviteError] = useState(false);

  const totalLeads = sponsors.reduce((sum: number, s: any) => sum + (s.leadsDelivered ?? 0), 0);
  const activeCount = sponsors.filter((s: any) => s.status === 'Active').length;
  const avgBoothVisits = sponsors.length ? Math.round(sponsors.reduce((s: number, x: any) => s + (x.boothVisits ?? 0), 0) / sponsors.length) : 0;

  const handleInvite = async () => {
    if (!name.trim() || !email.trim()) return;
    try {
      // NOTE: eventId is required by InviteSponsorInput — wire this up to
      // whichever event is currently selected in your app's context.
      await inviteSponsor({ name, email, eventId: '' }).unwrap();
      setName('');
      setEmail('');
      setShowInvite(false);
      setInviteError(false);
    } catch {
      setInviteError(true);
    }
  };

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Sponsors
          </h2>
          <p className="mt-1 text-[13.5px] text-[#92A79C]">Priority visibility, qualified leads, and booth performance.</p>
        </div>
        <Button icon={Plus} accent={accent.bg} className="text-[#0A100D]" onClick={() => setShowInvite((v) => !v)}>
          Invite sponsor
        </Button>
      </div>

      <AnimatePresence>
        {showInvite && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <SectionCard title="Invite a sponsor">
              {inviteError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#D9756B]/25 bg-[#D9756B]/[0.06] px-4 py-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#E0A093]" />
                  <p className="text-[13px] text-[#E0A093]">Couldn't send the invite. Try again.</p>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput id="sponsor-name" label="Company name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Capital" />
                <TextInput id="sponsor-email" label="Contact email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="partnerships@acme.com" />
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" onClick={() => setShowInvite(false)}>
                  Cancel
                </Button>
                <Button accent={accent.bg} className="text-[#0A100D]" loading={inviting} onClick={handleInvite}>
                  Send invite
                </Button>
              </div>
            </SectionCard>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && <LoadingState label="Loading sponsors…" />}
      {isError && <ErrorState label="Couldn't load sponsors." />}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Megaphone} label="Active sponsors" value={String(activeCount)} accent={accent} />
            <StatCard icon={Users} label="Leads delivered" value={String(totalLeads)} accent={accent} />
            <StatCard icon={TrendingUp} label="Avg. booth visits" value={String(avgBoothVisits)} accent={accent} />
            <StatCard icon={Megaphone} label="Total sponsors" value={String(sponsors.length)} accent={accent} />
          </div>

          {sponsors.length === 0 ? (
            <EmptyState label="No sponsors yet — invite your first one above." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sponsors.map((s: any) => (
                <Link
                  key={s.id}
                  href={`/dashboard/sponsors/${s.id}`}
                  className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-5 transition-colors hover:border-white/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar initials={getInitials(s.name ?? '')} />
                      <div>
                        <p className="text-[13.5px] font-medium text-[#EAF2ED]">{s.name}</p>
                        <p className="text-[12px] text-[#7C8F85]">{s.eventName}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#5F736A]" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Pill tone={TIER_TONE[s.tier] ?? 'neutral'}>{s.tier}</Pill>
                    <Pill tone={s.status === 'Active' ? 'sage' : 'neutral'}>{s.status}</Pill>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[1.1rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {s.leadsDelivered ?? 0}
                      </p>
                      <p className="text-[11px] text-[#7C8F85]">Leads delivered</p>
                    </div>
                    <div>
                      <p className="text-[1.1rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {s.boothVisits ?? 0}
                      </p>
                      <p className="text-[11px] text-[#7C8F85]">Booth visits</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
