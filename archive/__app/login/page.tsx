import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Logomark } from "@/components/landing/navbar";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Marketing panel */}
      <div className="bg-mesh relative hidden flex-col justify-between overflow-hidden bg-background-elevated p-12 lg:flex">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <Logomark />
          <span className="font-display text-lg font-bold text-foreground">Atrium</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <p className="eyebrow mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered networking
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground">
            The right conversation is already in the room
          </h1>
          <p className="mt-4 text-muted">
            Sign in to see who Atrium thinks you should meet at your next
            event — and pick up where your last conversation left off.
          </p>

          <figure className="glass-strong mt-10 rounded-2xl p-5">
            <blockquote className="text-sm leading-relaxed text-foreground/90">
              &ldquo;Four investor meetings from one afternoon. I wouldn&apos;t have
              found half of them on my own.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              Marcus Oyelaran · Founder, Driftwell
            </figcaption>
          </figure>
        </div>

        <div className="relative z-10 flex gap-10 font-mono text-sm text-muted-foreground">
          <Stat value="25k+" label="professionals" />
          <Stat value="50k+" label="meetings created" />
          <Stat value="92%" label="match success" />
        </div>
      </div>

      {/* Auth card */}
      <div className="relative flex items-center justify-center bg-background p-6 sm:p-10">
        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="glass-strong w-full max-w-[400px] rounded-3xl p-8">
          <div className="mb-1 flex items-center gap-2.5 lg:hidden">
            <Logomark />
            <span className="font-display text-base font-bold text-foreground">Atrium</span>
          </div>

          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Sign in to continue networking.
          </p>

          <div className="mt-7 space-y-2.5">
            <SocialButton label="Continue with Google" provider="google" />
            <SocialButton label="Continue with LinkedIn" provider="linkedin" />
            <SocialButton label="Continue with Microsoft" provider="microsoft" />
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                Email address
              </label>
              <div className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-muted">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-primary-light hover:text-accent-cyan">
                  Forgot password?
                </a>
              </div>
              <div className="glass rounded-xl px-3.5 py-3">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center py-3 text-sm">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-semibold text-foreground hover:text-accent-cyan">
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-display text-foreground">{value}</span>
      <span>{label}</span>
    </span>
  );
}

function SocialButton({ label, provider }: { label: string; provider: "google" | "linkedin" | "microsoft" }) {
  return (
    <button className="btn btn-secondary w-full justify-center gap-2.5 py-3 text-sm">
      <ProviderIcon provider={provider} />
      {label}
    </button>
  );
}

function ProviderIcon({ provider }: { provider: "google" | "linkedin" | "microsoft" }) {
  if (provider === "google") {
    return (
      <svg viewBox="0 0 18 18" className="h-4 w-4">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.61z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.87-3.05.87-2.35 0-4.34-1.58-5.05-3.71H.96v2.33A9 9 0 0 0 9 18z" />
        <path fill="#FBBC05" d="M3.95 10.72A5.4 5.4 0 0 1 3.66 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.59 8.59 0 0 0 9 0 9 9 0 0 0 .96 4.95l2.99 2.33C4.66 5.16 6.65 3.58 9 3.58z" />
      </svg>
    );
  }
  if (provider === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0A66C2">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 21 21" className="h-4 w-4">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}
