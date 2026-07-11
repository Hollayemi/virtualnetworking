'use client';

import { ButtonHTMLAttributes } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';
import { cn } from '@/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'text-[#0A100D]',
  secondary: 'border border-white/10 bg-transparent text-[#EAF2ED] hover:border-white/25',
  ghost: 'bg-transparent text-[#92A79C] hover:text-[#EAF2ED]',
  danger: 'border border-[#D9756B]/30 bg-transparent text-[#E0A093] hover:bg-[#D9756B]/10',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Hex accent used for the primary variant's background/glow — defaults to sage, pass gold for organizer contexts. */
  accent?: string;
  loading?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  accent = '#639781',
  loading,
  icon: Icon,
  children,
  className,
  disabled,
  fullWidth,
  style,
  ...props
}: ButtonProps) {
  const mergedStyle = variant === 'primary' ? { backgroundColor: accent, ...style } : style;
  return (
    <button
      disabled={disabled || loading}
      style={mergedStyle}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100',
        fullWidth && 'w-full',
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  active?: boolean;
}

export function IconButton({ icon: Icon, active, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'grid h-9 w-9 place-items-center rounded-lg border transition-colors',
        active ? 'border-[#639781]/40 bg-[#639781]/10 text-[#8FB8A4]' : 'border-white/[0.08] text-[#92A79C] hover:text-[#EAF2ED]',
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
