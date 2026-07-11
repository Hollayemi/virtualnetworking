'use client';

import { cn } from '@/utils';

export function Switch({
  checked,
  onChange,
  accent = '#639781',
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  accent?: string;
  label?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{ backgroundColor: checked ? accent : 'rgba(255,255,255,0.12)' }}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}
