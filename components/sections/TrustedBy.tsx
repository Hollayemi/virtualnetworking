'use client'

import { motion } from 'framer-motion'

const logos = [
  { name: 'TechCrunch Disrupt', abbr: 'TC' },
  { name: 'Y Combinator', abbr: 'YC' },
  { name: 'Web Summit', abbr: 'WS' },
  { name: 'SaaStr', abbr: 'Sa' },
  { name: 'Forbes Summit', abbr: 'Fb' },
  { name: 'DLD Munich', abbr: 'DL' },
  { name: 'Collision', abbr: 'Co' },
  { name: 'Slush', abbr: 'Sl' },
  { name: 'Plug & Play', abbr: 'PP' },
  { name: 'Rise Conference', abbr: 'Ri' },
]

export default function TrustedBy() {
  const doubled = [...logos, ...logos]

  return (
    <section style={{ paddingTop: 48, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <div className="container-site" style={{ marginBottom: 36 }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Powering networking at world-class events
        </motion.p>
      </div>

      {/* Marquee track */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 160,
          height: '100%',
          background: 'linear-gradient(90deg, var(--bg-base) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 160,
          height: '100%',
          background: 'linear-gradient(-90deg, var(--bg-base) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        <div
          style={{
            display: 'flex',
            gap: 20,
            width: 'max-content',
            animation: 'marquee 32s linear infinite',
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 24px',
                borderRadius: 12,
                border: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: 'linear-gradient(135deg, rgba(79,110,247,0.3) 0%, rgba(124,58,237,0.3) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--color-primary-light)',
              }}>
                {logo.abbr}
              </div>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="container-site" style={{ marginTop: 56 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          background: 'var(--border-subtle)',
        }} className="stats-grid">
          {[
            { value: '25K+', label: 'Professionals connected' },
            { value: '50K+', label: 'Meetings created' },
            { value: '92%', label: 'Match success rate' },
            { value: '300+', label: 'Events powered' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                padding: '28px 32px',
                background: 'var(--bg-surface)',
                textAlign: 'center',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 4,
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
