"use client";
import { useState, useEffect, useRef } from "react";
import AnimateIn from "@/app/components/ui/AnimateIn";
import {
  Users,
  Zap,
  Shield,
  Calendar,
  MessageSquare,
  Star,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  MapPin,
  Award,
  Coins,
  Handshake,
  Building2,
  TrendingUp,
  Search,
  Filter,
  Menu,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1800&q=80",
  "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=1800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1800&q=80",
];

const SEARCH_CATEGORIES = [
  "All categories",
  "Conferences",
  "Summits",
  "Networking Events",
  "Hackathons",
  "Workshops",
  "Startup Events",
  "Investor Events",
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Organizers", href: "#organizers" },
  { label: "Pricing", href: "#pricing" },
];

const TICKER_ITEMS = [
  { from: "Sarah M.", role: "Founder", to: "James K.", role2: "Partner at Sequoia" },
  { from: "Alex R.", role: "CTO", to: "Priya S.", role2: "VP Engineering @ Meta" },
  { from: "Tom W.", role: "Recruiter", to: "Dana L.", role2: "Senior Dev" },
  { from: "Lena F.", role: "Investor", to: "Carlos B.", role2: "Fintech Founder" },
  { from: "Marcus T.", role: "Sales Lead", to: "Yui H.", role2: "COO @ Stripe" },
];

const STATS = [
  { value: "94%", label: "connection acceptance rate" },
  { value: "3.2x", label: "more meetings than unstructured networking" },
  { value: "48h", label: "average time to first message" },
  { value: "120+", label: "enterprise events powered" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "VIP Access Gate",
    description:
      "High-value attendees are protected from unsolicited requests. A credit-based access layer ensures every VIP connection is intentional.",
    tag: "Flagship",
  },
  {
    icon: Coins,
    title: "Credits Economy",
    description:
      "Attendees earn and spend credits to unlock premium interactions. VIPs earn cashback for every connection they accept.",
  },
  {
    icon: Filter,
    title: "Attendee Discovery",
    description:
      "Filter by industry, role, company, and ticket tier. Find exactly who you need to meet before the event even starts.",
  },
  {
    icon: MessageSquare,
    title: "Structured Messaging",
    description:
      "Messaging only unlocks after both parties accept. No cold DMs. No spam. Every conversation starts from mutual intent.",
  },
  {
    icon: Calendar,
    title: "Meeting Scheduling",
    description:
      "Attendees define availability slots. Others book within those windows. Calendar invites generated automatically.",
  },
  {
    icon: Award,
    title: "Verified Profiles",
    description:
      "LinkedIn, email domain, and organizer-level verification badges. Know exactly who you are speaking to.",
  },
  {
    icon: MapPin,
    title: "Networking Map",
    description:
      "Interactive visualization grouping attendees by industry and role. Navigate the room before you walk in.",
  },
  {
    icon: Zap,
    title: "Smart Icebreakers",
    description:
      "AI-generated conversation starters based on shared interests and goals. You both worked in fintech? We will tell you.",
  },
];

const INTENTIONS = [
  { label: "Hiring", color: "#E8472F" },
  { label: "Investment", color: "#8DC64C" },
  { label: "Partnership", color: "#E8472F" },
  { label: "Mentorship", color: "#f59e0b" },
  { label: "Sales", color: "#8b5cf6" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Organizer creates the event",
    description:
      "Set up ticket tiers, import attendees via CSV or webhook, and share networking access links. Done in minutes.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Attendees build their profile",
    description:
      "Name, role, company, networking goals, and availability slots. Verified badges add credibility.",
    icon: Users,
  },
  {
    step: "03",
    title: "Discover and connect",
    description:
      "Browse the attendee directory, filter by what matters, and send a connection request with your intent tag.",
    icon: Search,
  },
  {
    step: "04",
    title: "Meet and build relationships",
    description:
      "Once connected, messaging opens and meeting slots become bookable. Post-event networking continues for 30 days.",
    icon: Handshake,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We ran our summit for three years with generic networking apps. VirtualNet tripled our meeting volume and our sponsors actually got qualified leads for the first time.",
    name: "Rachel O.",
    role: "Head of Events, TechSummit Europe",
  },
  {
    quote:
      "The VIP gate was the feature that sold me. I can now attend conferences without being bombarded. I only hear from people I would actually want to meet.",
    name: "David K.",
    role: "Partner, Horizon Ventures",
  },
  {
    quote:
      "Setting up took under two hours. We uploaded our Eventbrite CSV, sent the access links, and on the day attendees were already scheduling meetings with each other.",
    name: "Ana M.",
    role: "Conference Director, FinovateEU",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    per: "per event",
    description: "For small gatherings up to 100 attendees.",
    features: ["Up to 100 attendees", "Basic profiles", "Connection requests", "CSV import"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$299",
    per: "per event",
    description: "For serious conferences that want measurable outcomes.",
    features: [
      "Up to 1,000 attendees",
      "VIP Access Gate",
      "Credits economy",
      "Verified profiles",
      "Networking analytics",
      "Webhook integration",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "subscription",
    description: "For associations and recurring event programmes.",
    features: [
      "Unlimited attendees",
      "Custom branding",
      "Sponsor lead access",
      "Post-event networking",
      "Priority support",
      "SLA + DPA",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [searchWhat, setSearchWhat] = useState("");
  const [searchLocation, setSearchLocation] = useState("London, UK");
  const [searchCategory, setSearchCategory] = useState("All categories");
  const [searchDate, setSearchDate] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (n: number) => {
    setSlideIndex(n);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlideIndex((i) => (i + 1) % CAROUSEL_IMAGES.length), 5500);
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setSlideIndex((i) => (i + 1) % CAROUSEL_IMAGES.length),
      5500
    );
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % TICKER_ITEMS.length);
        setTickerVisible(true);
      }, 400);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const item = TICKER_ITEMS[tickerIndex];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0D1B2A] !py-[120px] !px-6 !text-center"
    >
      {/* Carousel slides */}
      {CAROUSEL_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1.6s] ease-out ${
            i === slideIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
            animation: i === slideIndex ? "kenburns 10s ease-in-out infinite alternate" : "none",
            transform: "scale(1.03)",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/78 to-[#0D1B2A]/97 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[860px]">
        {/* Live ticker */}
        <AnimateIn direction="up" delay={100}>
          <div
            className={`inline-flex items-center gap-2 bg-white/7 border border-white/13 backdrop-blur-sm rounded-full !py-2 !px-4.5 !mb-8 transition-opacity duration-350 ${
              tickerVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC64C] flex-shrink-0 animate-pulse" />
            <span className="text-[12.5px] !text-white/72">
              <strong className="text-white font-semibold">{item.from}</strong>
              {" "}({item.role}) just connected with{" "}
              <strong className="text-white font-semibold">{item.to}</strong>
              {" "}({item.role2})
            </span>
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn direction="up" delay={150}>
          <h1 className="font-fraunces !text-[clamp(30px,5.5vw, 44px)] font-semibold !text-white leading-[1.1] !mb-4.5 tracking-[-0.01em]">
            The networking layer
            <br />
            <span className="!text-primary italic">your event</span> deserves.
          </h1>
        </AnimateIn>

        <AnimateIn direction="up" delay={200}>
          <p className="text-[clamp(15px,1.8vw,18px)] !text-white/60 leading-relaxed max-w-[500px] !mx-auto !mb-9">
            Browse events built for real networking, or bring VirtualNet to your own
            conference. VIP access, verified profiles, measurable outcomes.
          </p>
        </AnimateIn>

        {/* Search bar */}
        <AnimateIn direction="up" delay={250}>
          <div className="bg-white rounded-[14px] flex items-stretch max-w-[860px] !mx-auto !mb-6 shadow-[0_20px_56px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* What */}
            <div className="flex-1 flex flex-col !p-[14px_20px] border-r border-[#e8edf3] min-w-0 !text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] !text-slate-500 !mb-1">
                What
              </span>
              <input
                type="text"
                placeholder="Events, topics, people..."
                value={searchWhat}
                onChange={(e) => setSearchWhat(e.target.value)}
                className="border-none outline-none !text-[13.5px] font-medium !text-[#0D1B2A] !p-0 bg-transparent w-full"
              />
            </div>

            {/* Location */}
            <div className="flex-1 flex flex-col !p-[14px_20px] border-r border-[#e8edf3] !text-left max-w-[150px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] !text-slate-500 !mb-1">
                Location
              </span>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="border-none outline-none !text-[13.5px] font-medium !text-[#0D1B2A] !p-0 bg-transparent w-full"
              />
            </div>

            {/* Category */}
            <div className="flex-1 flex flex-col !p-[14px_20px] border-r border-[#e8edf3] !text-left max-w-[160px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] !text-slate-500 !mb-1">
                Category
              </span>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="border-none outline-none !text-[13.5px] font-medium !text-[#0D1B2A] !p-0 bg-transparent appearance-none cursor-pointer w-full"
              >
                {SEARCH_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex-1 flex flex-col !p-[14px_20px] !text-left max-w-[140px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] !text-slate-500 !mb-1">
                Date
              </span>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className={`border-none outline-none !text-[13.5px] font-medium !p-0 bg-transparent cursor-pointer w-full ${
                  searchDate ? "text-[#0D1B2A]" : "text-slate-400"
                }`}
              />
            </div>

            {/* Search button */}
            <button className="btn-primary rounded-none !px-8 !text-[15px] flex-shrink-0 gap-2">
              <Search size={17} />
              Search
            </button>
          </div>
        </AnimateIn>

        {/* Secondary CTAs */}
        <AnimateIn direction="up" delay={300}>
          <div className="flex gap-3 justify-center flex-wrap !mb-12">
            <button className="bg-white !text-[#0D1B2A] border-none !py-[11px] !px-6 rounded-lg !text-[14px] font-semibold cursor-pointer inline-flex items-center gap-2 font-inherit transition-transform duration-150 hover:-translate-y-px">
              <Calendar size={15} />
              Host your event
            </button>
            <button className="bg-transparent !text-white/82 border border-white/24 !py-[10px] !px-[22px] rounded-lg !text-[14px] font-medium cursor-pointer inline-flex items-center gap-2 font-inherit">
              See how it works
              <ArrowRight size={14} />
            </button>
          </div>
        </AnimateIn>

        {/* Stats */}
        <AnimateIn direction="up" delay={350}>
          <div className="flex justify-center gap-[clamp(24px,5vw,56px)] flex-wrap">
            {STATS.map((s) => (
              <div key={s.value} className="text-center">
                <div className="text-[clamp(22px,3vw,30px)] font-bold !text-white font-fraunces leading-none !mb-1.5">
                  {s.value}
                </div>
                <div className="text-xs !text-white/45 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`border-none !p-0 cursor-pointer transition-all duration-300 ${
              i === slideIndex ? "w-5 !bg-primary" : "w-1.5 bg-white/30"
            } h-1.5 rounded-full`}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: (typeof FEATURES)[0] }) {
  const Icon = feature.icon;
  return (
    <AnimateIn direction="up" delay={100}>
      <div className="bg-white border border-[#e8edf3] rounded-2xl !p-8 relative transition-all duration-200 hover:shadow-[0_8px_32px_rgba(56,170,221,0.12)] hover:-translate-y-0.5">
        {feature.tag && (
          <span className="absolute top-5 right-5 !text-[11px] font-semibold tracking-[0.08em] uppercase bg-[#E8472F] !text-white !py-[3px] !px-2.5 rounded-full">
            {feature.tag}
          </span>
        )}
        <div className="w-11 h-11 rounded-xl bg-[#eef8fe] flex items-center justify-center !mb-4.5">
          <Icon size={20} color="#E8472F" strokeWidth={1.8} />
        </div>
        <h3 className="text-[17px] font-semibold !text-[#0D1B2A] !mb-2">{feature.title}</h3>
        <p className="text-[14.5px] !text-slate-500 leading-relaxed m-0">{feature.description}</p>
      </div>
    </AnimateIn>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <AnimateIn direction="up" delay={100}>
      <div className="bg-white border border-[#e8edf3] rounded-2xl !p-8 flex flex-col gap-5">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
        <p className="text-[15px] !text-gray-700 leading-relaxed m-0 flex-1">"{t.quote}"</p>
        <div>
          <p className="font-semibold !text-[#0D1B2A] m-0 !text-sm">{t.name}</p>
          <p className="text-slate-500 m-0 !text-[13px] mt-0.5">{t.role}</p>
        </div>
      </div>
    </AnimateIn>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.04); }
          to   { transform: scale(1.00); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -48; }
        }
        @keyframes orbitPing {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.42; transform: scale(1.08); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-outfit, 'Outfit', sans-serif); color: #0D1B2A; background: #FAFAF8; }
        a { !text-decoration: none; color: inherit; }
        section { padding: 96px 0; }
        .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 960px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .grid-3 { grid-template-columns: 1fr 1fr; }
          .grid-2 { grid-template-columns: 1fr; }
          section { padding: 72px 0; }
        }
        @media (max-width: 620px) {
          .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .hide-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 621px) {
          .mobile-only { display: none !important; }
        }
        .mobile-only { display: none; }
        .btn-primary {
          background: #E8472F;
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.18s ease, transform 0.18s ease;
          font-family: inherit;
        }
        .btn-primary:hover { background: #c73a24; transform: translateY(-1px); }
        .btn-ghost {
          background: transparent;
          color: #0D1B2A;
          border: 1.5px solid #d1d9e2;
          padding: 13px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.18s ease, background 0.18s ease;
          font-family: inherit;
        }
        .btn-ghost:hover { border-color: #E8472F; background: #eef8fe; }
        .label {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          !text-transform: uppercase;
          color: #E8472F;
          margin-bottom: 14px;
        }
        h1, h2, h3 { font-family: var(--font-fraunces, 'Fraunces', serif); }
        .section-title {
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 600;
          color: #0D1B2A;
          line-height: 1.2;
          margin-bottom: 18px;
        }
        .section-sub {
          font-size: 17px;
          color: #64748b;
          line-height: 1.65;
          max-width: 560px;
        }
        .nav-link {
          font-size: 14.5px;
          color: #374151;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #E8472F; }
        input, select {
          font-family: inherit;
        }
      `}</style>

      {/* ── NAV ── */}
      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[1160px] z-[100] transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-[#0D1B2A]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.28)] border border-white/10"
            : "bg-[#0D1B2A]/55 backdrop-blur-[20px] saturate-[1.6] shadow-[0_2px_12px_rgba(0,0,0,0.15)] border border-white/10"
        }`}
      >
        <div className="h-[60px] w-full flex items-center justify-between !px-5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg !bg-primary flex items-center justify-center flex-shrink-0">
              <TrendingUp size={17} color="#fff" strokeWidth={2.2} />
            </div>
            <span className="font-fraunces font-semibold !text-[17px] !text-white">
              VirtualNet
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="flex gap-7 items-center hide-mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[14px] !text-white/78 font-medium no-underline transition-colors duration-150 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2.5 items-center">
            <a
              href="#"
              className="hide-mobile !text-[13.5px] font-medium !text-white/70 no-underline transition-colors duration-150 hover:text-white"
            >
              Sign in
            </a>
            <button className="btn-primary hide-mobile !py-[9px] !px-4.5 !text-[13.5px]">
              Get started
            </button>
            {/* Mobile hamburger */}
            <button
              className="mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              style={{
                background: mobileMenuOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 9,
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                transition: "background 0.18s",
              }}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          className={`overflow-hidden transition-[max-height] duration-[0.38s] cubic-bezier(0.4,0,0.2,1) mobile-only ${
            mobileMenuOpen ? "max-h-[600px]" : "max-h-0"
          } ${mobileMenuOpen ? "border-t border-white/8" : "border-t border-transparent"}`}
        >
          <div className="pt-2 pb-4 !px-3 w-full">
            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 !mb-4">
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between !py-[13px] !px-[14px] rounded-lg !text-[15px] font-medium !text-white/85 no-underline bg-transparent transition-all duration-150 hover:bg-white/7 hover:text-white"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {l.label}
                  <ChevronRight size={15} color="rgba(255,255,255,0.35)" />
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-white/8 !mb-4" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-2.5 !px-0.5">
              <button className="btn-primary w-full justify-center !py-[13px] !px-5 !text-[15px]">
                Get started <ArrowRight size={15} />
              </button>
              <a
                href="#"
                className="flex items-center justify-center !py-3 !px-5 rounded-lg !text-[14.5px] font-medium !text-white/75 no-underline bg-white/6 border border-white/10"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── LOGOS STRIP ── */}
      <div className="bg-white border-b border-[#e8edf3] border-t border-[#e8edf3] !py-6">
        <div className="container">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-xs !text-slate-400 font-medium tracking-[0.06em] uppercase">
              Trusted by events at
            </span>
            {["TechSummit EU", "FinovateEU", "Startup Week London", "Developer Nation", "Founders Forum", "Web Summit"].map((name) => (
              <span
                key={name}
                className="text-[13.5px] font-semibold !text-slate-400 !px-4 border-l border-[#e8edf3]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEM / WHY ── */}
      <AnimateIn direction="up" threshold={0.2}>
        <section className="bg-[#FAFAF8]">
          <div className="container">
            <div className="grid-2 items-center gap-16">
              <div>
                <span className="label">The problem</span>
                <h2 className="section-title">
                  Most conference networking is broken.
                </h2>
                <p className="section-sub !mb-8">
                  Attendees join events to meet the right people. Rarely does it happen. VIPs get
                  bombarded. Regular attendees cannot reach who they came to meet. Organizers have
                  no idea if any of it worked.
                </p>
                <div className="flex flex-col gap-3.5">
                  {[
                    "Finding the right attendees in a sea of 1,200 people",
                    "VIP and high-value contacts are unreachable or overloaded",
                    "Networking is random, unstructured, and unmeasurable",
                    "Sponsors invest in events without a single qualified lead",
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-red-50 border border-red-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X size={10} color="#E8472F" />
                      </div>
                      <span className="text-[15px] !text-gray-700 leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual card mockup */}
              <div className="hidden md:block relative">
                <div className="bg-white border border-[#e8edf3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  {/* Mock header */}
                  <div className="bg-[#0D1B2A] !py-4.5 !px-6 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E8472F]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8DC64C]" />
                    <span className="text-white/40 !text-xs ml-2">
                      Attendee Discovery - TechSummit EU 2025
                    </span>
                  </div>

                  {/* Mock attendee list */}
                  <div className="py-5 !px-6">
                    {/* Filter row */}
                    <div className="flex gap-2 !mb-5 flex-wrap">
                      {["Investor", "Founder", "London", "Fintech"].map((tag, i) => (
                        <span
                          key={tag}
                          className={`py-[5px] !px-3 rounded-full !text-xs font-medium ${
                            i === 0
                              ? "bg-[#eef8fe] !!text-primary border !border-primary"
                              : "bg-slate-100 !text-slate-500 border border-transparent"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {[
                      { name: "James K.", role: "Partner, Sequoia Capital", tier: "VIP", connected: true },
                      { name: "Priya S.", role: "VP Engineering, Meta", tier: "VIP", connected: false },
                      { name: "Carlos B.", role: "Founder, Lumio Finance", tier: "Premium", connected: true },
                      { name: "Dana L.", role: "Senior SWE, Google", tier: "Regular", connected: false },
                    ].map((person) => (
                      <div
                        key={person.name}
                        className="flex items-center justify-between !py-3 border-b border-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center !text-sm font-semibold ${
                              person.tier === "VIP"
                                ? "bg-amber-50 !text-amber-600"
                                : person.tier === "Premium"
                                ? "bg-[#eef8fe] !!text-primary"
                                : "bg-slate-100 !text-slate-500"
                            }`}
                          >
                            {person.name[0]}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-semibold !text-[#0D1B2A]">
                              {person.name}
                              {person.tier === "VIP" && (
                                <span className="ml-1.5 !text-[10px] bg-amber-50 !text-amber-600 !py-0.5 !px-[7px] rounded-full font-semibold">
                                  VIP
                                </span>
                              )}
                            </div>
                            <div className="text-xs !text-slate-400">{person.role}</div>
                          </div>
                        </div>
                        <button
                          className={`border-none !py-1.5 !px-3.5 rounded-lg !text-xs font-semibold cursor-pointer ${
                            person.connected
                              ? "bg-green-50 !text-green-600"
                              : "!bg-primary !text-white"
                          }`}
                        >
                          {person.connected ? "Connected" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#8DC64C] !text-white !py-[14px] !px-5 rounded-[14px] shadow-[0_8px_24px_rgba(141,198,76,0.3)] animate-float">
                  <div className="text-[22px] font-bold font-serif">94%</div>
                  <div className="text-[11px] opacity-85">acceptance rate</div>
                </div>
              </div>
              <img src="/images/brokenNetwork.jpg" className="md:mt-10 rounded-md" />
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white">
        <div className="container">
          <div className="text-center !mb-[60px]">
            <span className="label">Platform features</span>
            <h2 className="section-title !mx-auto">
              Everything structured networking needs.
            </h2>
            <p className="section-sub !mx-auto">
              Built around the reality that meaningful networking is intentional, not accidental.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>

          {/* Intention tags visual */}
          <AnimateIn direction="up" delay={100}>
            <div className="mt-[60px] bg-[#FAFAF8] border border-[#e8edf3] rounded-2xl !py-9 !px-10 flex items-center gap-10 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <span className="label">Networking intentions</span>
                <h3 className="text-[22px] font-semibold !text-[#0D1B2A] !mb-2.5">
                  Every connection has a stated purpose.
                </h3>
                <p className="text-[14.5px] !text-slate-500 leading-relaxed">
                  When sending a connection request, attendees select their intention. Both parties
                  know exactly why they are connecting before the first message is sent.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {INTENTIONS.map((i) => (
                  <div
                    key={i.label}
                    className="flex items-center gap-2 bg-white border border-[#e8edf3] !py-2.5 !px-4.5 rounded-full !text-sm font-medium !text-gray-700"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: i.color }}
                    />
                    {i.label}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-[#FAFAF8]">
        <div className="container">
          <div className="text-center !mb-[60px]">
            <span className="label">How it works</span>
            <h2 className="section-title">Up and running before the doors open.</h2>
            <p className="section-sub !mx-auto">
              From setup to live networking in under two hours, no developer required.
            </p>
          </div>

          <div className="grid-4">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimateIn key={step.step} direction="up" delay={100}>
                  <div className="relative">
                    {idx < HOW_IT_WORKS.length - 1 && (
                      <div className="absolute top-5 -right-3.5 w-7 flex items-center justify-center z-10 hide-mobile">
                        <ChevronRight size={16} color="#cbd5e1" />
                      </div>
                    )}
                    <div className="bg-white border border-[#e8edf3] rounded-2xl !py-7 !px-6">
                      <div className="text-[11px] font-bold tracking-[0.1em] !!text-primary !mb-4 uppercase">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#eef8fe] flex items-center justify-center !mb-4">
                        <Icon size={18} color="#E8472F" strokeWidth={1.8} />
                      </div>
                      <h3 className="text-base font-semibold !text-[#0D1B2A] !mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-sm !text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ORGANIZERS ── */}
      <section id="organizers" className="bg-[#0D1B2A]">
        <div className="container">
          <div className="grid-2 items-center gap-[72px]">
            <AnimateIn direction="up">
              <div>
                <span className="label !!text-primary">
                  For organizers
                </span>
                <h2 className="section-title !text-white">
                  Networking outcomes you can actually measure.
                </h2>
                <p className="text-[16.5px] !text-white/60 leading-relaxed !mb-9">
                  Your dashboard shows connection requests, accepted connections, messages exchanged,
                  and meetings scheduled. Tell your sponsors exactly what happened. Know whether your
                  event delivered.
                </p>
                <div className="flex flex-col gap-4 !mb-10">
                  {[
                    "Import attendees from Eventbrite, Ticket Tailor, or any CSV",
                    "Set ticket tiers: Regular, Premium, VIP",
                    "Distribute networking access links post-registration",
                    "View live engagement analytics during the event",
                    "Offer sponsor lead access as a premium feature",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <CheckCircle size={17} color="#8DC64C" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                      <span className="text-[15px] !text-white/75 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary">
                  View organizer demo <ArrowRight size={15} />
                </button>
              </div>
            </AnimateIn>

            {/* Analytics mockup */}
            <AnimateIn direction="up" delay={150}>
              <div className="bg-white/5 border border-white/10 rounded-2xl !py-7 !px-7">
                <div className="!mb-6">
                  <p className="text-white/40 !text-xs font-medium uppercase tracking-[0.08em]">
                    TechSummit EU 2025 — Live dashboard
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 !mb-6">
                  {[
                    { label: "Connections made", value: "847", delta: "+12 today" },
                    { label: "Meetings scheduled", value: "213", delta: "+8 today" },
                    { label: "Messages sent", value: "3,420", delta: "Active" },
                    { label: "Credit purchases", value: "$2,840", delta: "Revenue" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/6 border border-white/8 rounded-xl !py-4.5 !px-4.5">
                      <div className="text-[11px] !text-white/40 !mb-2 uppercase tracking-[0.06em]">
                        {m.label}
                      </div>
                      <div className="text-[26px] font-bold !text-white font-fraunces !mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs !text-[#8DC64C]">{m.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div className="bg-white/4 rounded-xl !py-4.5 !px-4.5">
                  <p className="text-[11px] !text-white/40 !mb-3.5 uppercase tracking-[0.06em]">
                    Connections by hour
                  </p>
                  <div className="flex items-end gap-1.5 h-13">
                    {[30, 45, 60, 80, 100, 75, 90, 110, 95, 70, 40, 25].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all duration-300 ${
                          i === 8 ? "!bg-primary" : "!bg-primary/25"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#FAFAF8]">
        <div className="container">
          <div className="text-center !mb-13">
            <span className="label">What organisers say</span>
            <h2 className="section-title">Results that speak for themselves.</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="bg-white">
        <div className="container">
          <div className="text-center !mb-[60px]">
            <span className="label">Pricing</span>
            <h2 className="section-title">Clear pricing, no surprises.</h2>
            <p className="section-sub !mx-auto">
              Pay per event or move to a subscription as your programme grows.
            </p>
          </div>
          <div className="grid-3">
            {PRICING.map((plan, idx) => (
              <AnimateIn key={plan.name} direction="up" delay={100}>
                <div
                  className={`relative rounded-2xl !py-10 !px-8 ${
                    plan.highlight
                      ? "bg-[#0D1B2A] shadow-[0_24px_64px_rgba(13,27,42,0.18)]"
                      : "bg-white border border-[#e8edf3]"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 !bg-primary !text-white !text-[11px] font-bold tracking-[0.1em] uppercase !py-[5px] !px-[14px] rounded-full">
                      Most popular
                    </span>
                  )}
                  <p className={`text-[13px] font-semibold uppercase tracking-[0.08em] !mb-3 ${plan.highlight ? "text-white/50" : "text-slate-400"}`}>
                    {plan.name}
                  </p>
                  <div className="!mb-1.5">
                    <span className={`text-[40px] font-bold font-fraunces ${plan.highlight ? "text-white" : "text-[#0D1B2A]"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ml-1.5 ${plan.highlight ? "text-white/40" : "text-slate-400"}`}>
                      {plan.per}
                    </span>
                  </div>
                  <p className={`text-sm !mb-7 leading-relaxed ${plan.highlight ? "text-white/55" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                  <div className="flex flex-col gap-3 !mb-8">
                    {plan.features.map((f) => (
                      <div key={f} className="flex gap-2.5 items-start">
                        <CheckCircle
                          size={15}
                          color={plan.highlight ? "#8DC64C" : "#E8472F"}
                          className="flex-shrink-0 mt-px"
                        />
                        <span className={`text-sm ${plan.highlight ? "text-white/75" : "text-gray-700"}`}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`w-full justify-center ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="!bg-primary !py-20">
        <div className="container !text-center">
          <AnimateIn direction="up">
            <h2 className="font-fraunces !text-[clamp(28px,4vw,48px)] font-semibold !text-white !mb-4.5 leading-tight">
              Your next event could be different.
            </h2>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <p className="text-[17px] !text-white/80 !mb-9 max-w-[480px] !mx-auto">
              Structured networking. Measurable outcomes. Attendees who actually meet the right people.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={150}>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <button className="bg-white !text-[#0D1B2A] border-none !py-[15px] !px-8 rounded-lg !text-base font-semibold cursor-pointer inline-flex items-center gap-2 font-inherit transition-transform duration-180 hover:-translate-y-px">
                Start for free <ArrowRight size={16} />
              </button>
              <button className="bg-transparent !text-white border-2 border-white/40 !py-[13px] !px-7 rounded-lg !text-base font-medium cursor-pointer font-inherit">
                Talk to sales
              </button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0D1B2A] pt-[72px] pb-10">
        <div className="container">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-12 !mb-14">
            {/* Brand col */}
            <div>
              <div className="flex items-center gap-2.5 !mb-4.5">
                <div className="w-[34px] h-[34px] rounded-lg !bg-primary flex items-center justify-center">
                  <TrendingUp size={18} color="#fff" strokeWidth={2.2} />
                </div>
                <span className="font-fraunces font-semibold !text-lg !text-white">
                  VirtualNet
                </span>
              </div>
              <p className="text-sm !text-white/45 leading-relaxed max-w-[300px]">
                Structured networking infrastructure for conferences, summits, and professional
                gatherings. Built in London.
              </p>
            </div>

            {/* Links cols */}
            {[
              {
                heading: "Product",
                links: ["Features", "Pricing", "Integrations", "Security", "Changelog"],
              },
              {
                heading: "Solutions",
                links: ["For Organizers", "For Attendees", "For Sponsors", "Conferences", "Summits"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Privacy Policy", "Terms"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase !text-white/35 !mb-4.5">
                  {col.heading}
                </p>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm !text-white/55 transition-colors duration-150 hover:text-white"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-7 flex justify-between items-center flex-wrap gap-4">
            <p className="text-[13px] !text-white/30">
              2025 VirtualNet Ltd. Registered in England and Wales.
            </p>
            <p className="text-[13px] !text-white/30">
              London, United Kingdom
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}