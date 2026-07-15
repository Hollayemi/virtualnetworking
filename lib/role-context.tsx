'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * lib/role-context.tsx
 *
 * Single source of truth for "which role is currently active" across the
 * dashboard shell (app/dashboard/layout.tsx) and any page rendered inside it
 * (e.g. app/dashboard/page.tsx). The layout's role switcher calls setRole();
 * pages read role/accent to decide what to render, without prop-drilling
 * through the layout.
 *
 * Swap the useState below for your real session/role source when ready —
 * e.g. hydrate it from the logged-in user's account, and persist switches
 * with a mutation instead of just flipping local state.
 */

export type Role = 'attendee' | 'organizer';

export const ACCENT = {
  attendee: { text: '#8FB8A4', bg: '#639781', soft: 'rgba(99,151,129,0.14)', ring: 'rgba(99,151,129,0.35)' },
  organizer: { text: '#E3C08A', bg: '#D9B26B', soft: 'rgba(217,178,107,0.14)', ring: 'rgba(217,178,107,0.35)' },
} as const;

type Accent = (typeof ACCENT)[Role];

type RoleContextValue = {
  role: Role;
  setRole: (r: Role) => void;
  accent: Accent;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children, currentPage }: { children: ReactNode, currentPage: string }) {
  const attendees = ["discover", "meetings", "profile", "settings", "wallet", "connections"]
  const organisers = ["analytics", "attendees", "events", "payments", "sponsor"]
  const isAttendee = attendees.includes(currentPage)
  const currentRole = isAttendee ? "attendee" : "organizer"
  const [role, setRole] = useState<Role>(currentRole);
  return <RoleContext.Provider value={{ role, setRole, accent: ACCENT[role] }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within a RoleProvider');
  return ctx;
}
