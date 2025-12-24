'use client'

import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Gallery />
      <Services />
      <Contact />
    </div>
  )
}

