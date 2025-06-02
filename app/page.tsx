'use client'
import FAQs from '@/components/Landing/FAQs/FAQs'
import Features from '@/components/Landing/Features/Features'
import Footer from '@/components/Landing/Footer/Footer'
import Hero from '@/components/Landing/Hero/Hero'
import HowItWorks from '@/components/Landing/HowItWorks/HowItWorks'
import KeyMetrics from '@/components/Landing/KeyMetrics/KeyMetrics'
import Navbar from '@/components/Landing/Navbar/Navbar'
import PricingTable from '@/components/Landing/Pricing/Pricing'
import Testimonials from '@/components/Landing/Testimonials/Testimonials'

export default function LandingPage () {
   return (
      <div className="landing-page">
         <Navbar />
         <Hero />
         <KeyMetrics />
         <HowItWorks />
         <Features />
         <Testimonials />
         <PricingTable />
         <FAQs />
         <Footer />
      </div>
   )
}
