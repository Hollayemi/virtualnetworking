'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, X } from 'lucide-react';
import { cn } from '@/utils';
import { FieldShell, inputBaseClass } from './input';

export function ChipSingleSelect({
  label,
  options,
  value,
  onChange,
  optional,
  accent = '#639781',
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
  accent?: string;
}) {
  return (
    <div>
      <span className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">
        {optional ? `${label} (optional)` : label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? '' : opt)}
              style={selected ? { borderColor: accent, backgroundColor: `${accent}26`, color: accent } : undefined}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors',
                !selected && 'border-white/[0.1] text-[#92A79C] hover:border-white/25 hover:text-[#EAF2ED]'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ChipMultiSelect({
  label,
  options,
  values,
  onChange,
  optional,
  max,
  accent = '#639781',
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
  optional?: boolean;
  max?: number;
  accent?: string;
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
    } else {
      if (max && values.length >= max) return;
      onChange([...values, opt]);
    }
  };
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-[#C7D6CE]">{optional ? `${label} (optional)` : label}</span>
        {max ? (
          <span className="text-[11px] text-[#5F736A]">
            {values.length}/{max}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              style={selected ? { borderColor: accent, backgroundColor: `${accent}26`, color: accent } : undefined}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors',
                !selected && 'border-white/[0.1] text-[#92A79C] hover:border-white/25 hover:text-[#EAF2ED]'
              )}
            >
              {selected && <Check className="h-3 w-3" />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SuggestCombobox({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  optional,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(value.toLowerCase())).slice(0, 6),
    [options, value]
  );

  return (
    <FieldShell label={label} htmlFor={id} optional={optional}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F736A]" />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F736A] hover:text-[#8FB8A4]"
            aria-label="Clear"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={placeholder}
          className={cn(inputBaseClass, 'border-white/[0.08] pl-11', value ? 'pr-10' : '')}
        />
        <AnimatePresence>
          {open && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#101B16] shadow-xl shadow-black/40"
            >
              {filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-[13.5px] text-[#C7D6CE] hover:bg-[#639781]/10 hover:text-[#EAF2ED]"
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FieldShell>
  );
}
