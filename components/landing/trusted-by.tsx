import { Reveal } from "@/components/ui/reveal";

const logos = [
  "Foundry Summit",
  "Northpoint Capital",
  "Launchbay",
  "Builders Guild",
  "Signal Conference",
  "Driftwell Labs",
  "Outpost Accelerator",
  "Field Notes",
];

export function TrustedBy() {
  const loop = [...logos, ...logos];
  return (
    <section className="border-y border-border py-10">
      <div className="container-page">
        <Reveal className="mb-7 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by conferences, accelerators &amp; communities worldwide
        </Reveal>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex w-max gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display whitespace-nowrap text-lg font-semibold text-muted-foreground/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
