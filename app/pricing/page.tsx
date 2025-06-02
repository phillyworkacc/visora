'use client'
import Footer from '@/components/Landing/Footer/Footer'
import Navbar from '@/components/Landing/Navbar/Navbar'
import PricingTable from '@/components/Landing/Pricing/Pricing'
import Spacing from '@/components/Spacing/Spacing'

export default function PricingPage () {
   return (
      <div className="landing-page">
         <Navbar />
         <Spacing size={5} />
         <PricingTable />
         <Spacing size={2} />
         <Footer />
      </div>
   )
}
