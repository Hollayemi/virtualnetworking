import Link from 'next/link'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'AI Networking', href: '/features#ai' },
    { label: 'For Organizers', href: '/#organizers' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact', href: '/contact' },
    { label: 'Status', href: '/status' },
    { label: 'Security', href: '/security' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 64,
      paddingBottom: 40,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle gradient top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 200,
        background: 'radial-gradient(ellipse at center top, rgba(79,110,247,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-site">
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(4, auto)',
          gap: 48,
          marginBottom: 64,
          alignItems: 'start',
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2.5" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Nexus
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              AI-powered event networking that connects the right people at every conference and summit.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 12 }}>
              {['twitter', 'linkedin', 'github'].map(social => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: '1px solid var(--border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--color-primary)'
                    el.style.color = 'var(--color-primary-light)'
                    el.style.background = 'rgba(79,110,247,0.08)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border-default)'
                    el.style.color = 'var(--text-muted)'
                    el.style.background = 'transparent'
                  }}
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}>
                {title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 14,
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="divider-glow" style={{ marginBottom: 28 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            © 2025 Nexus Technologies, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>All systems operational</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
