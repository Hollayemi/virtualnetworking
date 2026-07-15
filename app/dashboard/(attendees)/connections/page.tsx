'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Share2, Clock, Inbox, MessageSquare, CalendarClock, Check, X, Sparkles } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SegmentedTabs } from '@/app/dashboard/components/ui/tabs';
import { StatCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';
import {
  useListConnectionsQuery,
  useGetConnectionsStatsQuery,
  useGetPendingCountQuery,
  useAcceptConnectionMutation,
  useDeclineConnectionMutation,
  useCancelConnectionRequestMutation,
} from '@/redux/slices';
import { useGetCurrentEventQuery } from '@/redux/slices';
import { toast } from 'sonner';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tab = 'connections' | 'received' | 'sent';

function PersonRow({ person, children }: { person: any; children: React.ReactNode }) {
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
        <Avatar initials={person.from?.initials || person.to?.initials || '??'} />
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">
            {person.from?._id === 'me' ? person.to?.name : person.from?.name}
          </p>
          <p className="truncate text-[12px] text-[#7C8F85]">
            {person.from?._id === 'me' ? person.to?.role : person.from?.role} · {person.event?.name}
          </p>
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
  const { data: currentEvent } = useGetCurrentEventQuery();
  const eventId = currentEvent?.data?._id;

  // Queries
  const { data: connectionsData, refetch: refetchConnections } = useListConnectionsQuery({
    tab: 'connections',
    eventId,
  });
  const { data: receivedData, refetch: refetchReceived } = useListConnectionsQuery({
    tab: 'received',
    eventId,
  });
  const { data: sentData, refetch: refetchSent } = useListConnectionsQuery({
    tab: 'sent',
    eventId,
  });
  const { data: statsData } = useGetConnectionsStatsQuery({ eventId });
  const { data: pendingCountData } = useGetPendingCountQuery({ eventId });

  // Mutations
  const [acceptConnection, { isLoading: isAccepting }] = useAcceptConnectionMutation();
  const [declineConnection, { isLoading: isDeclining }] = useDeclineConnectionMutation();
  const [cancelRequest, { isLoading: isCancelling }] = useCancelConnectionRequestMutation();

  const connections = connectionsData?.data?.items || [];
  const received = receivedData?.data?.items || [];
  const sent = sentData?.data?.items || [];
  const stats = statsData?.data;
  const pendingCount = pendingCountData?.data?.count || 0;

  const accept = async (person: any) => {
    try {
      await acceptConnection(person._id).unwrap();
      toast.success('Connection accepted!');
      refetchConnections();
      refetchReceived();
    } catch (error) {
      toast.error('Failed to accept connection');
    }
  };

  const decline = async (id: string) => {
    try {
      await declineConnection(id).unwrap();
      toast.info('Connection declined');
      refetchReceived();
    } catch (error) {
      toast.error('Failed to decline connection');
    }
  };

  const cancelSent = async (id: string) => {
    try {
      await cancelRequest(id).unwrap();
      toast.info('Request cancelled');
      refetchSent();
    } catch (error) {
      toast.error('Failed to cancel request');
    }
  };

  const acceptanceRate = stats?.acceptanceRate || 0;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Connections
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Everything moving through your request pipeline, in one place.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Share2} label="Total connections" value={String(stats?.total || 0)} accent={ACCENT.attendee} />
        <StatCard icon={Clock} label="Requests sent" value={String(stats?.sent || 0)} accent={ACCENT.attendee} />
        <StatCard icon={Inbox} label="Awaiting your reply" value={String(pendingCount)} accent={ACCENT.attendee} />
        <StatCard icon={Check} label="Acceptance rate" value={`${acceptanceRate}%`} accent={ACCENT.attendee} />
      </div>

      <SegmentedTabs
        className="max-w-md"
        value={tab}
        onChange={setTab}
        accent={ACCENT.attendee.bg}
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
                <PersonRow key={p._id} person={p}>
                  <span className="hidden text-[11.5px] text-[#5F736A] sm:inline">
                    Connected {p.connectedAt ? new Date(p.connectedAt).toLocaleDateString() : ''}
                  </span>
                  <Button variant="secondary" icon={MessageSquare}>
                    Message
                  </Button>
                  <Button icon={CalendarClock} accent={ACCENT.attendee.bg}>
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
                <PersonRow key={p._id} person={p}>
                  {p.viaCredits && (
                    <Pill tone="gold">
                      <Sparkles className="h-3 w-3" />
                      +1 cr on accept
                    </Pill>
                  )}
                  <Button variant="secondary" icon={X} onClick={() => decline(p._id)} disabled={isDeclining}>
                    Decline
                  </Button>
                  <Button icon={Check} accent={ACCENT.attendee.bg} onClick={() => accept(p)} disabled={isAccepting}>
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
                <PersonRow key={p._id} person={p}>
                  <Pill>Pending</Pill>
                  <Button variant="danger" onClick={() => cancelSent(p._id)} disabled={isCancelling}>
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