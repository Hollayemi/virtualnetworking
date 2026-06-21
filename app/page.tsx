'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import HowItWorks from '@/components/sections/HowItWorks'
import AIFeatures from '@/components/sections/AIFeatures'
import Personas from '@/components/sections/Personas'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <AIFeatures />
        <Personas />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
