"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function HomeWrapper({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F3F3]">
      <Header scrolled={scrolled} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
