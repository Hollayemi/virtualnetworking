/**
 * lib/mock-data.ts
 * Shared sample data for the organizer pages. Events and attendees are
 * defined once here so list pages and their nested detail pages
 * (events/[id], events/new, attendees/[id]) stay in sync. Swap these for
 * real API calls when you wire up a backend.
 */

export interface IEventLocation {
  type: 'physical' | 'virtual';
  address?: string;
  city?: string;
  link?: string;
}

export interface EventTier {
  label: string;
  description?: string;
  price: number;
  capacity?: number;
  color?: string;
  sold: number;
}

export interface EventCustomField {
  fieldKey: string;
  label: string;
  type: string;
  options?: string[];
  isRequired?: boolean;
  placeholder?: string;
}

export type EventStatus = 'Live' | 'Upcoming' | 'Ended';

export interface OrgEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: IEventLocation;
  bannerUrl?: string;
  status: EventStatus;
  tiers: EventTier[];
  customFields: EventCustomField[];
  connections: number;
  meetings: number;
}

export const EVENTS: OrgEvent[] = [
  {
    id: 'evt-1',
    name: 'Fintech Summit 2026',
    description: 'Three days of structured networking for fintech founders, investors, and operators.',
    startDate: '2026-07-14',
    endDate: '2026-07-16',
    location: { type: 'physical', address: '1 Market St', city: 'San Francisco, CA' },
    bannerUrl: '/images/brokenNetwork.jpg',
    status: 'Live',
    tiers: [
      { label: 'Regular', price: 0, capacity: 500, color: '#92A79C', sold: 420 },
      { label: 'Premium', description: 'Priority messaging + verified badge', price: 19, capacity: 350, color: '#639781', sold: 312 },
      { label: 'VIP', description: 'Access gate placement + cashback on accepts', price: 49, capacity: 150, color: '#D9B26B', sold: 110 },
    ],
    customFields: [
      { fieldKey: 'company_stage', label: 'Company stage', type: 'select', options: ['Idea', 'Pre-seed', 'Seed', 'Series A+'], isRequired: true },
      { fieldKey: 'dietary', label: 'Dietary restrictions', type: 'text', isRequired: false, placeholder: 'Optional' },
    ],
    connections: 3910,
    meetings: 682,
  },
  {
    id: 'evt-2',
    name: 'Founders Roundtable',
    description: 'An intimate virtual roundtable for early-stage founders to compare notes on fundraising.',
    startDate: '2026-08-02',
    endDate: '2026-08-02',
    location: { type: 'virtual', link: 'https://meet.mesh.app/founders-roundtable' },
    bannerUrl: '/images/brokenNetwork.jpg',
    status: 'Upcoming',
    tiers: [{ label: 'Regular', price: 0, capacity: 150, color: '#92A79C', sold: 120 }],
    customFields: [{ fieldKey: 'raising_now', label: 'Currently raising?', type: 'checkbox', isRequired: false }],
    connections: 0,
    meetings: 0,
  },
  {
    id: 'evt-3',
    name: 'DevTools Meetup',
    description: 'A casual evening meetup for developer-tooling builders and the engineers who use them.',
    startDate: '2026-08-20',
    endDate: '2026-08-20',
    location: { type: 'physical', address: '600 Congress Ave', city: 'Austin, TX' },
    bannerUrl: '/images/brokenNetwork.jpg',
    status: 'Upcoming',
    tiers: [
      { label: 'Regular', price: 0, capacity: 200, color: '#92A79C', sold: 58 },
    ],
    customFields: [],
    connections: 0,
    meetings: 0,
  },
  {
    id: 'evt-4',
    name: 'Growth Marketing Summit 2025',
    description: 'A two-day summit on growth strategy for B2B and B2C marketing leaders.',
    startDate: '2025-11-04',
    endDate: '2025-11-05',
    location: { type: 'physical', address: '350 5th Ave', city: 'New York, NY' },
    bannerUrl: '/images/brokenNetwork.jpg',
    status: 'Ended',
    tiers: [
      { label: 'Regular', price: 0, capacity: 400, color: '#92A79C', sold: 400 },
      { label: 'VIP', price: 59, capacity: 240, color: '#D9B26B', sold: 240 },
    ],
    customFields: [],
    connections: 2984,
    meetings: 511,
  },
];

export type Tier = 'Regular' | 'Premium' | 'VIP';

export type OrgAttendee = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  company: string;
  industry: string;
  tier: Tier;
  eventId: string;
  eventName: string;
  joinedDate: string;
  connectionsSent: number;
  connectionsAccepted: number;
  meetings: number;
  bio: string;
  interests: string[];
  networkingGoal: string;
};

export const ORG_ATTENDEES: OrgAttendee[] = [
  {
    id: 'att-1', name: 'Priya Menon', initials: 'PM', email: 'priya@northbridge.vc', role: 'Investor', company: 'Northbridge Capital',
    industry: 'Fintech', tier: 'VIP', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 30', connectionsSent: 8, connectionsAccepted: 6,
    meetings: 4, bio: 'Early-stage fintech investor focused on payments infrastructure and embedded finance.',
    interests: ['Fundraising', 'Investing'], networkingGoal: 'Investment',
  },
  {
    id: 'att-2', name: 'Diego Alvarez', initials: 'DA', email: 'diego@loopwork.io', role: 'Founder', company: 'Loopwork',
    industry: 'SaaS', tier: 'Premium', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 28', connectionsSent: 14, connectionsAccepted: 9,
    meetings: 5, bio: 'Building workflow automation for finance teams. Raising a seed round this quarter.',
    interests: ['Partnerships', 'Product'], networkingGoal: 'Partnership',
  },
  {
    id: 'att-3', name: 'Kenji Sato', initials: 'KS', email: 'kenji@satopartners.com', role: 'Recruiter', company: 'Sato & Partners',
    industry: 'Web3 / Crypto', tier: 'VIP', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 25', connectionsSent: 5, connectionsAccepted: 5,
    meetings: 3, bio: 'Executive search for Web3 protocols and infrastructure teams.',
    interests: ['Hiring', 'Community Building'], networkingGoal: 'Hiring',
  },
  {
    id: 'att-4', name: 'Ada Whitfield', initials: 'AW', email: 'ada@fieldstone.io', role: 'Developer', company: 'Fieldstone',
    industry: 'Technology', tier: 'Regular', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 20', connectionsSent: 11, connectionsAccepted: 7,
    meetings: 2, bio: 'Backend engineer working on distributed systems and developer tooling.',
    interests: ['Open Source', 'AI & Machine Learning'], networkingGoal: 'Mentorship',
  },
  {
    id: 'att-5', name: 'Leo Fontaine', initials: 'LF', email: 'leo@vantage.co', role: 'Sales Professional', company: 'Vantage',
    industry: 'Marketing', tier: 'Premium', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 18', connectionsSent: 19, connectionsAccepted: 12,
    meetings: 6, bio: 'Enterprise sales lead looking for channel partnerships in the fintech space.',
    interests: ['Sales', 'Growth Marketing'], networkingGoal: 'Sales',
  },
  {
    id: 'att-6', name: 'Nia Okonjo', initials: 'NO', email: 'nia@deltaventures.com', role: 'Investor', company: 'Delta Ventures',
    industry: 'Healthcare', tier: 'Premium', eventId: 'evt-1', eventName: 'Fintech Summit 2026', joinedDate: 'Jun 15', connectionsSent: 6, connectionsAccepted: 4,
    meetings: 3, bio: 'Healthtech-focused investor, writes seed and Series A checks.',
    interests: ['Investing', 'Mentorship'], networkingGoal: 'Investment',
  },
];

export type SponsorTier = 'Platinum' | 'Gold' | 'Silver';

export type Sponsor = {
  id: string;
  name: string;
  initials: string;
  tier: SponsorTier;
  eventId: string;
  eventName: string;
  contactEmail: string;
  leadsDelivered: number;
  boothVisits: number;
  status: 'Active' | 'Pending';
};

export const SPONSORS: Sponsor[] = [
  { id: 'spn-1', name: 'Northbridge Capital', initials: 'NC', tier: 'Platinum', eventId: 'evt-1', eventName: 'Fintech Summit 2026', contactEmail: 'partnerships@northbridge.vc', leadsDelivered: 84, boothVisits: 310, status: 'Active' },
  { id: 'spn-2', name: 'Vantage', initials: 'VG', tier: 'Gold', eventId: 'evt-1', eventName: 'Fintech Summit 2026', contactEmail: 'events@vantage.co', leadsDelivered: 52, boothVisits: 198, status: 'Active' },
  { id: 'spn-3', name: 'Solstice Labs', initials: 'SL', tier: 'Silver', eventId: 'evt-1', eventName: 'Fintech Summit 2026', contactEmail: 'hello@solsticelabs.dev', leadsDelivered: 21, boothVisits: 94, status: 'Active' },
  { id: 'spn-4', name: 'Delta Ventures', initials: 'DV', tier: 'Gold', eventId: 'evt-1', eventName: 'Fintech Summit 2026', contactEmail: 'team@deltaventures.com', leadsDelivered: 0, boothVisits: 0, status: 'Pending' },
];
