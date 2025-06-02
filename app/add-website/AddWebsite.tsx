'use client'
import "@/styles/auth.css"
import { CustomIcon, VisoraRawLogo } from "@/components/Icons/Icon"
import { ArrowLeft, ArrowRight, Lock } from "lucide-react"
import { useSession } from "next-auth/react"
import { userDefaultImage } from "@/utils/constants"
import { addUserWebsite } from "../actions/Website"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { wait } from "@/utils/Wait"
import { toast } from "sonner"
import Spacing from "@/components/Spacing/Spacing"

export default function AddWebsite() {
   const { data: session } = useSession();
   const router = useRouter();
   const [newWebsiteDomain, setNewWebsiteDomain] = useState('')
   const [buttonLoading, setButtonLoading] = useState(false)

   const addWebsiteButton = async () => {
      setButtonLoading(true);
      if (newWebsiteDomain == "") {
         toast.error("Please enter your website's domain");
         setButtonLoading(false);
         return;
      }
      await wait(1.5);
      const response = await addUserWebsite(newWebsiteDomain);
      if (response) {
         toast.success("Your website has been added successfully");
         router.push("/dashboard")
      } else {
         toast.error("Your website has failed to add")
      }
      setButtonLoading(false);
   }

   return (
      <div className="auth">
         <div className="auth-box">
            <div className="text-sm pd-1 dfb gap-10 justify-center">
               <VisoraRawLogo size={25} />
               <CustomIcon size={25} url={session?.user?.image || userDefaultImage} round />
            </div>

            <div className="text-sm bold-600 dfb align-center justify-center gap-15 pd-05">Add your website</div>
            <div className="text-xxs bold-400 grey-5">Get insights and analytical data on how well your website is performing</div>

            <div className="list text-s pd-1 gap-15">
               <input type="text" className="xs full" placeholder="Domain (example.com)" onChange={(e) => setNewWebsiteDomain(e.target.value)} value={newWebsiteDomain} />
               <div className="actions sm">
                  <button 
                     className="xxs full" 
                     onClick={addWebsiteButton} 
                     disabled={buttonLoading}
                  >
                     {buttonLoading ? 'Loading...' : <>Continue <ArrowRight size={17} /></>}
                  </button>
                  <button className="outline-black xxs full" onClick={() => router.push("/dashboard")}><ArrowLeft size={17} /> Back to Dashboard</button>
               </div>
            </div>

            <Spacing size={1} />

            <div className="text-xxxs bold-400 grey-5 dfb align-center gap-5 justify-center">
               <Lock size={12} /> You can remove this website anytime
            </div>
         </div>
      </div>
   )
}