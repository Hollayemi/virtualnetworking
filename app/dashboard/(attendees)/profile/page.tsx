'use client';

import { useState, useEffect } from 'react';
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
import { useGetProfileQuery, useUpdateProfileMutation, useGetBusinessCardQuery } from '@/redux/slices';
import { useGetCurrentEventQuery } from '@/redux/slices';
import { toast } from 'sonner';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const ATTENDEE_ROLES = ['Founder', 'Investor', 'Recruiter', 'Developer', 'Job Seeker', 'Sales Professional', 'Other'];
const INDUSTRIES = ['Technology', 'Fintech', 'Web3 / Crypto', 'Healthcare', 'SaaS', 'E-commerce', 'Venture Capital', 'Marketing'];
const INTERESTS = ['AI & Machine Learning', 'Fundraising', 'Product', 'Hiring', 'Partnerships', 'Web3', 'Design', 'Sales', 'Mentorship'];
const NETWORKING_GOALS = ['Hiring', 'Investment', 'Partnership', 'Mentorship', 'Sales', 'Just exploring'];

export default function ProfilePage() {
  const { data: currentEvent } = useGetCurrentEventQuery();
  const eventId = currentEvent?.data?._id;

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery({ eventId });
  const { data: businessCardData } = useGetBusinessCardQuery({ eventId });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    role: '',
    company: '',
    industry: '',
    interests: [] as string[],
    networkingGoals: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profileData?.data) {
      const p = profileData.data;
      setForm({
        name: p.name || '',
        email: p.email || '',
        phone: p.phone || '',
        bio: p.bio || '',
        role: p.role || '',
        company: p.company || '',
        industry: p.industry || '',
        interests: p.interests || [],
        networkingGoals: p.networkingGoals || '',
      });
    }
  }, [profileData]);

  const update = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await updateProfile(form).unwrap();
      setSaved(true);
      toast.success('Profile updated successfully');
      setTimeout(() => setSaved(false), 2400);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#639781] border-t-transparent" />
      </div>
    );
  }

  const cardData = businessCardData?.data;

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          My Profile
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">This is what other attendees see when they look you up.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
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
            <Button onClick={handleSave} disabled={isUpdating} loading={isUpdating}>
              Save changes
            </Button>
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
                {cardData?.qrCodeData ? (
                  <img src={cardData.qrCodeData} alt="QR Code" className="h-16 w-16" />
                ) : (
                  <QrCode className="h-16 w-16 text-[#5F736A]" />
                )}
              </div>
            </div>
            <Button variant="secondary" icon={Share2} fullWidth className="mt-4" onClick={() => navigator.clipboard.writeText(cardData?.shareUrl || '')}>
              Share card
            </Button>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}