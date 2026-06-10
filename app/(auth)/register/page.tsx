"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Briefcase,
  Building2, ArrowRight, Check, TrendingUp,
} from "lucide-react";
import { useRegisterUserMutation } from "@/redux/authService/authSlice";
import type { RegisterUserRequest } from "@/types/authTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  company: string;
  industry: string;
  networkingGoals: string;
}

type FieldErrors = Partial<Record<keyof FormState | "general", string>>;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8) errors.password = "Password must be at least 8 characters";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
  return errors;
}

const INDUSTRIES = [
  "Technology", "Finance & Fintech", "Healthcare", "Legal", "Education",
  "Media & Creative", "Retail & E-commerce", "Real Estate", "Energy", "Other",
];

const NETWORKING_GOALS = [
  { value: "hiring", label: "Hiring talent" },
  { value: "investment", label: "Raising investment" },
  { value: "partnership", label: "Finding partners" },
  { value: "mentorship", label: "Seeking mentorship" },
  { value: "sales", label: "Sales & leads" },
  { value: "learning", label: "Learning & knowledge" },
];

// ─── Password strength ────────────────────────────────────────────────────────

function passwordStrength(pw: string): { score: number; label: string; color: string } {
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

// ─── Field component ─────────────────────────────────────────────────────────

function Field({
  label, error, hint, children,
}: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0D1B2A] mb-1.5">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-[#E8472F]">{error}</p>}
    </div>
  );
}

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#0D1B2A] placeholder-slate-300 outline-none transition-colors bg-white";
const inputNormal = "border-[#e8edf3] focus:border-[#38AADD]";
const inputError = "border-[#E8472F] bg-red-50 focus:border-[#E8472F]";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [form, setForm] = useState<FormState>({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", role: "", company: "", industry: "", networkingGoals: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const pwStrength = passwordStrength(form.password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (!agreed) errs.general = "You must agree to the terms to continue";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload: RegisterUserRequest = {
      name: form.name,
      email: form.email,
      password: form.password,
      ...(form.phone && { phone: form.phone }),
      ...(form.role && { role: form.role }),
      ...(form.company && { company: form.company }),
      ...(form.industry && { industry: form.industry }),
      ...(form.networkingGoals && { networkingGoals: form.networkingGoals }),
    };

    try {
      const result = await registerUser(payload).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("vn_token", result.data.token);
        localStorage.setItem("vn_user", JSON.stringify(result.data.user));
        localStorage.setItem("vn_role", "user");
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrors({ general: apiErr?.data?.message ?? "Registration failed. Please try again." });
    }
  }

  return (
    <div className="w-full max-w-[520px]">
      <div className="bg-white border border-[#e8edf3] rounded-2xl p-8 shadow-[0_8px_32px_rgba(13,27,42,0.06)]">

        {/* Header */}
        <div className="mb-7">
          <div className="w-11 h-11 rounded-xl bg-[#E8472F] flex items-center justify-center mb-5">
            <TrendingUp size={20} color="#fff" strokeWidth={2} />
          </div>
          <h1
            className="text-[28px] font-semibold text-[#0D1B2A] mb-1.5 leading-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Create your account
          </h1>
          <p className="text-sm text-slate-500">
            Join VirtualNet to connect with the right people at every event.
          </p>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#E8472F] font-medium">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Name + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.name}>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Alex Johnson"
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                />
              </div>
            </Field>

            <Field label="Email address" error={errors.email}>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                />
              </div>
            </Field>
          </div>

          {/* Password */}
          <Field label="Password" error={errors.password} hint="Minimum 8 characters">
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
                aria-label={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {/* Strength bar */}
            {form.password.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="flex-1 h-1 rounded-full transition-colors"
                      style={{
                        background: i <= pwStrength.score ? pwStrength.color : "#e8edf3",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium" style={{ color: pwStrength.color }}>
                  {pwStrength.label}
                </span>
              </div>
            )}
          </Field>

          {/* Confirm password */}
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

          {/* Divider – optional fields */}
          <div className="flex items-center gap-3 py-1">
            <span className="flex-1 h-px bg-[#e8edf3]" />
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">
              Profile (optional)
            </span>
            <span className="flex-1 h-px bg-[#e8edf3]" />
          </div>

          {/* Phone + Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone number" error={errors.phone}>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+44 7000 000000"
                  className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                />
              </div>
            </Field>

            <Field label="Job title / Role">
              <div className="relative">
                <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                  placeholder="e.g. Founder, VP Sales"
                  className={`${inputBase} ${inputNormal}`}
                />
              </div>
            </Field>
          </div>

          {/* Company + Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company">
              <div className="relative">
                <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  placeholder="Company name"
                  className={`${inputBase} ${inputNormal}`}
                />
              </div>
            </Field>

            <Field label="Industry">
              <select
                value={form.industry}
                onChange={(e) => setField("industry", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#e8edf3] text-sm text-[#0D1B2A] outline-none focus:border-[#38AADD] bg-white transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Networking goal */}
          <Field label="Primary networking goal">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NETWORKING_GOALS.map((g) => {
                const selected = form.networkingGoals === g.value;
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setField("networkingGoals", selected ? "" : g.value)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12.5px] font-medium transition-colors cursor-pointer ${
                      selected
                        ? "border-[#E8472F] bg-[#fff5f4] text-[#E8472F]"
                        : "border-[#e8edf3] text-slate-600 hover:border-slate-300 bg-white"
                    }`}
                  >
                    {selected && <Check size={11} strokeWidth={3} />}
                    {g.label}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer mt-1">
            <button
              type="button"
              onClick={() => setAgreed((v) => !v)}
              className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer bg-transparent ${
                agreed
                  ? "border-[#E8472F] bg-[#E8472F]"
                  : "border-[#d1d9e2] hover:border-[#E8472F]"
              }`}
              aria-checked={agreed}
              role="checkbox"
            >
              {agreed && <Check size={11} color="#fff" strokeWidth={3} />}
            </button>
            <span className="text-[13px] text-slate-500 leading-relaxed">
              I agree to VirtualNet&apos;s{" "}
              <Link href="/terms" className="text-[#38AADD] no-underline hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#38AADD] no-underline hover:underline font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8472F] hover:bg-[#c73a24] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer border-none"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                Create account <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#E8472F] font-semibold no-underline hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-slate-400 mt-5">
        🔒 Secured by 256-bit TLS encryption
      </p>
    </div>
  );
}
