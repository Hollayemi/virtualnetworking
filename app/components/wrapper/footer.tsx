'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

type Column = { title: string; links: { label: string; href: string }[] };

const COLUMNS: Column[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'AI Matchmaking', href: '/features#ai-matchmaking' },
      { label: 'Meetings', href: '/features#meetings' },
      { label: 'Messaging', href: '/features#messaging' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Conferences', href: '/solutions#for-event-organizers' },
      { label: 'Summits', href: '/solutions#for-event-organizers' },
      { label: 'Trade Shows', href: '/solutions#for-sponsors' },
      { label: 'Startup Events', href: '/solutions#for-attendees' },
      { label: 'Universities', href: '/solutions#for-communities' },
      { label: 'Corporate Events', href: '/solutions#for-event-organizers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/resources#help-center' },
      { label: 'Documentation', href: '/resources#help-center' },
      { label: 'Blog', href: '/resources#blog' },
      { label: 'FAQs', href: '/resources#faqs' },
      { label: 'Contact Support', href: '/resources#help-center' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'GDPR Compliance', href: '#' },
    ],
  },
];

const SOCIALS: { icon: any; label: string }[] = [
  { icon: FaLinkedin, label: 'LinkedIn' },
  { icon: FaTwitter, label: 'X (Twitter)' },
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaYoutube, label: 'YouTube' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden border-t border-white/[0.06] bg-[#0A100D] text-[#EAF2ED]`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[#639781]/[0.06] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 lg:px-10">
        {/* Brand row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 pb-12 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#639781] text-[13px] font-bold text-[#0A100D]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              M
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                VirtualNet
              </span>
              <span
                className="mt-0.5 text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#5F736A]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                AI Networking Platform
              </span>
            </span>
          </div>
          <p className="max-w-[24rem] text-[13.5px] leading-relaxed text-[#7C8F85] sm:text-right">
            Structured networking for conferences, summits, and professional
            events — built around VIP access and a real credit economy.
          </p>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/[0.06] py-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#EAF2ED]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13.5px] text-[#7C8F85] transition-colors hover:text-[#8FB8A4]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center gap-6 border-t border-white/[0.06] py-8 sm:flex-row sm:justify-between">
          <p className="text-[12.5px] text-[#5F736A]">© {year} YourBrand. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-[#7C8F85] transition-colors hover:border-[#639781]/40 hover:text-[#8FB8A4]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
