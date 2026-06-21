'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FeaturesContent from './FeaturesContent'

export default function Features() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 100 }}>
        <FeaturesContent />
      </main>
      <Footer />
    </>
  )
}
