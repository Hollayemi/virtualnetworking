'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "I walked into Web Summit not knowing anyone. By day two I had eight meaningful meetings scheduled and left with two investor intros that turned into term sheets. Nexus is the unfair advantage I didn't know I needed.",
    author: 'Jordan Blake',
    role: 'CEO, Stackform',
    stage: 'Raised $4.2M Seed',
    avatar: 'JB',
    color: '#4F6EF7',
    featured: true,
  },
  {
    quote: "As an investor I attend 30+ events a year. Nexus cut my meeting-request noise by 80% and surfaced three deals in my thesis that I would have completely missed.",
    author: 'Priya Nair',
    role: 'Partner, Meridian Ventures',
    stage: '$120M AUM',
    avatar: 'PN',
    color: '#7C3AED',
  },
  {
    quote: "The AI icebreakers sound gimmicky until you use them. I had the most natural conversation of my career with a founder I would have been too nervous to approach cold.",
    author: 'Tom Eriksson',
    role: 'Senior Recruiter, Scale AI',
    stage: '200+ hires',
    avatar: 'TE',
    color: '#06B6D4',
  },
  {
    quote: "We ran Nexus at our accelerator demo day and the feedback from founders and investors was unanimous: it was the most productive networking they'd ever had at an event.",
    author: 'Mia Hoffman',
    role: 'Program Director, Forge Labs',
    stage: '3 cohorts, 60 startups',
    avatar: 'MH',
    color: '#A855F7',
  },
]

export default function Testimonials() {
  const featured = testimonials[0]
  const rest = testimonials.slice(1)

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-primary" style={{ width: 500, height: 500, top: '20%', left: '-10%', opacity: 0.1 }} />
      <div className="orb orb-accent" style={{ width: 400, height: 400, bottom: '10%', right: '-5%', opacity: 0.08 }} />

      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="badge badge-accent" style={{ marginBottom: 16 }}>Real Results</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            People who found their{' '}
            <span className="gradient-text">next big thing</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="testimonials-grid">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: 24,
              padding: '36px 32px',
              background: 'linear-gradient(135deg, rgba(79,110,247,0.14) 0%, rgba(124,58,237,0.08) 100%)',
              border: '1px solid rgba(79,110,247,0.22)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              gridRow: 'span 2',
            }}
          >
            {/* Quote mark */}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              paddingBottom: 4,
            }}>
              "
            </div>

            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'var(--text-primary)',
              lineHeight: 1.65,
              fontStyle: 'italic',
              flex: 1,
            }}>
              "{featured.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${featured.color} 0%, ${featured.color}99 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}>
                {featured.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{featured.author}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{featured.role}</p>
              </div>
              <div style={{
                marginLeft: 'auto',
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(79,110,247,0.15)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(79,110,247,0.25)',
                whiteSpace: 'nowrap',
              }}>
                {featured.stage}
              </div>
            </div>
          </motion.div>

          {/* Rest */}
          {rest.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              className="glass-card glass-card-hover"
              style={{
                borderRadius: 20,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <p style={{
                fontSize: 15,
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                fontStyle: 'italic',
                flex: 1,
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}99 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.author}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
