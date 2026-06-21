import { Check } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Attendee",
    price: "Free",
    sub: "for anyone joining an Atrium event",
    features: ["Full attendee directory", "Standard view networking", "Direct messaging", "1:1 meeting scheduling"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$19",
    sub: "per attendee, per event",
    features: ["Everything in Attendee", "AI matchmaking & scores", "Smart introductions", "AI icebreakers & meeting notes", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "for organizers running the event",
    features: ["Everything in Professional", "Networking & lead analytics", "Sponsor lead tracking", "SSO & dedicated success manager"],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">Pricing</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simple pricing, for every seat at the event
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.name}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl p-7",
                  p.highlighted
                    ? "gradient-border card-surface shadow-[var(--shadow-glow)]"
                    : "border border-border bg-white/[0.02]"
                )}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold text-foreground">{p.price}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.sub}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="/login"
                  className={cn(
                    "btn mt-7 w-full justify-center",
                    p.highlighted ? "btn-primary" : "btn-secondary"
                  )}
                >
                  {p.name === "Enterprise" ? "Talk to sales" : "Get started"}
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
