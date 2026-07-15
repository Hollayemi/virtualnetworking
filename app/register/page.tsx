'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import {
  User,
  Building2,
  Check,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Loader2,
  PartyPopper,
  Search,
  X,
  LucideIcon,
} from 'lucide-react';
import { useRegisterUserMutation } from '@/redux/authService/authSlice';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type AccountType = 'attendee' | 'organiser';

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  role?: string;
  company?: string;
  industry?: string;
  interests?: string[];
  networkingGoals?: string;
}

interface RegisterOrganiserInput {
  name: string;
  email: string;
  password: string;
  organisationName: string;
  organisationDescription?: string;
  website?: string;
  phone?: string;
}

type FormState = {
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  role: string;
  company: string;
  industry: string;
  interests: string[];
  networkingGoals: string;
  organisationName: string;
  organisationDescription: string;
  website: string;
};

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  bio: '',
  role: '',
  company: '',
  industry: '',
  interests: [],
  networkingGoals: '',
  organisationName: '',
  organisationDescription: '',
  website: '',
};

// --- Suggestion data ----------------------------------------------------------

const ATTENDEE_ROLES = ['Founder', 'Investor', 'Recruiter', 'Developer', 'Job Seeker', 'Sales Professional', 'Other'];

const INDUSTRIES = [
  'Technology', 'Fintech', 'Web3 / Crypto', 'Healthcare', 'SaaS', 'E-commerce',
  'Venture Capital', 'Marketing', 'Real Estate', 'Education', 'Consulting',
  'Media & Entertainment', 'Non-profit',
];

const INTERESTS = [
  'AI & Machine Learning', 'Fundraising', 'Product', 'Hiring', 'Partnerships', 'Web3',
  'Design', 'Growth Marketing', 'Sales', 'Community Building', 'Investing', 'Mentorship',
  'Open Source', 'Career Growth',
];

const NETWORKING_GOALS = ['Hiring', 'Investment', 'Partnership', 'Mentorship', 'Sales', 'Just exploring'];

// --- Small form primitives ----------------------------------------------------

function FieldShell({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">
        {label}
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

const inputClass =
  'w-full rounded-xl border bg-[#0D1712] px-4 py-3 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none transition-colors focus:border-[#639781]/50';

function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  optional,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}) {
  return (
    <FieldShell label={optional ? `${label} (optional)` : label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} ${error ? 'border-[#D9756B]/50' : 'border-white/[0.08]'}`}
      />
    </FieldShell>
  );
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint}>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="At least 8 characters"
          className={`${inputClass} pr-11 ${error ? 'border-[#D9756B]/50' : 'border-white/[0.08]'}`}
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

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  optional,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <FieldShell label={optional ? `${label} (optional)` : label} htmlFor={id}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`${inputClass} resize-none border-white/[0.08]`}
      />
    </FieldShell>
  );
}

function ChipSingleSelect({
  label,
  options,
  value,
  onChange,
  optional,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
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
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${selected
                  ? 'border-[#639781] bg-[#639781]/15 text-[#8FB8A4]'
                  : 'border-white/[0.1] text-[#92A79C] hover:border-[#639781]/30 hover:text-[#EAF2ED]'
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChipMultiSelect({
  label,
  options,
  values,
  onChange,
  optional,
  max,
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
  optional?: boolean;
  max?: number;
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
        {max ? <span className="text-[11px] text-[#5F736A]">{values.length}/{max}</span> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${selected
                  ? 'border-[#639781] bg-[#639781]/15 text-[#8FB8A4]'
                  : 'border-white/[0.1] text-[#92A79C] hover:border-[#639781]/30 hover:text-[#EAF2ED]'
                }`}
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

function SuggestCombobox({
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
    <FieldShell label={optional ? `${label} (optional)` : label} htmlFor={id}>
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
          className={`${inputClass} border-white/[0.08] pl-11 ${value ? 'pr-10' : ''}`}
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

function RoleCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors ${selected ? 'border-[#639781]/60 bg-[#639781]/[0.08]' : 'border-white/[0.08] bg-[#101915] hover:border-white/[0.16]'
        }`}
    >
      {selected && (
        <span className="absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full bg-[#639781] text-[#0A100D]">
          <Check className="h-3 w-3" />
        </span>
      )}
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? 'bg-[#639781]/20 text-[#8FB8A4]' : 'bg-white/[0.05] text-[#92A79C]'
          }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div>
        <h3 className="text-[15px] font-semibold text-[#EAF2ED]" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[#92A79C]">{description}</p>
      </div>
    </button>
  );
}

// --- Validation ----------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep1(form: FormState, accountType: AccountType | null) {
  const errors: Partial<Record<'name' | 'email' | 'password' | 'accountType', string>> = {};
  if (!form.name.trim()) errors.name = 'Enter your full name.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'That email address doesn\u2019t look right.';
  if (!form.password) errors.password = 'Create a password.';
  else if (form.password.length < 8) errors.password = 'Use at least 8 characters.';
  if (!accountType) errors.accountType = 'Choose how you\u2019ll be using VirtualNet.';
  return errors;
}

// --- Page ------------------------------------------------------------------------

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const [register, { isLoading: submitting }] = useRegisterUserMutation()

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const stepLabel = accountType === 'organiser' ? 'Organisation details' : 'Your networking profile';

  const goToStep2 = () => {
    const stepErrors = validateStep1(form, accountType);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setStep(2);
  };

  const submit = async () => {
    if (accountType === 'organiser' && !form.organisationName.trim()) {
      setErrors({ organisationName: 'Enter your organisation\u2019s name.' });
      return;
    }
    setErrors({});

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone || undefined,
      accountType: accountType,
      bio: form.bio || undefined,
      role: form.role || undefined,
      company: form.company || undefined,
      industry: form.industry || undefined,
      interests: form.interests.length ? form.interests : undefined,
      networkingGoals: form.networkingGoals || undefined,
      organisationName: form.organisationName,
      organisationDescription: form.organisationDescription || undefined,
      website: form.website || undefined,
    };
    await register(payload)
    console.log('RegisterOrganiserInput', payload);
    setStep('success');
  };

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} relative min-h-screen overflow-hidden bg-[#0A100D] text-[#EAF2ED]`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#639781]/[0.12] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#D9B26B]/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-6 py-12 lg:py-16">
        {/* Logo */}
        <a href="/" className="mb-10 flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            M
          </span>
          <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            VirtualNet
          </span>
        </a>

        {step !== 'success' && (
          <>
            {/* Progress */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2">
                <span className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#639781]' : 'bg-white/10'}`} />
                <span className={`h-1 flex-1 rounded-full ${step === 2 ? 'bg-[#639781]' : 'bg-white/10'}`} />
              </div>
              <span
                className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.1em] text-[#5F736A]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Step {step} of 2
              </span>
            </div>

            <h1 className="text-[1.7rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {step === 1 ? 'Create your account' : stepLabel}
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-[#92A79C]">
              {step === 1
                ? 'Every account starts here. What you fill in next depends on how you\u2019ll use VirtualNet.'
                : accountType === 'organiser'
                  ? 'Tell us about the organisation you\u2019ll be running events for.'
                  : 'This helps VirtualNet suggest the right people to connect with — all of it is optional.'}
            </p>
          </>
        )}

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
              >
                <TextInput
                  id="name"
                  label="Full name"
                  value={form.name}
                  onChange={(v) => update({ name: v })}
                  placeholder="Amara Okafor"
                  error={errors.name}
                />
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update({ email: v })}
                  placeholder="you@company.com"
                  error={errors.email}
                />
                <PasswordInput
                  id="password"
                  label="Password"
                  value={form.password}
                  onChange={(v) => update({ password: v })}
                  error={errors.password}
                />
                <TextInput
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update({ phone: v })}
                  placeholder="+1 (555) 000-0000"
                  optional
                />

                <div className="mt-2">
                  <span className="mb-3 block text-[13px] font-medium text-[#C7D6CE]">How will you use VirtualNet?</span>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <RoleCard
                      icon={User}
                      title="I'm an Attendee"
                      description="Join events, connect with the right people, and book meetings."
                      selected={accountType === 'attendee'}
                      onClick={() => setAccountType('attendee')}
                    />
                    <RoleCard
                      icon={Building2}
                      title="I'm an Organiser"
                      description="Run events and turn your attendee list into a networking layer."
                      selected={accountType === 'organiser'}
                      onClick={() => setAccountType('organiser')}
                    />
                  </div>
                  {errors.accountType && <p className="mt-2 text-[12px] text-[#E0A093]">{errors.accountType}</p>}
                  <p className="mt-3 text-[12px] text-[#5F736A]">
                    You\u2019re not locked in — you can switch on the other role later from your account settings and
                    finish that setup then.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={goToStep2}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#639781] py-3.5 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <p className="text-center text-[13px] text-[#5F736A]">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-[#8FB8A4] hover:underline">
                    Sign in
                  </a>
                </p>
              </motion.div>
            )}

            {step === 2 && accountType === 'attendee' && (
              <motion.div
                key="step2-attendee"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
              >
                <ChipSingleSelect
                  label="Your role"
                  options={ATTENDEE_ROLES}
                  value={form.role}
                  onChange={(v) => update({ role: v })}
                  optional
                />
                <TextInput
                  id="company"
                  label="Company"
                  value={form.company}
                  onChange={(v) => update({ company: v })}
                  placeholder="Where do you work?"
                  optional
                />
                <SuggestCombobox
                  id="industry"
                  label="Industry"
                  options={INDUSTRIES}
                  value={form.industry}
                  onChange={(v) => update({ industry: v })}
                  placeholder="Start typing or pick a suggestion"
                  optional
                />
                <ChipMultiSelect
                  label="Interests"
                  options={INTERESTS}
                  values={form.interests}
                  onChange={(v) => update({ interests: v })}
                  optional
                  max={6}
                />
                <ChipSingleSelect
                  label="Networking goal"
                  options={NETWORKING_GOALS}
                  value={form.networkingGoals}
                  onChange={(v) => update({ networkingGoals: v })}
                  optional
                />
                <TextArea
                  id="bio"
                  label="Bio"
                  value={form.bio}
                  onChange={(v) => update({ bio: v })}
                  placeholder="A couple of sentences about what you're working on."
                  optional
                />

                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3.5 text-[14px] font-medium text-[#EAF2ED]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={submit}
                    disabled={submitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#639781] py-3.5 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)] disabled:opacity-70"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
                  </motion.button>
                </div>
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="text-center text-[13px] text-[#5F736A] hover:text-[#8FB8A4]"
                >
                  Skip for now — I\u2019ll finish my profile later
                </button>
              </motion.div>
            )}

            {step === 2 && accountType === 'organiser' && (
              <motion.div
                key="step2-organiser"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
              >
                <TextInput
                  id="organisationName"
                  label="Organisation name"
                  value={form.organisationName}
                  onChange={(v) => update({ organisationName: v })}
                  placeholder="Acme Conferences"
                  error={errors.organisationName}
                />
                <TextInput
                  id="website"
                  label="Website"
                  type="url"
                  value={form.website}
                  onChange={(v) => update({ website: v })}
                  placeholder="https://yourevent.com"
                  optional
                />
                <TextArea
                  id="organisationDescription"
                  label="Organisation description"
                  value={form.organisationDescription}
                  onChange={(v) => update({ organisationDescription: v })}
                  placeholder="What kind of events do you run?"
                  optional
                />

                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3.5 text-[14px] font-medium text-[#EAF2ED]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={submit}
                    disabled={submitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#639781] py-3.5 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)] disabled:opacity-70"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center rounded-3xl border border-[#639781]/20 bg-[#101915] px-8 py-14 text-center"
              >
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid h-14 w-14 place-items-center rounded-full bg-[#639781]/15 text-[#8FB8A4]"
                >
                  <PartyPopper className="h-6 w-6" />
                </motion.span>
                <h2 className="mt-5 text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  You\u2019re in, {form.name.split(' ')[0] || 'there'}.
                </h2>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#92A79C]">
                  Your {accountType === 'organiser' ? 'organiser' : 'attendee'} account is ready. You can turn on the{' '}
                  {accountType === 'organiser' ? 'attendee' : 'organiser'} role any time from your account settings.
                </p>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-7 rounded-full bg-[#639781] px-7 py-3 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)]"
                >
                  Go to dashboard
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}