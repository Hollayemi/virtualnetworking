'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PricingPage from './PricingContent'

export default function Pricing() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <PricingPage />
      </main>
      <Footer />
    </>
  )
}
