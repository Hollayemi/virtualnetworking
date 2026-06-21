'use client';
import Link from "next/link";
import Image from "next/image";
import { CAROUSEL_IMAGES, FEATURES, HOW_IT_WORKS, STATS, SEARCH_CATEGORIES, TICKER_ITEMS, TESTIMONIALS } from "@/app/data/Home";
import AnimateIn from "@/app/components/ui/AnimateIn";
import { Star, Search, Calendar, ArrowRight, Shield, Coins, Filter, MessageSquare, Award, MapPin, Zap, Building2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <AnimateIn direction="up" delay={100}>
      <div className="bg-white border border-navy-100 rounded-2xl p-8 flex flex-col gap-5 h-full">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
        </div>
        <p className="text-[15px] text-navy-600 leading-relaxed flex-1">"{t.quote}"</p>
        <div>
          <p className="font-semibold text-navy-800 text-sm">{t.name}</p>
          <p className="text-navy-400 text-[13px] mt-0.5">{t.role}</p>
        </div>
      </div>
    </AnimateIn>
  );
}


export function HeroSection() {
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
    timerRef.current = setInterval(() => setSlideIndex((i) => (i + 1) % CAROUSEL_IMAGES.length), 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => { setTickerIndex((i) => (i + 1) % TICKER_ITEMS.length); setTickerVisible(true); }, 400);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const item = TICKER_ITEMS[tickerIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-800 py-32 px-6 text-center">
      {/* Carousel slides */}
      {CAROUSEL_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-out scale-[1.03] ${i === slideIndex ? "opacity-100 animate-[kenburns_10s_ease-in-out_infinite_alternate]" : "opacity-0"}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-800/55 via-navy-800/78 to-navy-800/97 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[860px]">

        {/* Live ticker */}
        <AnimateIn direction="up" delay={100}>
          <div className={`inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.13] backdrop-blur-sm rounded-full py-2 px-4 mb-8 transition-opacity duration-300 ${tickerVisible ? "opacity-100" : "opacity-0"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 flex-shrink-0 animate-pulse" />
            <span className="text-[12.5px] text-white/70">
              <strong className="text-white font-semibold">{item.from}</strong>
              {" "}({item.role}) just connected with{" "}
              <strong className="text-white font-semibold">{item.to}</strong>
              {" "}({item.role2})
            </span>
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn direction="up" delay={150}>
          <h1 className="font-display text-[clamp(30px,5.5vw,54px)] font-semibold text-white leading-[1.1] mb-5 tracking-tight">
            The networking layer
            <br />
            <span className="text-primary-500 italic">your event</span> deserves.
          </h1>
        </AnimateIn>

        <AnimateIn direction="up" delay={200}>
          <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 leading-relaxed max-w-[500px] mx-auto mb-9">
            Browse events built for real networking, or bring VirtualNet to your own
            conference. VIP access, verified profiles, measurable outcomes.
          </p>
        </AnimateIn>

        {/* Search bar */}
        <AnimateIn direction="up" delay={250}>
          <div className="bg-white rounded-[14px] flex items-stretch max-w-[860px] mx-auto mb-6 shadow-[0_20px_56px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="flex-1 flex flex-col p-[14px_20px] border-r border-navy-50 min-w-0 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-300 mb-1">What</span>
              <input type="text" placeholder="Events, topics, people..." value={searchWhat} onChange={(e) => setSearchWhat(e.target.value)}
                className="border-none outline-none text-[13.5px] font-medium text-navy-800 p-0 bg-transparent w-full font-sans" />
            </div>
            <div className="flex-1 flex flex-col p-[14px_20px] border-r border-navy-50 text-left max-w-[150px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-300 mb-1">Location</span>
              <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)}
                className="border-none outline-none text-[13.5px] font-medium text-navy-800 p-0 bg-transparent w-full font-sans" />
            </div>
            <div className="flex-1 flex flex-col p-[14px_20px] border-r border-navy-50 text-left max-w-[160px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-300 mb-1">Category</span>
              <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}
                className="border-none outline-none text-[13.5px] font-medium text-navy-800 p-0 bg-transparent appearance-none cursor-pointer w-full font-sans">
                {SEARCH_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 flex flex-col p-[14px_20px] text-left max-w-[140px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-300 mb-1">Date</span>
              <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
                className={`border-none outline-none text-[13.5px] font-medium p-0 bg-transparent cursor-pointer w-full font-sans ${searchDate ? "text-navy-800" : "text-navy-400"}`} />
            </div>
            <button className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 text-[15px] flex-shrink-0 transition-colors cursor-pointer border-none">
              <Search size={17} /> Search
            </button>
          </div>
        </AnimateIn>

        {/* Secondary CTAs */}
        <AnimateIn direction="up" delay={300}>
          <div className="flex gap-3 justify-center flex-wrap mb-12">
            <button className="inline-flex items-center gap-2 bg-white text-navy-800 border-none py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer transition-transform duration-150 hover:-translate-y-px font-sans">
              <Calendar size={15} /> Host your event
            </button>
            <button className="inline-flex items-center gap-2 bg-transparent text-white/80 border border-white/25 py-3 px-6 rounded-xl text-sm font-medium cursor-pointer font-sans">
              See how it works <ArrowRight size={14} />
            </button>
          </div>
        </AnimateIn>

        {/* Stats */}
        <AnimateIn direction="up" delay={350}>
          <div className="flex justify-center gap-[clamp(24px,5vw,56px)] flex-wrap">
            {STATS.map((s) => (
              <div key={s.value} className="text-center">
                <div className="text-[clamp(22px,3vw,30px)] font-bold text-white font-display leading-none mb-1.5">{s.value}</div>
                <div className="text-xs text-white/45 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            className={`border-none p-0 cursor-pointer transition-all duration-300 h-1.5 rounded-full ${i === slideIndex ? "w-5 bg-primary-500" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

export function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const Icon = feature.icon;
  return (
    <AnimateIn direction="up" delay={100}>
      <div className="bg-white border border-navy-100 rounded-2xl p-8 relative transition-all duration-200 hover:shadow-[0_8px_32px_rgba(56,170,221,0.12)] hover:-translate-y-0.5 h-full">
        {feature.tag && (
          <span className="absolute top-5 right-5 text-[11px] font-semibold tracking-widest uppercase bg-accent-500 text-white py-[3px] px-2.5 rounded-full">
            {feature.tag}
          </span>
        )}
        <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
          <Icon size={20} className="text-accent-500" strokeWidth={1.8} />
        </div>
        <h3 className="text-[17px] font-semibold text-navy-800 mb-2">{feature.title}</h3>
        <p className="text-sm text-navy-300 leading-relaxed">{feature.description}</p>
      </div>
    </AnimateIn>
  );
}

