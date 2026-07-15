'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft, PartyPopper, Coins, Plus, Trash2, ImagePlus, Check, AlertTriangle } from 'lucide-react';
import { Button, IconButton } from '@/app/dashboard/components/ui/button';
import { TextInput, TextArea } from '@/app/dashboard/components/ui/input';
import { SegmentedTabs } from '@/app/dashboard/components/ui/tabs';
import { Switch } from '@/app/dashboard/components/ui/switch';
import { SectionCard } from '@/app/dashboard/components/ui';
import { ACCENT } from '@/lib/role-context';
import { useCreateEventMutation, type IEventLocation, type CreateEventInput } from '@/redux/slices/organiser/events.slice';

/**
 * app/dashboard/events/new/page.tsx
 * Nested under /dashboard/events. Builds a CreateEventInput payload and
 * submits it with useCreateEventMutation — no local mock/success sim.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TIER_COLORS = ['#639781', '#D9B26B', '#92A79C', '#6B8FD9', '#D96B9D', '#6BD9C0'];
const FIELD_TYPES = ['text', 'textarea', 'select', 'checkbox', 'number'];

type TierDraft = { label: string; description: string; price: string; capacity: string; color: string };
type FieldDraft = { fieldKey: string; label: string; type: string; options: string; isRequired: boolean; placeholder: string };

const DEFAULT_TIERS: TierDraft[] = [
  { label: 'Regular', description: '', price: '0', capacity: '500', color: TIER_COLORS[2] },
  { label: 'VIP', description: 'Access gate placement + cashback on accepts', price: '49', capacity: '150', color: TIER_COLORS[1] },
];

function slugify(label: string) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export default function CreateEventPage() {
  const router = useRouter();
  const accent = ACCENT.organizer;
  const [createEvent, { isLoading: submitting, isSuccess, isError, data }] = useCreateEventMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationType, setLocationType] = useState<IEventLocation['type']>('physical');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [tiers, setTiers] = useState<TierDraft[]>(DEFAULT_TIERS);
  const [fields, setFields] = useState<FieldDraft[]>([]);

  const updateTier = (i: number, patch: Partial<TierDraft>) =>
    setTiers((t) => t.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const addTier = () => setTiers((t) => [...t, { label: '', description: '', price: '0', capacity: '', color: TIER_COLORS[t.length % TIER_COLORS.length] }]);
  const removeTier = (i: number) => setTiers((t) => t.filter((_, idx) => idx !== i));

  const updateField = (i: number, patch: Partial<FieldDraft>) =>
    setFields((f) => f.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const addField = () => setFields((f) => [...f, { fieldKey: '', label: '', type: 'text', options: '', isRequired: false, placeholder: '' }]);
  const removeField = (i: number) => setFields((f) => f.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    const location: IEventLocation =
      locationType === 'virtual' ? { type: 'virtual', link } : { type: 'physical', address, city };

    const payload: CreateEventInput = {
      name,
      description,
      startDate,
      endDate,
      location,
      bannerUrl: bannerUrl || undefined,
      tiers: tiers.map((t) => ({
        label: t.label,
        description: t.description || undefined,
        price: Number(t.price) || 0,
        capacity: t.capacity ? Number(t.capacity) : undefined,
        color: t.color,
      })),
      customFields: fields.length
        ? fields.map((f) => ({
            fieldKey: f.fieldKey || slugify(f.label),
            label: f.label,
            type: f.type,
            options: f.type === 'select' ? f.options.split(',').map((o) => o.trim()).filter(Boolean) : undefined,
            isRequired: f.isRequired,
            placeholder: f.placeholder || undefined,
          }))
        : undefined,
    };

    try {
      await createEvent(payload).unwrap();
    } catch {
      // isError below reflects the failure; nothing further to do here
    }
  };

  if (isSuccess) {
    const createdEvent = (data as any)?.data;
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
            {createdEvent?.name ?? name} is live
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#92A79C]">
            Attendees can start registering now. You can import a list or share the networking link from My Events.
          </p>
          <div className="mt-7 flex gap-3">
            <Button variant="secondary" onClick={() => router.push('/dashboard/events')}>
              Back to My Events
            </Button>
            {createdEvent?.slug || createdEvent?.id ? (
              <Button
                accent={accent.bg}
                className="text-[#0A100D]"
                onClick={() => router.push(`/dashboard/events/${createdEvent.slug ?? createdEvent.id}`)}
              >
                View listing
              </Button>
            ) : null}
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

      {isError && (
        <div className="flex items-center gap-2 rounded-xl border border-[#D9756B]/25 bg-[#D9756B]/[0.06] px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#E0A093]" />
          <p className="text-[13px] text-[#E0A093]">Couldn't create the event. Check the fields below and try again.</p>
        </div>
      )}

      <SectionCard title="Event details">
        <div className="flex flex-col gap-4">
          <TextInput id="event-name" label="Event name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Fintech Summit 2026" />
          <TextArea
            id="event-description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this event about, and who should attend?"
          />

          <div>
            <span className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">Banner image (optional)</span>
            <div className="flex items-center gap-3">
              <div className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D1712]">
                {bannerUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={bannerUrl} alt="Banner preview" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus className="h-5 w-5 text-[#5F736A]" />
                )}
              </div>
              <input
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://images.example.com/banner.jpg"
                className="w-full rounded-xl border border-white/[0.08] bg-[#0D1712] px-4 py-3 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none focus:border-[#639781]/50"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput id="start-date" label="Start date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <TextInput id="end-date" label="End date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
          {locationType === 'physical' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput id="address" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Market St" />
              <TextInput id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="San Francisco, CA" />
            </div>
          ) : (
            <TextInput id="link" label="Meeting link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://meet.mesh.app/..." />
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Ticket tiers"
        action={
          <Button variant="secondary" icon={Plus} onClick={addTier}>
            Add tier
          </Button>
        }
      >
        <div className="flex flex-col gap-3">
          {tiers.map((row, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {TIER_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateTier(i, { color: c })}
                      className="grid h-6 w-6 place-items-center rounded-full border-2 transition-transform hover:scale-110"
                      style={{ backgroundColor: c, borderColor: row.color === c ? '#EAF2ED' : 'transparent' }}
                      aria-label={`Set tier color ${c}`}
                    >
                      {row.color === c && <Check className="h-3 w-3 text-[#0A100D]" />}
                    </button>
                  ))}
                </div>
                <IconButton icon={Trash2} onClick={() => removeTier(i)} aria-label="Remove tier" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextInput id={`tier-label-${i}`} label="Label" value={row.label} onChange={(e) => updateTier(i, { label: e.target.value })} placeholder="VIP" />
                <TextInput
                  id={`tier-description-${i}`}
                  label="Description"
                  value={row.description}
                  onChange={(e) => updateTier(i, { description: e.target.value })}
                  optional
                  placeholder="Access gate placement + cashback"
                />
                <TextInput id={`tier-price-${i}`} label="Price ($)" type="number" value={row.price} onChange={(e) => updateTier(i, { price: e.target.value })} />
                <TextInput
                  id={`tier-capacity-${i}`}
                  label="Capacity"
                  type="number"
                  value={row.capacity}
                  onChange={(e) => updateTier(i, { capacity: e.target.value })}
                  optional
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-xl border border-[#D9B26B]/15 bg-[#151009]/40 p-3">
            <Coins className="h-4 w-4 shrink-0 text-[#D9B26B]" />
            <p className="text-[12px] text-[#92A79C]">
              Tiers with the gold accent behave as VIP by default — lower tiers spend credits to reach them, and they earn cashback when they accept.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Custom registration fields"
        action={
          <Button variant="secondary" icon={Plus} onClick={addField}>
            Add field
          </Button>
        }
      >
        {fields.length === 0 ? (
          <p className="text-[13px] text-[#7C8F85]">No custom fields yet — attendees will only fill in the standard profile.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {fields.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextInput
                    id={`field-label-${i}`}
                    label="Label"
                    value={f.label}
                    onChange={(e) => updateField(i, { label: e.target.value, fieldKey: slugify(e.target.value) })}
                    placeholder="Company stage"
                  />
                  <div>
                    <span className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">Field type</span>
                    <select
                      value={f.type}
                      onChange={(e) => updateField(i, { type: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0D1712] px-4 py-3 text-[14px] text-[#EAF2ED] outline-none focus:border-[#639781]/50"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  {f.type === 'select' && (
                    <TextInput
                      id={`field-options-${i}`}
                      label="Options"
                      value={f.options}
                      onChange={(e) => updateField(i, { options: e.target.value })}
                      hint="Comma-separated, e.g. Idea, Pre-seed, Seed, Series A+"
                    />
                  )}
                  <TextInput
                    id={`field-placeholder-${i}`}
                    label="Placeholder"
                    value={f.placeholder}
                    onChange={(e) => updateField(i, { placeholder: e.target.value })}
                    optional
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Switch checked={f.isRequired} onChange={(v) => updateField(i, { isRequired: v })} />
                    <span className="text-[12.5px] text-[#92A79C]">Required field</span>
                  </div>
                  <IconButton icon={Trash2} onClick={() => removeField(i)} aria-label="Remove field" />
                </div>
              </div>
            ))}
          </div>
        )}
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
