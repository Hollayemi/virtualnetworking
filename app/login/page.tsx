'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const socialProviders = [
  {
    name: 'Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="#0A66C2">
        <path d="M16.2 0H1.8A1.8 1.8 0 000 1.8v14.4A1.8 1.8 0 001.8 18h14.4A1.8 1.8 0 0018 16.2V1.8A1.8 1.8 0 0016.2 0zM5.4 15.3H2.7V6.75h2.7V15.3zM4.05 5.58a1.575 1.575 0 110-3.15 1.575 1.575 0 010 3.15zM15.3 15.3h-2.7v-4.725c0-1.125-.45-1.575-1.125-1.575-.9 0-1.35.675-1.35 1.575V15.3H7.425V6.75h2.7v1.125c.45-.675 1.35-1.35 2.7-1.35 1.8 0 2.925 1.125 2.925 3.375V15.3z"/>
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022"/>
        <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00"/>
        <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF"/>
        <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900"/>
      </svg>
    ),
  },
]

const stats = [
  { value: '25K+', label: 'Professionals' },
  { value: '50K+', label: 'Meetings created' },
  { value: '92%', label: 'Match success' },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#000000]">
      {/* Left: Marketing panel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0D1530] to-[#0A1020] flex flex-col justify-between p-[clamp(40px,5vw,64px)] hidden lg:flex">
        {/* Orbs */}
        <div className="absolute w-[400px] h-[400px] top-[-10%] left-[-10%] opacity-30 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute w-[300px] h-[300px] bottom-[10%] right-[-5%] opacity-20 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute w-[200px] h-[200px] top-[50%] left-[40%] opacity-15 bg-primary-400 rounded-full blur-3xl" />

        {/* Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(79,110,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,110,247,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-[0_0_24px_rgba(79,110,247,0.4)]">
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-white">Nexus</span>
          </Link>
        </div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          {/* Network viz */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 border border-primary-200/20 mb-9 flex items-center justify-center relative overflow-hidden">
            {/* Network nodes visualization */}
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="absolute inset-0">
              {/* Connection lines */}
              {[
                [200, 150, 100, 80],
                [200, 150, 300, 80],
                [200, 150, 320, 200],
                [200, 150, 80, 220],
                [200, 150, 140, 260],
                [100, 80, 300, 80],
                [300, 80, 320, 200],
              ].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(79,110,247,0.2)" strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Center node (you) */}
              <circle cx="200" cy="150" r="28" fill="url(#grad1)" />
              <circle cx="200" cy="150" r="32" fill="none" stroke="rgba(79,110,247,0.4)" strokeWidth="1.5"/>
              <text x="200" y="154" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">YOU</text>

              {/* Surrounding nodes */}
              {[
                { cx: 100, cy: 80, label: 'Investor', color: '#7C3AED', r: 22 },
                { cx: 300, cy: 80, label: 'Founder', color: '#4F6EF7', r: 22 },
                { cx: 320, cy: 200, label: 'Partner', color: '#06B6D4', r: 20 },
                { cx: 80, cy: 220, label: 'CTO', color: '#A855F7', r: 20 },
                { cx: 140, cy: 260, label: 'VC', color: '#4F6EF7', r: 18 },
              ].map((node, i) => (
                <g key={i}>
                  <circle cx={node.cx} cy={node.cy} r={node.r} fill={`${node.color}30`} stroke={node.color} strokeWidth="1.5"/>
                  <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="600">
                    {node.label}
                  </text>
                  {/* Match score badge */}
                  <circle cx={node.cx + node.r - 4} cy={node.cy - node.r + 4} r="9" fill={node.color}/>
                  <text x={node.cx + node.r - 4} y={node.cy - node.r + 8} textAnchor="middle" fill="white" fontSize="7" fontWeight="700">
                    {85 + i * 2}%
                  </text>
                </g>
              ))}

              <defs>
                <radialGradient id="grad1">
                  <stop offset="0%" stopColor="#4F6EF7"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </radialGradient>
              </defs>
            </svg>

            {/* AI label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 text-xs text-primary-300 font-semibold whitespace-nowrap">
              ✨ AI Match Score Active
            </div>
          </div>

          {/* Testimonial */}
          <div className="p-5 rounded-2xl bg-white/5 border border-primary-200/10 mb-7">
            <p className="text-sm text-gray-300 italic leading-relaxed mb-3.5">
              "I had 6 investor meetings scheduled before I even landed at the conference. Nexus is how serious networkers prepare."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white">
                AK
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Alex Kim</p>
                <p className="text-xs text-gray-400">Founder, DataLayer</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex gap-8 relative z-10">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex items-center justify-center p-[clamp(40px,5vw,64px)] bg-[#000000]">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-9">
            <h1 className="text-[clamp(26px,3vw,34px)] font-extrabold tracking-tight text-white mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-[15px] text-gray-400">
              {mode === 'login'
                ? 'Sign in to your Nexus account'
                : 'Start networking smarter today — it\'s free'}
            </p>
          </div>

          {/* Social login */}
          <div className="flex flex-col gap-2.5 mb-6">
            {socialProviders.map(p => (
              <button
                key={p.name}
                className="w-full px-5 py-3 rounded-xl border border-primary-200/20 bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm font-medium"
              >
                {p.icon}
                Continue with {p.name}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-primary-200/20" />
            <span className="text-xs text-gray-400 whitespace-nowrap">or with email</span>
            <div className="flex-1 h-px bg-primary-200/20" />
          </div>

          {/* Email form */}
          <form className="flex flex-col gap-3.5" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-primary-200/20 bg-white/5 text-white text-[15px] outline-none transition-all focus:border-primary-400"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Password</label>
                {mode === 'login' && (
                  <a href="#" className="text-sm text-primary-300 no-underline hover:text-primary-200">Forgot?</a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary-200/20 bg-white/5 text-white text-[15px] outline-none transition-all focus:border-primary-400"
              />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-primary-500 text-white font-medium text-[15px] hover:bg-primary-600 transition-all mt-1">
              {mode === 'login' ? 'Sign in to Nexus' : 'Create account'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="bg-none border-none text-primary-300 cursor-pointer text-sm font-semibold hover:text-primary-200"
            >
              {mode === 'login' ? 'Create one free' : 'Sign in'}
            </button>
          </p>

          <p className="text-center mt-5 text-xs text-gray-400 leading-relaxed">
            By continuing you agree to our{' '}
            <a href="/terms" className="text-gray-300 no-underline hover:text-white">Terms</a>
            {' '}and{' '}
            <a href="/privacy" className="text-gray-300 no-underline hover:text-white">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}