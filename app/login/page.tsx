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
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--bg-base)',
    }} className="login-grid">
      {/* Left: Marketing panel */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0D1530 0%, #0A1020 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(40px, 5vw, 64px)',
      }} className="login-left">
        {/* Orbs */}
        <div className="orb orb-primary" style={{ width: 400, height: 400, top: '-10%', left: '-10%', opacity: 0.3 }} />
        <div className="orb orb-secondary" style={{ width: 300, height: 300, bottom: '10%', right: '-5%', opacity: 0.2 }} />
        <div className="orb orb-accent" style={{ width: 200, height: 200, top: '50%', left: '40%', opacity: 0.15 }} />

        {/* Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(79,110,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,110,247,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(79,110,247,0.4)',
            }}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff' }}>Nexus</span>
          </Link>
        </div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Network viz */}
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-default)',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Network nodes visualization */}
            <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
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
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 16px',
              borderRadius: 99,
              background: 'rgba(79,110,247,0.15)',
              border: '1px solid rgba(79,110,247,0.25)',
              fontSize: 12,
              color: 'var(--color-primary-light)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              ✨ AI Match Score Active
            </div>
          </div>

          {/* Testimonial */}
          <div style={{
            padding: '20px 24px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 28,
          }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 14 }}>
              "I had 6 investor meetings scheduled before I even landed at the conference. Nexus is how serious networkers prepare."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F6EF7, #7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
              }}>
                AK
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Alex Kim</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Founder, DataLayer</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, position: 'relative', zIndex: 1 }}>
          {stats.map(s => (
            <div key={s.label}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Auth form */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 5vw, 64px)',
        background: 'var(--bg-base)',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 34px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
              {mode === 'login'
                ? 'Sign in to your Nexus account'
                : 'Start networking smarter today — it\'s free'}
            </p>
          </div>

          {/* Social login */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {socialProviders.map(p => (
              <button
                key={p.name}
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '12px 20px',
                  gap: 12,
                }}
              >
                {p.icon}
                Continue with {p.name}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div className="divider-glow" style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>or with email</span>
            <div className="divider-glow" style={{ flex: 1 }} />
          </div>

          {/* Email form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={e => e.preventDefault()}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1px solid var(--border-default)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-primary)',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-default)')}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                {mode === 'login' && (
                  <a href="#" style={{ fontSize: 13, color: 'var(--color-primary-light)', textDecoration: 'none' }}>Forgot?</a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1px solid var(--border-default)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-primary)',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-default)')}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15, marginTop: 4 }}>
              {mode === 'login' ? 'Sign in to Nexus' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text-muted)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-light)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
              }}
            >
              {mode === 'login' ? 'Create one free' : 'Sign in'}
            </button>
          </p>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            By continuing you agree to our{' '}
            <a href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms</a>
            {' '}and{' '}
            <a href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}
