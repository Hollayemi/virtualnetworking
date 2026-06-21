import { CalendarPlus, Compass, HandshakeIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "Join the event",
    body: "Sign in with your event code and build a profile that surfaces what you're actually looking for — partners, capital, talent, or your next role.",
    icon: CalendarPlus,
  },
  {
    n: "02",
    title: "Discover people",
    body: "Browse the full attendee list, or let Atrium's matching surface the handful of people most worth your time.",
    icon: Compass,
  },
  {
    n: "03",
    title: "Schedule meaningful meetings",
    body: "Send a request, pick a slot that works for both of you, and walk in already knowing why the conversation matters.",
    icon: HandshakeIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How it works</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From event code to your next great conversation
          </h2>
        </Reveal>

        <StaggerGroup className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block" />
          {steps.map((s) => (
            <StaggerItem key={s.n} className="relative">
              <div className="card-surface relative h-full rounded-2xl p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-foreground/10">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
