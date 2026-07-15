'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { FaChrome, FaLinkedin } from 'react-icons/fa';
import { IMAGES } from '@/lib/images';
import { useLoginUserMutation } from '@/redux/authService/authSlice';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-xl border border-white/[0.08] bg-[#0D1712] px-4 py-3 text-[14px] text-[#EAF2ED] placeholder:text-[#5F736A] outline-none transition-colors focus:border-[#639781]/50';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const [loginHandler, { isLoading: submitting }] = useLoginUserMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Enter your email address.';
    else if (!EMAIL_RE.test(email)) next.email = 'That email address doesn\u2019t look right.';
    if (!password) next.password = 'Enter your password.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const login = await loginHandler({ email, password });
    if (login?.data?.success) {
      router.push('/dashboard')
    }
  };

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#0A100D] text-[#EAF2ED] lg:grid lg:grid-cols-2`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Left — image panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image src={IMAGES.talkingGroup} alt="People networking at an event" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#0A100D]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/40 to-[#0A100D]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A100D]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <a href="/" className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              M
            </span>
            <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              VirtualNet
            </span>
          </a>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex flex-wrap gap-2"
            >
              <span className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#0A100D]/60 px-3 py-1.5 text-[11.5px] font-medium backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-[#8FB8A4]" />
                VIP access, protected
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#D9B26B]/25 bg-[#0A100D]/60 px-3 py-1.5 text-[11.5px] font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[#D9B26B]" />
                3 credits → 1 cashback
              </span>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-[1.5rem] font-medium leading-snug tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              "Our sponsors finally got leads they could act on instead of a stack of scanned badges."
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-[13px] text-[#92A79C]"
            >
              Dana K. — Event Organiser, Summit Collective
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex items-center justify-center overflow-hidden px-6 py-16">
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#639781]/[0.12] blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-sm"
        >
          <a href="/" className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              M
            </span>
            <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              VirtualNet
            </span>
          </a>

          <h1 className="text-[1.7rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back
          </h1>
          <p className="mt-2 text-[14px] text-[#92A79C]">Sign in to keep your connections and meetings moving.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-[#C7D6CE]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F736A]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`${inputClass} pl-11 ${errors.email ? 'border-[#D9756B]/50' : ''}`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-[12px] text-[#E0A093]">{errors.email}</p>}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-[13px] font-medium text-[#C7D6CE]">
                  Password
                </label>
                <a href="/forgot-password" className="text-[12.5px] font-medium text-[#8FB8A4] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F736A]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${inputClass} pl-11 pr-11 ${errors.password ? 'border-[#D9756B]/50' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F736A] hover:text-[#8FB8A4]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-[12px] text-[#E0A093]">{errors.password}</p>}
            </div>

            <label className="mt-1 flex items-center gap-2.5 text-[13px] text-[#92A79C]">
              <button
                type="button"
                onClick={() => setRemember((v) => !v)}
                className={`grid h-[18px] w-[18px] place-items-center rounded-md border transition-colors ${remember ? 'border-[#639781] bg-[#639781]' : 'border-white/20 bg-transparent'
                  }`}
                aria-pressed={remember}
              >
                {remember && (
                  <svg viewBox="0 0 12 10" className="h-2.5 w-2.5 fill-none stroke-[#0A100D]" strokeWidth={2}>
                    <path d="M1 5l3.5 3.5L11 1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              Remember me for 30 days
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#639781] py-3.5 text-[14px] font-semibold text-[#0A100D] shadow-[0_0_24px_rgba(99,151,129,0.3)] disabled:opacity-70"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#5F736A]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Or continue with
            </span>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] py-3 text-[13.5px] font-medium text-[#EAF2ED] transition-colors hover:border-white/25">
              <FaChrome className="h-4 w-4" />
              Google
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] py-3 text-[13.5px] font-medium text-[#EAF2ED] transition-colors hover:border-white/25">
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </button>
          </div>

          <p className="mt-8 text-center text-[13px] text-[#5F736A]">
            Don’t have an account?{' '}
            <a href="/register" className="font-medium text-[#8FB8A4] hover:underline">
              Create one
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
