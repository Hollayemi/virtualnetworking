'use client';

import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils';

export function FieldShell({
  label,
  htmlFor,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">
        {optional ? `${label} (optional)` : label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] text-[#E0A093]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-[#5F736A]">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputBaseClass =
  'w-full rounded-xl border bg-[#0D1712] px-4 py-3 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none transition-colors focus:border-[#639781]/50';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export function TextInput({ id, label, error, hint, optional, className, ...props }: TextInputProps) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        className={cn(inputBaseClass, error ? 'border-[#D9756B]/50' : 'border-white/[0.08]', className)}
        {...props}
      />
    </FieldShell>
  );
}

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export function PasswordInput({ id, label, error, hint, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint}>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={cn(inputBaseClass, 'pr-11', error ? 'border-[#D9756B]/50' : 'border-white/[0.08]', className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F736A] hover:text-[#8FB8A4]"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </FieldShell>
  );
}

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
}

export function TextArea({ id, label, optional, hint, className, rows = 3, ...props }: TextAreaProps) {
  return (
    <FieldShell label={label} htmlFor={id} optional={optional} hint={hint}>
      <textarea id={id} rows={rows} className={cn(inputBaseClass, 'resize-none border-white/[0.08]', className)} {...props} />
    </FieldShell>
  );
}
