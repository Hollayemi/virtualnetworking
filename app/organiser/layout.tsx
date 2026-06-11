"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Coins,
  Settings,
  ChevronLeft,
  Bell,
  Search,
  HelpCircle,
  LogOut,
  Radio,
  Plus,
  Menu,
  X,
  ChevronRight,
  Zap,
  Building2,
} from "lucide-react";

// ─── Sidebar context ──────────────────────────────────────────────────────────

const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}>({ collapsed: false, setCollapsed: () => {} });

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/organiser/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    group: "Manage",
    items: [
      { label: "Events", href: "/organiser/events", icon: CalendarDays, badge: "3" },
      { label: "Attendees", href: "/organiser/attendees", icon: Users },
      { label: "Analytics", href: "/organiser/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Credits & Billing", href: "/organiser/billing", icon: Coins },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", href: "/organiser/settings", icon: Settings },
    ],
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const { collapsed, setCollapsed } = useContext(SidebarContext);
  const pathname = usePathname();

  // Simulate a live event being active
  const hasLiveEvent = true;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={`
        flex flex-col h-full bg-[#0D1B2A] border-r border-white/[0.07] relative z-10
        transition-all duration-300 ease-in-out
        ${mobile ? "w-[260px]" : collapsed ? "w-[68px]" : "w-[220px]"}
      `}
    >
      {/* ── Logo ── */}
      <div
        className={`
          flex items-center h-[60px] flex-shrink-0 border-b border-white/[0.07]
          ${collapsed && !mobile ? "justify-center px-0" : "px-5 gap-3"}
        `}
      >
        <div className="w-8 h-8 rounded-lg bg-[#E8472F] flex items-center justify-center flex-shrink-0">
          <TrendingUp size={16} color="#fff" strokeWidth={2.2} />
        </div>
        {(!collapsed || mobile) && (
          <span
            className="font-display font-semibold text-[16px] text-white whitespace-nowrap overflow-hidden"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            VirtualNet
          </span>
        )}
        {mobile && onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ── Live event pill ── */}
      {hasLiveEvent && (
        <div
          className={`
            mx-3 mt-3 mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5
            bg-[#8DC64C]/10 border border-[#8DC64C]/20
            ${collapsed && !mobile ? "justify-center px-0 mx-2" : ""}
          `}
        >
          <span className="relative flex-shrink-0">
            <Radio size={13} className="text-[#8DC64C]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#8DC64C] animate-pulse" />
          </span>
          {(!collapsed || mobile) && (
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-[#8DC64C] leading-none">Live now</p>
              <p className="text-[10.5px] text-white/40 mt-0.5 truncate">Web Summit London</p>
            </div>
          )}
        </div>
      )}

      {/* ── Nav groups ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-hide">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-5">
            {(!collapsed || mobile) && (
              <p className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-white/25 px-3 mb-1.5">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={mobile ? onClose : undefined}
                  title={collapsed && !mobile ? item.label : undefined}
                  className={`
                    relative flex items-center gap-3 rounded-xl text-[13px] font-medium
                    transition-all duration-150 mb-0.5 no-underline
                    ${collapsed && !mobile
                      ? "h-10 w-10 justify-center mx-auto"
                      : "h-10 px-3"}
                    ${active
                      ? "bg-white/[0.09] text-white"
                      : "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"}
                  `}
                >
                  {/* Active left-border accent */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#E8472F]" />
                  )}
                  <Icon
                    size={16}
                    strokeWidth={active ? 2 : 1.7}
                    className={active ? "text-white" : "text-white/45"}
                  />
                  {(!collapsed || mobile) && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {(!collapsed || mobile) && "badge" in item && item.badge && (
                    <span className="w-5 h-5 rounded-full bg-[#E8472F] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Create Event CTA ── */}
      {(!collapsed || mobile) && (
        <div className="px-3 pb-3">
          <Link
            href="/organiser/events/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[13px] font-semibold rounded-xl transition-colors no-underline"
          >
            <Plus size={14} />
            New Event
          </Link>
        </div>
      )}
      {collapsed && !mobile && (
        <div className="flex justify-center pb-3">
          <Link
            href="/organiser/events/new"
            title="New Event"
            className="w-10 h-10 bg-[#E8472F] hover:bg-[#c73a24] text-white rounded-xl flex items-center justify-center transition-colors no-underline"
          >
            <Plus size={15} />
          </Link>
        </div>
      )}

      {/* ── Bottom: user + help ── */}
      <div className="border-t border-white/[0.07] px-2 py-3 flex flex-col gap-1">
        {/* Help */}
        <Link
          href="/organiser/help"
          title={collapsed && !mobile ? "Help" : undefined}
          className={`
            flex items-center gap-3 rounded-xl text-[13px] font-medium text-white/40
            hover:text-white/80 hover:bg-white/[0.05] transition-all no-underline mb-1
            ${collapsed && !mobile ? "h-10 w-10 justify-center mx-auto" : "h-9 px-3"}
          `}
        >
          <HelpCircle size={15} strokeWidth={1.7} />
          {(!collapsed || mobile) && "Help & docs"}
        </Link>

        {/* Account row */}
        <div
          className={`
            flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer
            hover:bg-white/[0.05] transition-all group
            ${collapsed && !mobile ? "justify-center px-0 mx-1" : ""}
          `}
        >
          <div className="w-7 h-7 rounded-lg bg-[#E8472F]/80 flex items-center justify-center flex-shrink-0 text-[12px] font-bold text-white">
            JO
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-white truncate leading-none mb-0.5">
                Jane O.
              </p>
              <p className="text-[10.5px] text-white/35 truncate">TechSummit Europe</p>
            </div>
          )}
          {(!collapsed || mobile) && (
            <LogOut
              size={14}
              className="text-white/25 group-hover:text-white/60 flex-shrink-0 transition-colors"
            />
          )}
        </div>
      </div>

      {/* ── Collapse toggle (desktop only) ── */}
      {!mobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute -right-3 top-[72px] w-6 h-6 rounded-full
            bg-[#0D1B2A] border border-white/[0.12] text-white/50
            hover:text-white hover:border-white/25 transition-all
            flex items-center justify-center cursor-pointer
            shadow-[0_2px_8px_rgba(0,0,0,0.4)]
          "
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </aside>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────

function TopBar({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const pathname = usePathname();

  // Build breadcrumb from pathname
  const segments = pathname.replace("/organiser/", "").split("/").filter(Boolean);
  const crumbs = [
    { label: "Organiser", href: "/organiser/dashboard" },
    ...segments.map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: "/organiser/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <header className="h-[60px] flex-shrink-0 flex items-center justify-between px-5 bg-[#FAFAF8] border-b border-[#e8edf3] z-20">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-[#e8edf3] text-[#475569] hover:bg-white transition-colors cursor-pointer bg-transparent"
        >
          <Menu size={17} />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              {i > 0 && <ChevronRight size={12} className="text-[#94a3b8]" />}
              <Link
                href={crumb.href}
                className={`text-[13px] no-underline transition-colors ${
                  i === crumbs.length - 1
                    ? "font-semibold text-[#0D1B2A]"
                    : "text-[#94a3b8] hover:text-[#0D1B2A]"
                }`}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: search + actions */}
      <div className="flex items-center gap-2.5">
        {/* Search */}
        <button className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-xl border border-[#e8edf3] bg-white text-[13px] text-[#94a3b8] hover:border-[#38AADD] transition-colors cursor-pointer">
          <Search size={14} />
          <span>Search…</span>
          <kbd className="ml-2 text-[10px] text-[#cbd5e1] font-mono bg-[#f1f5f9] px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[#e8edf3] bg-white text-[#64748b] hover:border-[#38AADD] hover:text-[#0D1B2A] transition-all cursor-pointer">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8472F] border-2 border-white" />
          </button>
        </div>

        {/* Quick create */}
        <Link
          href="/organiser/events/new"
          className="hidden sm:flex items-center gap-2 h-9 px-4 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[13px] font-semibold rounded-xl transition-colors no-underline"
        >
          <Plus size={14} />
          New Event
        </Link>

        {/* Org avatar */}
        <div className="flex items-center gap-2.5 pl-1 border-l border-[#e8edf3] ml-1">
          <div className="w-8 h-8 rounded-xl bg-[#0D1B2A] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            TE
          </div>
          <div className="hidden md:block">
            <p className="text-[12px] font-semibold text-[#0D1B2A] leading-none">TechSummit EU</p>
            <p className="text-[10.5px] text-[#94a3b8] mt-0.5">Professional plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function OrganiserLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen flex bg-[#FAFAF8]" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>

        {/* ── Desktop Sidebar ── */}
        <div className="hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0">
          <Sidebar />
        </div>

        {/* ── Mobile Sidebar Overlay ── */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm" />

            {/* Drawer */}
            <div
              className="absolute left-0 top-0 h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar mobile onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* ── Main content column ── */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <TopBar onMobileMenuOpen={() => setMobileOpen(true)} />

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {/* Subtle grid texture on content area */}
            <div
              className="min-h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #e8edf3 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            >
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </main>

          {/* Status bar */}
          <footer className="flex-shrink-0 h-8 border-t border-[#e8edf3] bg-white flex items-center justify-between px-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DC64C] animate-pulse" />
                <span className="text-[10.5px] text-[#94a3b8]">All systems operational</span>
              </div>
              <span className="text-[#e8edf3]">·</span>
              <span className="text-[10.5px] text-[#94a3b8]">Webhook: active</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10.5px] text-[#94a3b8]">
                © {new Date().getFullYear()} VirtualNet Ltd
              </span>
            </div>
          </footer>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}