'use client';

import { useState } from 'react';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { DollarSign, Coins, ShieldCheck, Megaphone, Landmark, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { ProgressBar } from '@/app/dashboard/components/charts';
import { LoadingState, ErrorState, EmptyState } from '@/app/dashboard/components/state';
import { useGetRevenueSummaryQuery, useListTransactionsQuery, useRequestPayoutMutation } from '@/redux/slices/organiser/payments.slice';
import { ACCENT } from '@/lib/role-context';
import { formatCurrency, formatDate } from '@/utils';

/**
 * app/dashboard/payments/page.tsx
 * Backed by useGetRevenueSummaryQuery + useListTransactionsQuery.
 * "Request payout" uses useRequestPayoutMutation directly.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const STREAM_LABEL_ICON: Record<string, typeof Coins> = {
  'Credit purchases': Coins,
  'VIP passes': ShieldCheck,
  'Sponsor revenue': Megaphone,
};

export default function PaymentsPage() {
  const accent = ACCENT.organizer;

  const { data: summaryData, isLoading: summaryLoading, isError: summaryError } = useGetRevenueSummaryQuery();
  const summary = summaryData?.data;

  const { data: txData, isLoading: txLoading, isError: txError } = useListTransactionsQuery({});
  const transactions = txData?.data?.data ?? [];

  const [requestPayout, { isLoading: requesting }] = useRequestPayoutMutation();
  const [payoutError, setPayoutError] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  const handlePayout = async () => {
    try {
      await requestPayout().unwrap();
      setPayoutRequested(true);
      setPayoutError(false);
    } catch {
      setPayoutError(true);
    }
  };

  const maxStream = summary?.streams?.length ? Math.max(...summary.streams.map((r) => r.amount)) : 1;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Payments
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Every revenue stream your events generate, in one place.</p>
      </div>

      {summaryLoading && <LoadingState label="Loading revenue…" />}
      {summaryError && <ErrorState label="Couldn't load your revenue summary." />}

      {!summaryLoading && !summaryError && summary && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={DollarSign} label="Total revenue" value={formatCurrency(summary.totalRevenue)} accent={accent} />
            {summary.streams.slice(0, 3).map((r) => {
              const Icon = STREAM_LABEL_ICON[r.label] ?? Coins;
              return <StatCard key={r.label} icon={Icon} label={r.label} value={formatCurrency(r.amount)} accent={accent} />;
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <SectionCard title="Revenue by stream">
              <div className="flex flex-col gap-4">
                {summary.streams.map((r) => (
                  <ProgressBar key={r.label} label={r.label} value={r.amount} max={maxStream} color={r.color ?? accent.bg} suffix={formatCurrency(r.amount)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Payout"
              action={
                <Button variant="secondary" icon={ArrowUpRight} loading={requesting} onClick={handlePayout}>
                  Request payout
                </Button>
              }
            >
              {payoutError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#D9756B]/25 bg-[#D9756B]/[0.06] px-4 py-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#E0A093]" />
                  <p className="text-[13px] text-[#E0A093]">Couldn't request a payout. Try again.</p>
                </div>
              )}
              {payoutRequested && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#639781]/25 bg-[#639781]/[0.06] px-4 py-3">
                  <p className="text-[13px] text-[#8FB8A4]">Payout requested — it's on its way.</p>
                </div>
              )}
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D9B26B]/10 text-[#D9B26B]">
                  <Landmark className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-[13.5px] font-medium text-[#EAF2ED]">
                    Next payout: {formatDate(summary.nextPayoutDate, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  {summary.payoutAccountMask && <p className="text-[12px] text-[#7C8F85]">····{summary.payoutAccountMask}</p>}
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[1.6rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {formatCurrency(summary.availableBalance)}
                </p>
                <p className="text-[12px] text-[#7C8F85]">Available balance after Mesh platform fee</p>
              </div>
            </SectionCard>
          </div>
        </>
      )}

      <SectionCard title="Transaction history">
        {txLoading && <LoadingState label="Loading transactions…" />}
        {txError && <ErrorState label="Couldn't load transactions." />}
        {!txLoading && !txError && (
          transactions.length === 0 ? (
            <EmptyState label="No transactions yet." />
          ) : (
            <div className="flex flex-col gap-2.5">
              {transactions.map((tx: any) => (
                <div key={tx.id} className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3.5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] text-[#C7D6CE]">{tx.description}</p>
                    <p className="text-[11px] text-[#5F736A]">
                      {formatDate(tx.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className="text-[13px] font-medium text-[#EAF2ED]">{formatCurrency(tx.amount)}</span>
                  <Pill tone={tx.status === 'Paid' ? 'sage' : tx.status === 'Pending' ? 'gold' : 'danger'}>{tx.status}</Pill>
                </div>
              ))}
            </div>
          )
        )}
      </SectionCard>
    </div>
  );
}
