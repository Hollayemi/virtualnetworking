"use client"
import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
      <footer className="bg-navy-800 pt-[72px] pb-10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] gap-12 mb-14">
            <div>
              <div className="flex items-center gap-2.5 mb-4.5">
                <div className="w-[34px] h-[34px] rounded-lg bg-primary-500 flex items-center justify-center">
                  <TrendingUp size={18} color="#fff" strokeWidth={2.2} />
                </div>
                <span className="font-display font-semibold text-lg text-white">VirtualNet</span>
              </div>
              <p className="text-sm text-white/45 leading-relaxed max-w-[300px]">
                Structured networking infrastructure for conferences, summits, and professional gatherings. Built in London.
              </p>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "Integrations", "Security", "Changelog"] },
              { heading: "Solutions", links: ["For Organizers", "For Attendees", "For Sponsors", "Conferences", "Summits"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Privacy Policy", "Terms"] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-4">{col.heading}</p>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a key={link} href="#" className="text-sm text-white/55 no-underline transition-colors hover:text-white">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.08] pt-7 flex justify-between items-center flex-wrap gap-4">
            <p className="text-[13px] text-white/30">© 2025 VirtualNet Ltd. Registered in England and Wales.</p>
            <p className="text-[13px] text-white/30">London, United Kingdom</p>
          </div>
        </div>
      </footer>
  );
}
