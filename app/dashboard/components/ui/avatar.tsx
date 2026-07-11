import { cn } from '@/utils';

const SIZES = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-[12px]',
  lg: 'h-12 w-12 text-[13px]',
  xl: 'h-16 w-16 text-[16px]',
};

export function Avatar({
  initials,
  size = 'md',
  className,
}: {
  initials: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-white/[0.06] font-semibold text-[#EAF2ED]',
        SIZES[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
