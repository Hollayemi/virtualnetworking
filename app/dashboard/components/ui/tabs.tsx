'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils';

export type SegmentedOption<T extends string> = { value: T; label: string; icon?: LucideIcon };

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  accent = '#639781',
  className,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  accent?: string;
  className?: string;
}) {
  const index = Math.max(options.findIndex((o) => o.value === value), 0);
  const widthPct = 100 / options.length;

  return (
    <div
      className={cn('relative grid rounded-xl border border-white/[0.08] bg-[#0D1712] p-1', className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute inset-y-1 rounded-lg"
        style={{
          backgroundColor: accent,
          width: `calc(${widthPct}% - 4px)`,
          left: `calc(${index * widthPct}% + 4px)`,
        }}
      />
      {options.map((opt) => {
        const active = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[12.5px] font-semibold transition-colors',
              active ? 'text-[#0A100D]' : 'text-[#92A79C] hover:text-[#EAF2ED]'
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
