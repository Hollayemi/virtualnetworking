'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const floatingCards = [
  {
    icon: '⚡',
    label: 'AI Match Score',
    value: '94%',
    sub: 'Sarah Chen · Investor',
    color: 'rgba(79,110,247,0.15)',
    border: 'rgba(79,110,247,0.3)',
    glow: 'rgba(79,110,247,0.2)',
    x: -280,
    y: 60,
    delay: 0,
  },
  {
    icon: '📅',
    label: 'Meeting Confirmed',
    value: '9:30 AM',
    sub: 'Table 4 · Main Hall',
    color: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.25)',
    glow: 'rgba(6,182,212,0.15)',
    x: 260,
    y: 120,
    delay: 0.3,
  },
  {
    icon: '✨',
    label: 'Smart Intro',
    value: '3 new',
    sub: 'Based on your goals',
    color: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    glow: 'rgba(168,85,247,0.15)',
    x: -240,
    y: 220,
    delay: 0.6,
  },
  {
    icon: '📊',
    label: 'Network Score',
    value: '+42%',
    sub: 'vs last event',
    color: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.2)',
    glow: 'rgba(34,197,94,0.1)',
    x: 240,
    y: 300,
    delay: 0.9,
  },
]

const attendeeAvatars = [
  { initials: 'SC', color: '#4F6EF7' },
  { initials: 'MK', color: '#7C3AED' },
  { initials: 'AR', color: '#06B6D4' },
  { initials: 'JP', color: '#A855F7' },
  { initials: 'LW', color: '#4F6EF7' },
]

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 100,
      paddingBottom: 80,
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-hero)' }} />

      {/* Orbs */}
      <div className="orb orb-primary" style={{ width: 600, height: 600, top: '5%', left: '15%', opacity: 0.6 }} />
      <div className="orb orb-secondary" style={{ width: 500, height: 500, top: '20%', right: '10%', opacity: 0.4 }} />
      <div className="orb orb-accent" style={{ width: 300, height: 300, bottom: '10%', left: '30%', opacity: 0.3 }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(79,110,247,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,110,247,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: 24 }}
            >
              <span className="badge badge-primary">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary-light)', display: 'inline-block' }} />
                AI-Powered Networking
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 24,
                color: 'var(--text-primary)',
              }}
            >
              Meet the Right People{' '}
              <span className="gradient-text" style={{ display: 'block' }}>
                Before the Event Begins
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              AI matchmaking that connects founders, investors, recruiters, and professionals with the exact people they need to meet — not just whoever happens to be nearby.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}
            >
              <Link href="/pricing" className="btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>
                Start Networking
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
              <button className="btn-secondary" style={{ padding: '14px 24px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                    <path d="M1 1L11 7L1 13V1Z"/>
                  </svg>
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div style={{ display: 'flex' }}>
                {attendeeAvatars.map((av, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: av.color,
                      border: '2px solid var(--bg-base)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#fff',
                      marginLeft: i === 0 ? 0 : -8,
                      zIndex: attendeeAvatars.length - i,
                      position: 'relative',
                    }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} style={{ color: '#FBBF24', fontSize: 12 }}>{s}</span>
                  ))}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  Trusted by <strong style={{ color: 'var(--text-secondary)' }}>25,000+</strong> professionals
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard Visual */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: 420,
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2,
              }}
              className="glass-card"
            >
              {/* Card header */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(79,110,247,0.2) 0%, rgba(124,58,237,0.15) 100%)',
                padding: '20px 24px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  {['Discover', 'AI Matches', 'Meetings'].map((tab, i) => (
                    <button
                      key={tab}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                        background: i === 1 ? 'var(--gradient-brand)' : 'transparent',
                        color: i === 1 ? '#fff' : 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendee cards */}
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { name: 'Sarah Chen', role: 'Partner @ a16z', match: 94, badge: 'Investor', color: '#4F6EF7' },
                  { name: 'Marcus Rivera', role: 'CEO @ BuildFast', match: 89, badge: 'Founder', color: '#7C3AED' },
                  { name: 'Aisha Patel', role: 'Head of Talent @ Scale', match: 86, badge: 'Recruiter', color: '#06B6D4' },
                ].map((person, i) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${person.color} 0%, ${person.color}99 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#fff',
                      flexShrink: 0,
                    }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{person.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.role}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: person.color,
                        background: `${person.color}20`,
                        padding: '2px 8px',
                        borderRadius: 20,
                      }}>
                        {person.match}%
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{person.badge}</span>
                    </div>
                  </motion.div>
                ))}

                {/* AI insight */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(79,110,247,0.1) 0%, rgba(168,85,247,0.08) 100%)',
                    border: '1px solid rgba(79,110,247,0.2)',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontSize: 16 }}>✨</span>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--color-primary-light)' }}>AI Insight:</strong> Sarah is interested in B2B SaaS and has invested in 3 companies similar to yours.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.8, x: card.x * 0.5, y: card.y }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: card.x,
                  y: card.y,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.8 + card.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: `translate(${card.x}px, ${card.y}px)`,
                  zIndex: 3,
                  padding: '10px 14px',
                  borderRadius: 14,
                  background: card.color,
                  border: `1px solid ${card.border}`,
                  boxShadow: `0 8px 24px ${card.glow}`,
                  backdropFilter: 'blur(12px)',
                  minWidth: 160,
                  pointerEvents: 'none',
                }}
                className={i % 2 === 0 ? 'animate-float' : 'animate-float-delay'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>{card.icon}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{card.label}</span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{card.value}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(to bottom, transparent, var(--bg-base))',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
