import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="bg-mesh card-surface relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <h2 className="font-display relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Turn every event into{" "}
              <span className="gradient-text">meaningful connections</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-muted">
              Join attendees and organizers already using Atrium to make
              networking worth showing up for.
            </p>
            <a
              href="/login"
              className="btn btn-primary relative mt-8 inline-flex px-7 py-3.5 text-base"
            >
              Get started
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
