'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: 32,
            padding: 'clamp(48px, 6vw, 80px)',
            background: 'linear-gradient(135deg, rgba(79,110,247,0.18) 0%, rgba(124,58,237,0.14) 50%, rgba(6,182,212,0.1) 100%)',
            border: '1px solid rgba(79,110,247,0.22)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 300,
            background: 'radial-gradient(ellipse at center, rgba(79,110,247,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Decorative dots */}
          <div style={{
            position: 'absolute',
            top: 40,
            right: 60,
            width: 120,
            height: 120,
            backgroundImage: 'radial-gradient(rgba(79,110,247,0.3) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            opacity: 0.6,
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: 60,
            width: 100,
            height: 100,
            backgroundImage: 'radial-gradient(rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            opacity: 0.5,
            borderRadius: '50%',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ marginBottom: 20 }}
            >
              <span className="badge badge-primary" style={{ fontSize: 13 }}>
                Start Free · No Credit Card
              </span>
            </motion.div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}>
              Turn every event into{' '}
              <span className="gradient-text">meaningful connections</span>
            </h2>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}>
              Join 25,000+ professionals who stopped leaving events with a stack of business cards and started leaving with real relationships.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="btn-primary" style={{ padding: '15px 32px', fontSize: 16 }}>
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link href="/features" className="btn-secondary" style={{ padding: '15px 28px', fontSize: 16 }}>
                Explore Features
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{
              display: 'flex',
              gap: 40,
              justifyContent: 'center',
              marginTop: 48,
              flexWrap: 'wrap',
            }}>
              {[
                { value: '2 min', label: 'to set up your profile' },
                { value: 'Free', label: 'to get started' },
                { value: '24/7', label: 'AI assistant access' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
