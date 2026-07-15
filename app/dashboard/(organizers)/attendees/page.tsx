'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { 
  Search, Users, Share2, CalendarClock, ChevronRight, X, 
  Mail, Phone, Briefcase, MapPin, Calendar, CheckCircle, 
  MessageCircle, Link2, ExternalLink, ChevronLeft, CalendarDays,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Avatar } from '@/app/dashboard/components/ui/avatar';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { StatCard } from '@/app/dashboard/components/ui';
import { LoadingState, ErrorState, EmptyState } from '@/app/dashboard/components/state';
import { useGetEventAttendeesQuery } from '@/redux/slices/organiser/events.slice';
import { ACCENT } from '@/lib/role-context';
import { getInitials, formatTime } from '@/utils';
import { Attendee } from '@/redux/slices/organiser';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TIER_TONE: Record<string, 'sage' | 'gold' | 'neutral'> = { 
  Regular: 'neutral', 
  Premium: 'sage', 
  VIP: 'gold' 
};
const TIERS = ['All tiers', 'Regular', 'Premium', 'VIP'];

const selectClass =
  'rounded-xl border border-white/[0.08] bg-[#0D1712] px-3.5 py-2.5 text-[13px] text-[#C7D6CE] outline-none focus:border-[#639781]/50';

// Pagination component
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-white/[0.06] bg-[#0D1712] px-3 py-2 text-[13px] text-[#7C8F85] transition-colors hover:border-white/20 hover:text-[#EAF2ED] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-4 py-2 text-[13px] transition-colors ${
            currentPage === page
              ? 'bg-[#639781] text-white'
              : 'bg-[#0D1712] text-[#7C8F85] hover:border-white/20 hover:text-[#EAF2ED]'
          } border border-white/[0.06]`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-white/[0.06] bg-[#0D1712] px-3 py-2 text-[13px] text-[#7C8F85] transition-colors hover:border-white/20 hover:text-[#EAF2ED] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// Attendee Detail Modal Component
function AttendeeDetailModal({ 
  attendee, 
  isOpen, 
  onClose 
}: { 
  attendee: Attendee | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!attendee) return null;

  const user = attendee.userId;
  const initials = getInitials(user.name);
  const registeredDate = formatTime(attendee.registeredAt);
  const confirmedDate = attendee.confirmedAt ? formatTime(attendee.confirmedAt) : 'Not confirmed';

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Slide-in panel */}
      <div 
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto bg-[#0D1712] border-l border-white/[0.08] p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-[#7C8F85] hover:bg-white/[0.06] hover:text-[#EAF2ED] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header with avatar and name */}
          <div className="mb-6 flex items-start gap-4">
            <Avatar 
              initials={initials} 
              size="lg"
              className="h-16 w-16 text-xl"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-[#EAF2ED]" style={{ fontFamily: 'var(--font-display)' }}>
                {user.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Pill tone={TIER_TONE[attendee.tierLabel] ?? 'neutral'}>
                  {attendee.tierLabel}
                </Pill>
                <span className="text-[12px] text-[#7C8F85]">•</span>
                <span className="text-[12px] text-[#7C8F85]">
                  Status: {attendee.status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-[#7C8F85]">Connections</p>
              <p className="mt-1 text-lg font-semibold text-[#EAF2ED]">
                {attendee.connectionsAccepted ?? 0}
              </p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-[#7C8F85]">Meetings</p>
              <p className="mt-1 text-lg font-semibold text-[#EAF2ED]">
                {attendee.meetingsCount ?? 0}
              </p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-[#7C8F85]">Tier Price</p>
              <p className="mt-1 text-lg font-semibold text-[#EAF2ED]">
                ${attendee.tierPrice}
              </p>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[#7C8F85] uppercase tracking-wider">
              Contact Information
            </h3>
            
            <div className="space-y-3">
              {user.email && (
                <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                  <Mail className="h-4 w-4 text-[#5F736A]" />
                  <span>{user.email}</span>
                </div>
              )}
              
              {user.phone && (
                <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                  <Phone className="h-4 w-4 text-[#5F736A]" />
                  <span>{user.phone}</span>
                </div>
              )}

              {user.bio && (
                <div className="flex items-start gap-3 text-[13px] text-[#C7D6CE]">
                  <Briefcase className="h-4 w-4 text-[#5F736A] mt-0.5" />
                  <span>{user.bio}</span>
                </div>
              )}

              {user.timezone && (
                <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                  <MapPin className="h-4 w-4 text-[#5F736A]" />
                  <span>Timezone: {user.timezone}</span>
                </div>
              )}
            </div>
          </div>

          <hr className="my-6 border-white/[0.06]" />

          {/* Registration details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[#7C8F85] uppercase tracking-wider">
              Registration Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                <Calendar className="h-4 w-4 text-[#5F736A]" />
                <span>Registered: {registeredDate}</span>
              </div>
              
              <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                <CheckCircle className="h-4 w-4 text-[#5F736A]" />
                <span>Confirmed: {confirmedDate}</span>
              </div>

              {attendee.referredBy && (
                <div className="flex items-center gap-3 text-[13px] text-[#C7D6CE]">
                  <Link2 className="h-4 w-4 text-[#5F736A]" />
                  <span>Referred by: {attendee.referredBy}</span>
                </div>
              )}
            </div>
          </div>

          <hr className="my-6 border-white/[0.06]" />

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full rounded-lg bg-[#639781]/10 px-4 py-2.5 text-[13px] font-medium text-[#639781] transition-colors hover:bg-[#639781]/20">
              <MessageCircle className="mr-2 inline-block h-4 w-4" />
              Send Message
            </button>
            <button className="w-full rounded-lg bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-[#C7D6CE] transition-colors hover:bg-white/[0.08]">
              <ExternalLink className="mr-2 inline-block h-4 w-4" />
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AllAttendeesPage() {
  const accent = ACCENT.organizer;
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState(TIERS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, tier]);

  const { data, isLoading, isError } = useGetEventAttendeesQuery({
    tier: tier === 'All tiers' ? undefined : tier,
    search: search.trim() || undefined,
    page: currentPage,
    pageSize: 10,
  });

  const attendees: Attendee[] = data?.data?.data ?? [];
  const pagination = data?.data;
  const totalPages = pagination?.totalPages ?? 1;

  console.log({ attendees, pagination });

  // Calculate stats from all attendees
  const totalConnections = attendees.reduce((sum, a) => sum + (a.connectionsAccepted ?? 0), 0);
  const totalMeetings = attendees.reduce((sum, a) => sum + (a.meetingsCount ?? 0), 0);
  const vipCount = attendees.filter((a) => a.tierLabel === 'VIP').length;

  const handleAttendeeClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAttendee(null), 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div 
        className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} 
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            All Attendees
          </h2>
          <p className="mt-1 text-[13.5px] text-[#92A79C]">View all attendees across all your events — click into anyone for the full profile.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Users} label="Total attendees" value={String(pagination?.total ?? attendees.length)} accent={accent} />
          <StatCard icon={Share2} label="Connections made" value={String(totalConnections)} accent={accent} />
          <StatCard icon={CalendarClock} label="Meetings booked" value={String(totalMeetings)} accent={accent} />
          <StatCard icon={CalendarDays} label="Events attended" value={String(attendees.length)} accent={accent} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F736A]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or company"
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1712] py-3 pl-11 pr-4 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none focus:border-[#639781]/50"
            />
          </div>
          <select value={tier} onChange={(e) => setTier(e.target.value)} className={selectClass}>
            {TIERS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {isLoading && <LoadingState label="Loading attendees…" />}
        {isError && <ErrorState label="Couldn't load attendees." />}

        {!isLoading && !isError && (
          <>
            <div className="flex flex-col gap-2.5">
              {attendees.length === 0 ? (
                <EmptyState label="No attendees match those filters." />
              ) : (
                attendees.map((attendee) => {
                  const user = attendee.userId;
                  return (
                    <button
                      key={attendee.id || attendee._id}
                      onClick={() => handleAttendeeClick(attendee)}
                      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0D1712] p-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.02]"
                    >
                      <Avatar initials={getInitials(user.name)} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-medium text-[#EAF2ED]">{user.name}</p>
                        <p className="truncate text-[12px] text-[#7C8F85]">
                          {user.email} · {user.bio || 'No bio'}
                        </p>
                      </div>
                      <div className="hidden items-center gap-2 sm:flex">
                        <span className="text-[12px] text-[#7C8F85]">
                          {attendee.connectionsAccepted ?? 0} connections
                        </span>
                        <span className="text-[12px] text-[#7C8F85]">•</span>
                        <span className="text-[12px] text-[#7C8F85]">
                          {attendee.meetingsCount ?? 0} meetings
                        </span>
                      </div>
                      <Pill tone={TIER_TONE[attendee.tierLabel] ?? 'neutral'}>
                        {attendee.tierLabel}
                      </Pill>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#5F736A]" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {!isLoading && attendees.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Attendee Detail Modal */}
      <AttendeeDetailModal
        attendee={selectedAttendee}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}