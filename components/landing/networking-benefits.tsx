import { Rocket, LineChart, UsersRound, Megaphone, Code2, BriefcaseBusiness } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const personas = [
  { icon: Rocket, title: "Founders", body: "Find investors, co-founders, and design partners in the room." },
  { icon: LineChart, title: "Investors", body: "Source deal flow without sitting through a hundred pitches." },
  { icon: UsersRound, title: "Recruiters", body: "Meet candidates who match your open roles, ranked by fit." },
  { icon: Megaphone, title: "Sponsors", body: "Get warm intros to the attendees most likely to convert." },
  { icon: Code2, title: "Developers", body: "Find collaborators, mentors, and the next team to join." },
  { icon: BriefcaseBusiness, title: "Job seekers", body: "Skip the booth line and get straight to the hiring manager." },
];

export function NetworkingBenefits() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">Built for every attendee</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Whoever you are, Atrium knows who you should meet
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong hover:bg-white/[0.04]">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-electric transition-colors group-hover:text-accent-cyan">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-5 text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
