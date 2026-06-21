'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FinalCTA from '@/components/sections/FinalCTA'

const featureGroups = [
  {
    label: 'Discovery',
    color: '#4F6EF7',
    icon: '🔍',
    title: 'Find who matters, instantly',
    description: 'Stop scrolling through hundreds of attendee profiles. Let AI surface exactly who you should meet based on your goals, industry, and where you are in your journey.',
    features: [
      { name: 'AI Match Engine', desc: '40+ signals analyzed to rank every attendee by relevance to your goals.' },
      { name: 'Goal-Based Filtering', desc: 'Tell us what you want to achieve, get people who can help you get there.' },
      { name: 'Real-Time Updates', desc: 'Matches refresh as new attendees join and goals are updated.' },
      { name: 'Mutual Interest Mapping', desc: 'Surface shared interests and experiences you both can build on.' },
    ],
  },
  {
    label: 'Scheduling',
    color: '#7C3AED',
    icon: '📅',
    title: 'From match to meeting in one tap',
    description: 'No back-and-forth emails. Nexus knows the event schedule, your availability, and the venue layout — and suggests meeting slots that work for both of you.',
    features: [
      { name: 'Smart Scheduling', desc: 'AI suggests optimal meeting times around sessions you want to attend.' },
      { name: 'Venue-Aware', desc: 'Suggests nearby tables or rooms based on your event location.' },
      { name: 'Calendar Sync', desc: 'Syncs with Google, Outlook, and Apple Calendar seamlessly.' },
      { name: 'Pre-Event Scheduling', desc: 'Fill your calendar before you even arrive at the venue.' },
    ],
  },
  {
    label: 'Conversations',
    color: '#06B6D4',
    icon: '💬',
    title: 'Walk into every conversation prepared',
    description: 'Nexus researches each person you\'re meeting — their recent work, shared interests, and talking points — so you can focus on the conversation, not the prep.',
    features: [
      { name: 'AI Icebreakers', desc: 'Personalized conversation starters for every meeting, based on real context.' },
      { name: 'Live Briefing Cards', desc: 'Quick profile card before each meeting with key talking points.' },
      { name: 'Shared Goal View', desc: 'Both attendees see what they have in common before they meet.' },
      { name: 'In-Event Messaging', desc: 'Chat before, during, and after your meetings within the app.' },
    ],
  },
  {
    label: 'Follow-Up',
    color: '#A855F7',
    icon: '✅',
    title: 'The relationship doesn\'t end at the event',
    description: 'Most connections from events fade within days. Nexus captures everything — notes, action items, follow-up timing — and helps you nurture relationships after the event ends.',
    features: [
      { name: 'AI Meeting Summaries', desc: 'Structured notes from your meeting, ready when you walk away.' },
      { name: 'Action Item Tracking', desc: 'Commitments captured automatically and tracked to completion.' },
      { name: 'Follow-Up Generator', desc: 'AI drafts personalized follow-up messages for every contact.' },
      { name: 'CRM Sync', desc: 'Contacts and notes flow directly into HubSpot, Notion, or Airtable.' },
    ],
  },
]

export default function FeaturesContent() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '60px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-primary" style={{ width: 600, height: 400, top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge badge-primary" style={{ marginBottom: 20 }}>Everything You Need</span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}>
              Every feature built for{' '}
              <span className="gradient-text">meaningful networking</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              From first match to lasting relationship — a complete platform for professional networking at events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature groups */}
      {featureGroups.map((group, gi) => (
        <section
          key={group.label}
          style={{
            padding: 'clamp(60px, 8vw, 100px) 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {gi % 2 === 1 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.01)',
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
            }} />
          )}

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: gi % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }} className="feat-grid">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: gi % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ order: gi % 2 === 0 ? 0 : 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${group.color}18`,
                    border: `1px solid ${group.color}28`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {group.icon}
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: group.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {group.label}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 3.5vw, 40px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}>
                  {group.title}
                </h2>

                <p style={{
                  fontSize: 16,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: 32,
                  maxWidth: 440,
                }}>
                  {group.description}
                </p>

                <Link href="/pricing" className="btn-primary">
                  Get started free
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </motion.div>

              {/* Feature cards */}
              <motion.div
                initial={{ opacity: 0, x: gi % 2 === 0 ? 32 : -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                  order: gi % 2 === 0 ? 1 : 0,
                }}
              >
                {group.features.map((f, fi) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + fi * 0.08, duration: 0.5 }}
                    className="glass-card glass-card-hover"
                    style={{
                      borderRadius: 16,
                      padding: '20px 18px',
                    }}
                  >
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: group.color,
                      marginBottom: 14,
                      boxShadow: `0 0 12px ${group.color}`,
                    }} />
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}>
                      {f.name}
                    </p>
                    <p style={{
                      fontSize: 13,
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}>
                      {f.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />

      <style>{`
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .feat-grid > div { order: unset !important; }
        }
      `}</style>
    </>
  )
}
