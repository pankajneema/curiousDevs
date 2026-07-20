import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Products from '@/components/home/Products'
import Platform from '@/components/home/Platform'
import HowItWorks from '@/components/home/HowItWorks'
import Pricing from '@/components/home/Pricing'
import FAQ from '@/components/home/FAQ'
import Newsletter from '@/components/home/Newsletter'
import CTA from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Products />
      <Platform />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  )
}
