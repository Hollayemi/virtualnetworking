import { BarChart3, Target, Users2, Activity } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const benefits = [
  { icon: BarChart3, title: "Networking analytics", body: "See how connections form across your event, in real time." },
  { icon: Target, title: "Lead tracking", body: "Know exactly which sponsors and exhibitors are converting." },
  { icon: Users2, title: "Attendee insights", body: "Understand who showed up and what they came looking for." },
  { icon: Activity, title: "Performance metrics", body: "Benchmark this event against every one you've run before." },
];

const bars = [38, 62, 47, 81, 55, 73, 64];

export function OrganizerSection() {
  return (
    <section id="organizers" className="py-24 md:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">For event organizers</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Prove the value of every event you run
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Atrium gives organizers a live view of how networking is actually
            going — not just who registered, but who connected, and what came
            of it.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-3.5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass">
                  <b.icon className="h-[18px] w-[18px] text-electric" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-surface rounded-[1.75rem] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Connections this event</p>
                <p className="font-display mt-1 text-2xl font-bold text-foreground">4,812</p>
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-1 font-mono text-xs font-semibold text-success">
                +18.4%
              </span>
            </div>

            <div className="flex h-32 items-end gap-2.5">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-accent-cyan/70" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { label: "Avg. match score", value: "87%" },
                { label: "Meetings booked", value: "1,930" },
                { label: "Sponsor leads", value: "642" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
