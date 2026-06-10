"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/app/data/Home";
import { BtnPrimary } from "../ui";

export default function Header({ scrolled }: { scrolled: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[1160px] z-[100] transition-all duration-300 rounded-2xl border border-white/10 ${scrolled
           ? "bg-navy-800/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
           : "bg-navy-800/55 backdrop-blur-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
         }`}>
         <div className="h-[60px] w-full flex items-center justify-between px-5">
           {/* Logo */}
           <a href="/" className="flex items-center gap-2.5 no-underline">
             <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0">
               <TrendingUp size={17} color="#fff" strokeWidth={2.2} />
             </div>
             <span className="font-display font-semibold text-[17px] text-white">VirtualNet</span>
           </a>
 
           {/* Desktop nav */}
           <nav className="hidden md:flex gap-7 items-center">
             {NAV_LINKS.map((l) => (
               <a key={l.label} href={l.href} className="text-sm text-white/75 font-medium no-underline transition-colors hover:text-white">
                 {l.label}
               </a>
             ))}
           </nav>
 
           <div className="flex gap-2.5 items-center">
             <a href="/login" className="hidden md:block text-[13.5px] font-medium text-white/70 no-underline hover:text-white transition-colors">Sign in</a>
             <BtnPrimary className="hidden! md:inline-flex! py-2.5 px-4 text-[13.5px]">Get started</BtnPrimary>
 
             {/* Mobile hamburger */}
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
               className={`md:hidden flex items-center justify-center w-[38px] h-[38px] rounded-[9px] border border-white/15 transition-colors cursor-pointer text-white ${mobileMenuOpen ? "bg-white/12" : "bg-white/7"}`}>
               {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
             </button>
           </div>
         </div>
 
         {/* Mobile drawer */}
         <div className={`md:hidden overflow-hidden transition-[max-height] duration-[380ms] ${mobileMenuOpen ? "max-h-[600px] border-t border-white/[0.08]" : "max-h-0 border-t border-transparent"}`}>
           <div className="pt-2 pb-4 px-3 w-full">
             <nav className="flex flex-col gap-0.5 mb-4">
               {NAV_LINKS.map((l) => (
                 <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)}
                   className="flex items-center justify-between py-3 px-3.5 rounded-xl text-[15px] font-medium text-white/85 no-underline transition-colors hover:bg-white/7 hover:text-white">
                   {l.label}
                   <ChevronRight size={15} className="text-white/35" />
                 </a>
               ))}
             </nav>
             <div className="h-px bg-white/[0.08] mb-4" />
             <div className="flex flex-col gap-2.5">
               <BtnPrimary className="w-full justify-center py-3.5">Get started <ArrowRight size={15} /></BtnPrimary>
               <a href="#" className="flex items-center justify-center py-3 px-5 rounded-xl text-sm font-medium text-white/75 no-underline bg-white/[0.06] border border-white/10">Sign in</a>
             </div>
           </div>
         </div>
       </header>
 
  );
}
