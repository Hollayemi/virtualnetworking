"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus, Search, SlidersHorizontal, CalendarDays, Users, MapPin, Globe,
  Wifi, MoreHorizontal, TrendingUp, Zap, Shield, Clock, CheckCircle,
  XCircle, Radio, ArrowRight, Eye, Edit3, Trash2, Copy, Share2,
  BarChart3, ChevronDown, Download, Upload, Grid3X3, List,
  Layers, Bookmark, Star, ArrowUpRight, Filter, X,
  ChevronRight, AlertCircle, ToggleLeft, ExternalLink, ImageOff
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EventTier {
  _id: string;
  label: string;
  price: number;
  capacity: number;
  color: string;
  description?: string;
}

interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "draft" | "published" | "live" | "ended" | "cancelled";
  location: {
    type: "physical" | "virtual" | "hybrid";
    city?: string;
    venue?: string;
    address?: string;
    virtualLink?: string;
  };
  tiers: EventTier[];
  images: string[];
  bannerUrl?: string;
  registrationCount: number;
  connectionCount: number;
  meetingCount: number;
  messageCount: number;
  viewCount: number;
  networkingAccessSent: boolean;
  postEventNetworkingEnabled: boolean;
  createdAt: string;
  organiser: {
    _id: string;
    name: string;
    organisationName: string;
  };
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const MOCK_EVENTS: Event[] = [
  {
    _id: "e1",
    name: "Web Summit London 2025",
    description: "Europe's premier technology conference bringing together the world's leading founders, investors, and technology executives for three days of unparalleled networking.",
    startDate: "2025-07-14T09:00:00Z",
    endDate: "2025-07-16T18:00:00Z",
    status: "live",
    location: { type: "physical", city: "London", venue: "ExCeL London", address: "Royal Docks, London E16 1XL" },
    tiers: [
      { _id: "t1", label: "Regular", price: 0, capacity: 500, color: "#38AADD" },
      { _id: "t2", label: "Premium", price: 149, capacity: 300, color: "#8DC64C" },
      { _id: "t3", label: "VIP", price: 499, capacity: 50, color: "#f59e0b" },
    ],
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"],
    bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    registrationCount: 842,
    connectionCount: 1240,
    meetingCount: 213,
    messageCount: 3420,
    viewCount: 12400,
    networkingAccessSent: true,
    postEventNetworkingEnabled: true,
    createdAt: "2025-05-10T12:00:00Z",
    organiser: { _id: "o1", name: "Jane O.", organisationName: "TechSummit Europe" },
  },
  {
    _id: "e2",
    name: "FinTech Connect 2025",
    description: "The premier fintech networking event in the North of England. Meet bank CXOs, payment pioneers, and fintech founders.",
    startDate: "2025-07-22T09:00:00Z",
    endDate: "2025-07-22T18:00:00Z",
    status: "published",
    location: { type: "hybrid", city: "Manchester", venue: "Manchester Central" },
    tiers: [
      { _id: "t4", label: "Regular", price: 0, capacity: 400, color: "#38AADD" },
      { _id: "t5", label: "VIP", price: 299, capacity: 60, color: "#f59e0b" },
    ],
    images: ["https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80"],
    bannerUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    registrationCount: 480,
    connectionCount: 610,
    meetingCount: 89,
    messageCount: 1820,
    viewCount: 6700,
    networkingAccessSent: true,
    postEventNetworkingEnabled: false,
    createdAt: "2025-05-20T08:00:00Z",
    organiser: { _id: "o1", name: "Jane O.", organisationName: "TechSummit Europe" },
  },
  {
    _id: "e3",
    name: "AI Builders Summit — Autumn Edition",
    description: "Deep dives for AI engineers and product teams. Live demos, architecture talks, and structured breakout sessions by speciality.",
    startDate: "2025-09-10T09:00:00Z",
    endDate: "2025-09-10T17:00:00Z",
    status: "published",
    location: { type: "virtual" },
    tiers: [
      { _id: "t6", label: "Regular", price: 0, capacity: 1000, color: "#38AADD" },
      { _id: "t7", label: "Workshop Pass", price: 49, capacity: 200, color: "#8DC64C" },
    ],
    images: ["https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80"],
    bannerUrl: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80",
    registrationCount: 1104,
    connectionCount: 2340,
    meetingCount: 412,
    messageCount: 8910,
    viewCount: 21000,
    networkingAccessSent: false,
    postEventNetworkingEnabled: false,
    createdAt: "2025-06-01T10:00:00Z",
    organiser: { _id: "o1", name: "Jane O.", organisationName: "TechSummit Europe" },
  },
  {
    _id: "e4",
    name: "Founder Summit Series: Seed Edition",
    description: "Intimate event pairing seed-stage founders directly with active early-stage investors. Structured 1:1 matching included.",
    startDate: "2025-08-05T10:00:00Z",
    endDate: "2025-08-05T17:00:00Z",
    status: "draft",
    location: { type: "physical", city: "London", venue: "Kings Place" },
    tiers: [
      { _id: "t8", label: "Founder", price: 0, capacity: 150, color: "#38AADD" },
      { _id: "t9", label: "Investor", price: 499, capacity: 50, color: "#f59e0b" },
    ],
    images: [],
    bannerUrl: undefined,
    registrationCount: 0,
    connectionCount: 0,
    meetingCount: 0,
    messageCount: 0,
    viewCount: 0,
    networkingAccessSent: false,
    postEventNetworkingEnabled: false,
    createdAt: "2025-06-08T14:00:00Z",
    organiser: { _id: "o1", name: "Jane O.", organisationName: "TechSummit Europe" },
  },
  {
    _id: "e5",
    name: "HealthTech Innovation Forum",
    description: "Connecting NHS digital leads, medtech startups, and healthcare investors to shape the future of digital health in the UK.",
    startDate: "2025-03-12T09:00:00Z",
    endDate: "2025-03-13T17:00:00Z",
    status: "ended",
    location: { type: "hybrid", city: "Edinburgh", venue: "EICC" },
    tiers: [
      { _id: "t10", label: "Regular", price: 0, capacity: 300, color: "#38AADD" },
      { _id: "t11", label: "VIP", price: 350, capacity: 50, color: "#f59e0b" },
    ],
    images: ["https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"],
    bannerUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    registrationCount: 320,
    connectionCount: 890,
    meetingCount: 156,
    messageCount: 4210,
    viewCount: 9800,
    networkingAccessSent: true,
    postEventNetworkingEnabled: false,
    createdAt: "2025-01-15T09:00:00Z",
    organiser: { _id: "o1", name: "Jane O.", organisationName: "TechSummit Europe" },
  },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  draft:     { label: "Draft",     bg: "#f1f5f9", text: "#475569", border: "#cbd5e1", dot: "#94a3b8" },
  published: { label: "Published", bg: "#eef8fe", text: "#0369a1", border: "#7ec9f3", dot: "#38AADD" },
  live:      { label: "Live",      bg: "#fef2f0", text: "#b91c1c", border: "#fbc1b8", dot: "#E8472F" },
  ended:     { label: "Ended",     bg: "#f0f9ec", text: "#3d6b1e", border: "#a8d868", dot: "#8DC64C" },
  cancelled: { label: "Cancelled", bg: "#fef2f0", text: "#7f1d1d", border: "#fecaca", dot: "#ef4444" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Event["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold border"
      style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === "live" ? "animate-pulse" : ""}`}
        style={{ background: cfg.dot }}
      />
      {cfg.label}
    </span>
  );
}

function LocationBadge({ location }: { location: Event["location"] }) {
  const icons = { physical: MapPin, virtual: Globe, hybrid: Wifi };
  const Icon = icons[location.type];
  const label = location.type === "virtual" ? "Virtual" : location.city || "—";
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#64748b]">
      <Icon size={12} />
      {label}
    </span>
  );
}

function EventImage({ src, name }: { src?: string; name: string }) {
  if (!src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#e8edf3] to-[#f1f5f9]">
        <ImageOff size={20} className="text-[#cbd5e1]" />
        <span className="text-[10px] text-[#94a3b8] font-medium">No image</span>
      </div>
    );
  }
  return <img src={src} alt={name} className="w-full h-full object-cover" />;
}

function MetricPill({ icon: Icon, value, label, color = "#64748b" }: {
  icon: React.FC<any>; value: number | string; label: string; color?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[12px]" style={{ color }}>
      <Icon size={12} />
      <span className="font-semibold">{typeof value === "number" ? value.toLocaleString() : value}</span>
      <span className="text-[#94a3b8]">{label}</span>
    </div>
  );
}

function EventCardGrid({ event, onAction }: { event: Event; onAction: (id: string, action: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isSameDay = startDate.toDateString() === endDate.toDateString();
  const hasVip = event.tiers.some(t => t.label.toLowerCase().includes("vip"));
  const totalCapacity = event.tiers.reduce((s, t) => s + t.capacity, 0);
  const fillPct = totalCapacity ? Math.round((event.registrationCount / totalCapacity) * 100) : 0;

  return (
    <div className="group bg-white border border-[#e8edf3] rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(13,27,42,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Banner */}
      <div className="relative h-[148px] bg-[#0D1B2A] overflow-hidden flex-shrink-0">
        <EventImage src={event.bannerUrl} name={event.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-transparent" />

        {/* Status + live pulse */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={event.status} />
          {event.status === "live" && (
            <span className="flex items-center gap-1 bg-[#E8472F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Radio size={9} /> LIVE
            </span>
          )}
        </div>

        {/* Action menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer border-none"
            >
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-9 bg-white border border-[#e8edf3] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-44 z-20 py-1.5 overflow-hidden">
                {[
                  { icon: Eye, label: "View details", action: "view" },
                  { icon: Edit3, label: "Edit event", action: "edit" },
                  { icon: BarChart3, label: "Analytics", action: "analytics" },
                  { icon: Share2, label: "Share access link", action: "share" },
                  { icon: Copy, label: "Duplicate", action: "duplicate" },
                  { icon: Trash2, label: "Delete", action: "delete", danger: true },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.action}
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onAction(event._id, item.action); }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-medium transition-colors cursor-pointer border-none bg-transparent text-left ${
                        (item as any).danger ? "text-[#E8472F] hover:bg-red-50" : "text-[#0D1B2A] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <Icon size={13} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom tier pills */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {event.tiers.map(t => (
            <span
              key={t._id}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: `${t.color}bb` }}
            >
              {t.label} {t.price === 0 ? "Free" : `£${t.price}`}
            </span>
          ))}
          {hasVip && (
            <span className="flex items-center gap-1 bg-[#f59e0b]/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              <Shield size={8} /> VIP Gate
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Date + location */}
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-[#38AADD]">
            {startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            {!isSameDay && ` → ${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
          </span>
          <LocationBadge location={event.location} />
        </div>

        {/* Name */}
        <h3
          className="font-semibold text-[#0D1B2A] text-[15px] leading-snug line-clamp-2"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          {event.name}
        </h3>

        <p className="text-[12.5px] text-[#64748b] leading-relaxed line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Fill bar */}
        {event.status !== "draft" && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#94a3b8] font-medium">Capacity</span>
              <span className="font-semibold text-[#0D1B2A]">
                {event.registrationCount.toLocaleString()} / {totalCapacity.toLocaleString()}
                <span className="text-[#94a3b8] font-normal ml-1">({fillPct}%)</span>
              </span>
            </div>
            <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${fillPct}%`,
                  background: fillPct > 90 ? "#E8472F" : fillPct > 70 ? "#f59e0b" : "#8DC64C",
                }}
              />
            </div>
          </div>
        )}

        {/* Metrics row */}
        {event.status !== "draft" ? (
          <div className="flex items-center gap-4 border-t border-[#f1f5f9] pt-3 flex-wrap">
            <MetricPill icon={Users} value={event.registrationCount} label="reg." color="#38AADD" />
            <MetricPill icon={Zap} value={event.connectionCount} label="conn." color="#8DC64C" />
            <MetricPill icon={CalendarDays} value={event.meetingCount} label="mtgs" color="#f59e0b" />
          </div>
        ) : (
          <div className="flex items-center gap-2 border-t border-[#f1f5f9] pt-3">
            <AlertCircle size={13} className="text-[#94a3b8]" />
            <span className="text-[12px] text-[#94a3b8]">Publish to start accepting registrations</span>
          </div>
        )}

        {/* CTA row */}
        <div className="flex gap-2 mt-1">
          {event.status === "draft" && (
            <>
              <button
                onClick={() => onAction(event._id, "edit")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0D1B2A] hover:bg-[#1e293b] text-white text-[12px] font-semibold rounded-xl border-none cursor-pointer transition-colors"
              >
                <Edit3 size={12} /> Continue editing
              </button>
            </>
          )}
          {(event.status === "published" || event.status === "live") && (
            <>
              <button
                onClick={() => onAction(event._id, "analytics")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#e8edf3] text-[#64748b] text-[12px] font-medium rounded-xl hover:border-[#38AADD] hover:text-[#0D1B2A] cursor-pointer bg-transparent transition-colors"
              >
                <BarChart3 size={12} />
              </button>
              {!event.networkingAccessSent && (
                <button
                  onClick={() => onAction(event._id, "sendAccess")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[12px] font-semibold rounded-xl border-none cursor-pointer transition-colors"
                >
                  <Share2 size={12} /> Send access links
                </button>
              )}
              {event.networkingAccessSent && (
                <button
                  onClick={() => onAction(event._id, "view")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e8edf3] text-[#0D1B2A] text-[12px] font-medium rounded-xl hover:border-[#0D1B2A] cursor-pointer bg-transparent transition-colors"
                >
                  <Eye size={12} /> View event
                </button>
              )}
            </>
          )}
          {event.status === "ended" && (
            <button
              onClick={() => onAction(event._id, "analytics")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e8edf3] text-[#64748b] text-[12px] font-medium rounded-xl hover:border-[#38AADD] hover:text-[#0D1B2A] cursor-pointer bg-transparent transition-colors"
            >
              <BarChart3 size={12} /> View analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EventRowList({ event, onAction }: { event: Event; onAction: (id: string, action: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const startDate = new Date(event.startDate);
  const totalCapacity = event.tiers.reduce((s, t) => s + t.capacity, 0);
  const fillPct = totalCapacity ? Math.round((event.registrationCount / totalCapacity) * 100) : 0;

  return (
    <div className="group bg-white border border-[#e8edf3] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgba(13,27,42,0.08)] transition-all duration-200">
      <div className="flex items-stretch">
        {/* Image strip */}
        <div className="w-[80px] flex-shrink-0 relative overflow-hidden">
          <EventImage src={event.bannerUrl} name={event.name} />
          {event.status === "live" && (
            <div className="absolute inset-0 border-l-2 border-[#E8472F]" />
          )}
        </div>

        <div className="flex-1 flex items-center gap-5 px-5 py-4 min-w-0">
          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <StatusBadge status={event.status} />
              <LocationBadge location={event.location} />
              <span className="text-[11.5px] text-[#94a3b8]">
                {startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
            <h3
              className="font-semibold text-[#0D1B2A] text-[14.5px] leading-snug truncate"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {event.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              {event.tiers.map(t => (
                <span key={t._id} className="text-[11px] px-2 py-0.5 rounded-full font-semibold text-white" style={{ background: t.color }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Capacity */}
          {event.status !== "draft" && (
            <div className="hidden lg:block w-32 flex-shrink-0">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-[#94a3b8]">Capacity</span>
                <span className="font-semibold text-[#0D1B2A]">{fillPct}%</span>
              </div>
              <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${fillPct}%`,
                    background: fillPct > 90 ? "#E8472F" : fillPct > 70 ? "#f59e0b" : "#8DC64C",
                  }}
                />
              </div>
              <div className="text-[10.5px] text-[#94a3b8] mt-1">
                {event.registrationCount.toLocaleString()} / {totalCapacity.toLocaleString()}
              </div>
            </div>
          )}

          {/* Stats */}
          {event.status !== "draft" && (
            <div className="hidden xl:flex items-center gap-5 flex-shrink-0">
              {[
                { icon: Users, val: event.registrationCount, lbl: "reg", color: "#38AADD" },
                { icon: Zap, val: event.connectionCount, lbl: "conn", color: "#8DC64C" },
                { icon: CalendarDays, val: event.meetingCount, lbl: "mtgs", color: "#f59e0b" },
              ].map(({ icon: Icon, val, lbl, color }) => (
                <div key={lbl} className="text-center">
                  <div className="text-[14px] font-bold text-[#0D1B2A]">{val.toLocaleString()}</div>
                  <div className="text-[10.5px] flex items-center gap-1 justify-center mt-0.5" style={{ color }}>
                    <Icon size={10} /> {lbl}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {event.status === "draft" && (
              <Link
                href={`/organiser/events/${event._id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0D1B2A] hover:bg-[#1e293b] text-white text-[12px] font-semibold rounded-xl no-underline transition-colors"
              >
                <Edit3 size={12} /> Edit
              </Link>
            )}
            {(event.status === "published" || event.status === "live") && (
              <Link
                href={`/organiser/events/${event._id}`}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#e8edf3] text-[#64748b] hover:border-[#38AADD] hover:text-[#0D1B2A] text-[12px] font-medium rounded-xl no-underline transition-colors"
              >
                <Eye size={12} /> View
              </Link>
            )}
            {event.status === "ended" && (
              <Link
                href={`/organiser/events/${event._id}/analytics`}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#e8edf3] text-[#64748b] hover:border-[#38AADD] hover:text-[#0D1B2A] text-[12px] font-medium rounded-xl no-underline transition-colors"
              >
                <BarChart3 size={12} /> Analytics
              </Link>
            )}

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-xl border border-[#e8edf3] text-[#64748b] hover:border-[#94a3b8] flex items-center justify-center cursor-pointer bg-white transition-colors"
              >
                <MoreHorizontal size={14} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-10 bg-white border border-[#e8edf3] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-44 z-20 py-1.5">
                  {[
                    { icon: Edit3, label: "Edit event", action: "edit" },
                    { icon: BarChart3, label: "Analytics", action: "analytics" },
                    { icon: Share2, label: "Share access link", action: "share" },
                    { icon: Download, label: "Export attendees", action: "export" },
                    { icon: Copy, label: "Duplicate", action: "duplicate" },
                    { icon: Trash2, label: "Delete", action: "delete", danger: true },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.action}
                        onClick={() => { setMenuOpen(false); onAction(event._id, item.action); }}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-medium transition-colors cursor-pointer border-none bg-transparent text-left ${
                          (item as any).danger ? "text-[#E8472F] hover:bg-red-50" : "text-[#0D1B2A] hover:bg-[#f8fafc]"
                        }`}
                      >
                        <Icon size={13} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function SummaryCard({ label, value, sub, icon: Icon, accent, bg, delta }: {
  label: string; value: string | number; sub?: string;
  icon: React.FC<any>; accent: string; bg: string; delta?: string;
}) {
  return (
    <div className="bg-white border border-[#e8edf3] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
          <Icon size={17} style={{ color: accent }} />
        </div>
        {delta && (
          <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#8DC64C]">
            <ArrowUpRight size={12} /> {delta}
          </span>
        )}
      </div>
      <div className="text-[28px] font-bold text-[#0D1B2A]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
        {value}
      </div>
      <div className="text-[12px] text-[#64748b] mt-0.5">{label}</div>
      {sub && <div className="text-[11px] text-[#94a3b8] mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mb-5">
        <CalendarDays size={28} className="text-[#cbd5e1]" />
      </div>
      <h3
        className="text-[20px] font-semibold text-[#0D1B2A] mb-2"
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        No events yet
      </h3>
      <p className="text-[13.5px] text-[#64748b] mb-7 max-w-[360px] leading-relaxed">
        Create your first event to start building a structured networking experience for your attendees.
      </p>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 px-6 py-3 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[13.5px] font-semibold rounded-xl border-none cursor-pointer transition-colors"
      >
        <Plus size={15} /> Create your first event
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["all", "live", "published", "draft", "ended", "cancelled"] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

export default function OrganiserEventsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleAction = (id: string, action: string) => {
    console.log("Action:", action, "Event:", id);
  };

  const filtered = useMemo(() => {
    let list = [...MOCK_EVENTS];
    if (search) list = list.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") list = list.filter(e => e.status === statusFilter);
    if (typeFilter !== "all") list = list.filter(e => e.location.type === typeFilter);
    if (sortBy === "newest") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sortBy === "soonest") list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    if (sortBy === "registrations") list.sort((a, b) => b.registrationCount - a.registrationCount);
    return list;
  }, [search, statusFilter, typeFilter, sortBy]);

  // Aggregate stats
  const totalRegistrations = MOCK_EVENTS.reduce((s, e) => s + e.registrationCount, 0);
  const totalConnections = MOCK_EVENTS.reduce((s, e) => s + e.connectionCount, 0);
  const totalMeetings = MOCK_EVENTS.reduce((s, e) => s + e.meetingCount, 0);
  const liveCount = MOCK_EVENTS.filter(e => e.status === "live").length;

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-[26px] font-semibold text-[#0D1B2A] leading-tight mb-1"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Events
          </h1>
          <p className="text-[13.5px] text-[#64748b]">
            {MOCK_EVENTS.length} events · {liveCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[#E8472F] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8472F] animate-pulse" />
                {liveCount} live now
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e8edf3] bg-white text-[#64748b] hover:border-[#94a3b8] text-[13px] font-medium rounded-xl cursor-pointer transition-colors">
            <Upload size={14} /> Import CSV
          </button>
          <Link
            href="/organiser/events/create"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E8472F] hover:bg-[#c73a24] text-white text-[13px] font-semibold rounded-xl no-underline transition-colors"
          >
            <Plus size={15} /> New event
          </Link>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total registrations"
          value={totalRegistrations.toLocaleString()}
          sub="across all events"
          icon={Users}
          accent="#38AADD"
          bg="#eef8fe"
          delta="+12%"
        />
        <SummaryCard
          label="Connections made"
          value={totalConnections.toLocaleString()}
          sub="networking actions"
          icon={Zap}
          accent="#8DC64C"
          bg="#f0f9ec"
          delta="+24%"
        />
        <SummaryCard
          label="Meetings scheduled"
          value={totalMeetings.toLocaleString()}
          sub="across all events"
          icon={CalendarDays}
          accent="#f59e0b"
          bg="#fffbeb"
        />
        <SummaryCard
          label="Active events"
          value={MOCK_EVENTS.filter(e => e.status === "live" || e.status === "published").length}
          sub={`${liveCount} live right now`}
          icon={Radio}
          accent="#E8472F"
          bg="#fef2f0"
        />
      </div>

      {/* ── Search + filters bar ── */}
      <div className="bg-white border border-[#e8edf3] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f1f5f9]">
          {/* Search */}
          <div className="relative flex-1 max-w-[380px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events…"
              className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e8edf3] rounded-xl text-[13px] text-[#0D1B2A] placeholder-[#94a3b8] outline-none focus:border-[#38AADD] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] bg-transparent border-none cursor-pointer">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium border transition-all cursor-pointer ${
              showFilters ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-[#e8edf3] text-[#64748b] hover:border-[#94a3b8] bg-white"
            }`}
          >
            <SlidersHorizontal size={13} /> Filters
          </button>

          <div className="ml-auto flex items-center gap-2">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-[#e8edf3] rounded-xl text-[12.5px] text-[#64748b] outline-none focus:border-[#38AADD] bg-white cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="soonest">Upcoming first</option>
              <option value="registrations">Most registrations</option>
            </select>
            {/* View toggle */}
            <div className="flex bg-[#f8fafc] border border-[#e8edf3] rounded-xl p-0.5">
              {[
                { v: "grid" as const, icon: Grid3X3 },
                { v: "list" as const, icon: List },
              ].map(({ v, icon: Icon }) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all ${
                    view === v ? "bg-white shadow-sm text-[#0D1B2A]" : "text-[#94a3b8] hover:text-[#64748b] bg-transparent"
                  }`}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="px-5 py-4 bg-[#fafaf8] border-b border-[#f1f5f9] flex items-center gap-4 flex-wrap">
            <div>
              <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1.5">Event type</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-[#e8edf3] rounded-xl text-[12.5px] text-[#0D1B2A] outline-none focus:border-[#38AADD] bg-white cursor-pointer"
              >
                <option value="all">All types</option>
                <option value="physical">In Person</option>
                <option value="virtual">Virtual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex items-end gap-2 mt-auto">
              <button
                onClick={() => { setTypeFilter("all"); setSortBy("newest"); setSearch(""); }}
                className="text-[12px] text-[#E8472F] font-medium hover:underline cursor-pointer bg-transparent border-none"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Status tabs */}
        <div className="flex items-center gap-1 px-5 py-3 overflow-x-auto scrollbar-hide">
          {STATUS_FILTERS.map(f => {
            const count = f === "all" ? MOCK_EVENTS.length : MOCK_EVENTS.filter(e => e.status === f).length;
            const cfg = f !== "all" ? STATUS_CONFIG[f] : null;
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-all cursor-pointer border-none capitalize ${
                  statusFilter === f
                    ? "bg-[#0D1B2A] text-white"
                    : "text-[#64748b] hover:bg-[#f1f5f9]"
                }`}
              >
                {cfg && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f === "live" && statusFilter === f ? "animate-pulse" : ""}`}
                    style={{ background: statusFilter === f ? "rgba(255,255,255,0.6)" : cfg.dot }}
                  />
                )}
                {f === "all" ? "All events" : cfg!.label}
                <span className={`text-[10.5px] px-1.5 py-0.5 rounded-full font-bold ${statusFilter === f ? "bg-white/20 text-white" : "bg-[#f1f5f9] text-[#94a3b8]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      {filtered.length === 0 ? (
        search || statusFilter !== "all" ? (
          <div className="text-center py-16 bg-white border border-[#e8edf3] rounded-2xl">
            <Search size={28} className="text-[#cbd5e1] mx-auto mb-3" />
            <h3 className="text-[15px] font-semibold text-[#0D1B2A] mb-1" style={{ fontFamily: "var(--font-fraunces), serif" }}>
              No events match
            </h3>
            <p className="text-[13px] text-[#64748b] mb-5">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); }}
              className="px-5 py-2 bg-[#0D1B2A] text-white text-[13px] font-medium rounded-xl border-none cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#e8edf3] rounded-2xl">
            <EmptyState onCreateClick={() => window.location.href = "/organiser/events/create"} />
          </div>
        )
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(e => (
            <EventCardGrid key={e._id} event={e} onAction={handleAction} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(e => (
            <EventRowList key={e._id} event={e} onAction={handleAction} />
          ))}
        </div>
      )}

      {/* ── Bottom results count ── */}
      {filtered.length > 0 && (
        <p className="text-[12.5px] text-[#94a3b8] text-center pb-2">
          Showing {filtered.length} of {MOCK_EVENTS.length} events
        </p>
      )}
    </div>
  );
}