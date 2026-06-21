"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  PlayCircle,
  Sparkles,
  Search,
  SlidersHorizontal,
  Users,
  CalendarCheck2,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "standard" | "ai";

const standardPeople = [
  { name: "Priya Shah", role: "Head of Partnerships · Lumio", tag: "Open to meet" },
  { name: "Daniel Cho", role: "Seed Investor · Northpoint", tag: "2 mutuals" },
  { name: "Maya Okafor", role: "Founder · Driftwell", tag: "Speaking today" },
];

const aiPeople = [
  { name: "Priya Shah", role: "Head of Partnerships · Lumio", score: 96 },
  { name: "Daniel Cho", role: "Seed Investor · Northpoint", score: 91 },
  { name: "Maya Okafor", role: "Founder · Driftwell", score: 88 },
];

export function Hero() {
  const [mode, setMode] = useState<Mode>("ai");

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="bg-mesh pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow glass mb-6 inline-flex rounded-full px-3.5 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered event networking
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-foreground md:text-[3.4rem]"
          >
            Meet the right people{" "}
            <span className="gradient-text">before the event begins</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            Atrium helps attendees, founders, investors, recruiters, and
            professionals build meaningful connections — with smart
            matchmaking when you want it, and full control when you don&apos;t.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="/login" className="btn btn-primary px-6 py-3.5 text-base">
              Start networking
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#how-it-works" className="btn btn-secondary px-6 py-3.5 text-base">
              <PlayCircle className="h-4 w-4" />
              Watch demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm text-muted-foreground"
          >
            <Stat value="25k+" label="professionals" />
            <Stat value="50k+" label="meetings created" />
            <Stat value="92%" label="match success" />
          </motion.div>
        </div>

        {/* Interactive dashboard mockup */}
        <div className="relative mx-auto w-full max-w-[480px]">
          <div
            className={cn(
              "absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl transition-colors duration-700",
              mode === "ai" ? "bg-secondary/30" : "bg-primary/20"
            )}
          />
          <AnimatePresence>
            {mode === "ai" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="absolute -inset-6 -z-10 rounded-[2.5rem] border border-dashed border-accent-violet/30"
                style={{ borderRadius: "2.5rem" }}
              >
                <div className="animate-spin-slow absolute -inset-px rounded-[2.5rem] border border-accent-cyan/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode toggle */}
          <div className="glass-strong relative z-10 mb-4 flex items-center gap-1 rounded-full p-1.5 text-sm font-semibold">
            {(["standard", "ai"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "relative flex-1 rounded-full px-4 py-2 transition-colors",
                  mode === m ? "text-white" : "text-muted hover:text-foreground"
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="hero-toggle-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "var(--gradient-brand)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {m === "standard" ? "Standard view" : "AI view"}
              </button>
            ))}
          </div>

          {/* Dashboard card */}
          <div className="card-surface relative z-10 rounded-[1.75rem] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-danger/70" />
                <span className="h-2 w-2 rounded-full bg-warning/70" />
                <span className="h-2 w-2 rounded-full bg-success/70" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                summit-2026.atrium.app
              </span>
            </div>

            <div className="glass mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              {mode === "standard" ? "Search attendees…" : "Ask Atrium who to meet…"}
              <SlidersHorizontal className="ml-auto h-4 w-4" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-2.5"
              >
                {(mode === "standard" ? standardPeople : aiPeople).map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                    </div>
                    {"score" in p ? (
                      <span className="shrink-0 rounded-full bg-accent-cyan/15 px-2.5 py-1 font-mono text-xs font-semibold text-accent-cyan">
                        {p.score}%
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted">
                        {p.tag}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating cards */}
          <AnimatePresence mode="wait">
            {mode === "ai" ? (
              <motion.div
                key="ai-floats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FloatCard
                  className="-left-10 top-10 hidden sm:flex"
                  icon={<TrendingUp className="h-4 w-4 text-accent-cyan" />}
                  label="AI Match Score"
                  value="96%"
                  delay={0}
                />
                <FloatCard
                  className="-right-8 top-[42%] hidden sm:flex"
                  icon={<Wand2 className="h-4 w-4 text-accent-violet" />}
                  label="Smart Introduction"
                  value="Ready to send"
                  delay={0.4}
                />
              </motion.div>
            ) : (
              <motion.div
                key="standard-floats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FloatCard
                  className="-left-10 top-10 hidden sm:flex"
                  icon={<CalendarCheck2 className="h-4 w-4 text-accent-cyan" />}
                  label="Meeting Requests"
                  value="3 new"
                  delay={0}
                />
                <FloatCard
                  className="-right-8 top-[42%] hidden sm:flex"
                  icon={<Users className="h-4 w-4 text-accent-violet" />}
                  label="Event Analytics"
                  value="412 connections"
                  delay={0.4}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-display text-foreground">{value}</span>
      <span>{label}</span>
    </span>
  );
}

function FloatCard({
  icon,
  label,
  value,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "animate-float glass-strong absolute z-20 w-[180px] items-center gap-3 rounded-2xl p-3 shadow-[var(--shadow-card)]",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5">{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
