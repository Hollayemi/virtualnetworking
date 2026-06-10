"use client";
import { useState, useEffect } from "react";
import AnimateIn from "@/app/components/ui/AnimateIn";
import { ArrowRight, CheckCircle, ChevronRight, TrendingUp, Menu, X } from "lucide-react";
import { BtnPrimary, BtnGhost, Label } from "@/app/components/ui";
import { FEATURES, HOW_IT_WORKS, INTENTIONS, NAV_LINKS, PRICING, TESTIMONIALS } from "@/app/data/Home";
import { TestimonialCard, HeroSection, FeatureCard } from '@/app/components/sections/HomeSections';
import HomeWrapper from "./components/wrapper";

export default function Home() {
  return (
    <HomeWrapper>

      <HeroSection />
      <div className="bg-white border-y border-navy-100 py-6">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-xs text-navy-400 font-medium tracking-widest uppercase">Trusted by events at</span>
            {["TechSummit EU", "FinovateEU", "Startup Week London", "Developer Nation", "Founders Forum", "Web Summit"].map((name) => (
              <span key={name} className="text-[13.5px] font-semibold text-navy-300 px-4 border-l border-navy-100">{name}</span>
            ))}
          </div>
        </div>
      </div>


      <AnimateIn direction="up" threshold={0.2}>
        <section className="bg-warm-50 py-24">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Label>The problem</Label>
                <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-navy-800 leading-[1.2] mb-4">
                  Most conference networking is broken.
                </h2>
                <p className="text-[17px] text-navy-300 leading-relaxed max-w-[560px] mb-8">
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
                      <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X size={10} className="text-accent-500" />
                      </div>
                      <span className="text-[15px] text-navy-600 leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual card mockup */}
              <div className="hidden! md:block relative">
                <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <div className="bg-navy-800 py-4 px-6 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary-500" />
                    <span className="text-white/40 text-xs ml-2">Attendee Discovery — TechSummit EU 2025</span>
                  </div>
                  <div className="py-5 px-6">
                    <div className="flex gap-2 mb-5 flex-wrap">
                      {["Investor", "Founder", "London", "Fintech"].map((tag, i) => (
                        <span key={tag} className={`py-1 px-3 rounded-full text-xs font-medium ${i === 0 ? "bg-primary-50 text-primary-500 border border-primary-300" : "bg-navy-50 text-navy-400 border border-transparent"}`}>
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
                      <div key={person.name} className="flex items-center justify-between py-3 border-b border-navy-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-semibold ${person.tier === "VIP" ? "bg-amber-50 text-amber-600" : person.tier === "Premium" ? "bg-primary-50 text-primary-500" : "bg-navy-100 text-navy-400"}`}>
                            {person.name[0]}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-semibold text-navy-800">
                              {person.name}
                              {person.tier === "VIP" && <span className="ml-1.5 text-[10px] bg-amber-50 text-amber-600 py-0.5 px-1.5 rounded-full font-semibold">VIP</span>}
                            </div>
                            <div className="text-xs text-navy-400">{person.role}</div>
                          </div>
                        </div>
                        <button className={`border-none py-1.5 px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${person.connected ? "bg-green-50 text-green-600" : "bg-primary-500 text-white"}`}>
                          {person.connected ? "Connected" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-secondary-500 text-white py-3.5 px-5 rounded-[14px] shadow-[0_8px_24px_rgba(141,198,76,0.3)] animate-bounce">
                  <div className="text-[22px] font-bold font-display">94%</div>
                  <div className="text-[11px] opacity-85">acceptance rate</div>
                </div>
              </div>
              <div className="relative">
                <img src="/images/brokenNetwork.jpg" className="rounded-md" />
                <div className="absolute -bottom-4 -right-4 bg-secondary-500 text-white py-3.5 px-5 rounded-[14px] shadow-[0_8px_24px_rgba(141,198,76,0.3)] animate-bounce">
                  <div className="text-[22px] font-bold font-display">94%</div>
                  <div className="text-[11px] opacity-85">acceptance rate</div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white py-24 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-95"></div>
        {/* <img src="/images/connbg.png" alt="Features pattern" className="pointer-events-none object-cover absolute h-full top-0 left-1/2 -translate-x-1/2 opacity-5" /> */}
        <div className="max-w-[1160px] mx-auto relative px-6">
          <div className="text-center mb-14">
            <Label>Platform features</Label>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-navy-800 leading-[1.2] mb-4 mx-auto">
              Everything structured networking needs.
            </h2>
            <p className="text-[17px] text-navy-300 leading-relaxed max-w-[560px] mx-auto">
              Built around the reality that meaningful networking is intentional, not accidental.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {FEATURES.map((f) => <FeatureCard key={f.title} feature={f} />)}
          </div>

          {/* Intention tags */}
          <AnimateIn direction="up" delay={100}>
            <div className="mt-14 bg-warm-50 border border-navy-100 rounded-2xl py-9 px-10 flex items-center gap-10 flex-wrap">
              <div className="flex-1 min-w-[280px]">
                <Label>Networking intentions</Label>
                <h3 className="font-display text-[22px] font-semibold text-navy-800 mb-2.5">Every connection has a stated purpose.</h3>
                <p className="text-sm text-navy-300 leading-relaxed">
                  When sending a connection request, attendees select their intention. Both parties
                  know exactly why they are connecting before the first message is sent.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {INTENTIONS.map((i) => (
                  <div key={i.label} className="flex items-center gap-2 bg-white border border-navy-100 py-2.5 px-4 rounded-full text-sm font-medium text-navy-600">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${i.color}`} />
                    {i.label}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-warm-50 py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-14">
            <Label>How it works</Label>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-navy-800 leading-[1.2] mb-4">Up and running before the doors open.</h2>
            <p className="text-[17px] text-navy-300 leading-relaxed max-w-[560px] mx-auto">From setup to live networking in under two hours, no developer required.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimateIn key={step.step} direction="up" delay={100}>
                  <div className="relative">
                    {idx < HOW_IT_WORKS.length - 1 && (
                      <div className="absolute top-5 -right-3.5 w-7 hidden lg:flex items-center justify-center z-10">
                        <ChevronRight size={16} className="text-navy-200" />
                      </div>
                    )}
                    <div className="bg-white border border-navy-100 rounded-2xl py-7 px-6 h-full">
                      <div className="text-[11px] font-bold tracking-widest text-primary-500 mb-4 uppercase">{step.step}</div>
                      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-accent-500" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-display text-base font-semibold text-navy-800 mb-2.5">{step.title}</h3>
                      <p className="text-sm text-navy-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ORGANIZERS ── */}
      <section id="organizers" className="bg-navy-800 py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-center">
            <AnimateIn direction="up">
              <div>
                <Label>For organizers</Label>
                <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-white leading-[1.2] mb-4">
                  Networking outcomes you can actually measure.
                </h2>
                <p className="text-[16.5px] text-white/60 leading-relaxed mb-9">
                  Your dashboard shows connection requests, accepted connections, messages exchanged,
                  and meetings scheduled. Tell your sponsors exactly what happened.
                </p>
                <div className="flex flex-col gap-4 mb-10">
                  {[
                    "Import attendees from Eventbrite, Ticket Tailor, or any CSV",
                    "Set ticket tiers: Regular, Premium, VIP",
                    "Distribute networking access links post-registration",
                    "View live engagement analytics during the event",
                    "Offer sponsor lead access as a premium feature",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <CheckCircle size={17} className="text-secondary-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[15px] text-white/75 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <BtnPrimary>View organizer demo <ArrowRight size={15} /></BtnPrimary>
              </div>
            </AnimateIn>

            {/* Analytics mockup */}
            <AnimateIn direction="up" delay={150}>
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl py-7 px-7">
                <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-6">
                  TechSummit EU 2025 — Live dashboard
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Connections made", value: "847", delta: "+12 today" },
                    { label: "Meetings scheduled", value: "213", delta: "+8 today" },
                    { label: "Messages sent", value: "3,420", delta: "Active" },
                    { label: "Credit purchases", value: "$2,840", delta: "Revenue" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/[0.06] border border-white/[0.08] rounded-xl py-4 px-4">
                      <div className="text-[11px] text-white/40 mb-2 uppercase tracking-widest">{m.label}</div>
                      <div className="font-display text-[26px] font-bold text-white mb-1">{m.value}</div>
                      <div className="text-xs text-secondary-500">{m.delta}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.04] rounded-xl py-4 px-4">
                  <p className="text-[11px] text-white/40 mb-3.5 uppercase tracking-widest">Connections by hour</p>
                  <div className="flex items-end gap-1.5 h-14">
                    {[30, 45, 60, 80, 100, 75, 90, 110, 95, 70, 40, 25].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-sm transition-all duration-300 ${i === 8 ? "bg-primary-500" : "bg-primary-500/25"}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-warm-50 py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-12">
            <Label>What organisers say</Label>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-navy-800 leading-[1.2]">Results that speak for themselves.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="bg-white py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-14">
            <Label>Pricing</Label>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-semibold text-navy-800 leading-[1.2] mb-4">Clear pricing, no surprises.</h2>
            <p className="text-[17px] text-navy-300 leading-relaxed max-w-[560px] mx-auto">Pay per event or move to a subscription as your programme grows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PRICING.map((plan) => (
              <AnimateIn key={plan.name} direction="up" delay={100}>
                <div className={`relative rounded-2xl py-10 px-8 h-full flex flex-col ${plan.highlight ? "bg-navy-800 shadow-[0_24px_64px_rgba(13,27,42,0.18)]" : "bg-white border border-navy-100"}`}>
                  {plan.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-[11px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full">
                      Most popular
                    </span>
                  )}
                  <p className={`text-[13px] font-semibold uppercase tracking-widest mb-3 ${plan.highlight ? "text-white/50" : "text-navy-400"}`}>{plan.name}</p>
                  <div className="mb-1.5">
                    <span className={`font-display text-[40px] font-bold ${plan.highlight ? "text-white" : "text-navy-800"}`}>{plan.price}</span>
                    <span className={`text-sm ml-1.5 ${plan.highlight ? "text-white/40" : "text-navy-400"}`}>{plan.per}</span>
                  </div>
                  <p className={`text-sm mb-7 leading-relaxed ${plan.highlight ? "text-white/55" : "text-navy-400"}`}>{plan.description}</p>
                  <div className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex gap-2.5 items-start">
                        <CheckCircle size={15} className={`flex-shrink-0 mt-px ${plan.highlight ? "text-secondary-500" : "text-accent-500"}`} />
                        <span className={`text-sm ${plan.highlight ? "text-white/75" : "text-navy-600"}`}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {plan.highlight
                    ? <BtnPrimary className="w-full justify-center">{plan.cta}</BtnPrimary>
                    : <BtnGhost className="w-full justify-center">{plan.cta}</BtnGhost>
                  }
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-accent-500 py-20">
        <div className="max-w-[1160px] mx-auto px-6 text-center">
          <AnimateIn direction="up">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold text-white mb-5 leading-tight">
              Your next event could be different.
            </h2>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <p className="text-[17px] text-white/80 mb-9 max-w-[480px] mx-auto">
              Structured networking. Measurable outcomes. Attendees who actually meet the right people.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={150}>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <button className="inline-flex items-center gap-2 bg-white text-navy-800 border-none py-4 px-8 rounded-xl text-base font-semibold cursor-pointer font-sans transition-transform hover:-translate-y-px">
                Start for free <ArrowRight size={16} />
              </button>
              <button className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/40 py-4 px-7 rounded-xl text-base font-medium cursor-pointer font-sans">
                Talk to sales
              </button>
            </div>
          </AnimateIn>
        </div>
      </section>

   
    </HomeWrapper>
  );
}