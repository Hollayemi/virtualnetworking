"use client";
import { useState } from "react";
import {
  User, Wallet, Calendar, Users, Settings, Bell, Shield, LogOut,
  Star, TrendingUp, Zap, CheckCircle, XCircle, Clock, ChevronRight,
  Edit3, Eye, EyeOff, Building2, Mail, Phone, Globe, Briefcase,
  ArrowUpRight, ArrowDownLeft, Coins, Award, MessageSquare,
  ToggleLeft, ToggleRight, Camera, Copy, ExternalLink, AlertCircle,
  Handshake, BadgeCheck, Bookmark, X, Check, Timer, MapPin, Filter
} from "lucide-react";


import HomeWrapper from "../components/wrapper";

// ─── Dummy data ───────────────────────────────────────────────────────────────

const USER = {
  _id: "u_abc123",
  name: "Alex Mensah",
  email: "alex.mensah@lumio.io",
  phone: "+44 7700 900123",
  bio: "Fintech founder building the next generation of embedded payments. Looking to connect with investors and technical co-founders.",
  role: "Founder & CEO",
  company: "Lumio Finance",
  industry: "Finance & Fintech",
  networkingGoals: "Investment",
  vipProtection: false,
  isVerified: true,
  interests: ["Payments", "B2B SaaS", "Open Banking"],
  joinedAt: "2024-11-15",
};

const WALLET = {
  balance: 34,
  totalEarned: 87,
  totalSpent: 53,
};

const TRANSACTIONS = [
  { _id: "t1", type: "credit", amount: 25, description: "Credit package: Starter Pack", createdAt: "2025-06-08T10:20:00Z" },
  { _id: "t2", type: "debit", amount: 3, description: "VIP connection request — James K. (Sequoia)", createdAt: "2025-06-07T14:11:00Z" },
  { _id: "t3", type: "credit", amount: 1, description: "Cashback: connection accepted by Priya S.", createdAt: "2025-06-06T09:55:00Z" },
  { _id: "t4", type: "credit", amount: 10, description: "Registration reward: Web Summit London 2025", createdAt: "2025-06-05T18:30:00Z" },
  { _id: "t5", type: "debit", amount: 3, description: "VIP connection request — Dana L. (Google)", createdAt: "2025-06-03T11:00:00Z" },
  { _id: "t6", type: "credit", amount: 5, description: "Referral reward: Tom W. joined via your link", createdAt: "2025-06-01T08:44:00Z" },
];

const REGISTRATIONS = [
  { _id: "r1", eventName: "Web Summit London 2025", tier: "Premium", status: "confirmed", startDate: "2025-07-14", city: "London", emoji: "🚀", bannerColor: "#0D1B2A" },
  { _id: "r2", eventName: "FinTech Connect 2025", tier: "VIP", status: "confirmed", startDate: "2025-07-22", city: "Manchester", emoji: "💳", bannerColor: "#1a3a2a" },
  { _id: "r3", eventName: "AI Builders Summit", tier: "Regular", status: "confirmed", startDate: "2025-07-10", city: "Online", emoji: "🤖", bannerColor: "#1a0a2e" },
  { _id: "r4", eventName: "Founder Summit Q1 2025", tier: "Founder", status: "confirmed", startDate: "2025-02-18", city: "London", emoji: "🌱", bannerColor: "#2a1a0a" },
  { _id: "r5", eventName: "DevNation March Edition", tier: "General", status: "cancelled", startDate: "2025-03-12", city: "London", emoji: "⚙️", bannerColor: "#0f1e2e" },
];

const CONNECTIONS = [
  { _id: "c1", name: "James K.", role: "Partner", company: "Sequoia Capital", intentionTag: "Investment", status: "accepted", avatar: "J", avatarBg: "#f59e0b", eventName: "Web Summit London 2025", connectedAt: "2025-06-07T15:00:00Z" },
  { _id: "c2", name: "Priya S.", role: "VP Engineering", company: "Meta", intentionTag: "Mentorship", status: "accepted", avatar: "P", avatarBg: "#38AADD", eventName: "AI Builders Summit", connectedAt: "2025-06-06T10:30:00Z" },
  { _id: "c3", name: "Dana L.", role: "Senior SWE", company: "Google", intentionTag: "Collaboration", status: "pending", avatar: "D", avatarBg: "#8DC64C", eventName: "DevNation London", connectedAt: "2025-06-08T09:00:00Z" },
  { _id: "c4", name: "Carlos B.", role: "Founder", company: "OpenLedger", intentionTag: "Partnership", status: "accepted", avatar: "C", avatarBg: "#E8472F", eventName: "FinTech Connect 2025", connectedAt: "2025-06-04T16:15:00Z" },
  { _id: "c5", name: "Rachel O.", role: "Head of Events", company: "TechSummit EU", intentionTag: "Sales", status: "declined", avatar: "R", avatarBg: "#64748b", eventName: "Web Summit London 2025", connectedAt: "2025-06-03T12:00:00Z" },
];

type MeetingStatus = "upcoming" | "attended" | "missed";
type Meeting = {
  _id: string;
  with: string;
  company: string;
  date: string;
  duration: number;
  eventName: string;
  status: MeetingStatus;
  location: string;
};

const MEETINGS: Meeting[] = [
  { _id: "m1", with: "James K.", company: "Sequoia Capital", date: "2025-07-15T10:00:00Z", duration: 30, eventName: "Web Summit London 2025", status: "upcoming", location: "Meeting Room 3B, ExCeL" },
  { _id: "m2", with: "Priya S.", company: "Meta", date: "2025-07-11T14:30:00Z", duration: 20, eventName: "AI Builders Summit", status: "upcoming", location: "Virtual (Zoom)" },
  { _id: "m3", with: "Carlos B.", company: "OpenLedger", date: "2025-06-05T09:00:00Z", duration: 45, eventName: "FinTech Connect 2025", status: "attended", location: "Main Hall, Manchester Central" },
  { _id: "m4", with: "Tom W.", company: "HireHQ", date: "2025-04-22T11:00:00Z", duration: 30, eventName: "HR Leaders Forum", status: "attended", location: "Virtual" },
  { _id: "m5", with: "Yui H.", company: "Stripe", date: "2025-03-18T15:00:00Z", duration: 30, eventName: "FinovateEU", status: "missed", location: "Blue Room, EICC" },
];

const CREDIT_PACKAGES = [
  { _id: "p1", name: "Starter Pack", credits: 25, price: 9, isPopular: false },
  { _id: "p2", name: "Growth Pack", credits: 60, price: 19, isPopular: true },
  { _id: "p3", name: "Pro Pack", credits: 150, price: 39, isPopular: false },
  { _id: "p4", name: "Enterprise", credits: 500, price: 99, isPopular: false },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = "overview" | "connections" | "registrations" | "meetings" | "wallet" | "settings";

const TABS: { id: Tab; label: string; icon: React.FC<any> }[] = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "connections", label: "Connections", icon: Users },
  { id: "registrations", label: "Registrations", icon: Calendar },
  { id: "meetings", label: "Meetings", icon: Handshake },
  { id: "wallet", label: "Wallet", icon: Coins },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const accepted = CONNECTIONS.filter(c => c.status === "accepted").length;
  const upcoming = MEETINGS.filter(m => m.status === "upcoming").length;
  const attended = MEETINGS.filter(m => m.status === "attended").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Credits", value: WALLET.balance, icon: Coins, color: "#f59e0b", bg: "#fffbeb" },
          { label: "Connections", value: accepted, icon: Users, color: "#38AADD", bg: "#eef8fe" },
          { label: "Meetings attended", value: attended, icon: Handshake, color: "#8DC64C", bg: "#f0f9ec" },
          { label: "Events registered", value: REGISTRATIONS.filter(r => r.status === "confirmed").length, icon: Calendar, color: "#E8472F", bg: "#fef2f0" },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-navy-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  <Icon size={17} style={{ color: stat.color }} />
                </div>
              </div>
              <div className="font-display text-3xl font-bold text-navy-800">{stat.value}</div>
              <div className="text-[12.5px] text-navy-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Upcoming meetings */}
      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-50">
          <h3 className="font-semibold text-navy-800 text-[15px]">Upcoming meetings</h3>
          <span className="text-xs text-accent-500 font-semibold">{upcoming} scheduled</span>
        </div>
        {MEETINGS.filter(m => m.status === "upcoming").length === 0 ? (
          <div className="px-6 py-8 text-center text-navy-400 text-sm">No upcoming meetings</div>
        ) : (
          MEETINGS.filter(m => m.status === "upcoming").map(m => (
            <div key={m._id} className="flex items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Handshake size={17} className="text-accent-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-navy-800 text-sm">{m.with} <span className="text-navy-400 font-normal">· {m.company}</span></div>
                <div className="text-[12px] text-navy-400 mt-0.5">{m.eventName}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[12.5px] font-medium text-navy-700">
                  {new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>
                <div className="text-[11px] text-navy-400">
                  {new Date(m.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · {m.duration}m
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent connections */}
      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-50">
          <h3 className="font-semibold text-navy-800 text-[15px]">Recent connections</h3>
        </div>
        {CONNECTIONS.slice(0, 4).map(c => (
          <div key={c._id} className="flex items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: c.avatarBg }}>
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-navy-800 text-sm">{c.name}</div>
              <div className="text-[12px] text-navy-400">{c.role}, {c.company}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{
                background: c.status === "accepted" ? "#f0f9ec" : c.status === "pending" ? "#fffbeb" : "#fef2f0",
                color: c.status === "accepted" ? "#5c8c2c" : c.status === "pending" ? "#b45309" : "#b91c1c",
              }}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Connections Tab ──────────────────────────────────────────────────────────

function ConnectionsTab() {
  const [filter, setFilter] = useState<"all" | "accepted" | "pending" | "declined">("all");
  const list = CONNECTIONS.filter(c => filter === "all" ? true : c.status === filter);
  const intentionColors: Record<string, string> = {
    Investment: "#f59e0b", Mentorship: "#38AADD", Collaboration: "#8DC64C",
    Partnership: "#E8472F", Sales: "#8b5cf6", Hiring: "#ec4899",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "accepted", "pending", "declined"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium border transition-all cursor-pointer capitalize ${filter === f ? "bg-navy-800 text-white border-navy-800" : "border-navy-200 text-navy-600 hover:border-navy-400"}`}>
            {f} {f !== "all" && `(${CONNECTIONS.filter(c => c.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {list.map(c => (
          <div key={c._id} className="bg-white border border-navy-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0" style={{ background: c.avatarBg }}>
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-navy-800">{c.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: intentionColors[c.intentionTag] ?? "#64748b" }}>
                  {c.intentionTag}
                </span>
              </div>
              <div className="text-[12.5px] text-navy-400 mt-0.5">{c.role}, {c.company}</div>
              <div className="text-[11.5px] text-navy-300 mt-1">via {c.eventName}</div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold capitalize ${c.status === "accepted" ? "bg-green-50 text-green-700" : c.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
                {c.status}
              </span>
              {c.status === "accepted" && (
                <button className="flex items-center gap-1 text-[11.5px] text-accent-500 font-medium hover:underline cursor-pointer bg-transparent border-none">
                  <MessageSquare size={12} /> Message
                </button>
              )}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-12 text-navy-400 bg-white border border-navy-100 rounded-2xl">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No {filter} connections yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Registrations Tab ────────────────────────────────────────────────────────

function RegistrationsTab() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const now = new Date();
  const list = REGISTRATIONS.filter(r => {
    if (filter === "upcoming") return new Date(r.startDate) > now && r.status === "confirmed";
    if (filter === "past") return new Date(r.startDate) <= now || r.status === "cancelled";
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        {(["all", "upcoming", "past"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium border transition-all cursor-pointer capitalize ${filter === f ? "bg-navy-800 text-white border-navy-800" : "border-navy-200 text-navy-600 hover:border-navy-400"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {list.map(r => {
          const isPast = new Date(r.startDate) <= now;
          const isCancelled = r.status === "cancelled";
          return (
            <div key={r._id} className={`bg-white border border-navy-100 rounded-2xl overflow-hidden flex ${isCancelled ? "opacity-60" : ""}`}>
              <div className="w-16 flex-shrink-0 flex items-center justify-center text-3xl" style={{ background: r.bannerColor }}>
                {r.emoji}
              </div>
              <div className="flex-1 p-5 flex items-center gap-4 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-semibold text-navy-800 text-[14px]">{r.eventName}</h4>
                    {isCancelled && <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">Cancelled</span>}
                    {!isCancelled && isPast && <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">Attended</span>}
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-navy-400 flex-wrap">
                    <span><MapPin size={11} className="inline mr-1" />{r.city}</span>
                    <span><Calendar size={11} className="inline mr-1" />{new Date(r.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="px-2 py-0.5 rounded-full font-semibold text-[10px]" style={{ background: r.tier === "VIP" ? "#fffbeb" : r.tier === "Premium" ? "#eef8fe" : "#f8fafc", color: r.tier === "VIP" ? "#b45309" : r.tier === "Premium" ? "#0369a1" : "#475569" }}>
                      {r.tier}
                    </span>
                  </div>
                </div>
                {!isCancelled && (
                  <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                    {!isPast && (
                      <button className="text-[12px] text-accent-500 border border-accent-200 hover:bg-accent-50 px-3 py-1.5 rounded-lg font-medium cursor-pointer bg-transparent transition-colors">
                        View event
                      </button>
                    )}
                    {isPast && (
                      <div className="flex items-center gap-1.5 text-[12px] text-secondary-600">
                        <CheckCircle size={13} /> Attended
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Meetings Tab ─────────────────────────────────────────────────────────────

function MeetingsTab() {
  const statusColors = {
    upcoming: { bg: "#eef8fe", text: "#0369a1" },
    attended: { bg: "#f0f9ec", text: "#5c8c2c" },
    missed: { bg: "#fef2f0", text: "#b91c1c" },
  };

  const attended = MEETINGS.filter(m => m.status === "attended").length;
  const missed = MEETINGS.filter(m => m.status === "missed").length;
  const rate = MEETINGS.length ? Math.round((attended / MEETINGS.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total meetings", value: MEETINGS.length, icon: Handshake },
          { label: "Attended", value: attended, icon: CheckCircle },
          { label: "Attendance rate", value: `${rate}%`, icon: TrendingUp },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-navy-100 rounded-2xl p-5 text-center">
              <Icon size={20} className="text-accent-500 mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-navy-800">{s.value}</div>
              <div className="text-[11.5px] text-navy-400 mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-50">
          <h3 className="font-semibold text-navy-800 text-[15px]">Meeting history</h3>
        </div>
        {MEETINGS.map((m: Meeting) => {
          const colors = statusColors[m.status];
          return (
            <div key={m._id} className="flex items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0 font-bold text-navy-400 text-sm">
                {m.with.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-navy-800 text-[13.5px]">{m.with}
                  <span className="text-navy-400 font-normal"> · {m.company}</span>
                </div>
                <div className="text-[11.5px] text-navy-400 mt-0.5">{m.eventName}</div>
                <div className="text-[11px] text-navy-300 mt-0.5">
                  <MapPin size={10} className="inline mr-1" />{m.location}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[12.5px] font-medium text-navy-700">
                  {new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>
                <div className="text-[11px] text-navy-400 mb-2">
                  {new Date(m.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · {m.duration}m
                </div>
                <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full capitalize" style={{ background: colors.bg, color: colors.text }}>
                  {m.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Wallet Tab ───────────────────────────────────────────────────────────────

function WalletTab() {
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <div className="space-y-6">
      {/* Balance card */}
      <div className="bg-navy-800 rounded-2xl p-7 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/45 mb-3">Credit Balance</p>
          <div className="font-display text-[52px] font-bold leading-none mb-1">{WALLET.balance}</div>
          <p className="text-white/50 text-sm">credits available</p>
          <div className="flex gap-8 mt-6">
            {[
              { label: "Total earned", value: WALLET.totalEarned, icon: ArrowDownLeft },
              { label: "Total spent", value: WALLET.totalSpent, icon: ArrowUpRight },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label}>
                  <div className="flex items-center gap-1.5 text-white/45 text-[11px] mb-1">
                    <Icon size={11} /> {s.label}
                  </div>
                  <div className="font-display text-xl font-semibold">{s.value} cr</div>
                </div>
              );
            })}
          </div>
          <button onClick={() => setShowPurchase(!showPurchase)} className="mt-6 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer border-none">
            <Coins size={15} /> Buy more credits
          </button>
        </div>
      </div>

      {/* Credit packages */}
      {showPurchase && (
        <div className="bg-white border border-navy-100 rounded-2xl p-6">
          <h3 className="font-semibold text-navy-800 mb-4">Choose a credit pack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CREDIT_PACKAGES.map(p => (
              <div key={p._id} className={`relative border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${p.isPopular ? "border-accent-500 bg-accent-50" : "border-navy-200 hover:border-accent-300"}`}>
                {p.isPopular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">Best value</span>}
                <div className="font-display text-2xl font-bold text-navy-800 mb-0.5">{p.credits}</div>
                <div className="text-[11px] text-navy-400 mb-3">credits</div>
                <div className="font-semibold text-navy-800">£{p.price}</div>
                <div className="text-[10.5px] text-navy-400">£{(p.price / p.credits).toFixed(2)}/cr</div>
                <button className="mt-3 w-full bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold py-2 rounded-lg border-none cursor-pointer transition-colors">
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How credits work */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h4 className="font-semibold text-amber-800 text-sm mb-3">How credits work</h4>
        <div className="grid md:grid-cols-3 gap-3 text-[12.5px] text-amber-700">
          {[
            { icon: ArrowUpRight, text: "Spend credits to send VIP connection requests" },
            { icon: ArrowDownLeft, text: "Earn cashback when you accept requests from others" },
            { icon: Award, text: "Top leaderboard users receive bonus credit rewards" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2">
              <Icon size={13} className="mt-0.5 flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-50">
          <h3 className="font-semibold text-navy-800 text-[15px]">Transaction history</h3>
        </div>
        {TRANSACTIONS.map(t => (
          <div key={t._id} className="flex items-center gap-4 px-6 py-4 border-b border-navy-50 last:border-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === "credit" ? "bg-green-50" : "bg-red-50"}`}>
              {t.type === "credit" ? <ArrowDownLeft size={15} className="text-green-600" /> : <ArrowUpRight size={15} className="text-red-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-navy-700">{t.description}</div>
              <div className="text-[11px] text-navy-400 mt-0.5">
                {new Date(t.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>
            <div className={`font-semibold text-[14px] flex-shrink-0 ${t.type === "credit" ? "text-green-600" : "text-red-500"}`}>
              {t.type === "credit" ? "+" : "-"}{t.amount} cr
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab() {
  const [vipProtection, setVipProtection] = useState(USER.vipProtection);
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Profile settings */}
      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-50 flex items-center justify-between">
          <h3 className="font-semibold text-navy-800 text-[15px]">Profile information</h3>
          <button className="flex items-center gap-1.5 text-[12.5px] text-accent-500 font-medium border border-accent-200 hover:bg-accent-50 px-3 py-1.5 rounded-lg cursor-pointer bg-transparent transition-colors">
            <Edit3 size={13} /> Edit profile
          </button>
        </div>
        <div className="p-6">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-navy-50">
            <div className="w-16 h-16 rounded-2xl bg-navy-800 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
              {USER.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-semibold text-navy-800 text-lg">{USER.name}</h2>
                {USER.isVerified && <BadgeCheck size={17} className="text-primary-500" />}
              </div>
              <p className="text-sm text-navy-400">{USER.role} · {USER.company}</p>
              <button className="mt-2 flex items-center gap-1.5 text-[12px] text-navy-400 hover:text-navy-700 cursor-pointer bg-transparent border-none">
                <Camera size={12} /> Change photo
              </button>
            </div>
          </div>

          {/* Fields grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Mail, label: "Email", value: USER.email },
              { icon: Phone, label: "Phone", value: USER.phone },
              { icon: Briefcase, label: "Role / Job title", value: USER.role },
              { icon: Building2, label: "Company", value: USER.company },
              { icon: Globe, label: "Industry", value: USER.industry },
              { icon: TrendingUp, label: "Networking goal", value: USER.networkingGoals },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.label}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-1.5">{f.label}</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-navy-200 bg-white">
                    <Icon size={14} className="text-navy-400 flex-shrink-0" />
                    <span className="text-[13.5px] text-navy-700 flex-1 truncate">{f.value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bio */}
          <div className="mt-5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-1.5">Bio</label>
            <div className="px-3.5 py-2.5 rounded-xl border border-navy-200 bg-white text-[13.5px] text-navy-700 leading-relaxed">
              {USER.bio}
            </div>
          </div>

          {/* Interests */}
          <div className="mt-5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-1.5">Interests</label>
            <div className="flex gap-2 flex-wrap">
              {USER.interests.map(i => (
                <span key={i} className="bg-primary-50 text-primary-600 text-[12.5px] px-3 py-1 rounded-full">{i}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VIP Protection */}
      <div className="bg-white border border-navy-100 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-navy-800 mb-1">VIP Protection</h4>
              <p className="text-[12.5px] text-navy-400 max-w-[400px] leading-relaxed">
                When enabled, other attendees must spend credits to send you a connection request. You earn cashback for every request you accept.
              </p>
              {vipProtection && (
                <div className="flex items-center gap-1.5 mt-2 text-[12px] text-amber-600 font-medium">
                  <Coins size={12} /> You're earning cashback on accepted requests
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setVipProtection(!vipProtection)} className="flex-shrink-0 cursor-pointer bg-transparent border-none">
            {vipProtection
              ? <ToggleRight size={36} className="text-accent-500" />
              : <ToggleLeft size={36} className="text-navy-300" />}
          </button>
        </div>
      </div>

      {/* Notifications placeholder */}
      <div className="bg-white border border-navy-100 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell size={17} className="text-accent-500" />
          <h3 className="font-semibold text-navy-800 text-[15px]">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Connection requests", on: true },
            { label: "Meeting reminders", on: true },
            { label: "Credit rewards", on: true },
            { label: "Event announcements", on: false },
          ].map(({ label, on }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-navy-50 last:border-0">
              <span className="text-[13.5px] text-navy-700">{label}</span>
              <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${on ? "bg-accent-500" : "bg-navy-200"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="font-semibold text-red-700 text-[15px] mb-1">Danger zone</h3>
        <p className="text-[12.5px] text-red-500 mb-4">These actions are irreversible. Proceed with care.</p>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 cursor-pointer bg-transparent transition-colors">
            Export my data
          </button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const TabIcon = TABS.find(t => t.id === tab)?.icon ?? TrendingUp;

  return (
    <HomeWrapper>
    <div className="min-h-screen bg-warm-50">
      {/* Profile hero */}
      <div className="bg-navy-800 pt-30 pb-16 px-4">
        <div className="max-w-[1160px] mx-auto">
          <div className="flex items-end gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/15 border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white font-display">
              {USER.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="font-display text-2xl font-semibold text-white">{USER.name}</h1>
                {USER.isVerified && (
                  <span className="flex items-center gap-1 bg-primary-500/20 text-primary-300 border border-primary-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    <BadgeCheck size={10} /> Verified
                  </span>
                )}
              </div>
              <p className="text-white/55 text-sm">{USER.role} · {USER.company} · {USER.industry}</p>
            </div>
            <div className="flex-shrink-0 hidden md:flex items-center gap-3">
              <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-center">
                <div className="font-display text-lg font-bold text-white">{WALLET.balance}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">credits</div>
              </div>
              <button className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border-none cursor-pointer transition-colors">
                <Edit3 size={14} /> Edit profile
              </button>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mt-8 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer border-none flex-shrink-0 ${tab === t.id ? "bg-white text-navy-800" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1160px] mx-auto px-4 -mt-6 pb-16">
        {tab === "overview" && <OverviewTab />}
        {tab === "connections" && <ConnectionsTab />}
        {tab === "registrations" && <RegistrationsTab />}
        {tab === "meetings" && <MeetingsTab />}
        {tab === "wallet" && <WalletTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
    </HomeWrapper>
  );
}