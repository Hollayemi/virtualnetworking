import { Sparkles, Wand2, Gauge, MessageCircleHeart, CalendarSearch } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  { icon: Gauge, title: "AI matchmaking", body: "Atrium reads what you and every other attendee are looking for, then ranks who's worth your time." },
  { icon: Wand2, title: "Smart introductions", body: "Get a warm, two-line intro you can send in one tap — context included." },
  { icon: MessageCircleHeart, title: "AI icebreakers", body: "Skip the small talk. Open with something specific to the person you're meeting." },
  { icon: CalendarSearch, title: "Meeting suggestions", body: "Atrium notices gaps in your schedule and proposes who to fill them with." },
];

export function AIShowcase() {
  return (
    <section id="ai" className="relative overflow-hidden py-24 md:py-32">
      <div className="bg-mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="card-surface gradient-border relative rounded-[1.75rem] p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent-cyan to-secondary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Atrium AI</p>
                <p className="text-[11px] text-muted-foreground">networking assistant</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="glass rounded-2xl rounded-tl-sm p-3.5 text-sm text-muted">
                You and <span className="text-foreground font-medium">Priya Shah</span> both care
                about climate fintech — and she's raising a seed round this quarter.
              </div>
              <div className="ml-6 rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-secondary p-3.5 text-sm text-white">
                &ldquo;Hi Priya — saw you&apos;re building in climate fintech too. Would love to
                compare notes on go-to-market before your raise.&rdquo;
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-white/[0.02] px-3.5 py-2.5">
                <span className="text-xs text-muted-foreground">Suggested slot</span>
                <span className="font-mono text-xs text-accent-cyan">Thu · 2:30 PM</span>
              </div>
            </div>

            <button className="btn btn-primary mt-4 w-full justify-center">
              Send introduction
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="eyebrow">AI view</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Let AI find your next opportunity
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Switch into AI view and Atrium does the legwork — surfacing the
            people most worth meeting, drafting the opener, and finding the
            time on your calendar.
          </p>

          <div className="mt-9 space-y-5">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass">
                  <f.icon className="h-[18px] w-[18px] text-accent-violet" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
