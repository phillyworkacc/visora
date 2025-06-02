'use client'
import "@/styles/auth.css"
import Spacing from "@/components/Spacing/Spacing"
import { VisoraRawLogo } from "@/components/Icons/Icon"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { DMSansFont } from "@/fonts/fonts"
import { useState } from "react"
import { wait } from "@/utils/Wait"
import { toast } from "sonner"

export default function ContactForm () {
   const router = useRouter();
   const [email, setEmail] = useState("")
   const [message, setMessage] = useState("")
   const [buttonLoading, setButtonLoading] = useState(false)

   const sendContactForm = async () => {
      setButtonLoading(true);
      await wait(2);

      try {
         let webhookUrl = "https://discord.com/api/webhooks/1377329329901535305/PUEzQgDx1WGl2H1_XoqrU154WTNY0BSspArAk9qdbzYi7jY1hrp9eMsJgyDXd8BOzdpR";
   
         const request = new XMLHttpRequest();
         request.open("POST", webhookUrl);
         request.setRequestHeader('Content-type', 'application/json');
   
         let clientTime = `${new Date().getHours()}:${new Date().getMinutes()}`
         let messageText = `# Visora Contact Form Message \nEmail: ${email}\nMessage: ${message}\nClient Time: ${clientTime}`
   
         const params = {
            username: "Visora Contact Bot",
            avatar_url: "https://media.discordapp.net/attachments/1377328967551422476/1377329051630309418/white-gradient-background-logo.png?ex=68389123&is=68373fa3&hm=0a05a56c092b6985b44e3905c48ebd00d3e8cc047f09f1592004c2c9e461d1b0&=&format=webp&quality=lossless",
            content: messageText
         }
         request.send(JSON.stringify(params));
         toast.success("Message Sent");
         router.push("/");
      } catch (e) {
         toast.error("Failed to send message to Visora Support Team")
      }
      setButtonLoading(false);
   }

   return (
      <div className="auth">
         <div className="auth-box">
            <div className="text-sm pd-1 cursor-pointer mb-1" onClick={() => router.push('/')}>
               <VisoraRawLogo size={25} />
            </div>

            <div className="text-ml bold-500 dfb align-center justify-center pd-1">Contact Form</div>
            <div className="text-xs bold-400 mb-3">Please fill out the fields below</div>

            <div className="form">
               <div className="form-content">
                  <input 
                     type="email" 
                     placeholder="Email" 
                     autoComplete="off" 
                     className={DMSansFont.className} 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="form-content">
                  <textarea 
                  name="message" 
                  placeholder="Message" 
                  className={DMSansFont.className} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} />
               </div>
            </div>

            <Spacing size={1} />
            
            <div className="actions">
               <button className="full xxs" disabled={buttonLoading} onClick={sendContactForm}>
                  {buttonLoading ? 'Loading...' : 'Submit'}
               </button>
            </div>

            <Spacing size={2} />

            <div className="text-xxs dfb gap-5 align-center justify-center text-center">
               <Lock size={15} />
               <span>Secure and private</span>
            </div>
            <div className="text-xxs pd-05 text-center">
               <span>We often respond in <b>less</b> than <b>2 hours</b></span>
            </div>

         </div>
      </div>
   )
}