"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, TrendingUp } from "lucide-react";
import { useLoginUserMutation } from "@/redux/authService/authSlice";

interface FormState {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.password) errors.password = "Password is required";
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      const result = await loginUser(form).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("vn_token", result.data.token);
        localStorage.setItem("vn_user", JSON.stringify(result.data.user));
        localStorage.setItem("vn_role", "user");
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setErrors({ general: apiErr?.data?.message ?? "Invalid email or password. Please try again." });
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      {/* Card */}
      <div className="bg-white border border-[#e8edf3] rounded-2xl p-8 shadow-[0_8px_32px_rgba(13,27,42,0.06)]">

        {/* Header */}
        <div className="mb-8">
          <div className="w-11 h-11 rounded-xl bg-[#E8472F] flex items-center justify-center mb-5">
            <TrendingUp size={20} color="#fff" strokeWidth={2} />
          </div>
          <h1
            className="text-[28px] font-semibold text-[#0D1B2A] mb-1.5 leading-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to your attendee account to continue networking.
          </p>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-[#E8472F] font-medium">
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-[13px] font-semibold text-[#0D1B2A] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#0D1B2A] placeholder-slate-300 outline-none transition-colors ${
                  errors.email
                    ? "border-[#E8472F] bg-red-50 focus:border-[#E8472F]"
                    : "border-[#e8edf3] bg-white focus:border-[#38AADD]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-[#E8472F]">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-semibold text-[#0D1B2A]">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#38AADD] font-medium no-underline hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-[#0D1B2A] placeholder-slate-300 outline-none transition-colors ${
                  errors.password
                    ? "border-[#E8472F] bg-red-50 focus:border-[#E8472F]"
                    : "border-[#e8edf3] bg-white focus:border-[#38AADD]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-[#E8472F]">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8472F] hover:bg-[#c73a24] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer border-none"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-[#e8edf3]" />
          <span className="text-xs text-slate-400">or</span>
          <span className="flex-1 h-px bg-[#e8edf3]" />
        </div> */}

        {/* Organiser CTA */}
        {/* <Link
          href="/organiser/login"
          className="w-full flex items-center justify-center gap-2 py-3 border border-[#e8edf3] rounded-xl text-sm font-medium text-slate-600 no-underline hover:border-[#38AADD] hover:text-[#0D1B2A] transition-colors"
        >
          Sign in as an organiser
        </Link> */}

        {/* Register link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          No account yet?{" "}
          <Link
            href="/register"
            className="text-[#E8472F] font-semibold no-underline hover:underline"
          >
            Create one free
          </Link>
        </p>
      </div>

    </div>
  );
}
