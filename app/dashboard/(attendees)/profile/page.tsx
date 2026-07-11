'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { QrCode, Share2, Check } from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { TextInput, TextArea } from '@/app/dashboard/components/ui/input';
import { ChipSingleSelect, ChipMultiSelect, SuggestCombobox } from '@/app/dashboard/components/ui/select';
import { SectionCard } from '@/app/dashboard/components/ui';
import { getInitials } from '@/utils';

/**
 * app/dashboard/profile/page.tsx
 * Editable attendee profile — mirrors the RegisterUserInput fields from
 * onboarding, so this is the same data users filled in (or skipped) at
 * signup. Includes a digital business card preview (PRD 7.2).
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const ATTENDEE_ROLES = ['Founder', 'Investor', 'Recruiter', 'Developer', 'Job Seeker', 'Sales Professional', 'Other'];
const INDUSTRIES = ['Technology', 'Fintech', 'Web3 / Crypto', 'Healthcare', 'SaaS', 'E-commerce', 'Venture Capital', 'Marketing'];
const INTERESTS = ['AI & Machine Learning', 'Fundraising', 'Product', 'Hiring', 'Partnerships', 'Web3', 'Design', 'Sales', 'Mentorship'];
const NETWORKING_GOALS = ['Hiring', 'Investment', 'Partnership', 'Mentorship', 'Sales', 'Just exploring'];

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  company: string;
  industry: string;
  interests: string[];
  networkingGoals: string;
};

const INITIAL: ProfileForm = {
  name: 'Amara Okafor',
  email: 'amara@fieldstone.io',
  phone: '+1 (415) 555-0132',
  bio: 'Building developer tools for distributed teams. Looking to meet fintech operators and early-stage investors.',
  role: 'Founder',
  company: 'Fieldstone',
  industry: 'Technology',
  interests: ['Fundraising', 'Product', 'Hiring'],
  networkingGoals: 'Fundraising',
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(INITIAL);
  const [saved, setSaved] = useState(false);
  const update = (patch: Partial<ProfileForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    // TODO: replace with your real profile update mutation
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          My Profile
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">This is what other attendees see when they look you up.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Form */}
        <div className="flex flex-col gap-5">
          <SectionCard title="Basic info">
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput id="name" label="Full name" value={form.name} onChange={(e) => update({ name: e.target.value })} />
                <TextInput id="email" label="Email" type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} />
              </div>
              <TextInput id="phone" label="Phone" type="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} optional />
              <TextArea id="bio" label="Bio" value={form.bio} onChange={(e) => update({ bio: e.target.value })} optional />
            </div>
          </SectionCard>

          <SectionCard title="Networking profile">
            <div className="flex flex-col gap-5">
              <ChipSingleSelect label="Your role" options={ATTENDEE_ROLES} value={form.role} onChange={(v) => update({ role: v })} optional />
              <TextInput id="company" label="Company" value={form.company} onChange={(e) => update({ company: e.target.value })} optional />
              <SuggestCombobox
                id="industry"
                label="Industry"
                options={INDUSTRIES}
                value={form.industry}
                onChange={(v) => update({ industry: v })}
                placeholder="Start typing or pick a suggestion"
                optional
              />
              <ChipMultiSelect label="Interests" options={INTERESTS} values={form.interests} onChange={(v) => update({ interests: v })} optional max={6} />
              <ChipSingleSelect
                label="Networking goal"
                options={NETWORKING_GOALS}
                value={form.networkingGoals}
                onChange={(v) => update({ networkingGoals: v })}
                optional
              />
            </div>
          </SectionCard>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave}>Save changes</Button>
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#8FB8A4]"
                >
                  <Check className="h-4 w-4" />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Digital business card preview */}
        <div className="lg:sticky lg:top-0 lg:self-start">
          <SectionCard title="Digital business card">
            <div className="rounded-2xl border border-[#639781]/20 bg-gradient-to-br from-[#639781]/[0.08] to-transparent p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={getInitials(form.name)} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-[#EAF2ED]" style={{ fontFamily: 'var(--font-display)' }}>
                    {form.name || 'Your name'}
                  </p>
                  <p className="truncate text-[12.5px] text-[#7C8F85]">
                    {form.role || 'Role'} · {form.company || 'Company'}
                  </p>
                </div>
              </div>
              {form.interests.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {form.interests.slice(0, 3).map((i) => (
                    <Pill key={i} tone="sage">
                      {i}
                    </Pill>
                  ))}
                </div>
              )}
              <div className="mt-5 flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#0A100D] py-6">
                <QrCode className="h-16 w-16 text-[#5F736A]" />
              </div>
            </div>
            <Button variant="secondary" icon={Share2} fullWidth className="mt-4">
              Share card
            </Button>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
