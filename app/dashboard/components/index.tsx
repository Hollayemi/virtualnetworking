import { LucideIcon, TrendingUp } from 'lucide-react';

/**
 * components/dashboard/ui.tsx
 *
 * Shared building blocks for pages rendered inside app/dashboard/layout.tsx.
 * Pull the accent object from lib/role-context's ACCENT map so colors stay
 * in sync with the sidebar/topbar (sage for attendee, gold for organizer).
 */

type Accent = { text: string; bg: string; soft: string; ring: string };

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  accent: Accent;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0D1712] p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: accent.soft, color: accent.text }}>
          <Icon className="h-[17px] w-[17px]" />
        </span>
        {delta && (
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-[#8FB8A4]">
            <TrendingUp className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-[1.7rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        {value}
      </p>
      <p className="mt-1 text-[12.5px] text-[#7C8F85]">{label}</p>
    </div>
  );
}

export function SectionCard({
  title,
  action,
  children,
  className = '',
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-[#0D1712] p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14.5px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

const AVATAR_SIZES = { sm: 'h-8 w-8 text-[11px]', md: 'h-10 w-10 text-[12px]', lg: 'h-12 w-12 text-[13px]' };

export function Avatar({ initials, size = 'md' }: { initials: string; size?: keyof typeof AVATAR_SIZES }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-white/[0.06] font-semibold text-[#EAF2ED] ${AVATAR_SIZES[size]}`}>
      {initials}
    </span>
  );
}

const PILL_TONES = {
  sage: 'border-[#639781]/25 bg-[#639781]/[0.08] text-[#8FB8A4]',
  gold: 'border-[#D9B26B]/25 bg-[#D9B26B]/[0.08] text-[#D9B26B]',
  neutral: 'border-white/[0.08] bg-white/[0.04] text-[#92A79C]',
  danger: 'border-[#D9756B]/25 bg-[#D9756B]/[0.08] text-[#E0A093]',
};

export function Pill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: keyof typeof PILL_TONES }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${PILL_TONES[tone]}`}>
      {children}
    </span>
  );
}