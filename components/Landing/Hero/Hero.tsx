'use client'
import "./Hero.css"
import { useState } from "react"
import { ArrowRight, X } from "lucide-react";
import { useSession } from "next-auth/react";
import HeroTag from "./HeroTag"
import CustomVideoPlayer from "../CustomVideoPlayer/CustomVideoPlayer";
import { useRouter } from "next/navigation";

export default function Hero () {
   const { data: session } = useSession();
   const router = useRouter();
   const [showVideoDemo, setShowVideoDemo] = useState(false);

   return (
      <div className="hero">
         <HeroTag />

         <div className="headline text-xxl bold-600 mb-1 text-center pdx-3">
            Real-Time Website Analytics, Made Simple
         </div>

         <div className="sub-headline text-xs mb-2 text-center pdx-1">
            Track visitors, understand behavior, and boost your site&apos;s performance effortlessly.
         </div>

         <div className="call-to-action text-xxs dfb align-center justify-center gap-10">
            {session?.user ? <>
               <button className="xxs" onClick={() => router.push('/dashboard')}>Go to dashboard <ArrowRight size={17} /></button>
            </> : <>
               <button className="xxs" onClick={() => router.push('/login')}>Get Started</button>
            </>}
            <button className="xxs outline-black" onClick={() => setShowVideoDemo(true)}>See Demo</button>
         </div>

         <div className="screenshot-section">
            <div className="screenshot-container">
               <img
                  src="./assets/demo-screenshot.png"
                  alt="Visora Dashboard Preview"
                  className="screenshot-image"
               />
               <div className="screenshot-label text-xxxs fit">Live Dashboard Preview</div>
            </div>
         </div>

         {showVideoDemo && <div className="video-overlay" onClick={() => setShowVideoDemo(false)}>
            <div className="video-content" onClick={(e) => e.stopPropagation()}>
               <button className="video-close grey" onClick={() => setShowVideoDemo(false)}>
                  <X size={17} />
               </button>
               <div className="video-wrapper">
                  <CustomVideoPlayer />
               </div>
            </div>
        </div>}
      </div>
   )
}
