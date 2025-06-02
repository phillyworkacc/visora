'use client'
import "@/styles/auth.css"
import { CustomIcon, VisoraRawLogo } from "@/components/Icons/Icon"
import { ArrowLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import { userDefaultImage } from "@/utils/constants"
import { useRouter } from "next/navigation"

export default function ThresholdWebsites() {
   const { data: session } = useSession();
   const router = useRouter();

   return (
      <div className="auth">
         <div className="auth-box">
            <div className="text-sm pd-1 dfb gap-10 justify-center">
               <VisoraRawLogo size={25} />
               <CustomIcon size={25} url={session?.user?.image || userDefaultImage} round />
            </div>

            <div className="text-sm bold-600 dfb align-center justify-center gap-15 pd-05">Unfortunately, you cannot add a website.</div>
            <div className="text-xxs bold-400 grey-5">You've reached the limit of 5 websites on your account. To add a new one, you'll need to remove an existing website first. Just delete a site you no longer need, and you'll free up space to track a new one.</div>

            <div className="list text-s pd-1 gap-15">
               <div className="actions">
                  <button className="outline-black xxs full" onClick={() => router.push("/dashboard")}><ArrowLeft size={17} /> Back to Dashboard</button>
               </div>
            </div>
         </div>
      </div>
   )
}