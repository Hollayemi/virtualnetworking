import { Gauge, Bot, NotebookPen, FileText, Send, Telescope } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const minor = [
  { icon: Bot, title: "Smart networking assistant", body: "A standing assistant that watches the agenda and nudges you toward people worth meeting." },
  { icon: NotebookPen, title: "AI meeting notes", body: "Notes captured automatically, organized by who you talked to and why." },
  { icon: FileText, title: "AI summaries", body: "A daily digest of who you met, what was discussed, and what's still open." },
  { icon: Send, title: "Follow-up generator", body: "A draft follow-up ready within minutes of the meeting ending." },
  { icon: Telescope, title: "Opportunity detection", body: "Atrium flags overlapping interests you'd have otherwise missed." },
];

export function AIFeaturesGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">Under the hood</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            One assistant, working the whole event
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal className="card-surface gradient-border relative col-span-1 row-span-2 rounded-2xl p-7 md:col-span-2">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-electric to-secondary text-white">
              <Gauge className="h-[22px] w-[22px]" />
            </div>
            <h3 className="font-display mt-6 text-xl font-bold text-foreground">AI match engine</h3>
            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted">
              Every attendee's goals, background, and availability run
              through Atrium's matching model in real time — so the people at
              the top of your list are the ones actually worth your fifteen
              minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Goals", "Industry", "Availability", "Past meetings", "Mutuals"].map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {minor.map((f, i) => (
            <Reveal key={f.title} delay={0.05 * (i + 1)}>
              <div className="h-full rounded-2xl border border-border bg-white/[0.02] p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl glass text-accent-violet">
                  <f.icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="font-display mt-5 text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
