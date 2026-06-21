"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Globe,
  Building2, ArrowRight, ArrowLeft, Check, TrendingUp,
  FileText, Rocket,
} from "lucide-react";
import { useRegisterOrganiserMutation } from "@/redux/authService/authSlice";
import type { RegisterOrganiserRequest } from "@/types/authTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  // Step 1 – Account
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  // Step 2 – Organisation
  organisationName: string;
  organisationDescription: string;
  website: string;
}

type FieldErrors = Partial<Record<keyof FormState | "general", string>>;

// ─── Validation per step ──────────────────────────────────────────────────────

function validateStep1(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Your name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8) errors.password = "Minimum 8 characters";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
  return errors;
}

function validateStep2(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.organisationName.trim()) errors.organisationName = "Organisation name is required";
  if (data.website && !/^https?:\/\/.+/.test(data.website))
    errors.website = "Enter a valid URL starting with http:// or https://";
  return errors;
}

// ─── Password strength ────────────────────────────────────────────────────────

function pwStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#E8472F" };
  if (score <= 3) return { score, label: "Fair", color: "#f59e0b" };
  return { score, label: "Strong", color: "#8DC64C" };
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#0D1B2A] placeholder-slate-300 outline-none transition-colors bg-white";
const inputNormal = "border-[#e8edf3] focus:border-[#38AADD]";
const inputError = "border-[#E8472F] bg-red-50 focus:border-[#E8472F]";

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0D1B2A] mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-[#E8472F]">{error}</p>}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Your account", icon: User },
  { label: "Organisation", icon: Building2 },
  { label: "All set!", icon: Rocket },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={step.label} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  done
                    ? "bg-[#8DC64C]"
                    : active
                    ? "bg-[#E8472F]"
                    : "bg-[#e8edf3]"
                }`}
              >
                {done ? (
                  <Check size={15} color="#fff" strokeWidth={3} />
                ) : (
                  <Icon size={15} color={active ? "#fff" : "#94a3b8"} strokeWidth={1.8} />
                )}
              </div>
              <span
                className={`text-[11px] font-medium leading-tight text-center ${
                  active ? "text-[#0D1B2A]" : done ? "text-[#8DC64C]" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-14 sm:w-20 mx-1 mb-5 rounded-full transition-colors ${
                  done ? "bg-[#8DC64C]" : "bg-[#e8edf3]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OrganiserOnboardingPage() {
  const router = useRouter();
  const [registerOrganiser, { isLoading }] = useRegisterOrganiserMutation();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", password: "", confirmPassword: "", phone: "",
    organisationName: "", organisationDescription: "", website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep1(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2(form);
    if (!agreed) errs.general = "Please accept the terms to continue";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload: RegisterOrganiserRequest = {
      name: form.name,
      email: form.email,
      password: form.password,
      organisationName: form.organisationName,
      ...(form.organisationDescription && { organisationDescription: form.organisationDescription }),
      ...(form.website && { website: form.website }),
      ...(form.phone && { phone: form.phone }),
    };

    try {
      const result = await registerOrganiser(payload).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("vn_token", result.data.token);
        localStorage.setItem("vn_organiser", JSON.stringify(result.data.organiser));
        localStorage.setItem("vn_role", "organiser");
      }
      setStep(2);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrors({ general: apiErr?.data?.message ?? "Registration failed. Please try again." });
    }
  }

  const strength = pwStrength(form.password);

  return (
    <div className="w-full max-w-[520px]">
      <div className="bg-white border border-[#e8edf3] rounded-2xl p-8 shadow-[0_8px_32px_rgba(13,27,42,0.06)]">

        {/* Header */}
        <div className="mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#0D1B2A] flex items-center justify-center mb-5">
            <TrendingUp size={20} color="#fff" strokeWidth={2} />
          </div>
          <h1
            className="text-[26px] font-semibold text-[#0D1B2A] mb-1.5 leading-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {step === 2 ? "You're all set!" : "Organiser onboarding"}
          </h1>
          <p className="text-sm text-slate-500">
            {step === 0 && "Create your personal account first."}
            {step === 1 && "Tell us about your organisation."}
            {step === 2 && "Your organiser account is ready to go."}
          </p>
        </div>

        <StepIndicator current={step} />

        {/* ── Step 0: Account ─────────────────────────────────────────────────── */}
        {step === 0 && (
          <form onSubmit={handleNext} noValidate className="flex flex-col gap-4">
            {errors.general && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#E8472F] font-medium">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Your name" error={errors.name}>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Jane Smith"
                    className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  />
                </div>
              </Field>

              <Field label="Phone (optional)">
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+44 7000 000000"
                    className={`${inputBase} ${inputNormal}`}
                  />
                </div>
              </Field>
            </div>

            <Field label="Email address" error={errors.email}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="jane@yourcompany.com"
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                />
              </div>
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Create a strong password"
                  className={`${inputBase} pr-11 ${errors.password ? inputError : inputNormal}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="flex-1 h-1 rounded-full transition-colors"
                        style={{ background: i <= strength.score ? strength.color : "#e8edf3" }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </Field>

            <Field label="Confirm password" error={errors.confirmPassword}>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  placeholder="Repeat your password"
                  className={`${inputBase} pr-11 ${errors.confirmPassword ? inputError : inputNormal}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-[#0D1B2A] hover:bg-[#1a2f48] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer border-none"
            >
              Continue <ArrowRight size={15} />
            </button>
          </form>
        )}

        {/* ── Step 1: Organisation ─────────────────────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {errors.general && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#E8472F] font-medium">
                {errors.general}
              </div>
            )}

            <Field label="Organisation name" error={errors.organisationName}>
              <div className="relative">
                <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.organisationName}
                  onChange={(e) => setField("organisationName", e.target.value)}
                  placeholder="e.g. TechSummit Europe Ltd"
                  className={`${inputBase} ${errors.organisationName ? inputError : inputNormal}`}
                />
              </div>
            </Field>

            <Field label="Website (optional)" error={errors.website}>
              <div className="relative">
                <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                  placeholder="https://yourorg.com"
                  className={`${inputBase} ${errors.website ? inputError : inputNormal}`}
                />
              </div>
            </Field>

            <Field label="About your organisation (optional)">
              <div className="relative">
                <FileText
                  size={15}
                  className="absolute left-3.5 top-3.5 text-slate-400"
                  style={{ pointerEvents: "none" }}
                />
                <textarea
                  value={form.organisationDescription}
                  onChange={(e) => setField("organisationDescription", e.target.value)}
                  placeholder="A short description of what your organisation does and the events you run…"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8edf3] text-sm text-[#0D1B2A] placeholder-slate-300 outline-none focus:border-[#38AADD] bg-white resize-none transition-colors"
                />
              </div>
            </Field>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <button
                type="button"
                onClick={() => setAgreed((v) => !v)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer bg-transparent ${
                  agreed ? "border-[#E8472F] bg-[#E8472F]" : "border-[#d1d9e2] hover:border-[#E8472F]"
                }`}
                role="checkbox"
                aria-checked={agreed}
              >
                {agreed && <Check size={11} color="#fff" strokeWidth={3} />}
              </button>
              <span className="text-[13px] text-slate-500 leading-relaxed">
                I agree to VirtualNet&apos;s{" "}
                <Link href="/terms" className="text-[#38AADD] no-underline hover:underline font-medium">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#38AADD] no-underline hover:underline font-medium">Privacy Policy</Link>
              </span>
            </label>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => { setErrors({}); setStep(0); }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-[#e8edf3] text-sm font-medium text-slate-600 rounded-xl hover:border-slate-300 transition-colors cursor-pointer bg-white"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#E8472F] hover:bg-[#c73a24] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer border-none"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>Create organiser account <ArrowRight size={15} /></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ── Step 2: Success ──────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#f0f9ec] border-2 border-[#8DC64C] flex items-center justify-center">
              <Check size={28} color="#8DC64C" strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-1">
                Welcome to VirtualNet,{" "}
                <strong className="text-[#0D1B2A]">{form.name}</strong>!
              </p>
              <p className="text-sm text-slate-400">
                Your organiser account for{" "}
                <strong className="text-slate-600">{form.organisationName}</strong>{" "}
                is ready.
              </p>
            </div>

            {/* Checklist */}
            <div className="w-full text-left flex flex-col gap-2.5 bg-[#FAFAF8] border border-[#e8edf3] rounded-xl p-5">
              {[
                "Account created and verified",
                "Organiser profile set up",
                "Ready to create your first event",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#8DC64C] flex items-center justify-center flex-shrink-0">
                    <Check size={11} color="#fff" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[#0D1B2A]">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/organiser/dashboard")}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8472F] hover:bg-[#c73a24] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer border-none"
            >
              Go to dashboard <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Footer links */}
        {step < 2 && (
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/organiser/login" className="text-[#E8472F] font-semibold no-underline hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>

      <p className="text-center text-xs text-slate-400 mt-5">
        🔒 Secured by 256-bit TLS encryption
      </p>
    </div>
  );
}
