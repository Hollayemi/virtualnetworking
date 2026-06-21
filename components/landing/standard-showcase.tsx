import { Search, Filter, MessageSquare, CalendarClock, UserPlus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  { icon: UserPlus, title: "Attendee directory", body: "Browse every registered attendee with full control over who you see." },
  { icon: Filter, title: "Search & filters", body: "Narrow by role, company, industry, or what people came to the event for." },
  { icon: MessageSquare, title: "Connection requests", body: "Send a request with a short note — no cold, faceless invites." },
  { icon: CalendarClock, title: "Meeting scheduler", body: "Propose a time, sync to calendar, and confirm in two taps." },
];

const directory = [
  { name: "Elena Marsh", role: "VP Product · Northwind", filter: "Product" },
  { name: "Tomás Rivera", role: "Recruiter · Halcyon", filter: "Talent" },
  { name: "Wei Lin", role: "Angel Investor", filter: "Capital" },
  { name: "Sara Patel", role: "Founder · Greenline", filter: "Founder" },
];

export function StandardShowcase() {
  return (
    <section id="standard" className="py-24 md:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Standard view</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Network your way
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Prefer to do the searching yourself? Standard view gives you the
            full directory, real filters, and a clean way to manage requests
            and meetings — no algorithm required.
          </p>

          <div className="mt-9 space-y-5">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass">
                  <f.icon className="h-[18px] w-[18px] text-electric" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-surface rounded-[1.75rem] p-5">
            <div className="glass mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              Search 1,240 attendees…
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["All", "Founder", "Capital", "Talent", "Product"].map((chip, i) => (
                <span
                  key={chip}
                  className={
                    i === 0
                      ? "rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1.5 text-xs font-semibold text-white"
                      : "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted"
                  }
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="space-y-2.5">
              {directory.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric to-primary font-display text-xs font-bold text-white">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                  </div>
                  <button className="shrink-0 rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/5">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
