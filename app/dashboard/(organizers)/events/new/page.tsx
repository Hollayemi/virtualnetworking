'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft, PartyPopper, Coins } from 'lucide-react';
import { Button } from '@/app/dashboard/components/ui/button';
import { TextInput, TextArea } from '@/app/dashboard/components/ui/input';
import { SegmentedTabs } from '@/app/dashboard/components/ui/tabs';
import { SectionCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';

/**
 * app/dashboard/events/new/page.tsx
 * Nested under /dashboard/events so "Create Event" reads as a child of
 * "My Events" in the URL, matching the nav's mental model. Mirrors PRD 5.1:
 * name, description, date, location (physical/virtual), ticket tiers.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type LocationType = 'physical' | 'virtual';

type TierRow = { tier: 'Regular' | 'Premium' | 'VIP'; price: string; quantity: string };

const DEFAULT_TIERS: TierRow[] = [
  { tier: 'Regular', price: '0', quantity: '500' },
  { tier: 'Premium', price: '19', quantity: '300' },
  { tier: 'VIP', price: '49', quantity: '100' },
];

export default function CreateEventPage() {
  const router = useRouter();
  const accent = ACCENT.organizer;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationType, setLocationType] = useState<LocationType>('physical');
  const [venue, setVenue] = useState('');
  const [tiers, setTiers] = useState<TierRow[]>(DEFAULT_TIERS);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(false);

  const updateTier = (index: number, patch: Partial<TierRow>) =>
    setTiers((t) => t.map((row, i) => (i === index ? { ...row, ...patch } : row)));

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: replace with your real "create event" mutation
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setCreated(true);
  };

  if (created) {
    return (
      <div className={`${display.variable} ${body.variable} ${mono.variable} text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-[#D9B26B]/20 bg-[#101915] px-8 py-14 text-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#D9B26B]/15 text-[#D9B26B]">
            <PartyPopper className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {name || 'Your event'} is live
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#92A79C]">
            Attendees can start registering now. You can import a list or share the networking link from My Events.
          </p>
          <div className="mt-7 flex gap-3">
            <Button variant="secondary" onClick={() => router.push('/dashboard/events')}>
              Back to My Events
            </Button>
            <Button accent={accent.bg} className="text-[#0A100D]" onClick={() => setCreated(false)}>
              Create another
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <Link href="/dashboard/events" className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-[#92A79C] hover:text-[#EAF2ED]">
          <ArrowLeft className="h-3.5 w-3.5" />
          My Events
        </Link>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Create event
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Set up the basics — you can edit everything later.</p>
      </div>

      <SectionCard title="Event details">
        <div className="flex flex-col gap-4">
          <TextInput id="event-name" label="Event name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Fintech Summit 2026" />
          <TextArea
            id="event-description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this event about, and who should attend?"
            optional
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput id="start-date" label="Start date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <TextInput id="end-date" label="End date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} optional />
          </div>

          <div>
            <span className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">Location</span>
            <SegmentedTabs
              className="max-w-xs"
              value={locationType}
              onChange={setLocationType}
              accent={accent.bg}
              options={[
                { value: 'physical', label: 'Physical' },
                { value: 'virtual', label: 'Virtual' },
              ]}
            />
          </div>
          <TextInput
            id="venue"
            label={locationType === 'physical' ? 'Venue address' : 'Meeting link'}
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder={locationType === 'physical' ? '123 Market St, San Francisco, CA' : 'https://meet.VirtualNet.app/...'}
          />
        </div>
      </SectionCard>

      <SectionCard title="Ticket tiers">
        <div className="flex flex-col gap-3">
          {tiers.map((row, i) => (
            <div key={row.tier} className="grid grid-cols-[100px_1fr_1fr] items-end gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <span className="text-[13px] font-medium text-[#EAF2ED]">{row.tier}</span>
              <TextInput
                id={`price-${row.tier}`}
                label="Price ($)"
                type="number"
                value={row.price}
                onChange={(e) => updateTier(i, { price: e.target.value })}
              />
              <TextInput
                id={`qty-${row.tier}`}
                label="Quantity"
                type="number"
                value={row.quantity}
                onChange={(e) => updateTier(i, { quantity: e.target.value })}
              />
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-xl border border-[#D9B26B]/15 bg-[#151009]/40 p-3">
            <Coins className="h-4 w-4 shrink-0 text-[#D9B26B]" />
            <p className="text-[12px] text-[#92A79C]">
              VIP attendees sit behind the access gate — lower tiers spend credits to reach them, and VIPs earn cashback when they accept.
            </p>
          </div>
        </div>
      </SectionCard>

      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={() => router.push('/dashboard/events')}>
          Cancel
        </Button>
        <Button accent={accent.bg} className="text-[#0A100D]" loading={submitting} onClick={handleSubmit}>
          Create event
        </Button>
      </div>
    </div>
  );
}