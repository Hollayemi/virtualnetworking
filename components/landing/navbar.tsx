"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Standard view", href: "#standard" },
  { label: "AI view", href: "#ai" },
  { label: "For organizers", href: "#organizers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled ? "glass-strong shadow-[var(--shadow-card)]" : "bg-transparent border border-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Logomark />
            <span className="font-display text-[1.05rem] font-bold tracking-tight text-foreground">
              Atrium
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="btn btn-ghost px-3">
              Sign in
            </Link>
            <Link href="/login" className="btn btn-primary">
              Start networking
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl glass lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="container-page mt-2 lg:hidden"
          >
            <div className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Link href="/login" className="btn btn-secondary flex-1 justify-center">
                  Sign in
                </Link>
                <Link href="/login" className="btn btn-primary flex-1 justify-center">
                  Start networking
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} fill="none">
      <rect width="32" height="32" rx="9" fill="url(#atrium-grad)" />
      <path d="M16 7L24 23H8L16 7Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 14L19.8 21.5H12.2L16 14Z" fill="white" fillOpacity="0.92" />
      <defs>
        <linearGradient id="atrium-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F6FFB" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}
