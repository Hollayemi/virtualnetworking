'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import {
  Sparkles,
  Share2,
  CalendarClock,
  MessageSquare,
  BarChart3,
  UserRound,
  CalendarRange,
  Megaphone,
  Users2,
  FileText,
  LifeBuoy,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type MenuItem = { icon: LucideIcon; title: string; desc: string; href: string };

const FEATURES: MenuItem[] = [
  { icon: Sparkles, title: 'AI Matchmaking', desc: 'Smart suggestions based on shared goals and interests.', href: '/features#ai-matchmaking' },
  { icon: Share2, title: 'Networking', desc: 'Browse, filter, and send structured connection requests.', href: '/features#networking' },
  { icon: CalendarClock, title: 'Meetings', desc: "Book time inside a person's open availability slots.", href: '/features#meetings' },
  { icon: MessageSquare, title: 'Messaging', desc: 'Chat unlocks the moment a connection is accepted.', href: '/features#messaging' },
  { icon: BarChart3, title: 'Event Analytics', desc: 'See connections, meetings, and engagement per event.', href: '/features#event-analytics' },
];

const SOLUTIONS: MenuItem[] = [
  { icon: UserRound, title: 'For Attendees', desc: 'Find the right people, skip the small talk.', href: '/solutions#for-attendees' },
  { icon: CalendarRange, title: 'For Event Organizers', desc: 'Turn your attendee list into a networking layer.', href: '/solutions#for-event-organizers' },
  { icon: Megaphone, title: 'For Sponsors', desc: 'Get qualified leads, not just booth traffic.', href: '/solutions#for-sponsors' },
  { icon: Users2, title: 'For Communities', desc: 'Keep members connecting long after the event ends.', href: '/solutions#for-communities' },
];

const RESOURCES: MenuItem[] = [
  { icon: FileText, title: 'Blog', desc: 'Product updates and networking playbooks.', href: '/resources#blog' },
  { icon: LifeBuoy, title: 'Help Center', desc: 'Guides for organizers, sponsors, and attendees.', href: '/resources#help-center' },
  { icon: HelpCircle, title: 'FAQs', desc: 'Quick answers on credits, VIP access, and pricing.', href: '/resources#faqs' },
];

function DropdownPanel({ items, columns }: { items: MenuItem[]; columns: 1 | 2 }) {
  return (
    <div
      className="invisible absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      style={columns === 2 ? { width: 460 } : undefined}
    >
      <div className="rounded-2xl border border-white/[0.08] bg-[#101B16] p-2 shadow-2xl shadow-black/50">
        <div className={columns === 2 ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1'}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#639781]/10 text-[#8FB8A4]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span
                    className="block text-[13.5px] font-medium text-[#EAF2ED]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-[#7C8F85]">{item.desc}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavGroup({ label, basePath, items, columns }: { label: string; basePath: string; items: MenuItem[]; columns: 1 | 2 }) {
  return (
    <div className="group relative">
      <a href={basePath} className="flex items-center gap-1 py-2 text-[13.5px] text-[#92A79C] transition-colors hover:text-[#EAF2ED]">
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </a>
      <DropdownPanel items={items} columns={columns} />
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const mobileGroups: { label: string; items: MenuItem[] }[] = [
    { label: 'Features', items: FEATURES },
    { label: 'Solutions', items: SOLUTIONS },
    { label: 'Resources', items: RESOURCES },
  ];

  return (
    <header
      className={`${display.variable} ${body.variable} ${mono.variable} sticky top-0 z-50 transition-colors duration-300`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div
        className={`border-b transition-all duration-300 ${
          scrolled ? 'border-white/[0.08] bg-[#0A100D]/85 backdrop-blur-md' : 'border-transparent bg-[#0A100D]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              M
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight text-[#EAF2ED]" style={{ fontFamily: 'var(--font-display)' }}>
                Virtual Networking
              </span>
              {/* <span
                className="mt-0.5 text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#5F736A]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                AI Networking Platform
              </span> */}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <NavGroup label="Features" basePath="/features" items={FEATURES} columns={2} />
            <NavGroup label="Solutions" basePath="/solutions" items={SOLUTIONS} columns={2} />
            <a href="/how-it-works" className="py-2 text-[13.5px] text-[#92A79C] transition-colors hover:text-[#EAF2ED]">
              How it Works
            </a>
            <a href="/pricing" className="py-2 text-[13.5px] text-[#92A79C] transition-colors hover:text-[#EAF2ED]">
              Pricing
            </a>
            <NavGroup label="Resources" basePath="/resources" items={RESOURCES} columns={1} />
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href="/login" className="rounded-full px-4 py-2.5 text-[13.5px] font-medium text-[#EAF2ED] transition-colors hover:text-[#8FB8A4]">
              Sign In
            </a>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#639781] px-5 py-2.5 text-[13.5px] font-semibold text-[#0A100D] shadow-[0_0_0_1px_rgba(99,151,129,0.4)] transition-shadow hover:shadow-[0_0_24px_rgba(99,151,129,0.45)]"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-[#EAF2ED] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/[0.08] bg-[#0A100D] lg:hidden"
          >
            <div className="flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto px-6 py-4">
              {mobileGroups.map((group) => (
                <div key={group.label} className="border-b border-white/[0.06] py-1">
                  <button
                    onClick={() => setExpanded((cur) => (cur === group.label ? null : group.label))}
                    className="flex w-full items-center justify-between py-3 text-[14.5px] font-medium text-[#EAF2ED]"
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-4 w-4 text-[#7C8F85] transition-transform ${
                        expanded === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expanded === group.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-3">
                          {group.items.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[13.5px] text-[#92A79C] hover:bg-white/[0.04] hover:text-[#EAF2ED]"
                            >
                              <item.icon className="h-4 w-4 text-[#8FB8A4]" />
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <a href="/how-it-works" className="border-b border-white/[0.06] py-3 text-[14.5px] font-medium text-[#EAF2ED]">
                How it Works
              </a>
              <a href="/pricing" className="border-b border-white/[0.06] py-3 text-[14.5px] font-medium text-[#EAF2ED]">
                Pricing
              </a>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="/login"
                  className="rounded-full border border-white/10 px-5 py-3 text-center text-[14px] font-medium text-[#EAF2ED]"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="rounded-full bg-[#639781] px-5 py-3 text-center text-[14px] font-semibold text-[#0A100D]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
