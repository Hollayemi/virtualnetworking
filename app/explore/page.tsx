"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search, MapPin, Calendar, Bookmark, BookmarkCheck,
    Users, Zap, Grid3X3, List, SlidersHorizontal,
    Globe, X, ArrowRight, Shield, 
    Sparkles, Radio} from "lucide-react";
import HomeWrapper from "../components/wrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Event {
    id: string;
    name: string;
    organiser: string;
    category: string;
    location: { type: "physical" | "virtual" | "hybrid"; city: string; venue?: string };
    startDate: string;
    endDate: string;
    attendees: number;
    capacity: number;
    tiers: { label: string; price: number; color: string }[];
    tags: string[];
    featured: boolean;
    hasVip: boolean;
    bannerColor: string;
    bannerEmoji: string;
    connectionRate: string;
    description: string;
    status: "upcoming" | "live" | "soldout";
    savedCount: number;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const EVENTS: Event[] = [
    {
        id: "e1",
        name: "Web Summit London 2025",
        organiser: "Web Summit Ltd",
        category: "Technology",
        location: { type: "physical", city: "London", venue: "ExCeL London" },
        startDate: "2025-07-14",
        endDate: "2025-07-16",
        attendees: 842,
        capacity: 1200,
        tiers: [{ label: "Regular", price: 0, color: "#38AADD" }, { label: "Premium", price: 49, color: "#8DC64C" }, { label: "VIP", price: 149, color: "#f59e0b" }],
        tags: ["SaaS", "Startups", "AI", "Investors"],
        featured: true,
        hasVip: true,
        bannerColor: "#0D1B2A",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "91%",
        description: "Europe's largest tech summit bringing together 40,000+ founders, investors, and startup teams across three action-packed days.",
        status: "upcoming",
        savedCount: 312,
    },
    {
        id: "e2",
        name: "FinTech Connect 2025",
        organiser: "FinovateEU",
        category: "Finance",
        location: { type: "hybrid", city: "Manchester", venue: "Manchester Central" },
        startDate: "2025-07-22",
        endDate: "2025-07-22",
        attendees: 480,
        capacity: 600,
        tiers: [{ label: "Regular", price: 0, color: "#38AADD" }, { label: "VIP", price: 99, color: "#f59e0b" }],
        tags: ["Fintech", "Banking", "Investment", "Blockchain"],
        featured: false,
        hasVip: true,
        bannerColor: "#1a3a2a",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "88%",
        description: "The premier fintech networking event in the North of England. Meet bank CXOs, payment pioneers, and fintech founders in one room.",
        status: "upcoming",
        savedCount: 178,
    },
    {
        id: "e3",
        name: "AI Builders Summit",
        organiser: "DeepTech London",
        category: "Technology",
        location: { type: "virtual", city: "Online", venue: undefined },
        startDate: "2025-07-10",
        endDate: "2025-07-10",
        attendees: 1104,
        capacity: 1500,
        tiers: [{ label: "Regular", price: 0, color: "#38AADD" }, { label: "Premium", price: 29, color: "#8DC64C" }],
        tags: ["AI", "Machine Learning", "LLMs", "Developers"],
        featured: true,
        hasVip: false,
        bannerColor: "#1a0a2e",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "94%",
        description: "Virtual deep-dive for AI engineers and product teams. Live demos, architecture talks, and structured breakout sessions by speciality.",
        status: "live",
        savedCount: 509,
    },
    {
        id: "e4",
        name: "Founder Summit Series: Seed Edition",
        organiser: "Founders Forum",
        category: "Startups",
        location: { type: "physical", city: "London", venue: "Kings Place, N1" },
        startDate: "2025-08-05",
        endDate: "2025-08-05",
        attendees: 210,
        capacity: 250,
        tiers: [{ label: "Founder", price: 0, color: "#38AADD" }, { label: "Investor", price: 199, color: "#f59e0b" }],
        tags: ["Fundraising", "Seed", "VCs", "Pre-seed"],
        featured: false,
        hasVip: true,
        bannerColor: "#2a1a0a",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "96%",
        description: "Intimate 250-person event pairing seed-stage founders directly with active early-stage investors. Structured 1:1 matching included.",
        status: "upcoming",
        savedCount: 245,
    },
    {
        id: "e5",
        name: "HealthTech Innovation Forum",
        organiser: "NHS Digital Partners",
        category: "Healthcare",
        location: { type: "hybrid", city: "Edinburgh", venue: "EICC" },
        startDate: "2025-08-12",
        endDate: "2025-08-13",
        attendees: 320,
        capacity: 500,
        tiers: [{ label: "Regular", price: 0, color: "#38AADD" }, { label: "Premium", price: 75, color: "#8DC64C" }, { label: "VIP", price: 250, color: "#f59e0b" }],
        tags: ["MedTech", "NHS", "Digital Health", "Research"],
        featured: false,
        hasVip: true,
        bannerColor: "#0a2a2a",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "85%",
        description: "Connecting NHS digital leads, medtech startups, and healthcare investors to shape the future of digital health in the UK.",
        status: "upcoming",
        savedCount: 134,
    },
    {
        id: "e6",
        name: "DevNation London",
        organiser: "Developer Nation",
        category: "Technology",
        location: { type: "physical", city: "London", venue: "Barbican Centre" },
        startDate: "2025-08-20",
        endDate: "2025-08-21",
        attendees: 600,
        capacity: 600,
        tiers: [{ label: "General", price: 0, color: "#38AADD" }, { label: "Workshop Pass", price: 89, color: "#8DC64C" }],
        tags: ["Open Source", "DevOps", "Cloud", "APIs"],
        featured: false,
        hasVip: false,
        bannerColor: "#0f1e2e",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "79%",
        description: "Two days of talks, workshops, and hallway tracks for software engineers, architects, and platform teams.",
        status: "soldout",
        savedCount: 421,
    },
    {
        id: "e7",
        name: "Climate & ESG Investment Day",
        organiser: "GreenCap Partners",
        category: "Sustainability",
        location: { type: "physical", city: "London", venue: "Bloomberg HQ, EC4N" },
        startDate: "2025-09-03",
        endDate: "2025-09-03",
        attendees: 115,
        capacity: 150,
        tiers: [{ label: "Attendee", price: 0, color: "#38AADD" }, { label: "Presenting", price: 499, color: "#f59e0b" }],
        tags: ["ESG", "Climate", "Impact Investing", "Carbon"],
        featured: false,
        hasVip: true,
        bannerColor: "#0a1f0a",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "93%",
        description: "High-conviction day for ESG fund managers, impact investors, and climate-tech founders. Deck submissions reviewed pre-event.",
        status: "upcoming",
        savedCount: 89,
    },
    {
        id: "e8",
        name: "Recruitment Leaders Forum",
        organiser: "TalentOps EU",
        category: "HR & Talent",
        location: { type: "virtual", city: "Online", venue: undefined },
        startDate: "2025-07-30",
        endDate: "2025-07-30",
        attendees: 380,
        capacity: 800,
        tiers: [{ label: "Free", price: 0, color: "#38AADD" }, { label: "Pro Access", price: 19, color: "#8DC64C" }],
        tags: ["Hiring", "Talent Acquisition", "HR Tech", "Remote Work"],
        featured: false,
        hasVip: false,
        bannerColor: "#1a1a2e",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "82%",
        description: "Virtual half-day summit for talent acquisition leaders, TA ops teams, and HR tech buyers. Benchmarking, case studies, and roundtables.",
        status: "upcoming",
        savedCount: 156,
    },
    {
        id: "e9",
        name: "Creative Industries Mixer: Autumn Edition",
        organiser: "Central Working",
        category: "Creative",
        location: { type: "physical", city: "London", venue: "Shoreditch Works, E1" },
        startDate: "2025-09-17",
        endDate: "2025-09-17",
        attendees: 88,
        capacity: 120,
        tiers: [{ label: "Creator", price: 0, color: "#38AADD" }],
        tags: ["Design", "Advertising", "Film", "Branding"],
        featured: false,
        hasVip: false,
        bannerColor: "#2a0a1a",
        bannerEmoji: "/images/banner1.png",
        connectionRate: "76%",
        description: "Monthly mixer bringing together designers, agency creatives, brand directors, and production companies in East London.",
        status: "upcoming",
        savedCount: 67,
    },
];

const CATEGORIES = ["All", "Technology", "Finance", "Startups", "Healthcare", "Sustainability", "HR & Talent", "Creative"];
const LOCATIONS = ["All Locations", "London", "Manchester", "Edinburgh", "Online"];
const EVENT_TYPES = ["All Types", "In Person", "Virtual", "Hybrid"];
const SORT_OPTIONS = ["Date: Soonest", "Most Popular", "Connection Rate", "Capacity Left"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Event["status"] }) {
    if (status === "live") return (
        <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
        </span>
    );
    if (status === "soldout") return (
        <span className="inline-flex items-center gap-1.5 bg-navy-600 text-white/60 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            SOLD OUT
        </span>
    );
    return null;
}

function CapacityBar({ filled, total }: { filled: number; total: number }) {
    const pct = Math.min((filled / total) * 100, 100);
    const color = pct > 90 ? "#E8472F" : pct > 70 ? "#f59e0b" : "#8DC64C";
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="text-[11px] text-navy-400 font-medium whitespace-nowrap">{total - filled} left</span>
        </div>
    );
}

function EventCard({ event, saved, onSave, view }: {
    event: Event; saved: boolean; onSave: (id: string) => void; view: "grid" | "list";
}) {
    const lowestPaid = event.tiers.filter(t => t.price > 0).sort((a, b) => a.price - b.price)[0];
    const hasFree = event.tiers.some(t => t.price === 0);
    const dateStr = new Date(event.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const isSameDay = event.startDate === event.endDate;

    if (view === "list") {
        return (
            <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_32px_rgba(13,27,42,0.1)] hover:-translate-y-px ${event.status === "soldout" ? "opacity-75" : ""}`}>
                <div className="flex items-stretch">
                    {/* Color block */}
                    <div className="w-2 flex-shrink-0 rounded-l-2xl" style={{ background: event.tiers[event.tiers.length - 1].color }} />

                    <div className="flex-1 p-5 flex items-center gap-5 min-w-0">
                        {/* Emoji + date */}
                        <div className="flex-shrink-0 w-14 text-center">
                            <div className="text-3xl mb-1">{event.bannerEmoji}</div>
                            <div className="text-[10px] font-bold text-navy-400 uppercase tracking-wide leading-tight">
                                {new Date(event.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </div>
                        </div>

                        {/* Main info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <StatusBadge status={event.status} />
                                {event.featured && <span className="text-[10px] font-bold uppercase tracking-wider text-accent-500">Featured</span>}
                                <span className="text-[11px] text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full">{event.category}</span>
                            </div>
                            <h3 className="font-display font-semibold text-navy-800 text-[15px] leading-snug truncate">{event.name}</h3>
                            <div className="flex items-center gap-3 mt-1 text-[12px] text-navy-400 flex-wrap">
                                <span className="flex items-center gap-1">
                                    {event.location.type === "virtual" ? <Globe size={11} /> : <MapPin size={11} />}
                                    {event.location.city}
                                </span>
                                <span className="flex items-center gap-1"><Users size={11} />{event.attendees.toLocaleString()} attending</span>
                                <span className="flex items-center gap-1"><Zap size={11} className="text-secondary-500" />{event.connectionRate} connection rate</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="hidden lg:flex gap-1.5 flex-wrap max-w-[180px]">
                            {event.tags.slice(0, 3).map(t => (
                                <span key={t} className="text-[11px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">{t}</span>
                            ))}
                        </div>

                        {/* Price + action */}
                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            <div className="text-right">
                                {hasFree && <div className="text-[11px] font-bold text-secondary-600">Free to join</div>}
                                {lowestPaid && <div className="text-[11px] text-navy-400">VIP from £{lowestPaid.price}</div>}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => onSave(event.id)} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${saved ? "border-accent-500 bg-accent-50 text-accent-500" : "border-navy-200 text-navy-400 hover:border-accent-500"}`}>
                                    {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                                <Link href={`/events/${event.id}`} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold transition-all no-underline ${event.status === "soldout" ? "bg-navy-100 text-navy-400 cursor-not-allowed" : "bg-accent-500 hover:bg-accent-600 text-white"}`}>
                                    {event.status === "soldout" ? "Sold Out" : "View"} <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white border border-navy-100 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(13,27,42,0.12)] hover:-translate-y-1 flex flex-col ${event.status === "soldout" ? "opacity-75" : ""}`}>
            {/* Banner */}
            <div className="relative h-[140px] flex items-center justify-center overflow-hidden" style={{ background: event.bannerColor }}>
                <div className="text-6xl">{event.bannerEmoji}</div>
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                {/* Top badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <StatusBadge status={event.status} />
                    {event.featured && (
                        <span className="flex items-center gap-1 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            <Sparkles size={9} /> Featured
                        </span>
                    )}
                </div>
                {/* Save button */}
                <button onClick={() => onSave(event.id)} className={`absolute top-3 right-3 w-8 h-8 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all ${saved ? "bg-accent-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
                    {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                </button>
                {/* Tier pills */}
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {event.tiers.map(t => (
                        <span key={t.label} className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: `${t.color}cc` }}>
                            {t.label} {t.price === 0 ? "Free" : `£${t.price}`}
                        </span>
                    ))}
                </div>
                {/* VIP shield */}
                {event.hasVip && (
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-lg bg-amber-400/90 flex items-center justify-center" title="VIP Gate enabled">
                        <Shield size={13} color="#fff" />
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1 gap-3">
                {/* Category + location */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-500">{event.category}</span>
                    <span className="text-[11px] text-navy-400 flex items-center gap-1">
                        {event.location.type === "virtual" ? <Globe size={11} /> : <MapPin size={11} />}
                        {event.location.city}
                    </span>
                </div>

                {/* Name */}
                <h3 className="font-display font-semibold text-navy-800 text-[16px] leading-snug line-clamp-2">{event.name}</h3>

                {/* Organiser */}
                <p className="text-[12px] text-navy-400">By {event.organiser}</p>

                {/* Description */}
                <p className="text-[12.5px] text-navy-500 leading-relaxed line-clamp-2 flex-1">{event.description}</p>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap">
                    {event.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[11px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                    {event.tags.length > 3 && <span className="text-[11px] text-navy-400">+{event.tags.length - 3}</span>}
                </div>

                {/* Date + stats row */}
                <div className="flex items-center justify-between text-[12px] text-navy-400 border-t border-navy-50 pt-3 mt-auto">
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{dateStr}{!isSameDay && ` – ${new Date(event.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}</span>
                    <span className="flex items-center gap-1 text-secondary-600 font-medium"><Zap size={12} />{event.connectionRate}</span>
                </div>

                {/* Capacity bar */}
                <CapacityBar filled={event.attendees} total={event.capacity} />

                {/* CTA */}
                <Link
                    href={`/events/${event.id}`}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all no-underline ${event.status === "soldout" ? "bg-navy-100 text-navy-400 cursor-not-allowed pointer-events-none" : "bg-navy-800 hover:bg-navy-700 text-white"}`}
                >
                    {event.status === "soldout" ? "Sold Out" : event.status === "live" ? "Join Live" : "View & Register"}
                    {event.status !== "soldout" && <ArrowRight size={14} />}
                </Link>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExploreEventsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [locationFilter, setLocationFilter] = useState("All Locations");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [sortBy, setSortBy] = useState("Date: Soonest");
    const [saved, setSaved] = useState<Set<string>>(new Set());
    const [view, setView] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [onlyFree, setOnlyFree] = useState(false);
    const [onlyVip, setOnlyVip] = useState(false);
    const [onlyLive, setOnlyLive] = useState(false);

    const toggleSave = (id: string) =>
        setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const filtered = useMemo(() => {
        let list = [...EVENTS];
        if (search) list = list.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) || e.organiser.toLowerCase().includes(search.toLowerCase()));
        if (category !== "All") list = list.filter(e => e.category === category);
        if (locationFilter !== "All Locations") {
            if (locationFilter === "Online") list = list.filter(e => e.location.type === "virtual");
            else list = list.filter(e => e.location.city === locationFilter);
        }
        if (typeFilter !== "All Types") {
            const map: Record<string, string> = { "In Person": "physical", "Virtual": "virtual", "Hybrid": "hybrid" };
            list = list.filter(e => e.location.type === map[typeFilter]);
        }
        if (onlyFree) list = list.filter(e => e.tiers.some(t => t.price === 0));
        if (onlyVip) list = list.filter(e => e.hasVip);
        if (onlyLive) list = list.filter(e => e.status === "live");
        if (sortBy === "Most Popular") list.sort((a, b) => b.attendees - a.attendees);
        else if (sortBy === "Connection Rate") list.sort((a, b) => parseFloat(b.connectionRate) - parseFloat(a.connectionRate));
        else if (sortBy === "Capacity Left") list.sort((a, b) => (a.capacity - a.attendees) - (b.capacity - b.attendees));
        else list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        return list;
    }, [search, category, locationFilter, typeFilter, sortBy, onlyFree, onlyVip, onlyLive]);

    const activeFilterCount = [
        category !== "All",
        locationFilter !== "All Locations",
        typeFilter !== "All Types",
        onlyFree, onlyVip, onlyLive,
    ].filter(Boolean).length;

    const liveCount = EVENTS.filter(e => e.status === "live").length;

    return (
        <HomeWrapper>
            <div className="min-h-screen bg-warm-50">
                {/* ── Hero search bar ─────────────────────────────────────────────────── */}
                <div className="bg-navy-800 pt-30 pb-14 px-4">
                    <div className="max-w-[1160px] mx-auto">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                {liveCount > 0 && (
                                    <span className="flex items-center gap-1.5 bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-red-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                        {liveCount} event{liveCount > 1 ? "s" : ""} live now
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display text-[clamp(26px,4vw,40px)] font-semibold text-white mb-2 leading-tight">
                                Find your next networking event
                            </h1>
                            <p className="text-white/50 text-sm">
                                {EVENTS.length} events · {EVENTS.reduce((s, e) => s + e.attendees, 0).toLocaleString()} attendees registered
                            </p>
                        </div>

                        {/* Search bar */}
                        <div className="flex gap-2 max-w-[780px]">
                            <div className="flex-1 relative">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search by event name, tag, or organiser…"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder-white/35 outline-none focus:border-white/40 transition-colors"
                                />
                                {search && (
                                    <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${showFilters ? "bg-white text-navy-800 border-white" : "bg-white/10 border-white/15 text-white hover:bg-white/15"}`}
                            >
                                <SlidersHorizontal size={16} />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Quick filters */}
                        <div className="flex gap-2 flex-wrap mt-4">
                            {CATEGORIES.slice(1).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(category === cat ? "All" : cat)}
                                    className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-all cursor-pointer ${category === cat ? "bg-white text-navy-800 border-white" : "bg-white/8 text-white/70 border-white/15 hover:bg-white/15"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Expandable filter panel ──────────────────────────────────────────── */}
                <div className={`bg-white border-b border-navy-100 overflow-hidden transition-all duration-300 ${showFilters ? "max-h-[300px]" : "max-h-0"}`}>
                    <div className="max-w-[1160px] mx-auto px-4 py-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {/* Location */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-2">Location</label>
                                <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-navy-200 text-sm text-navy-800 outline-none focus:border-accent-500 bg-white cursor-pointer">
                                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                                </select>
                            </div>
                            {/* Type */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-2">Event Type</label>
                                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-navy-200 text-sm text-navy-800 outline-none focus:border-accent-500 bg-white cursor-pointer">
                                    {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            {/* Sort */}
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-400 mb-2">Sort By</label>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-navy-200 text-sm text-navy-800 outline-none focus:border-accent-500 bg-white cursor-pointer">
                                    {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            {/* Toggles */}
                            <div className="col-span-2 md:col-span-1 lg:col-span-3 flex flex-wrap items-end gap-3">
                                {[
                                    { label: "Free to join", val: onlyFree, set: setOnlyFree },
                                    { label: "VIP access", val: onlyVip, set: setOnlyVip },
                                    { label: "Live now", val: onlyLive, set: setOnlyLive },
                                ].map(({ label, val, set }) => (
                                    <button key={label} onClick={() => set(!val)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[12.5px] font-medium transition-all cursor-pointer ${val ? "border-accent-500 bg-accent-50 text-accent-500" : "border-navy-200 text-navy-600 hover:border-navy-300"}`}>
                                        {val && <span className="w-3.5 h-3.5 rounded-full bg-accent-500 flex items-center justify-center">
                                            <X size={8} color="#fff" strokeWidth={3} />
                                        </span>}
                                        {label}
                                    </button>
                                ))}
                                {activeFilterCount > 0 && (
                                    <button onClick={() => { setCategory("All"); setLocationFilter("All Locations"); setTypeFilter("All Types"); setOnlyFree(false); setOnlyVip(false); setOnlyLive(false); }} className="text-[12.5px] text-accent-500 font-medium hover:underline cursor-pointer bg-transparent border-none">
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Results area ─────────────────────────────────────────────────────── */}
                <div className="max-w-[1160px] mx-auto px-4 py-8">
                    {/* Results header */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div>
                            <span className="text-[15px] font-semibold text-navy-800">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
                            <span className="text-[13px] text-navy-400 ml-2">
                                {search ? `matching "${search}"` : category !== "All" ? `in ${category}` : "available"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setView("grid")} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${view === "grid" ? "border-navy-800 bg-navy-800 text-white" : "border-navy-200 text-navy-400 hover:border-navy-400"}`}>
                                <Grid3X3 size={15} />
                            </button>
                            <button onClick={() => setView("list")} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${view === "list" ? "border-navy-800 bg-navy-800 text-white" : "border-navy-200 text-navy-400 hover:border-navy-400"}`}>
                                <List size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Live events band */}
                    {!onlyLive && EVENTS.some(e => e.status === "live") && (
                        <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Radio size={16} className="text-red-500" />
                                <span className="text-sm font-semibold text-red-700">Happening right now</span>
                            </div>
                            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
                                {EVENTS.filter(e => e.status === "live").map(e => (
                                    <EventCard key={e.id} event={e} saved={saved.has(e.id)} onSave={toggleSave} view={view} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main grid */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">No events found</h3>
                            <p className="text-navy-400 text-sm mb-6">Try adjusting your filters or search terms</p>
                            <button onClick={() => { setSearch(""); setCategory("All"); setLocationFilter("All Locations"); setTypeFilter("All Types"); setOnlyFree(false); setOnlyVip(false); setOnlyLive(false); }} className="px-6 py-2.5 bg-navy-800 text-white rounded-xl text-sm font-medium cursor-pointer border-none">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                            {filtered.filter(e => e.status !== "live" || onlyLive).map(e => (
                                <EventCard key={e.id} event={e} saved={saved.has(e.id)} onSave={toggleSave} view={view} />
                            ))}
                        </div>
                    )}

                    {/* Saved events reminder */}
                    {saved.size > 0 && (
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-navy-800 text-white px-5 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-50">
                            <BookmarkCheck size={16} className="text-secondary-400" />
                            <span className="text-sm font-medium">{saved.size} event{saved.size > 1 ? "s" : ""} saved</span>
                            <Link href="/account?tab=saved" className="text-xs text-primary-400 no-underline hover:underline">View all</Link>
                        </div>
                    )}
                </div>
            </div>
        </HomeWrapper>
    );
}