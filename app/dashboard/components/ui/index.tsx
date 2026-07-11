import { LucideIcon, TrendingUp } from 'lucide-react';

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
