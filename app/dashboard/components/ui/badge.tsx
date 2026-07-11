import { cn } from '@/utils';

const TONES = {
  sage: 'border-[#639781]/25 bg-[#639781]/[0.08] text-[#8FB8A4]',
  gold: 'border-[#D9B26B]/25 bg-[#D9B26B]/[0.08] text-[#D9B26B]',
  neutral: 'border-white/[0.08] bg-white/[0.04] text-[#92A79C]',
  danger: 'border-[#D9756B]/25 bg-[#D9756B]/[0.08] text-[#E0A093]',
};

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium', TONES[tone], className)}>
      {children}
    </span>
  );
}
