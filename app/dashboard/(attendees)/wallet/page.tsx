'use client';

import { useState, useEffect } from 'react';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Coins, TrendingUp, ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';
import {
  useGetWalletBalanceQuery,
  useListTransactionsQuery,
  useGetCreditPackagesQuery,
  usePurchaseCreditsMutation,
} from '@/redux/slices';
import { useGetCurrentEventQuery } from '@/redux/slices';
import { toast } from 'sonner';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tx = { id: string; text: string; date: string; delta: number; kind: 'credit' | 'debit' | 'pending' };

const KIND_STYLES: Record<Tx['kind'], { icon: typeof ArrowUpRight; tone: 'sage' | 'gold' | 'neutral' }> = {
  credit: { icon: ArrowUpRight, tone: 'sage' },
  debit: { icon: ArrowDownRight, tone: 'gold' },
  pending: { icon: TrendingUp, tone: 'neutral' },
};

export default function WalletPage() {
  const { data: currentEvent } = useGetCurrentEventQuery();
  const eventId = currentEvent?.data?._id;

  const { data: balanceData, refetch: refetchBalance } = useGetWalletBalanceQuery({ eventId });
  const { data: transactionsData } = useListTransactionsQuery({ eventId, page: 1, pageSize: 10 });
  const { data: packagesData } = useGetCreditPackagesQuery({ eventId });
  const [purchaseCredits, { isLoading: isPurchasing }] = usePurchaseCreditsMutation();

  const [buying, setBuying] = useState<string | null>(null);

  const balance = balanceData?.data?.balance || 0;
  const transactions = transactionsData?.data?.items || [];
  const packages = packagesData?.data || [];
  const stats = balanceData?.data;

  const handleBuy = async (pkg: { id: string; name: string; credits: number }) => {
    setBuying(pkg.id);
    try {
      await purchaseCredits({ packageId: pkg.id, eventId }).unwrap();
      toast.success(`Purchased ${pkg.credits} credits!`);
      refetchBalance();
    } catch (error) {
      toast.error('Failed to purchase credits');
    } finally {
      setBuying(null);
    }
  };

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Wallet
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Credits move every time a connection or meeting does.</p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#639781]/[0.1] to-transparent p-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#639781]/15 text-[#8FB8A4]">
            <Coins className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[2.2rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {balance} credits
            </p>
            <p className="text-[12.5px] text-[#7C8F85]">
              {stats?.earnedThisMonth || 0} cr earned in cashback this month
            </p>
          </div>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={() => handleBuy(packages.find((p) => p.highlighted) || packages[0])} disabled={isPurchasing}>
          Buy credits
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ArrowUpRight} label="Earned via cashback" value={`${stats?.earnedThisMonth || 0} cr`} accent={ACCENT.attendee} />
        <StatCard icon={ArrowDownRight} label="Spent this month" value={`${stats?.spentThisMonth || 0} cr`} accent={ACCENT.attendee} />
        <StatCard icon={TrendingUp} label="Pending cashback" value={`${stats?.pendingCashback || 0} cr`} accent={ACCENT.attendee} />
        <StatCard icon={Sparkles} label="Lifetime credits" value={`${stats?.lifetimeCredits || 0} cr`} accent={ACCENT.attendee} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="Recent activity">
          <div className="flex flex-col gap-2.5">
            {transactions.length === 0 ? (
              <p className="py-4 text-center text-[#5F736A]">No transactions yet</p>
            ) : (
              transactions.map((tx) => {
                const style = KIND_STYLES[tx.kind as Tx['kind']] || KIND_STYLES.credit;
                const Icon = style.icon;
                const delta = tx.amount;
                return (
                  <div key={tx._id} className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <Icon className="h-3.5 w-3.5 text-[#92A79C]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-[#C7D6CE]">{tx.description}</p>
                      <p className="text-[11px] text-[#5F736A]">{new Date(tx.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Pill tone={style.tone}>{tx.kind === 'pending' ? 'Pending' : `${delta > 0 ? '+' : ''}${delta} cr`}</Pill>
                  </div>
                );
              })
            )}
          </div>
        </SectionCard>

        <SectionCard title="Credit packages">
          <div className="flex flex-col gap-3">
            {packages.length === 0 ? (
              <p className="py-4 text-center text-[#5F736A]">No packages available</p>
            ) : (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 ${
                    pkg.highlighted ? 'border-[#639781]/40 bg-[#639781]/[0.06]' : 'border-white/[0.06] bg-white/[0.02]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[13.5px] font-medium text-[#EAF2ED]">{pkg.name}</p>
                      {pkg.highlighted && <Pill tone="sage">Popular</Pill>}
                    </div>
                    <p className="mt-0.5 text-[12px] text-[#7C8F85]">{pkg.credits} credits · {pkg.note}</p>
                  </div>
                  <Button
                    variant={pkg.highlighted ? 'primary' : 'secondary'}
                    loading={buying === pkg.id}
                    onClick={() => handleBuy(pkg)}
                    disabled={isPurchasing}
                  >
                    ${pkg.price}
                  </Button>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}