'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import {
  Home,
  Compass,
  Share2,
  MessageSquare,
  CalendarClock,
  Wallet,
  UserCircle,
  CalendarRange,
  Users,
  BarChart3,
  Megaphone,
  CreditCard,
  Settings,
  LifeBuoy,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';

/**
 * app/dashboard/layout.tsx
 *
 * Persistent shell for everything under /dashboard. The sidebar renders as
 * a floating rounded card rather than an edge-to-edge panel, and the role
 * switch is a segmented control at the top of it — one click swaps both the
 * nav items below it AND the accent color across the shell (sage for
 * Attendee, gold for Organizer), so it's obvious at a glance which hat
 * you're wearing.
 *
 * Role state lives here as local state for now (defaults to 'attendee').
 * Swap the `useState` for your real session/role source — e.g. read the
 * user's active role from auth context, and persist the switch with a
 * mutation instead of just flipping local state.
 */

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

import { Role, ACCENT, RoleProvider, useRole } from '@/lib/role-context';

type NavItem = { icon: LucideIcon; label: string; href: string };

const ATTENDEE_NAV: NavItem[] = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: Compass, label: 'Discover', href: '/dashboard/discover' },
  { icon: Share2, label: 'Connections', href: '/dashboard/connections' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: CalendarClock, label: 'Meetings', href: '/dashboard/meetings' },
  { icon: Wallet, label: 'Wallet & Credits', href: '/dashboard/wallet' },
  { icon: UserCircle, label: 'My Profile', href: '/dashboard/profile' },
];

const ORGANIZER_NAV: NavItem[] = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: CalendarRange, label: 'My Events', href: '/dashboard/events' },
  { icon: Users, label: 'Attendees', href: '/dashboard/attendees' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Megaphone, label: 'Sponsors', href: '/dashboard/sponsors' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
];

const BOTTOM_NAV: NavItem[] = [
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: LifeBuoy, label: 'Help & Support', href: '/dashboard/help' },
];

// --- Role switcher -----------------------------------------------------------

function RoleSwitch({ role, onChange, collapsed }: { role: Role; onChange: (r: Role) => void; collapsed: boolean }) {
  if (collapsed) {
    const accent = ACCENT[role];
    return (
      <button
        onClick={() => onChange(role === 'attendee' ? 'organizer' : 'attendee')}
        className="grid h-10 w-10 place-items-center rounded-xl border transition-colors"
        style={{ borderColor: accent.ring, backgroundColor: accent.soft, color: accent.text }}
        aria-label="Switch role"
        title={role === 'attendee' ? 'Attendee — click to switch' : 'Organizer — click to switch'}
      >
        {role === 'attendee' ? <UserCircle className="h-[18px] w-[18px]" /> : <Megaphone className="h-[18px] w-[18px]" />}
      </button>
    );
  }

  return (
    <div className="relative grid grid-cols-2 rounded-xl border border-white/[0.08] bg-[#0D1712] p-1">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-lg"
        style={{
          backgroundColor: ACCENT[role].bg,
          left: role === 'attendee' ? '4px' : 'calc(50% + 2px)',
        }}
      />
      {(['attendee', 'organizer'] as Role[]).map((r) => {
        const active = role === r;
        return (
          <button
            key={r}
            onClick={() => onChange(r)}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[12.5px] font-semibold transition-colors ${
              active ? 'text-[#0A100D]' : 'text-[#92A79C] hover:text-[#EAF2ED]'
            }`}
          >
            {r === 'attendee' ? <UserCircle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
            {r === 'attendee' ? 'Attendee' : 'Organizer'}
          </button>
        );
      })}
    </div>
  );
}

// --- Nav item ------------------------------------------------------------------

function NavLink({
  item,
  active,
  collapsed,
  accent,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  accent: any //(typeof ACCENT)['attendee'];
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
        active ? '' : 'text-[#92A79C] hover:bg-white/[0.03] hover:text-[#EAF2ED]'
      }`}
      style={active ? { backgroundColor: accent.soft, color: accent.text } : undefined}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {active && !collapsed && (
        <motion.span layoutId="active-dot" className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.bg }} />
      )}
    </a>
  );
}

// --- Sidebar content (shared between desktop rail and mobile drawer) -----------

function SidebarContent({
  role,
  setRole,
  collapsed,
  pathname,
  onNavigate,
}: {
  role: Role;
  setRole: (r: Role) => void;
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const accent = ACCENT[role];
  const navItems = role === 'attendee' ? ATTENDEE_NAV : ORGANIZER_NAV;

  return (
    <div className="flex h-full flex-col p-3">
      {/* Logo row */}
      <div className={`mb-4 flex items-center gap-2.5 px-1 ${collapsed ? 'justify-center' : ''}`}>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          M
        </span>
        {!collapsed && (
          <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            VirtualNet
          </span>
        )}
      </div>

      {/* Role switch */}
      <div className="mb-5 px-1">
        <RoleSwitch role={role} onChange={setRole} collapsed={collapsed} />
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-1" onClick={onNavigate}>
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} active={pathname === item.href} collapsed={collapsed} accent={accent} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex flex-col gap-1 border-t border-white/[0.06] pt-3">
          {BOTTOM_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} collapsed={collapsed} accent={accent} />
          ))}
        </div>
      </nav>

      {/* User mini card */}
      <div className={`mt-3 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 ${collapsed ? 'justify-center' : ''}`}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[12px] font-semibold text-[#EAF2ED]">
          AO
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#EAF2ED]">Amara Okafor</p>
            <p className="truncate text-[11px]" style={{ color: accent.text }}>
              Viewing as {role === 'attendee' ? 'Attendee' : 'Organizer'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Topbar ----------------------------------------------------------------------

function Topbar({
  role,
  onOpenMobileNav,
}: {
  role: Role;
  onOpenMobileNav: () => void;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const pageTitle = segments.length > 1 ? segments[segments.length - 1].replace(/-/g, ' ') : 'Overview';
  const accent = ACCENT[role];

  return (
    <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#101915] px-4 lg:px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] text-[#EAF2ED] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <h1 className="text-[15px] font-semibold capitalize tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {pageTitle}
        </h1>
      </div>

      <div className="hidden max-w-xs flex-1 items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0D1712] px-3.5 py-2 sm:flex">
        <Search className="h-4 w-4 text-[#5F736A]" />
        <span className="text-[13px] text-[#5F736A]">Search VirtualNet…</span>
      </div>

      <div className="flex items-center gap-2.5">
        <span
          className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-medium sm:flex"
          style={{ borderColor: accent.ring, backgroundColor: accent.soft, color: accent.text }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.bg }} />
          {role === 'attendee' ? 'Attendee' : 'Organizer'}
        </span>
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] text-[#92A79C] hover:text-[#EAF2ED]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D9756B]" />
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] py-1.5 pl-1.5 pr-2.5 text-[#EAF2ED]">
          <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/[0.08] text-[11px] font-semibold">AO</span>
          <ChevronDown className="h-3.5 w-3.5 text-[#5F736A]" />
        </button>
      </div>
    </div>
  );
}

// --- Layout ------------------------------------------------------------------------

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useRole();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} flex h-screen gap-3 overflow-hidden bg-[#05080A] p-3 text-[#EAF2ED]`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Desktop sidebar */}
      <aside
        className={`relative hidden shrink-0 rounded-2xl border border-white/[0.07] bg-[#101915] transition-[width] duration-200 lg:block ${
          collapsed ? 'w-[76px]' : 'w-[248px]'
        }`}
      >
        <SidebarContent role={role} setRole={setRole} collapsed={collapsed} pathname={pathname} />
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-8 grid h-6 w-6 place-items-center rounded-full border border-white/[0.1] bg-[#151F19] text-[#92A79C] hover:text-[#EAF2ED]"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
        </button>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-3 left-3 z-50 w-[260px] rounded-2xl border border-white/[0.08] bg-[#101915] lg:hidden"
            >
              <button
                onClick={() => setMobileNavOpen(false)}
                className="absolute -right-3 top-8 grid h-6 w-6 place-items-center rounded-full border border-white/[0.1] bg-[#151F19] text-[#92A79C]"
                aria-label="Close menu"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <SidebarContent
                role={role}
                setRole={setRole}
                collapsed={false}
                pathname={pathname}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <Topbar role={role} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto rounded-2xl border border-white/[0.07] bg-[#101915] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <DashboardShell>{children}</DashboardShell>
    </RoleProvider>
  );
}
