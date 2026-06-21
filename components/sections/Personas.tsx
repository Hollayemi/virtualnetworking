'use client'

import { motion } from 'framer-motion'

const personas = [
  {
    icon: '🚀',
    role: 'Founders',
    color: '#4F6EF7',
    headline: 'Meet investors who are actually looking for you',
    perks: ['Investor matchmaking by thesis', 'Warm introductions', 'Pitch session scheduling'],
  },
  {
    icon: '💼',
    role: 'Investors',
    color: '#7C3AED',
    headline: 'Surface deal flow before the crowd does',
    perks: ['Deal flow filtering', 'Founder screening signals', 'Portfolio conflict checks'],
  },
  {
    icon: '🎯',
    role: 'Recruiters',
    color: '#06B6D4',
    headline: 'Find talent that isn\'t on the job boards',
    perks: ['Passive candidate discovery', 'Skill-based matching', 'Async intro requests'],
  },
  {
    icon: '🏆',
    role: 'Sponsors',
    color: '#A855F7',
    headline: 'Turn badge scans into real relationships',
    perks: ['Lead capture + context', 'Follow-up automation', 'ROI analytics dashboard'],
  },
  {
    icon: '💡',
    role: 'Speakers',
    color: '#F59E0B',
    headline: 'Connect with your audience before you hit the stage',
    perks: ['Audience interest mapping', 'Pre-event Q&A', 'Post-talk follow-up flows'],
  },
  {
    icon: '🌱',
    role: 'Job Seekers',
    color: '#22C55E',
    headline: 'Get in front of the right hiring managers',
    perks: ['Role-specific matching', 'Company culture signals', 'Direct intro to decision makers'],
  },
]

export default function Personas() {
  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(79,110,247,0.05) 0%, transparent 50%),
                          radial-gradient(circle at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)`,
      }} />

      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: 16 }}>For Everyone</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Built for every{' '}
            <span className="gradient-text">professional</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you're raising, hiring, selling, or growing — Nexus adapts to your goals.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="personas-grid">
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="glass-card glass-card-hover"
              style={{
                borderRadius: 20,
                padding: '28px 24px',
                cursor: 'default',
              }}
            >
              {/* Icon + role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${p.color}18`,
                  border: `1px solid ${p.color}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {p.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {p.role}
                </span>
              </div>

              <p style={{
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: 20,
              }}>
                {p.headline}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.perks.map(perk => (
                  <li key={perk} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: `${p.color}20`,
                      border: `1px solid ${p.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke={p.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{perk}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .personas-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .personas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
