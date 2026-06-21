"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do I have to use AI matching?",
    a: "No. Atrium lets you switch between Standard view, where you search and filter the directory yourself, and AI view, where matching, intros, and icebreakers are generated for you. You can move between the two at any point during the event.",
  },
  {
    q: "How does the AI decide who to match me with?",
    a: "It looks at what you told us you're there for, your role and industry, mutual connections, and how full your schedule already is — then ranks attendees by how likely a meeting is to be worth both of your time.",
  },
  {
    q: "Can organizers see our private messages?",
    a: "No. Organizers see aggregate analytics — connection volume, meeting counts, lead conversion — never the content of individual messages or meeting notes.",
  },
  {
    q: "Does Atrium work for in-person, virtual, and hybrid events?",
    a: "Yes. The same directory, matching, and scheduling tools work whether attendees are on-site, joining remotely, or both.",
  },
  {
    q: "What happens to my data after the event ends?",
    a: "Your profile and connections stay available in your account so you can keep following up. You can export or delete your data at any time from account settings.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-page mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">FAQ</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Questions, answered
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-white/[0.02]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-[1.125rem] text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-foreground">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-accent-cyan"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden px-5 pb-[1.125rem] text-sm leading-relaxed text-muted">
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
