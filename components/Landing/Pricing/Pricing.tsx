'use client'
import './Pricing.css'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PricingTable () {
   const { data: session } = useSession();

   const startBasicPlan = () => {
      if (session?.user) {
         const stripeVisoraBasicPlanLink = 'https://buy.stripe.com/test_4gM4gy72nc7m5rw8wS7AI00'
         return `${stripeVisoraBasicPlanLink}?prefilled_email=${session.user.email}`;
      } else {
         return '/login'
      }
   }

   return (
      <section className="pricing-section" id='pricing'>
         <h2>Pricing</h2>
         <div className="pricing-cards">
            <div className="pricing-card">
               <h3>Basic Plan</h3>
               <p className="price">$10<span>/month</span></p>
               <ul>
                  <li>Add up to 5 websites per account</li>
                  <li>AI recommendations</li>
                  <li>Real-time visitor tracking</li>
                  <li>Session analysis</li>
                  <li>Country & UTM analytics</li>
                  <li>Page view analytics</li>
                  <li>Basic support</li>
               </ul>
               <Link href={startBasicPlan()} target="_blank" className='text-xs full'>
                  <button className="btn-primary" onClick={startBasicPlan}>Get Started</button>
               </Link>
               <p className="note">Manage or delete existing tracked sites anytime.</p>
            </div>

            <div className="pricing-card coming-soon">
               <h3>Pro Plan <span>Coming Soon</span></h3>
               <p className="price">$50<span>/month</span></p>
               <ul>
                  <li>Everything in <b>Basic Plan</b></li>
                  <li>Unlimited websites</li>
                  <li>Advanced AI recommendations</li>
                  <li>Team Accounts & Permissions</li>
                  <li>Custom Alerts & Notifications</li>
                  <li>Performance Monitoring</li>
                  <li>Priority support</li>
               </ul>
               <button className="btn-secondary" disabled>Notify Me</button>
               <p className="note">Upgrade when ready for higher limits and features.</p>
            </div>
         </div>
      </section>
   );
}
