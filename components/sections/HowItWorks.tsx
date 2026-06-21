'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    step: '01',
    icon: '🎟',
    title: 'Join Your Event',
    description: 'Connect your event ticket, fill in your profile, and set your networking goals — what kind of people you want to meet and why.',
    color: '#4F6EF7',
    highlight: 'Takes under 3 minutes',
  },
  {
    step: '02',
    icon: '🤖',
    title: 'AI Finds Your People',
    description: 'Our matching engine analyzes goals, background, interests, and timing to surface the highest-value connections — before the event starts.',
    color: '#7C3AED',
    highlight: 'Matches ready instantly',
  },
  {
    step: '03',
    icon: '🤝',
    title: 'Schedule & Connect',
    description: 'Accept meetings with one tap, get intelligent icebreakers, and walk into every conversation prepared. Follow up with AI-generated summaries.',
    color: '#06B6D4',
    highlight: 'Avg. 8 meetings per event',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--gradient-section)',
        pointerEvents: 'none',
      }} />

      <div className="container-site" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span className="badge badge-accent" style={{ marginBottom: 16 }}>How It Works</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            color: 'var(--text-primary)',
          }}>
            Networking that actually{' '}
            <span className="gradient-text">works</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            From registration to follow-up, every step is designed to maximize the value of your time at events.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: 48,
            left: '16.66%',
            right: '16.66%',
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, var(--border-default) 20%, var(--border-default) 80%, transparent 100%)',
            pointerEvents: 'none',
          }} className="connector-line" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }} className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${step.color}22 0%, ${step.color}10 100%)`,
                  border: `1px solid ${step.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  marginBottom: 24,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 0 40px ${step.color}20`,
                }}>
                  {step.icon}
                  {/* Step number */}
                  <div style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                  }}>
                    {i + 1}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}>
                  {step.description}
                </p>

                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: step.color,
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}25`,
                }}>
                  {step.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .connector-line { display: none; }
        }
      `}</style>
    </section>
  )
}
