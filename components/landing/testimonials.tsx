import { Quote } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const quotes = [
  {
    quote: "We replaced three networking apps with Atrium and our attendees actually used this one. The AI matches weren't gimmicky — people kept the meetings.",
    name: "Helena Brandt",
    role: "Director, Signal Conference",
  },
  {
    quote: "I went in skeptical about AI matchmaking and left with four investor meetings I wouldn't have found on my own. The icebreakers genuinely helped.",
    name: "Marcus Oyelaran",
    role: "Founder, Driftwell",
  },
  {
    quote: "Switching between standard and AI view in the same app meant we didn't have to convince every attendee to trust the algorithm. They could opt in.",
    name: "Jin Park",
    role: "Head of Community, Outpost",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">From the field</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Networking people actually follow through on
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card-surface flex h-full flex-col rounded-2xl p-7">
                <Quote className="h-6 w-6 text-secondary/60" />
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
