'use client';

import { useState } from 'react';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Coins, TrendingUp, ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { SectionCard, StatCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';

/**
 * app/dashboard/wallet/page.tsx
 * Credit balance, transaction history, and credit packages. The "Buy
 * credits" flow here is a UI simulation — wire handleBuy up to your real
 * payment integration.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Tx = { id: string; text: string; date: string; delta: number; kind: 'credit' | 'debit' | 'pending' };

const TRANSACTIONS: Tx[] = [
  { id: 't1', text: 'Cashback from Ada Whitfield', date: 'Today · 3:12 PM', delta: 1, kind: 'credit' },
  { id: 't2', text: 'Connection request to Kenji Sato (VIP)', date: 'Today · 11:02 AM', delta: -3, kind: 'debit' },
  { id: 't3', text: 'Meeting booked with Sana Malik', date: 'Yesterday · 4:45 PM', delta: 0, kind: 'pending' },
  { id: 't4', text: 'Cashback from Leo Fontaine', date: 'Jun 28 · 9:20 AM', delta: 1, kind: 'credit' },
  { id: 't5', text: 'Priority message unlocked', date: 'Jun 26 · 2:00 PM', delta: -2, kind: 'debit' },
  { id: 't6', text: 'Purchased credit pack — Growth', date: 'Jun 20 · 10:15 AM', delta: 50, kind: 'credit' },
];

const PACKAGES = [
  { name: 'Starter', credits: 20, price: '$9', note: 'Good for a single event' },
  { name: 'Growth', credits: 50, price: '$19', note: 'Most attendees pick this', highlighted: true },
  { name: 'Bulk', credits: 150, price: '$49', note: 'Best value per credit' },
];

const KIND_STYLES: Record<Tx['kind'], { icon: typeof ArrowUpRight; tone: 'sage' | 'gold' | 'neutral' }> = {
  credit: { icon: ArrowUpRight, tone: 'sage' },
  debit: { icon: ArrowDownRight, tone: 'gold' },
  pending: { icon: TrendingUp, tone: 'neutral' },
};

export default function WalletPage() {
  const accent = ACCENT.attendee;
  const [buying, setBuying] = useState<string | null>(null);
  const [balance, setBalance] = useState(42);

  const handleBuy = (pkg: typeof PACKAGES[number]) => {
    setBuying(pkg.name);
    setTimeout(() => {
      setBalance((b) => b + pkg.credits);
      setBuying(null);
    }, 1000);
  };

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Wallet
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Credits move every time a connection or meeting does.</p>
      </div>

      {/* Balance hero */}
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#639781]/[0.1] to-transparent p-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#639781]/15 text-[#8FB8A4]">
            <Coins className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[2.2rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {balance} credits
            </p>
            <p className="text-[12.5px] text-[#7C8F85]">7 cr earned in cashback this month</p>
          </div>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={() => handleBuy(PACKAGES[1])}>
          Buy credits
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ArrowUpRight} label="Earned via cashback" value="18 cr" accent={accent} />
        <StatCard icon={ArrowDownRight} label="Spent this month" value="11 cr" accent={accent} />
        <StatCard icon={TrendingUp} label="Pending cashback" value="1 cr" accent={accent} />
        <StatCard icon={Sparkles} label="Lifetime credits" value="212 cr" accent={accent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="Recent activity">
          <div className="flex flex-col gap-2.5">
            {TRANSACTIONS.map((tx) => {
              const style = KIND_STYLES[tx.kind];
              const Icon = style.icon;
              return (
                <div key={tx.id} className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Icon className="h-3.5 w-3.5 text-[#92A79C]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] text-[#C7D6CE]">{tx.text}</p>
                    <p className="text-[11px] text-[#5F736A]">{tx.date}</p>
                  </div>
                  <Pill tone={style.tone}>{tx.kind === 'pending' ? 'Pending' : `${tx.delta > 0 ? '+' : ''}${tx.delta} cr`}</Pill>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Credit packages">
          <div className="flex flex-col gap-3">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
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
                  loading={buying === pkg.name}
                  onClick={() => handleBuy(pkg)}
                >
                  {pkg.price}
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
