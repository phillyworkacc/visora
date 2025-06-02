'use client'
import "@/styles/auth.css"
import { GoogleIcon, VisoraRawLogo } from "@/components/Icons/Icon"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import Spacing from "@/components/Spacing/Spacing"
import Link from "next/link"

export default function LoginForm() {
   const router = useRouter();

   return (
      <div className="auth">
         <div className="auth-box">
            <div className="text-sm pd-1 cursor-pointer mb-1" onClick={() => router.push('/')}><VisoraRawLogo size={25} /></div>

            <div className="text-s bold-500 dfb align-center justify-center">Welcome to Visora</div>
            <div className="text-m bold-600 dfb align-center justify-center gap-15 pd-05 mb-1">Login or Sign Up to your account</div>
            <div className="text-xs bold-400 mb-3">Please choose a sign in option below</div>
            
            <div className="actions">
               <button className="full xxs" onClick={() => signIn("google")}>
                  <GoogleIcon size={18} /> Continue with Google
               </button>
            </div>

            <Spacing size={2} />

            <div className="text-xxs dfb gap-5 align-center justify-center text-center">
               <Lock size={15} />
               <span>Secure and private</span>
            </div>
            <div className="text-xxs pd-05 text-center">
               <span>Need help? <Link href='/contact' style={{ textDecoration: "underline" }}>Contact Us</Link></span>
            </div>

         </div>
      </div>
   )
}