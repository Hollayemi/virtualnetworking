'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: 'Attendee',
    tagline: 'For solo professionals at events',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Get started free',
    ctaStyle: 'secondary' as const,
    features: [
      'Up to 5 AI match suggestions per event',
      'Attendee directory access',
      'Basic profile + goals',
      'In-app messaging',
      'Meeting scheduler (3/event)',
      'Email follow-up templates',
    ],
    limit: 'Perfect for occasional attendees',
    color: '#4E5F8A',
  },
  {
    name: 'Professional',
    tagline: 'For serious networkers and founders',
    monthlyPrice: 29,
    yearlyPrice: 19,
    cta: 'Start 14-day trial',
    ctaStyle: 'primary' as const,
    popular: true,
    features: [
      'Unlimited AI match suggestions',
      'AI Networking Assistant',
      'Smart icebreakers before each meeting',
      'AI meeting summaries + action items',
      'Unlimited meeting scheduling',
      'Follow-up generator',
      'CRM sync (HubSpot, Notion, Airtable)',
      'Priority support',
    ],
    limit: 'Everything serious networkers need',
    color: '#4F6EF7',
  },
  {
    name: 'Enterprise',
    tagline: 'For event organizers and teams',
    monthlyPrice: null,
    yearlyPrice: null,
    cta: 'Talk to us',
    ctaStyle: 'secondary' as const,
    features: [
      'Everything in Professional',
      'Branded event experience',
      'Organizer analytics dashboard',
      'Lead tracking + sponsor tools',
      'Attendee insights reports',
      'White-label option',
      'Dedicated success manager',
      'Custom integrations & API',
      'SSO + SAML',
    ],
    limit: 'Custom pricing for your event scale',
    color: '#7C3AED',
  },
]

const faqs = [
  {
    q: 'Is the free plan really free?',
    a: 'Yes. No credit card required. The Attendee plan gives you real value at every event — up to 5 AI matches, messaging, and scheduling for free forever.',
  },
  {
    q: 'How does AI matching work?',
    a: 'Our model analyzes your profile, goals, industry, company stage, and interests — then cross-references every other attendee to find high-signal matches. It updates in real time as more attendees join.',
  },
  {
    q: 'Can I use Nexus for any event?',
    a: "If the event is on Nexus, yes. If you're an organizer, you can onboard your event in minutes. We integrate with Eventbrite, Luma, and most major ticketing platforms.",
  },
  {
    q: 'What does the 14-day trial include?',
    a: 'Full access to every Professional feature. No credit card needed to start. You can upgrade, downgrade, or cancel anytime.',
  },
  {
    q: 'Do you offer nonprofit or startup discounts?',
    a: "Yes — we offer 50% off Professional for early-stage startups (pre-seed/seed) and nonprofits. Reach out to hello@nexus.app with proof of eligibility.",
  },
]

export default function PricingContent() {
  const [yearly, setYearly] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '60px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-primary" style={{ width: 500, height: 500, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }} />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-primary" style={{ marginBottom: 20 }}>Simple Pricing</span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Pay for results,{' '}
            <span className="gradient-text">not features</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Start free. Upgrade when you're ready to unlock AI superpowers at every event.
          </p>

          {/* Toggle */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '6px 8px',
            borderRadius: 999,
            border: '1px solid var(--border-default)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: '6px 18px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: !yearly ? 'rgba(79,110,247,0.2)' : 'transparent',
                color: !yearly ? 'var(--color-primary-light)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: '6px 18px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: yearly ? 'rgba(79,110,247,0.2)' : 'transparent',
                color: yearly ? 'var(--color-primary-light)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Yearly
              <span style={{
                fontSize: 11,
                background: 'var(--gradient-brand)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 99,
                fontWeight: 700,
              }}>
                Save 35%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Plans */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            alignItems: 'start',
          }} className="plans-grid">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderRadius: 24,
                  padding: '32px 28px',
                  border: `1px solid ${plan.popular ? 'rgba(79,110,247,0.35)' : 'var(--border-default)'}`,
                  background: plan.popular
                    ? 'linear-gradient(145deg, rgba(79,110,247,0.12) 0%, rgba(124,58,237,0.07) 100%)'
                    : 'rgba(255,255,255,0.02)',
                  position: 'relative',
                  boxShadow: plan.popular ? 'var(--shadow-glow-primary)' : 'none',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: -13,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    borderRadius: 99,
                    background: 'var(--gradient-brand)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ marginBottom: 28 }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: 6,
                    letterSpacing: '-0.02em',
                  }}>
                    {plan.name}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    {plan.monthlyPrice === null ? (
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 36,
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                      }}>
                        Custom
                      </span>
                    ) : (
                      <>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 44,
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.03em',
                        }}>
                          ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                          {plan.monthlyPrice === 0 ? 'forever' : '/mo'}
                        </span>
                      </>
                    )}
                  </div>
                  {yearly && plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                      Billed ${(plan.yearlyPrice! * 12).toFixed(0)}/year
                    </p>
                  )}
                </div>

                <Link
                  href={plan.ctaStyle === 'primary' ? '/login' : plan.monthlyPrice === null ? '/contact' : '/login'}
                  className={plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center', marginBottom: 28, display: 'flex' }}
                >
                  {plan.cta}
                </Link>

                <div className="divider-glow" style={{ marginBottom: 24 }} />

                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {plan.limit}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: `${plan.color}20`,
                        border: `1px solid ${plan.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}>
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke={plan.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}>
              Questions? <span className="gradient-text">Answered.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{
                  borderRadius: 16,
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  background: openFaq === i ? 'rgba(79,110,247,0.05)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: '1px solid var(--border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.25s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2V10M2 6H10" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: '0 24px 20px' }}
                  >
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </>
  )
}
