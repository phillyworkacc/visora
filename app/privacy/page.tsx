'use client'
import '@/styles/privacy.css'
import Navbar from "@/components/Landing/Navbar/Navbar";
import Spacing from "@/components/Spacing/Spacing";
import Link from 'next/link';
import Footer from '@/components/Landing/Footer/Footer';

export default function PrivacyPolicy () {
   return <>
      <Navbar />
      <Spacing size={7} />
      <div className="privacy">
         <div className="privacy-box">
            <div className="text-xs bold-700 pd-05">Privacy Policy</div>
            <div className="text-xs pd-05"><b>Effective Date:</b> June 1, 2025</div>
            <div className="text-xs pd-05">Visora ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website analytics platform.</div>

            <div className="text-sm bold-700 pd-1 mt-1">1. Information We Collect</div>
            <ul>
               <li className="text-xs pd-05">
                  <b>Personal Information:</b> Name, email address, billing information when you create an account or make a payment.
               </li>
               <li className="text-xs pd-05">
                  <b>Website Data:</b> Data about your websites and user activity captured via our tracking script (e.g., page views, session duration, bounce rate).
               </li>
               <li className="text-xs pd-05">
                  <b>Cookies & Tracking:</b> We use cookies to identify sessions, track interactions, and improve the user experience.
               </li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">2. How We Use Your Information</div>
            <ul>
               <li className="text-xs pd-05">To provide and improve our services</li>
               <li className="text-xs pd-05">To contact you with updates, insights, or support</li>
               <li className="text-xs pd-05">To analyze traffic and user behavior anonymously</li>
               <li className="text-xs pd-05">To ensure data security and prevent misuse</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">3. Data Storage & Security</div>
            <ul>
               <li className="text-xs pd-05">We store data on secure servers with encryption at rest and in transit.</li>
               <li className="text-xs pd-05">Access to personal data is restricted to authorized personnel only.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">4. Sharing & Disclosure</div>
            <ul>
               <li className="text-xs pd-05">We do not sell your data.</li>
               <li className="text-xs pd-05">We may share data with trusted third-party services for operations (e.g., cloud hosting, payment processing), all bound by confidentiality.</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">5. Your Rights</div>
            <ul>
               <li className="text-xs pd-05">Access or update your information</li>
               <li className="text-xs pd-05">Request deletion of your account and associated data</li>
               <li className="text-xs pd-05">Opt out of marketing communications</li>
            </ul>
            
            <div className="text-sm bold-700 pd-1 mt-1">6. Data Retention</div>
            <div className="text-xs pd-05">We retain usage data for analysis purposes unless you request deletion. Canceled accounts may have data retained for up to 30 days.</div>
            
            <div className="text-sm bold-700 pd-1 mt-1">7. Changes</div>
            <div className="text-xs pd-05">We may update this Privacy Policy. You'll be notified of major changes.</div>

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
