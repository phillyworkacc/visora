'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Monitor, Radio, TrendingUp, Wifi, Wrench, Zap } from 'lucide-react';

const tagSize = 15
const tagStrokeWidth = 3
const tags = [
   <><Zap size={tagSize} color='#00BFA6' strokeWidth={tagStrokeWidth} /> Built for Speed & Clarity</>,
   <><Radio size={tagSize} color='#FF6B6B'strokeWidth={tagStrokeWidth}  /> Real-Time, No Bloat</>,
   <><Lock size={tagSize} color='#5C6AC4'strokeWidth={tagStrokeWidth}  /> Privacy-First Tracking</>,
   <><Wrench size={tagSize} color='#FFB400'strokeWidth={tagStrokeWidth}  /> Made for Modern Websites</>,
   <><TrendingUp size={tagSize} color='#4CAF50'strokeWidth={tagStrokeWidth}  /> Track Smarter. Grow Faster.</>,
   <><Wifi size={tagSize} color='#9C27B0'strokeWidth={tagStrokeWidth}  /> Zero Noise. All Signal.</>,
   <><Monitor size={tagSize} color='#2196F3'strokeWidth={tagStrokeWidth}  /> Free for Up to 5 Sites</>
];
const tagsColors = [
   "#00BFA6",
   "#FF6B6B",
   "#5C6AC4",
   "#FFB400",
   "#4CAF50",
   "#9C27B0",
   "#2196F3"
]

export default function HeroTag() {
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setIndex(prev => (prev + 1) % tags.length);
      }, 2000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="tag text-xxxs fit mb-2 pd-05 pdx-15" style={{ borderColor: tagsColors[index] }}>
         <AnimatePresence mode="wait">
            <motion.div
               key={tags.indexOf(tags[index])}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.3 }}
            >
               <div className='text-xxxs bold-600 dfb align-center justify-center gap-4' style={{ whiteSpace: "nowrap" }}>{tags[index]}</div>
            </motion.div>
         </AnimatePresence>
      </div>
   );
}