'use client';
import "./HowItWorks.css"
import { Globe, Code, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
   {
      icon: <Globe size={28} />,
      title: 'Add your website',
      description: 'Connect your domain in seconds.',
   },
   {
      icon: <Code size={28} />,
      title: 'Install tracking snippet',
      description: 'Copy & paste one line of code.',
   },
   {
      icon: <BarChart3 size={28} />,
      title: 'Get instant insights',
      description: 'See live data flowing into your dashboard.',
   },
];

export default function HowItWorks() {
   return (
      <section className="how-it-works" id="how">
         <h2>How It Works</h2>
         <div className="steps">
         {steps.map((step, index) => (
            <motion.div
               key={index}
               className="step"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.2, duration: 0.5 }}
            >
               <div className="step-icon">{step.icon}</div>
               <h3>{step.title}</h3>
               <p>{step.description}</p>
            </motion.div>
         ))}
         </div>
      </section>
   );
}
