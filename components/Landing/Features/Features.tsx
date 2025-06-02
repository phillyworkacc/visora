'use client';
import "./Features.css"
import {
   Activity,
   PlayCircle,
   LayoutDashboard,
   Globe,
   Sparkles,
   Link2,
   BarChart3,
   Code2,
} from 'lucide-react';

const features = [
   {
      icon: <Activity size={24} />,
      title: 'Real-time visitor tracking',
      description: 'Monitor your traffic as it happens.',
   },
   {
      icon: <PlayCircle size={24} />,
      title: 'Session analysis',
      description: 'Replay and understand user journeys.',
   },
   {
      icon: <LayoutDashboard size={24} />,
      title: 'User-friendly dashboards',
      description: 'Simple, clean visuals — no learning curve.',
   },
   {
      icon: <Sparkles size={24} />,
      title: 'AI recommendations',
      description: 'Get smart insights on what to improve and why.',
   },
   {
      icon: <Globe size={24} />,
      title: 'Country statistics',
      description: 'See where your visitors are coming from.',
   },
   {
      icon: <Link2 size={24} />,
      title: 'UTM measurements',
      description: 'Track campaign performance via UTM parameters.',
   },
   {
      icon: <Code2 size={24} />,
      title: 'One tag setup',
      description: 'Just one line of code to start tracking instantly.',
   },
   {
      icon: <BarChart3 size={24} />,
      title: 'Page view analysis',
      description: 'Break down how each page performs in detail.',
   },
   {
      icon: <LayoutDashboard size={24} />,
      title: 'Instant website addition',
      description: 'Add your site and start tracking in seconds — no setup delay.',
   }
];

export default function Features() {
   return (
      <section className="features-section" id="features">
         <h2>Features</h2>
         <div className="features-grid">
         {features.map((feature, index) => (
            <div key={index} className="feature-card">
               <div className="icon">
                  <div className="icon-wrapper">{feature.icon}</div>
               </div>
               <div>
                  <div className="text-xs bold-700 pd-05">{feature.title}</div>
                  <p>{feature.description}</p>
               </div>
            </div>
         ))}
         </div>
      </section>
   );
}
