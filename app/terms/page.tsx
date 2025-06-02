'use client'
import '@/styles/privacy.css'
import Navbar from "@/components/Landing/Navbar/Navbar";
import Spacing from "@/components/Spacing/Spacing";
import Link from 'next/link';
import Footer from '@/components/Landing/Footer/Footer';

export default function TermsAndConditions () {
   return <>
      <Navbar />
      <Spacing size={7} />
      <div className="privacy">
         <div className="privacy-box">
            <div className="text-xs bold-700 pd-05">Terms and Conditions</div>
            <div className="text-xs pd-05"><b>Effective Date:</b> June 1, 2025</div>
            <div className="text-xs pd-05">These Terms and Conditions ("Terms") govern your access to and use of the Visora platform.</div>

            <div className="text-sm bold-700 pd-1 mt-1">1. Acceptance of Terms</div>
            <div className="text-xs pd-05">By creating an account or using Visora, you agree to these Terms.</div>
            
            <div className="text-sm bold-700 pd-1 mt-1">2. Use of Service</div>
            <ul>
               <li className="text-xs pd-05">You must be at least 13 years old to use Visora.</li>
               <li className="text-xs pd-05">You agree not to misuse the service (e.g., reverse engineering, sharing login credentials).</li>
               <li className="text-xs pd-05">You're responsible for maintaining the security of your account.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">3. Subscription & Payments</div>
            <ul>
               <li className="text-xs pd-05">The Basic Plan allows up to 5 websites per account.</li>
               <li className="text-xs pd-05">Paid plans (e.g., Pro Plan) offer higher usage tiers. <b>[coming soon]</b></li>
               <li className="text-xs pd-05">Fees are billed monthly and are non-refundable unless otherwise stated.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">4. Data & Content</div>
            <ul>
               <li className="text-xs pd-05">You retain ownership of your data.</li>
               <li className="text-xs pd-05">You grant us permission to process data for analytics and performance purposes.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">5. Termination</div>
            <ul>
               <li className="text-xs pd-05">You may cancel at any time via your dashboard.</li>
               <li className="text-xs pd-05">We reserve the right to suspend or terminate accounts violating these Terms.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">6. Limitation of Liability</div>
            <div className="text-xs pd-05">We are not liable for indirect damages or loss of data arising from your use of the service.</div>
            
            <div className="text-sm bold-700 pd-1 mt-1">7. Changes to Terms</div>
            <div className="text-xs pd-05">We may update these Terms. Continued use after changes implies agreement.</div>

            <div className="text-sm bold-700 pd-1 mt-1">8. Contact Us</div>
            <div className="text-xs pd-05">
               <Link href='/contact' className="text-xs mc visible-link">Contact us here</Link>
            </div>
            <Spacing size={2} />
         </div>
      </div>
      <Footer />
   </>
}
