'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    id: 'matching',
    icon: '⚡',
    title: 'AI Match Engine',
    tagline: 'Precision matchmaking at scale',
    description: 'Our model analyzes 40+ signals — goals, background, company stage, industry, interests, and past meetings — to surface connections that actually matter to you.',
    visual: (
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: 'Goal alignment', pct: 92, color: '#4F6EF7' },
          { name: 'Industry overlap', pct: 78, color: '#7C3AED' },
          { name: 'Company fit', pct: 85, color: '#06B6D4' },
          { name: 'Timing match', pct: 96, color: '#A855F7' },
        ].map(item => (
          <div key={item.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.pct}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ height: '100%', background: item.color, borderRadius: 99 }}
              />
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 8,
          padding: '12px 16px',
          borderRadius: 12,
          background: 'rgba(79,110,247,0.1)',
          border: '1px solid rgba(79,110,247,0.2)',
        }}>
          <p style={{ fontSize: 13, color: 'var(--color-primary-light)', fontWeight: 600 }}>Overall Match Score: 94%</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Sarah Chen · Partner @ a16z · 3 shared interests</p>
        </div>
      </div>
    ),
  },
  {
    id: 'assistant',
    icon: '🤖',
    title: 'Networking Assistant',
    tagline: 'Your AI guide through every event',
    description: 'Ask anything. "Who should I meet today?" "What do I say to Marcus?" "Help me follow up with the investors I met." Your AI assistant handles the social complexity.',
    visual: (
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { role: 'user', msg: 'Who should I prioritize meeting today?' },
          { role: 'ai', msg: 'Based on your goal to raise a Series A, I suggest starting with Sarah Chen (a16z) at 10am, then Marcus (had a similar exit), and Aisha from Scale for team-building advice. Want me to send the requests?' },
          { role: 'user', msg: 'Yes, send them. What should I say to Sarah?' },
          { role: 'ai', msg: 'I\'ve sent the requests! For Sarah: you both share interest in B2B infrastructure. She recently led a $12M round in a company similar to yours. A great opener would be your go-to-market motion.' },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{
              padding: '10px 14px',
              borderRadius: 14,
              maxWidth: '85%',
              fontSize: 13,
              lineHeight: 1.5,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user'
                ? 'var(--gradient-brand)'
                : 'rgba(255,255,255,0.06)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-secondary)',
              border: msg.role === 'ai' ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            {msg.role === 'ai' && <span style={{ fontSize: 11, color: 'var(--color-primary-light)', fontWeight: 600, display: 'block', marginBottom: 4 }}>✨ Nexus AI</span>}
            {msg.msg}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 'icebreakers',
    icon: '💬',
    title: 'AI Icebreakers',
    tagline: 'Never have an awkward first moment',
    description: 'Before each meeting, Nexus generates personalized conversation starters based on mutual interests, recent work, and your shared goals. Walk in confident every time.',
    visual: (
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Meeting in 15 min · Sarah Chen</p>
        {[
          { label: 'Shared interest', text: 'You both attended DevSummit Berlin last year — ask about her talk on AI infrastructure.' },
          { label: 'Recent news', text: 'a16z just published a piece on B2B SaaS metrics she co-authored. Great conversation starter.' },
          { label: 'Common ground', text: 'You both scaled from 0 to $1M ARR in under 18 months. Share what worked for you.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 'summaries',
    icon: '📋',
    title: 'Meeting Summaries',
    tagline: 'Never lose an insight',
    description: 'After each conversation, AI generates structured notes: key discussion points, action items, follow-up timing, and relationship context — all synced to your CRM.',
    visual: (
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(79,110,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>SC</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Sarah Chen · a16z</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Today · 15 min · Main Hall</p>
          </div>
          <div style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', fontSize: 12, color: '#22c55e', fontWeight: 600 }}>Warm lead</div>
        </div>
        {[
          { icon: '💡', label: 'Key takeaway', text: 'Interested in leading your Series A if ARR crosses $1.5M by Q2.' },
          { icon: '✅', label: 'Action item', text: 'Send pitch deck + latest metrics by Friday.' },
          { icon: '📅', label: 'Follow-up', text: 'Schedule 30-min call for next week.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14, marginTop: 1 }}>{item.icon}</span>
            <div>
              <span style={{ fontSize: 11, color: 'var(--color-primary-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

export default function AIFeatures() {
  const [active, setActive] = useState('matching')
  const activeFeature = features.find(f => f.id === active)!

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* BG */}
      <div className="orb orb-secondary" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.12 }} />

      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: 16 }}>AI-Powered</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Let AI find your{' '}
            <span className="gradient-text">next opportunity</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Four AI features that transform how you network at events — from first match to lasting relationship.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'start',
        }} className="ai-feat-grid">
          {/* Left: feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setActive(f.id)}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '20px 20px',
                  borderRadius: 16,
                  border: `1px solid ${active === f.id ? 'rgba(79,110,247,0.3)' : 'var(--border-subtle)'}`,
                  background: active === f.id
                    ? 'linear-gradient(135deg, rgba(79,110,247,0.1) 0%, rgba(124,58,237,0.06) 100%)'
                    : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  boxShadow: active === f.id ? '0 4px 24px rgba(79,110,247,0.12)' : 'none',
                }}
              >
                <div style={{
                  fontSize: 24,
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: active === f.id ? 'rgba(79,110,247,0.15)' : 'rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.25s ease',
                }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: active === f.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    marginBottom: 4,
                    transition: 'color 0.2s ease',
                  }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {f.description.slice(0, 80)}...
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: feature preview */}
          <div style={{ position: 'sticky', top: 100 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card"
                style={{ borderRadius: 24, overflow: 'hidden' }}
              >
                {/* Card header */}
                <div style={{
                  padding: '20px 20px 16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: 'linear-gradient(135deg, rgba(79,110,247,0.08) 0%, rgba(124,58,237,0.05) 100%)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{activeFeature.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{activeFeature.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{activeFeature.tagline}</p>
                    </div>
                  </div>
                </div>
                {activeFeature.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ai-feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
