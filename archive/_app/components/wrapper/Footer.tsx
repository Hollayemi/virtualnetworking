import Link from 'next/link'

const FOOTER_LINKS = {
  Product: ['Features', 'AI Mode', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Events: ['For Organizers', 'For Attendees', 'Integrations', 'API Docs'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container-tight">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }} className="lg:col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="5" cy="5" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="13" cy="5" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="9" cy="13" r="2.5" fill="white" opacity="0.9" />
                  <line x1="7" y1="5" x2="11" y2="5" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="6.5" y1="6.5" x2="8.5" y2="11.5" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <line x1="11.5" y1="6.5" x2="9.5" y2="11.5" stroke="white" strokeWidth="1.2" opacity="0.6" />
                </svg>
              </div>
              <span className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                VirtualNet
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '280px' }}>
              AI-powered networking for professionals who value meaningful connections over mass outreach.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              {['X', 'Li', 'Gh'].map((s) => (
                <button
                  key={s}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginBottom: '1.5rem' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} VirtualNet. All rights reserved.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.375rem 0.875rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}